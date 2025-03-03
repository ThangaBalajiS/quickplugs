import React, { useState, useEffect, useRef } from 'react';
import '../styles/WorkflowGenie.css';
import { Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addMessage } from '../store/reducers/genieMessagesReducer';
import { GenieMessage } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { addPlug } from '../store/reducers/plugsReducer';
import { selectPlugSuccess } from '../store/reducers/plugReducer';
import { Connector } from '../types';

const { TextArea } = Input;

interface ActionApp {
  name: string;
  description: string;
  type: string;
  id: string;
  action_or_trigger_id: string;
}

interface ActionData {
  name: string;
  description: string;
  apps: ActionApp[];
}

const WorkflowGenie = () => {
  const [prompt, setPrompt] = useState('');
  const [conversationId, setConversationId] = useState('a'); // Default conversation ID
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.genieMessages.messages);
  const connectors = useSelector((state: RootState) => state.connectors.items);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<any>(null);

  const templates = [
    { id: 1, title: 'Integration name goes here' },
    { id: 2, title: 'Integration name goes here' },
    { id: 3, title: 'Integration name goes here' },
    { id: 4, title: 'Integration name goes here' }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const createPlug = async (actionData: ActionData) => {
    try {
      // Send POST request to create a plug
      const response = await fetch('http://localhost/plugs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: actionData.name + ' - ' + uuidv4(),
          desc: actionData.description
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create plug');
      }

      const newPlug = await response.json();
      
      // Use the plug ID returned from the server
      if (!newPlug.plug_id) {
        throw new Error('No plug ID returned from server');
      }
      
      const plugId = newPlug.plug_id;
      
      // Create the workflow configuration format
      const workflowConfig: any = {
        Trigger: "",
        Action: []
      };

      // Process apps to create the workflow configuration
      const orderedConnectors: Connector[] = [];
      
      actionData.apps.forEach((app, index) => {
        // Find the connector details from the connector reducer
        const connector = connectors.find(c => c.id === app.id);
        
        if (connector) {
          orderedConnectors.push(connector);
        }
        
        if (app.type.toLowerCase() === 'trigger') {
          const triggerId = `Trigger${String(index + 1).padStart(3, '0')}`;
          workflowConfig.Trigger = triggerId;
          workflowConfig[triggerId] = {
            Connector: {
              ConnectorId: app.id,
              TriggerId: app.action_or_trigger_id,
              VersionNumber: "1.0.0"
            }
          };
        } else if (app.type.toLowerCase() === 'action') {
          const actionId = `Action${String(index + 1).padStart(3, '0')}`;
          workflowConfig.Action.push(actionId);
          workflowConfig[actionId] = {
            Connector: {
              ConnectorId: app.id,
              ActionId: app.action_or_trigger_id,
              VersionNumber: "1.0.0"
            }
          };
        }
      });

      // Update the plug with the workflow configuration
      const updateResponse = await fetch(`http://localhost/plugs/${plugId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workflowConfig),
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to update plug with workflow configuration');
      }

      // Get the updated plug metadata
      const metadataResponse = await fetch(`http://localhost/plugs/${plugId}/metadata`);
      if (!metadataResponse.ok) {
        throw new Error('Failed to fetch plug metadata');
      }
      
      const plugMetadata = await metadataResponse.json();

      // Create a complete plug object with connector details and metadata
      const completePlugData = {
        id: plugId,
        name: actionData.name,
        description: actionData.description,
        icon: '/assets/default-plug.svg',
        type: actionData.apps && actionData.apps.length > 0 ? actionData.apps[0].type : 'Integration',
        workflow: workflowConfig,
        connectors: orderedConnectors,
        metadata: plugMetadata
      };

      // Add the new plug to the Redux store
      dispatch(addPlug(completePlugData));
      
      // Set as the currently selected plug
      dispatch(selectPlugSuccess(completePlugData));

      // Add a confirmation message
      const confirmationMessage: GenieMessage = {
        id: uuidv4(),
        content: `I've created a new integration: "${actionData.name}" and configured its workflow.`,
        sender: 'genie',
        timestamp: Date.now()
      };
      dispatch(addMessage(confirmationMessage));

    } catch (error) {
      console.error('Error creating or updating plug:', error);
      
      // Add error message
      const errorMessage: GenieMessage = {
        id: uuidv4(),
        content: 'Sorry, there was an error creating the integration: ' + (error instanceof Error ? error.message : String(error)),
        sender: 'genie',
        timestamp: Date.now()
      };
      dispatch(addMessage(errorMessage));
    }
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    // Add user message to state
    const userMessage: GenieMessage = {
      id: uuidv4(),
      content: prompt,
      sender: 'user',
      timestamp: Date.now()
    };
    dispatch(addMessage(userMessage));

    // Clear input
    setPrompt('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, conversationId }),
      });

      const data = await response.json();
      
      // Update conversation ID for future requests
      if (data.conversationId) {
        setConversationId(data.conversationId);
      }

      // Parse the content which is a JSON string
      let messageContent = '';
      let action = null;
      
      try {
        // The content is a JSON string that needs to be parsed
        const parsedContent = JSON.parse(data.result.content);
        messageContent = parsedContent.message;
        action = parsedContent.action;
        
        // Handle action if it exists and matches the expected format
        if (action && 
            typeof action === 'object' && 
            'name' in action && 
            'description' in action && 
            'apps' in action) {
          console.log('Action received:', action);
          await createPlug(action as ActionData);
        }
      } catch (parseError) {
        // If parsing fails, use the content as is
        messageContent = data.result.content;
        console.error('Error parsing message content:', parseError);
      }

      // Add assistant message to state
      const assistantMessage: GenieMessage = {
        id: uuidv4(),
        content: messageContent,
        sender: 'genie',
        timestamp: Date.now()
      };
      dispatch(addMessage(assistantMessage));
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage: GenieMessage = {
        id: uuidv4(),
        content: 'Sorry, there was an error processing your request.',
        sender: 'genie',
        timestamp: Date.now()
      };
      dispatch(addMessage(errorMessage));
    } finally {
      setIsLoading(false);
      // Focus the textarea after sending
      setTimeout(() => {
        textAreaRef.current?.focus();
      }, 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="workflow-genie">
      <div className="genie-header">
        <h2>✨ Workflow Genie</h2>
        <button className="collapse-btn">→</button>
      </div>

      {messages.length === 0 ? (
        <div className="templates-section">
        <h3>Popular templates</h3>
          <div className="templates-list">
            {templates.map(template => (
              <div key={template.id} className="template-card">
                <div className="template-icons">
                  <span className="icon">M</span>
                  <span className="arrow">→</span>
                  <span className="icon">M</span>
                </div>
                <p>{template.title}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="messages-container">
          {messages.map(message => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-content">{message.content}</div>
            </div>
        ))}
          <div ref={messagesEndRef} />
        </div>
      )}
      
      <div className="chat-input">
        <TextArea
          placeholder="Type here.."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          autoSize={{ minRows: 1, maxRows: 4 }}
          ref={textAreaRef}
        />
        <Button 
          type="primary" 
          onClick={handleSubmit} 
          loading={isLoading}
          className="send-button"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default WorkflowGenie; 
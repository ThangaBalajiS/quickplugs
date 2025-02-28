import React, { useState, useEffect, useRef } from 'react';
import '../styles/WorkflowGenie.css';
import { Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addMessage } from '../store/reducers/genieMessagesReducer';
import { GenieMessage } from '../types';
import { v4 as uuidv4 } from 'uuid';

const { TextArea } = Input;

const WorkflowGenie = () => {
  const [prompt, setPrompt] = useState('');
  const [conversationId, setConversationId] = useState('a'); // Default conversation ID
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.genieMessages.messages);
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

      // Add assistant message to state
      const assistantMessage: GenieMessage = {
        id: uuidv4(),
        content: data.result.content,
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
import { Dispatch } from 'redux';
import { 
  addMessage,
  fetchMessagesStart,
  fetchMessagesSuccess,
  fetchMessagesFailure
} from '../reducers/genieMessagesReducer';
import { GenieMessage } from '../../types';
import { v4 as uuidv4 } from 'uuid'; // You'll need to install this: npm install uuid @types/uuid

// Mock API call - replace with actual API call
const fetchMessagesFromAPI = (): Promise<GenieMessage[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          content: 'Hello! How can I help you with your workflow today?',
          sender: 'genie',
          timestamp: Date.now() - 60000
        }
      ]);
    }, 500);
  });
};

export const fetchMessages = () => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchMessagesStart());
    try {
      const messages = await fetchMessagesFromAPI();
      dispatch(fetchMessagesSuccess(messages));
    } catch (error) {
      dispatch(fetchMessagesFailure(error instanceof Error ? error.message : 'Unknown error'));
    }
  };
};

export const sendMessage = (content: string) => {
  return async (dispatch: Dispatch) => {
    // Add user message
    const userMessage: GenieMessage = {
      id: uuidv4(),
      content,
      sender: 'user',
      timestamp: Date.now()
    };
    dispatch(addMessage(userMessage));
    
    // Simulate genie response
    setTimeout(() => {
      const genieMessage: GenieMessage = {
        id: uuidv4(),
        content: `I received your message: "${content}". How can I help you further?`,
        sender: 'genie',
        timestamp: Date.now()
      };
      dispatch(addMessage(genieMessage));
    }, 1000);
  };
}; 
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GenieMessage } from '../../types';

interface GenieMessagesState {
  messages: GenieMessage[];
  loading: boolean;
  error: string | null;
}

const initialState: GenieMessagesState = {
  messages: [],
  loading: false,
  error: null,
};

const genieMessagesSlice = createSlice({
  name: 'genieMessages',
  initialState,
  reducers: {
    fetchMessagesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchMessagesSuccess(state, action: PayloadAction<GenieMessage[]>) {
      state.messages = action.payload;
      state.loading = false;
    },
    fetchMessagesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addMessage(state, action: PayloadAction<GenieMessage>) {
      state.messages.push(action.payload);
    },
    clearMessages(state) {
      state.messages = [];
    },
  },
});

export const { 
  fetchMessagesStart, 
  fetchMessagesSuccess, 
  fetchMessagesFailure,
  addMessage,
  clearMessages
} = genieMessagesSlice.actions;

export default genieMessagesSlice.reducer; 
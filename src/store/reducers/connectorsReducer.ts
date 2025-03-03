import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Connector } from '../../types';

interface ConnectorsState {
  items: Connector[];
  loading: boolean;
  error: string | null;
}

const initialState: ConnectorsState = {
  items: [],
  loading: false,
  error: null,
};

const connectorsSlice = createSlice({
  name: 'connectors',
  initialState,
  reducers: {
    fetchConnectorsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchConnectorsSuccess(state, action: PayloadAction<Connector[]>) {
      state.items = action.payload;
      state.loading = false;
    },
    fetchConnectorsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { 
  fetchConnectorsStart, 
  fetchConnectorsSuccess, 
  fetchConnectorsFailure 
} = connectorsSlice.actions;

export default connectorsSlice.reducer; 
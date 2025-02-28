import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Plug } from '../../types';

interface PlugState {
  currentPlug: Plug | null;
  loading: boolean;
  error: string | null;
}

const initialState: PlugState = {
  currentPlug: null,
  loading: false,
  error: null,
};

const plugSlice = createSlice({
  name: 'plug',
  initialState,
  reducers: {
    selectPlugStart(state) {
      state.loading = true;
      state.error = null;
    },
    selectPlugSuccess(state, action: PayloadAction<Plug>) {
      state.currentPlug = action.payload;
      state.loading = false;
    },
    selectPlugFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    clearSelectedPlug(state) {
      state.currentPlug = null;
    },
  },
});

export const { 
  selectPlugStart, 
  selectPlugSuccess, 
  selectPlugFailure,
  clearSelectedPlug
} = plugSlice.actions;

export default plugSlice.reducer; 
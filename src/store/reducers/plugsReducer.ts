import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Plug } from '../../types';

interface PlugsState {
  items: Plug[];
  loading: boolean;
  error: string | null;
}

const initialState: PlugsState = {
  items: [],
  loading: false,
  error: null,
};

const plugsSlice = createSlice({
  name: 'plugs',
  initialState,
  reducers: {
    fetchPlugsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPlugsSuccess(state, action: PayloadAction<Plug[]>) {
      state.items = action.payload;
      state.loading = false;
    },
    fetchPlugsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addPlug(state, action: PayloadAction<Plug>) {
      state.items.push(action.payload);
    },
    removePlug(state, action: PayloadAction<string>) {
      state.items = state.items.filter(plug => plug.id !== action.payload);
    },
  },
});

export const { 
  fetchPlugsStart, 
  fetchPlugsSuccess, 
  fetchPlugsFailure,
  addPlug,
  removePlug
} = plugsSlice.actions;

export default plugsSlice.reducer; 
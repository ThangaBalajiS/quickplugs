import { createSlice } from '@reduxjs/toolkit';
import { Plug } from '../../types';
import { fetchPlugs } from '../actions/plugsActions';

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
    addPlug(state, action) {
      state.items.push(action.payload);
    },
    removePlug(state, action) {
      state.items = state.items.filter(plug => plug.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlugs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlugs.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchPlugs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addPlug, removePlug } = plugsSlice.actions;
export default plugsSlice.reducer; 
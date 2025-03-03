import { createAsyncThunk } from '@reduxjs/toolkit';
import { Connector } from '../../types';
import { 
  fetchConnectorsStart,
  fetchConnectorsSuccess,
  fetchConnectorsFailure
} from '../reducers/connectorsReducer';

export const fetchConnectors = createAsyncThunk(
  'connectors/fetchConnectors',
  async (_, { dispatch }) => {
    try {
      dispatch(fetchConnectorsStart());
      
      const response = await fetch('http://localhost/connector/summary');
      
      if (!response.ok) {
        throw new Error('Failed to fetch connectors');
      }
      
      const data = await response.json();
      dispatch(fetchConnectorsSuccess(data));
      
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      dispatch(fetchConnectorsFailure(errorMessage));
      throw error;
    }
  }
); 
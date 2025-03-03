import { createAsyncThunk } from '@reduxjs/toolkit';
import { Plug } from '../../types';

// Create an async thunk for fetching plugs
export const fetchPlugs = createAsyncThunk(
  'plugs/fetchPlugs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost/plugs');
      
      if (!response.ok) {
        throw new Error('Failed to fetch plugs');
      }
      
      const plugs = await response.json();
      
      // Fetch metadata for each plug
      const plugsWithMetadata = await Promise.all(
        plugs.map(async (plug: any) => {
          try {
            const metadataResponse = await fetch(`http://localhost/plugs/${plug.id}/metadata`);
            
            if (metadataResponse.ok) {
              const metadata = await metadataResponse.json();
              return { ...plug, metadata };
            }
            
            return plug;
          } catch (error) {
            console.error(`Failed to fetch metadata for plug ${plug.id}:`, error);
            return plug;
          }
        })
      );
      
      return plugsWithMetadata;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
); 
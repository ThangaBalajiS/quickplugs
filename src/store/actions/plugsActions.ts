import { createAsyncThunk } from '@reduxjs/toolkit';
import { Plug } from '../../types';

// Create an async thunk for fetching plugs
export const fetchPlugs = createAsyncThunk(
  'plugs/fetchPlugs',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      const response = await new Promise<Plug[]>((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: '1',
              name: 'Salesforce',
              description: 'CRM integration',
              icon: '/assets/salesforce.svg',
              type: 'CRM'
            },
            {
              id: '2',
              name: 'Slack',
              description: 'Communication integration',
              icon: '/assets/slack.svg',
              type: 'Communication'
            },
            {
              id: '3',
              name: 'Google Sheets',
              description: 'Spreadsheet integration',
              icon: '/assets/sheets.svg',
              type: 'Data'
            },
            {
              id: '4',
              name: 'Mailchimp',
              description: 'Email marketing integration',
              icon: '/assets/mailchimp.svg',
              type: 'Marketing'
            }
          ]);
        }, 500);
      });
      
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
); 
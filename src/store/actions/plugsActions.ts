import { Dispatch } from 'redux';
import { 
  fetchPlugsStart, 
  fetchPlugsSuccess, 
  fetchPlugsFailure 
} from '../reducers/plugsReducer';
import { Plug } from '../../types';

// Mock API call - replace with actual API call
const fetchPlugsFromAPI = (): Promise<Plug[]> => {
  return new Promise((resolve) => {
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
};

export const fetchPlugs = () => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchPlugsStart());
    try {
      const plugs = await fetchPlugsFromAPI();
      dispatch(fetchPlugsSuccess(plugs));
    } catch (error) {
      dispatch(fetchPlugsFailure(error instanceof Error ? error.message : 'Unknown error'));
    }
  };
}; 
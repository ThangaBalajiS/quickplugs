import { Dispatch } from 'redux';
import { 
  selectPlugStart, 
  selectPlugSuccess, 
  selectPlugFailure 
} from '../reducers/plugReducer';
import { Plug } from '../../types';

// Mock API call - replace with actual API call
const fetchPlugDetailsFromAPI = (id: string): Promise<Plug> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // This would be a real API call in production
      const plugs = [
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
        }
      ];
      
      const plug = plugs.find(p => p.id === id);
      if (plug) {
        resolve(plug);
      } else {
        reject(new Error('Plug not found'));
      }
    }, 300);
  });
};

export const selectPlug = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(selectPlugStart());
    try {
      const plug = await fetchPlugDetailsFromAPI(id);
      dispatch(selectPlugSuccess(plug));
    } catch (error) {
      dispatch(selectPlugFailure(error instanceof Error ? error.message : 'Unknown error'));
    }
  };
}; 
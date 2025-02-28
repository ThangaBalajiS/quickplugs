import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import plugsReducer from './reducers/plugsReducer';
import plugReducer from './reducers/plugReducer';
import genieMessagesReducer from './reducers/genieMessagesReducer';

const rootReducer = combineReducers({
  plugs: plugsReducer,
  plug: plugReducer,
  genieMessages: genieMessagesReducer,
});

export interface RootState {
  plugs: ReturnType<typeof plugsReducer>;
  plug: ReturnType<typeof plugReducer>;
  genieMessages: ReturnType<typeof genieMessagesReducer>;
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store; 
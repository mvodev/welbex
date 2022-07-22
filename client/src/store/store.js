import { combineReducers, configureStore } from '@reduxjs/toolkit';

import tableCardReducer from '../store/tableCard/tableCardReducer';

const rootReducer = combineReducers({
  tableCardReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

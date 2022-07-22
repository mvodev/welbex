import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import store from '../src/store/store';

import './index.scss';
import TablePage from './TablePage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <TablePage />
    </Provider>
  </React.StrictMode>
);
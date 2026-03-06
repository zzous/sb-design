import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastProvider } from '@starbanking/design-system';
import '@starbanking/design-system/styles';
import '@starbanking/design-system/legacy-styles';
import './global.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastProvider position="topRight">
      <App />
    </ToastProvider>
  </React.StrictMode>,
);

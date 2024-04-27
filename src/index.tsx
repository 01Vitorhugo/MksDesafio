import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './indexFormat.css'
import { QueryClient, QueryClientProvider } from 'react-query';

const queryCliente = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryCliente} >
    <App />
    </QueryClientProvider>
  </React.StrictMode>
);


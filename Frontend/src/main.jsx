// index.js or App.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';
import MapContextProvider from './context/MapContext';
import PaymentContextProvider from './context/PaymentContext';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const container = document.getElementById('root');
const root = createRoot(container); // createRoot is used instead of ReactDOM.render

root.render(
  <MapContextProvider>
  <PaymentContextProvider>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </PaymentContextProvider>
</MapContextProvider>
);

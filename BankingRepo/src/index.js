import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
<meta name="viewport" content="initial-scale=1, width=device-width" />

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <ToastContainer/>
    <App />
    </>
);


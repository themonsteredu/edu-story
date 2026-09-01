import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/01-styles.css';
import './styles/02-styles.css';
import './styles/03-styles.css';
import './styles/04-styles.css';
import './styles/05-styles.css';
import './styles/06-styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

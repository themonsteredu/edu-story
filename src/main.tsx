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
import './styles/07-editorial.css';
import './styles/08-lesson-two.css';
import './styles/09-lesson-two-presentation.css';
import './styles/10-lesson-two-home-teacher.css';
import './styles/11-lesson-three.css';
import './styles/12-lesson-three-presentation.css';
import './styles/13-lesson-three-home-teacher.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

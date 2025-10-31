// src/main.jsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // 1. IMPORTAR ROUTER
import './styles/base.css'; 
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router> {/* 2. ENVOLVER LA APP CON EL ROUTER */}
      <App />
    </Router>
  </StrictMode>,
);
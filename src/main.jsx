import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Inicio from './inicio.jsx';
import PaginaHotel from './paginaHotel.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path = "/frontend" element = {<Inicio/>}/>
        <Route path = "/paginaHotel" element = {<PaginaHotel/>}/>
      </Routes>
    </Router>
  </React.StrictMode>,
);
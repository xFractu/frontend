import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Inicio from './inicio.jsx';
import PaginaHotel1 from './paginaHotel1.jsx';
import PaginaHotel2 from './paginaHotel2.jsx';
import PaginaHotel3 from './paginaHotel3.jsx';
import PaginaHotel4 from './paginaHotel4.jsx';
import PaginaHotel5 from './paginaHotel5.jsx';
import PaginaHotel6 from './paginaHotel6.jsx';
import Login from './LoginForm.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path = "/frontend/" element = {<Inicio/>}/>
        <Route path = "/frontend/paginaHotel1" element = {<PaginaHotel1/>}/>
        <Route path = "/frontend/paginaHotel2" element = {<PaginaHotel2/>}/>
        <Route path = "/frontend/paginaHotel3" element = {<PaginaHotel3/>}/>
        <Route path = "/frontend/paginaHotel4" element = {<PaginaHotel4/>}/>
        <Route path = "/frontend/paginaHotel5" element = {<PaginaHotel5/>}/>
        <Route path = "/frontend/paginaHotel6" element = {<PaginaHotel6/>}/>
        <Route path = "/frontend/login" element = {<Login/>}/>
      </Routes>
    </Router>
  </React.StrictMode>,
);
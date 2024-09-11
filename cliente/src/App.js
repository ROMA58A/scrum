import React from 'react';
import logo from './logo.svg';
import './App.css';
import CompShowBlogs from './blog/showBlogs';
import CreateBlog from './blog/CreateBlogs';
 import CompEditarblog from './blog/EditBlogs';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Gestor de Datos</h1>
        <p>Bienvenido a la aplicación de gestión de datos </p>
      </header>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CompShowBlogs />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/blogs/:id" element={<CompEditarblog />} /> {/* Ruta para editar */}
        </Routes>
      </BrowserRouter>
     {/* Footer */}
     <footer className="App-footer">
  <h1>© Copyright ROMA. All Rights Reserved</h1>
  <p className="footer-text">Conéctate con nosotros en redes sociales</p>
  <div className="social-icons">
    <a href="https://www.facebook.com/brandon.ayala.71216/?locale=es_LA" target="_blank" rel="noreferrer">
      <i className="fab fa-facebook-f"></i>
    </a>
    <a href="https://www.instagram.com/brandon_ro11/" target="_blank" rel="noreferrer">
      <i className="fab fa-instagram"></i>
    </a>
    <a href="https://www.linkedin.com/in/brand-ayala/" target="_blank" rel="noreferrer">
      <i className="fab fa-linkedin-in"></i>
    </a>
    <a href="https://github.com/ROMA58A" target="_blank" rel="noreferrer">
      <i className="fab fa-github"></i>
    </a>
  </div>
</footer>

    </div>
  );
}

export default App;

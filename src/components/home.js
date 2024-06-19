import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';

function Home() {
  return (
    <div className="home-container">
      <h2>¡Bienvenido a la Página Principal!</h2>
      <div className="button-container">
        <Link to="/registro" className="button-link">
          <button className="btn">Ir a Registro</button>
        </Link>
        <Link to="/login" className="button-link">
          <button className="btn">Ir a Inicio de Sesión</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;

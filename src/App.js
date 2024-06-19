import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import Register from './components/registro';
import Login from './components/login';
import Principal from './components/principal';
import Cafeteramenu from './components/cafeteramenu';
import AdminDashboard from './components/adminDashboard.js';
import AddProduct from './components/ProductForm'; // Componente para añadir productos
import Orders from './components/OrderList'; // Componente para ver pedidos

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
  };

  const userRole = localStorage.getItem('userRole');

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Cafeteria</h1>
        </header>
        <nav className="app-menu">
        
          <ul>
            <li><Link to="/home">Inicio</Link></li>
            {isLoggedIn && userRole === 'cliente' && <li><Link to="/cafeteramenu">Cafeteramenu</Link></li>}
            {isLoggedIn && userRole === 'admin' && <>
              <li><Link to="/admin">Admin Dashboard</Link></li>
              <li><Link to="/principal">Principal</Link></li>
              <li><Link to="/ProductForm">Añadir Producto</Link></li>
              <li><Link to="/OrderList">Pedidos</Link></li>
              
              
            </>}
            {isLoggedIn && <li><button onClick={handleLogout}>Cerrar Sesión</button></li>}
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cafeteramenu" element={isLoggedIn && userRole === 'cliente' ? <Cafeteramenu userId={localStorage.getItem('userId')} /> : <Navigate to="/login" />} />
          <Route path="/admin" element={isLoggedIn && userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} />
          <Route path="/ProductForm" element={isLoggedIn && userRole === 'admin' ? <AddProduct /> : <Navigate to="/login" />} />
          <Route path="/OrderList" element={isLoggedIn && userRole === 'admin' ? <Orders /> : <Navigate to="/login" />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          {isLoggedIn ? (
            <Route path="/principal" element={<Principal />} />
          ) : (
            <Route path="/principal" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

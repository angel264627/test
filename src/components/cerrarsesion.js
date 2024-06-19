import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:2000/api/logout');
      // Limpiar cualquier información de sesión almacenada en el cliente
      navigate('/components/home'); // Redirigir a la página de inicio después de cerrar sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleLogout} disabled={loading}>
      {loading ? 'Cerrando sesión...' : 'Cerrar sesión'}
    </button>
  );
}

export default LogoutButton;

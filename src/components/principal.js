import React from 'react';
import UsersList from './UsersList'; // Asegúrate de importar el componente correctamente
import 'bootstrap/dist/css/bootstrap.min.css';

function Principal() {
  return (
    <div className="principal">
      <h1>Bienvenido, has iniciado sesión con éxito</h1>
      <UsersList /> {/* Agrega el componente UsersList aquí */}
    </div>
  );
}

export default Principal;

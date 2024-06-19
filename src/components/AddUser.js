import React, { useState } from 'react';
import axios from 'axios';

function AddUser({ onUserAdded }) {
  const [newUser, setNewUser] = useState({
    nombre: '',
    correo: '',
    edad: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:2000/api/usuarios', newUser);
      setNewUser({
        nombre: '',
        correo: '',
        edad: ''
      });
      onUserAdded(); // Llama a la función para notificar que se ha agregado un nuevo usuario
    } catch (error) {
      console.error('Error al agregar usuario:', error);
    }
  };

  return (
    <div className="add-user">
      <h2>Agregar Nuevo Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" name="nombre" value={newUser.nombre} onChange={handleInputChange} />
        </div>
        <div>
          <label>Correo:</label>
          <input type="email" name="correo" value={newUser.correo} onChange={handleInputChange} />
        </div>
        <div>
          <label>Edad:</label>
          <input type="number" name="edad" value={newUser.edad} onChange={handleInputChange} />
        </div>
        <button type="submit">Agregar Usuario</button>
      </form>
    </div>
  );
}

export default AddUser;

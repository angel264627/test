import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UsersList.css';

function UsersList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:2000/api/usuarios');
      setUsers(response.data);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  const addUser = async (user) => {
    try {
      const response = await axios.post('http://localhost:2000/api/usuarios', user);
      setUsers([...users, response.data]); // Asume que la API responde con el usuario creado
      alert('Usuario añadido correctamente');
    } catch (error) {
      console.error('Error al añadir usuario:', error);
      alert('Error al añadir usuario');
    }
  };

  const deleteUser = async (nombre) => {
    try {
      await axios.delete('http://localhost:2000/api/usuarios', { data: { nombre: nombre } });
      setUsers(users.filter(user => user.nombre !== nombre));
      alert('Usuario eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      alert('Error al eliminar usuario');
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="user-dashboard">
      <h2>Datos de Usuarios</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id} className="user-item">
            <div className="user-info">
              <strong>Nombre:</strong> {user.nombre}, <strong>Correo:</strong> {user.correo}, <strong>Edad:</strong> {user.edad}
            </div>
            <button className="delete-button" onClick={() => deleteUser(user.nombre)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
      <h3>Añadir Usuario</h3>
      <form onSubmit={(e) => {
        e.preventDefault();
        const newUser = {
          nombre: e.target.nombre.value,
          correo: e.target.correo.value,
          edad: e.target.edad.valueAsNumber,
          contrasena: e.target.contrasena.value,
        };
        addUser(newUser);
        e.target.reset();  // Resetea el formulario después de enviar
      }}>
        <label>
          Nombre:
          <input type="text" name="nombre" required />
        </label>
        <label>
          Correo:
          <input type="email" name="correo" required />
        </label>
        <label>
          Edad:
          <input type="number" name="edad" required />
        </label>
        <label>
          Contraseña:
          <input type="password" name="contrasena" required /> 
        </label>
        <button className="add-button" type="submit">Añadir Usuario</button>
      </form>
    </div>
  );
}

export default UsersList;


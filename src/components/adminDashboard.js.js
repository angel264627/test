import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './adminDashboard.css';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [role, setRole] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:2000/api/usuarios');
      setUsers(response.data);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  const handleUserChange = (e) => {
    const userId = e.target.value;
    const user = users.find((user) => user._id === userId);
    setSelectedUser(user);
    setRole(user ? user.rol : '');
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleRoleUpdate = async () => {
    if (!selectedUser) return;

    try {
      await axios.put(`http://localhost:2000/api/usuarios/${selectedUser._id}/rol`, { rol: role });
      alert('Rol actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar el rol:', error);
      alert('Error al actualizar el rol');
    }
  };

  console.log("Renderizando AdminDashboard");

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin Dashboard</h2>
      <p className="lead">Bienvenido, administrador. Aquí puedes gestionar tu aplicación.</p>
      <div className="card mb-4">
        <div className="card-header">
          <h3>Actualizar Rol de Usuario</h3>
        </div>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="userSelect">Seleccionar Usuario</label>
            <select id="userSelect" className="form-control" onChange={handleUserChange} value={selectedUser ? selectedUser._id : ''}>
              <option value="">Seleccionar Usuario</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.nombre} ({user.correo})
                </option>
              ))}
            </select>
          </div>
          {selectedUser && (
            <div>
              <p><strong>Nombre:</strong> {selectedUser.nombre}</p>
              <p><strong>Correo:</strong> {selectedUser.correo}</p>
              <div className="form-group">
                <label htmlFor="role">Rol</label>
                <select id="role" className="form-control" value={role} onChange={handleRoleChange}>
                  <option value="cliente">Cliente</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button className="btn btn-primary" onClick={handleRoleUpdate}>Actualizar Rol</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

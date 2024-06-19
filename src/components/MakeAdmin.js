import React, { useState } from 'react';
import axios from 'axios';

function MakeAdmin() {
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2000/api/makeAdmin', { correo }, { withCredentials: true });
      setMensaje(response.data.mensaje);
    } catch (error) {
      setMensaje(error.response.data.mensaje);
    }
  };

  return (
    <div>
      <h2>Hacer Administrador</h2>
      {mensaje && <p>{mensaje}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Correo del Usuario:</label>
          <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        </div>
        <button type="submit">Hacer Administrador</button>
      </form>
    </div>
  );
}

export default MakeAdmin;

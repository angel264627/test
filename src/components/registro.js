import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import './registro.css'; // Archivo CSS para estilos

function Register() {
  const [registerData, setRegisterData] = useState({
    nombre: '',
    edad: '',
    correo: '',
    contrasena: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Obtener la función navigate

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2000/api/usuarios', registerData);
      console.log(response.data);
      // Redireccionar a la página de inicio después del registro exitoso
      navigate('/');
    } catch (error) {
      console.error('Error de registro:', error.response.data.mensaje);
      setErrorMessage(error.response.data.mensaje);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Registro</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleRegisterSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" value={registerData.nombre} onChange={handleRegisterChange} />
          </div>
          <div className="form-group">
            <label htmlFor="correo">Correo electrónico:</label>
            <input type="email" id="correo" name="correo" value={registerData.correo} onChange={handleRegisterChange} />
          </div>
          <div className="form-group">
            <label htmlFor="edad">Edad:</label>
            <input type="number" id="edad" name="edad" value={registerData.edad} onChange={handleRegisterChange} />
          </div>
          <div className="form-group">
            <label htmlFor="contrasena">Contraseña:</label>
            <input type="password" id="contrasena" name="contrasena" value={registerData.contrasena} onChange={handleRegisterChange} />
          </div>
          <button type="submit" className="btn">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default Register;

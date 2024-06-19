import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';

function Login({ onLogin }) {
  const [loginData, setLoginData] = useState({
    correo: '',
    contrasena: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2000/api/login', loginData);
      const { usuario } = response.data;
      console.log(response.data);
      // Guardar el ID del usuario y el rol para usarlo más tarde
      localStorage.setItem('userId', usuario._id);
      localStorage.setItem('userRole', usuario.rol);
      // Llama a la función onLogin pasada como prop para indicar que el usuario ha iniciado sesión
      onLogin();
      // Redirecciona a la página de Cafeteramenu después del inicio de sesión exitoso
      navigate('/cafeteramenu');
    } catch (error) {
      console.error('Error de inicio de sesión:', error.response.data.mensaje);
      setErrorMessage(error.response.data.mensaje);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Iniciar Sesión</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <label htmlFor="correo">Correo electrónico:</label>
            <input type="email" id="correo" name="correo" value={loginData.correo} onChange={handleLoginChange} />
          </div>
          <div className="form-group">
            <label htmlFor="contrasena">Contraseña:</label>
            <input type="password" id="contrasena" name="contrasena" value={loginData.contrasena} onChange={handleLoginChange} />
          </div>
          <button type="submit" className="btn">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
}

export default Login;

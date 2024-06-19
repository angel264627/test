import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductForm() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('precio', precio);
    formData.append('descripcion', descripcion);
    formData.append('imagen', imagen);

    try {
      const response = await axios.post('http://localhost:2000/api/productos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Producto agregado:', response.data);
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </div>
      <div>
        <label>Precio:</label>
        <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} />
      </div>
      <div>
        <label>Descripción:</label>
        <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
      </div>
      <div>
        <label>Imagen:</label>
        <input type="file" onChange={(e) => setImagen(e.target.files[0])} />
      </div>
      <button type="submit">Agregar Producto</button>
    </form>
  );
}

export default ProductForm;

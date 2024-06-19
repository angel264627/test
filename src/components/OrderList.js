import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderList.css';

function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:2000/api/pedidos');
      setOrders(response.data);
    } catch (error) {
      console.error('Error al obtener los pedidos:', error);
    }
  };

  const completeOrder = async (id) => {
    try {
      await axios.post(`http://localhost:2000/api/pedidos/${id}/completar`);
      fetchOrders(); // Volver a cargar los pedidos después de completar uno
    } catch (error) {
      console.error('Error al completar el pedido:', error);
    }
  };

  return (
    <div className="order-list">
      <h2>Lista de Pedidos</h2>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            <div className="order-info">
              <strong>Usuario:</strong> {order.usuario ? order.usuario.nombre : 'Usuario no encontrado'}
              <strong>Total:</strong> ${order.total}
              <strong>Fecha:</strong> {new Date(order.fecha).toLocaleString()}
              <ul>
                {order.productos.map((p, index) => (
                  <li key={index}>{p.producto ? p.producto.nombre : 'Producto no encontrado'} - Cantidad: {p.cantidad}</li>
                ))}
              </ul>
            </div>
            <button onClick={() => completeOrder(order._id)}>Marcar como Completado</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderList;

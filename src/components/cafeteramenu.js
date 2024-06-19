import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './cafeteramenu.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Cafeteramenu({ userId }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5); // Puedes ajustar la cantidad de productos por página

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/productos');
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  const calculateTotal = useCallback(() => {
    const newTotal = cart.reduce((sum, product) => sum + (product.precio || 0), 0);
    console.log("Nuevo total calculado:", newTotal);
    setTotal(newTotal);
  }, [cart]);

  useEffect(() => {
    calculateTotal();
  }, [cart, calculateTotal]);

  const addToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const handleOrder = async () => {
    try {
      if (!paymentMethod) {
        alert("Por favor, seleccione un método de pago.");
        return;
      }

      const productos = cart.map(product => ({
        producto: product._id,
        cantidad: 1 // Puedes agregar lógica para manejar cantidades
      }));

      if (!userId || userId.length !== 24) {
        throw new Error("ID de usuario no válido");
      }

      const response = await axios.post(`http://localhost:2000/api/usuarios/${userId}/comprar`, {
        productos,
        total,
        metodoPago: paymentMethod
      });

      console.log("Pedido realizado:", response.data);
      setCart([]);
      setTotal(0);
      setPaymentMethod('');
    } catch (error) {
      console.error("Error al realizar el pedido:", error);
    }
  };

  // Obtener los productos de la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="cart">
        <h2>Carrito</h2>
        <ul>
          {cart.map((product, index) => (
            <li key={index}>
              {product.nombre} - ${product.precio ? product.precio.toFixed(2) : '0.00'}
              <button onClick={() => removeFromCart(index)}>Eliminar</button>
            </li>
          ))}
        </ul>
        <div className="total">
          <h3>Total: ${total.toFixed(2)}</h3>
        </div>
        <div className="payment-method">
          <h3>Seleccione Método de Pago:</h3>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="">Seleccione</option>
            <option value="efectivo">Efectivo</option>
            <option value="tarjeta">Tarjeta</option>
          </select>
        </div>
        {cart.length > 0 && (
          <button onClick={handleOrder}>Realizar Pedido</button>
        )}
      </div>
      <div className="product-container">
        {currentProducts.map((product) => (
          <div key={product._id} className="product-item" onClick={() => addToCart(product)}>
            <img src={product.imagen} alt={product.nombre} className="product-image" />
            <h2>{product.nombre}</h2>
            <p>${product.precio ? product.precio.toFixed(2) : '0.00'}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        {pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number)} className={`page-number ${number === currentPage ? 'active' : ''}`}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Cafeteramenu;

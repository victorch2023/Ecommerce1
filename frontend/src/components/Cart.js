import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  getCart, 
  removeFromCart, 
  updateCartItemQuantity, 
  clearCart,
  getCartTotal,
  isCartEmpty
} from '../services/cartService';
import { ordersAPI, authAPI } from '../services/api';

export default function Cart(){
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar carrito inicial
    loadCart();

    // Escuchar cambios en el carrito
    const handleCartUpdate = () => {
      loadCart();
    };
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  function loadCart() {
    const cart = getCart();
    setCartItems(cart);
  }

  function handleRemoveItem(productId) {
    removeFromCart(productId);
    loadCart();
  }

  function handleQuantityChange(productId, newQuantity) {
    const quantity = parseInt(newQuantity) || 1;
    updateCartItemQuantity(productId, quantity);
    loadCart();
  }

  async function handleCheckout() {
    if (isCartEmpty()) {
      setError('El carrito está vacío');
      return;
    }

    // Verificar autenticación
    if (!authAPI.isAuthenticated()) {
      setError('Debes iniciar sesión para realizar una compra');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const items = cartItems.map(item => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }));

      const total = getCartTotal();

      // Crear orden
      const order = await ordersAPI.create(items, total);
      
      // Limpiar carrito
      clearCart();
      
      // Redirigir a página de éxito (o mostrar mensaje)
      alert(`¡Orden creada exitosamente! ID: ${order.id}\nTotal: S/ ${total.toFixed(2)}`);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Error al procesar la orden');
      console.error('Error en checkout:', err);
    } finally {
      setLoading(false);
    }
  }

  const total = getCartTotal();
  const isEmpty = isCartEmpty();

  return (
    <div className="container">
      <div className="cart-container">
        <h2>Carrito de Compras</h2>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {isEmpty ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: 'var(--text-secondary)'
          }}>
            <p style={{fontSize: '1.125rem', marginBottom: '1rem'}}>
              Tu carrito está vacío
            </p>
            <p style={{marginBottom: '2rem'}}>
              Agrega productos desde la página principal
            </p>
            <Link to="/" className="btn btn-primary">
              Ver Productos
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img 
                      src={item.image || 'https://via.placeholder.com/150?text=Producto'} 
                      alt={item.name}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150?text=Producto';
                      }}
                    />
                  </div>
                  
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p className="cart-item-price">S/ {item.price.toFixed(2)} c/u</p>
                    {item.stock !== undefined && (
                      <p className="cart-item-stock">
                        {item.stock > 0 
                          ? `Stock disponible: ${item.stock}` 
                          : 'Agotado'}
                      </p>
                    )}
                  </div>

                  <div className="cart-item-quantity">
                    <label>Cantidad:</label>
                    <input
                      type="number"
                      min="1"
                      max={item.stock || 999}
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      style={{
                        width: '80px',
                        padding: '0.5rem',
                        border: '2px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'center'
                      }}
                    />
                  </div>

                  <div className="cart-item-total">
                    <p className="cart-item-subtotal">
                      S/ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="cart-item-actions">
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="btn btn-secondary"
                      style={{padding: '0.5rem 1rem', fontSize: '0.875rem'}}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="cart-summary-row">
                <span>Subtotal:</span>
                <span>S/ {total.toFixed(2)}</span>
              </div>
              <div className="cart-summary-row">
                <span>Envío:</span>
                <span>Gratis</span>
              </div>
              <div className="cart-summary-row cart-summary-total">
                <span>Total:</span>
                <span>S/ {total.toFixed(2)}</span>
              </div>
            </div>

            <div className="cart-actions">
              <Link to="/" className="btn btn-secondary">
                Seguir Comprando
              </Link>
              <button
                onClick={handleCheckout}
                className="btn btn-primary"
                disabled={loading || isEmpty}
                style={{fontSize: '1.125rem', padding: '1rem 2rem'}}
              >
                {loading ? 'Procesando...' : 'Finalizar Compra'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productsAPI } from '../services/api';
import { addToCart, getCartItem } from '../services/cartService';

export default function Product(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [cartItem, setCartItem] = useState(null);

  useEffect(()=> {
    async function load(){
      try {
        setLoading(true);
        const data = await productsAPI.getById(id);
        setProduct(data);
        
        // Verificar si el producto ya está en el carrito
        const existingItem = getCartItem(data.id);
        if (existingItem) {
          setCartItem(existingItem);
          setQuantity(existingItem.quantity);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error al cargar producto:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  },[id]);

  function handleAddToCart() {
    if (!product) return;

    const qty = parseInt(quantity) || 1;
    if (qty <= 0) {
      alert('La cantidad debe ser mayor a 0');
      return;
    }

    if (product.stock !== undefined && qty > product.stock) {
      alert(`Solo hay ${product.stock} unidades disponibles`);
      return;
    }

    addToCart(product, qty);
    setAddedToCart(true);
    setCartItem(getCartItem(product.id));
    
    // Mostrar mensaje de confirmación
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  }

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <p>Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">
          <strong>Error:</strong> {error}
        </div>
        <Link to="/" className="btn btn-primary mt-3">Volver al inicio</Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container">
        <div className="error">
          Producto no encontrado
        </div>
        <Link to="/" className="btn btn-primary mt-3">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <Link to="/" style={{color: 'var(--primary-color)', marginBottom: '1rem', display: 'inline-block'}}>
        ← Volver a productos
      </Link>
      
      <div className="product-detail">
        <div className="product-detail-content">
          <div>
            <img 
              src={product.image || 'https://via.placeholder.com/500x500?text=Producto'} 
              alt={product.name}
              className="product-detail-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/500x500?text=Producto';
              }}
            />
          </div>
          
          <div className="product-detail-info">
            <h2>{product.name}</h2>
            <div className="product-detail-price">S/ {product.price.toFixed(2)}</div>
            
            {product.description && (
              <p className="product-detail-description">{product.description}</p>
            )}
            
            {product.stock !== undefined && (
              <div className="product-detail-stock">
                {product.stock > 0 
                  ? `✓ En stock - ${product.stock} disponibles` 
                  : '✗ Agotado'}
              </div>
            )}
            
            <div style={{marginTop: '2rem'}}>
              {cartItem && (
                <div className="success" style={{marginBottom: '1rem'}}>
                  Este producto ya está en tu carrito ({cartItem.quantity} unidades)
                </div>
              )}
              
              {addedToCart && (
                <div className="success" style={{marginBottom: '1rem'}}>
                  ¡Producto agregado al carrito!
                </div>
              )}

              <div style={{display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem'}}>
                <label htmlFor="quantity" style={{fontWeight: 500}}>Cantidad:</label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  max={product.stock || 999}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  style={{
                    width: '100px',
                    padding: '0.75rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'center',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div style={{display: 'flex', gap: '1rem'}}>
                <button 
                  className="btn btn-primary"
                  style={{flex: 1, fontSize: '1.125rem', padding: '1rem'}}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || loading}
                >
                  {addedToCart ? '✓ Agregado' : (product.stock > 0 ? 'Agregar al Carrito' : 'Producto Agotado')}
                </button>
                
                {cartItem && (
                  <button
                    className="btn btn-secondary"
                    style={{fontSize: '1.125rem', padding: '1rem'}}
                    onClick={() => navigate('/cart')}
                  >
                    Ver Carrito
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react';
import { productsAPI } from '../services/api';
import { Link } from 'react-router-dom';

export default function Home(){
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=> {
    async function load(){
      try {
        setLoading(true);
        const data = await productsAPI.getAll();
        setProducts(data);
      } catch (err) {
        setError(err.message);
        console.error('Error al cargar productos:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  },[]);

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <p>Cargando productos...</p>
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
      </div>
    );
  }

  return (
    <div className="container">
      <div className="text-center mb-4">
        <h1>Nuestros Productos</h1>
        <p style={{color: 'var(--text-secondary)', fontSize: '1.125rem'}}>
          Descubre nuestra selección de productos de calidad
        </p>
      </div>
      
      {products.length === 0 ? (
        <div className="text-center" style={{padding: '3rem'}}>
          <p style={{color: 'var(--text-secondary)', fontSize: '1.125rem'}}>
            No hay productos disponibles en este momento
          </p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <Link 
              key={product.id} 
              to={'/product/' + product.id}
              className="product-card"
            >
              <img 
                src={product.image || 'https://via.placeholder.com/300x300?text=Producto'} 
                alt={product.name}
                className="product-card-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x300?text=Producto';
                }}
              />
              <div className="product-card-content">
                <h3 className="product-card-title">{product.name}</h3>
                <div className="product-card-price">S/ {product.price.toFixed(2)}</div>
                {product.description && (
                  <p className="product-card-description">{product.description}</p>
                )}
                {product.stock !== undefined && (
                  <p className="product-card-stock">
                    {product.stock > 0 
                      ? `✓ En stock (${product.stock} disponibles)` 
                      : '✗ Agotado'}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

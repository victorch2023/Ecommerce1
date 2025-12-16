import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ClearStorage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Limpiar localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('ecommerce_cart');
    
    console.log('✅ localStorage limpiado');
    
    // Redirigir a la página principal después de un breve delay
    setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 500);
  }, [navigate]);

  return (
    <div className="container">
      <div style={{textAlign: 'center', padding: '3rem'}}>
        <h2>Limpiando datos...</h2>
        <p>Redirigiendo a la página principal...</p>
      </div>
    </div>
  );
}



import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from '../components/Home';
import Product from '../components/Product';
import Cart from '../components/Cart';
import Login from '../components/Login';
import Dashboard from '../components/Admin/Dashboard';
import AdminProducts from '../components/Admin/AdminProducts';
import AdminOrders from '../components/Admin/AdminOrders';
import AdminUsers from '../components/Admin/AdminUsers';
import AdminGuard from '../components/Admin/AdminGuard';
import ClearStorage from '../components/ClearStorage';
import ForceAdminRefresh from '../components/ForceAdminRefresh';
import { authAPI } from '../services/api';
import { getCartItemCount } from '../services/cartService';
import './App.css';

export default function App(){
  const [user, setUser] = React.useState(null);
  const [cartItemCount, setCartItemCount] = React.useState(0);

  React.useEffect(() => {
    // Verificar si hay un usuario logueado
    function loadUser() {
      try {
        const currentUser = authAPI.getCurrentUser();
        if (currentUser) {
          // Si el usuario no tiene role, intentar obtenerlo del perfil (sin bloquear)
          if (!currentUser.role) {
            authAPI.getProfile().then(profile => {
              if (profile && profile.role) {
                const updatedUser = { ...currentUser, role: profile.role };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
              } else {
                setUser(currentUser);
              }
            }).catch((error) => {
              // Si falla, usar el usuario del localStorage sin role
              console.warn('No se pudo obtener el perfil del servidor:', error.message);
              setUser(currentUser);
            });
          } else {
            setUser(currentUser);
          }
        }
      } catch (error) {
        console.error('Error al cargar usuario:', error);
        // No bloquear la aplicación si hay un error
      }
    }

    loadUser();

    // Cargar cantidad de items en carrito
    updateCartCount();

    // Escuchar cambios en el carrito
    const handleCartUpdate = () => {
      updateCartCount();
    };
    window.addEventListener('cartUpdated', handleCartUpdate);

    // Escuchar cuando el usuario inicia sesión
    const handleLogin = () => {
      setTimeout(() => {
        loadUser();
      }, 500);
    };
    window.addEventListener('userLoggedIn', handleLogin);

    // Verificar cada 2 segundos si el usuario cambió (para debug)
    const interval = setInterval(() => {
      const storedUser = authAPI.getCurrentUser();
      if (storedUser && (!user || storedUser.role !== user.role)) {
        setUser(storedUser);
      }
    }, 2000);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('userLoggedIn', handleLogin);
      clearInterval(interval);
    };
  }, [user]);

  function updateCartCount() {
    setCartItemCount(getCartItemCount());
  }

  const handleLogout = () => {
    authAPI.logout();
    setUser(null);
    window.location.href = '/';
  };

  return (
    <BrowserRouter>
      <nav>
        <Link to='/' className="logo">🛒 Tienda Local</Link>
        <ul className="nav-links">
          <li><Link to='/'>Inicio</Link></li>
          <li>
            <Link to='/cart' style={{position: 'relative'}}>
              Carrito
              {cartItemCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: 'var(--accent-color)',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}>
                  {cartItemCount}
                </span>
              )}
            </Link>
          </li>
          {user ? (
            <>
              <li><span style={{color: 'var(--text-secondary)'}}>Hola, {user.name || user.email}</span></li>
              <li>
                <Link 
                  to='/admin' 
                  className="btn btn-primary"
                  style={{
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    color: 'white',
                    fontWeight: 'bold',
                    padding: '0.75rem 1.5rem',
                    textDecoration: 'none',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-lg)',
                    fontSize: '1rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = 'var(--shadow-xl)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = 'var(--shadow-lg)';
                  }}
                >
                  👑 PANEL ADMIN
                </Link>
              </li>
              <li><button onClick={handleLogout} className="btn btn-secondary" style={{border: 'none', cursor: 'pointer'}}>Cerrar Sesión</button></li>
            </>
          ) : (
            <li><Link to='/login'>Iniciar Sesión</Link></li>
          )}
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<AdminGuard><Dashboard /></AdminGuard>} />
        <Route path='/admin/products' element={<AdminGuard><AdminProducts /></AdminGuard>} />
        <Route path='/admin/orders' element={<AdminGuard><AdminOrders /></AdminGuard>} />
        <Route path='/admin/users' element={<AdminGuard><AdminUsers /></AdminGuard>} />
        <Route path='/clear-storage' element={<ClearStorage />} />
        <Route path='/refresh-admin' element={<ForceAdminRefresh />} />
      </Routes>
    </BrowserRouter>
  )
}

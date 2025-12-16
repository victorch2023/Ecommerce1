import React, { useEffect, useState } from 'react';
import { adminAPI } from '../../services/adminAPI';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      setLoading(true);
      const data = await adminAPI.getStats();
      setStats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Cargando estadísticas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">{error}</div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="container">
      <h1>Panel de Administración</h1>

      <div className="admin-stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <h3>{stats.totalProducts}</h3>
            <p>Productos</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🛒</div>
          <div className="stat-content">
            <h3>{stats.totalOrders}</h3>
            <p>Órdenes</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{stats.totalUsers}</h3>
            <p>Usuarios</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>S/ {stats.totalSales.toFixed(2)}</h3>
            <p>Ventas Totales</p>
          </div>
        </div>
      </div>

      <div className="admin-sections">
        <div className="admin-section">
          <h2>Órdenes por Estado</h2>
          <div className="status-list">
            {stats.ordersByStatus.map(item => (
              <div key={item.status} className="status-item">
                <span className="status-badge">{item.status}</span>
                <span className="status-count">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-section">
          <h2>Órdenes Recientes</h2>
          <div className="recent-orders">
            {stats.recentOrders.slice(0, 5).map(order => (
              <div key={order.id} className="order-item">
                <div>
                  <strong>Orden #{order.id}</strong>
                  <p>S/ {order.total.toFixed(2)} - {order.status}</p>
                </div>
                <Link to={`/admin/orders`} className="btn btn-secondary btn-sm">
                  Ver
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="admin-actions">
        <Link to="/admin/products" className="btn btn-primary">
          Gestionar Productos
        </Link>
        <Link to="/admin/orders" className="btn btn-primary">
          Gestionar Órdenes
        </Link>
        <Link to="/admin/users" className="btn btn-primary">
          Gestionar Usuarios
        </Link>
      </div>
    </div>
  );
}



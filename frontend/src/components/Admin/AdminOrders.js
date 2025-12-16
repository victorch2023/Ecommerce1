import React, { useEffect, useState } from 'react';
import { adminAPI } from '../../services/adminAPI';
import { Link } from 'react-router-dom';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    loadOrders();
  }, [statusFilter]);

  async function loadOrders() {
    try {
      setLoading(true);
      const data = await adminAPI.getAllOrders(statusFilter);
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(orderId, newStatus) {
    try {
      await adminAPI.updateOrderStatus(orderId, newStatus);
      await loadOrders();
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) {
    return <div className="container"><div className="loading">Cargando órdenes...</div></div>;
  }

  if (error) {
    return <div className="container"><div className="error">{error}</div></div>;
  }

  const statusOptions = ['', 'pending', 'processing', 'shipped', 'completed', 'cancelled'];

  return (
    <div className="container">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <h1>Gestión de Órdenes</h1>
        <Link to="/admin" className="btn btn-secondary">← Volver al Dashboard</Link>
      </div>

      <div style={{marginBottom: '2rem'}}>
        <label style={{marginRight: '1rem'}}>Filtrar por estado:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: '2px solid var(--border-color)'}}
        >
          <option value="">Todas</option>
          {statusOptions.slice(1).map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Items</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.userName || order.email || 'N/A'}</td>
                <td>
                  <details>
                    <summary>{order.items.length} item(s)</summary>
                    <ul style={{marginTop: '0.5rem', paddingLeft: '1.5rem'}}>
                      {order.items.map((item, idx) => (
                        <li key={idx}>{item.name} x{item.quantity}</li>
                      ))}
                    </ul>
                  </details>
                </td>
                <td>S/ {order.total.toFixed(2)}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '2px solid var(--border-color)'
                    }}
                  >
                    <option value="pending">pending</option>
                    <option value="processing">processing</option>
                    <option value="shipped">shipped</option>
                    <option value="completed">completed</option>
                    <option value="cancelled">cancelled</option>
                  </select>
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => alert(`Detalles de orden #${order.id}`)}
                    className="btn btn-secondary btn-sm"
                  >
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <p style={{textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)'}}>
            No hay órdenes
          </p>
        )}
      </div>
    </div>
  );
}



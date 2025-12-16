/**
 * API de administración
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

async function adminRequest(endpoint, options = {}) {
  // ⚠️ PERMISOS DESACTIVADOS: El token es opcional
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Agregar token solo si existe (opcional)
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    // No verificar errores 403 (acceso denegado) ya que permisos están desactivados
    const error = await response.json().catch(() => ({ error: 'Error desconocido' }));
    throw new Error(error.error || `Error ${response.status}`);
  }

  return response.json();
}

export const adminAPI = {
  // Dashboard
  getStats: () => adminRequest('/admin/dashboard/stats'),

  // Productos
  getProducts: () => adminRequest('/admin/products'),
  createProduct: (data) => adminRequest('/admin/products', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateProduct: (id, data) => adminRequest(`/admin/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  deleteProduct: (id) => adminRequest(`/admin/products/${id}`, {
    method: 'DELETE',
  }),

  // Órdenes
  getAllOrders: (status) => {
    const query = status ? `?status=${status}` : '';
    return adminRequest(`/admin/orders${query}`);
  },
  updateOrderStatus: (id, status) => adminRequest(`/admin/orders/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  }),

  // Usuarios
  getAllUsers: () => adminRequest('/admin/users'),
  updateUserRole: (id, role) => adminRequest(`/admin/users/${id}/role`, {
    method: 'PUT',
    body: JSON.stringify({ role }),
  }),
};



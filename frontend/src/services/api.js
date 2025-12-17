/**
 * Servicio de API para comunicación con el backend local
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://ecommerce1-backend.onrender.com/api'  // Backend en Render (producción)
    : 'http://localhost:4000/api');  // Backend local (desarrollo)

// Helper para hacer requests con autenticación
async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Error desconocido' }));
    throw new Error(error.error || `Error ${response.status}`);
  }

  return response.json();
}

// API de Productos
export const productsAPI = {
  getAll: () => apiRequest('/products'),
  getById: (id) => apiRequest(`/products/${id}`),
  create: (data) => apiRequest('/products', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiRequest(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiRequest(`/products/${id}`, { method: 'DELETE' }),
};

// API de Autenticación
export const authAPI = {
  register: async (email, password, name) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  },
  login: async (email, password) => {
    const result = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    // Guardar token en localStorage
    if (result.token) {
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
    }
    return result;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  getProfile: async () => {
    try {
      const result = await apiRequest('/auth/profile');
      // Actualizar localStorage con el perfil actualizado
      if (result) {
        const currentUser = authAPI.getCurrentUser();
        if (currentUser) {
          const updatedUser = { ...currentUser, ...result };
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      }
      return result;
    } catch (error) {
      throw error;
    }
  },
  refreshToken: async () => {
    try {
      const result = await apiRequest('/auth/refresh-token', {
        method: 'POST',
      });
      // Actualizar token y usuario en localStorage
      if (result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
      }
      return result;
    } catch (error) {
      throw error;
    }
  },
  isAuthenticated: () => !!localStorage.getItem('token'),
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
};

// API de Órdenes
export const ordersAPI = {
  create: (items, total) => apiRequest('/orders', {
    method: 'POST',
    body: JSON.stringify({ items, total }),
  }),
  getById: (id) => apiRequest(`/orders/${id}`),
  getMyOrders: () => apiRequest('/orders/my-orders'),
};


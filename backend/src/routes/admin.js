import express from 'express';
import { authenticateToken, requireAdmin } from '../services/auth.js';
import { 
  getDashboardStats, 
  getAllOrders, 
  updateOrderStatus,
  getAllUsers,
  updateUserRole
} from '../controllers/adminController.js';
import { 
  listProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../controllers/productsController.js';

const router = express.Router();

// ⚠️ PERMISOS DESACTIVADOS: Cualquier usuario puede acceder sin autenticación
// router.use(authenticateToken);
// router.use(requireAdmin);

// Middleware: Permitir acceso a todos sin verificación
router.use((req, res, next) => {
  console.log('⚠️ Acceso al panel admin permitido (permisos desactivados)');
  // Crear un req.user básico si no existe (para compatibilidad con controladores)
  if (!req.user) {
    req.user = { id: null, email: 'guest', role: 'admin' };
  }
  next();
});

// Dashboard
router.get('/dashboard/stats', getDashboardStats);

// Productos (CRUD completo)
router.get('/products', listProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Órdenes
router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);

// Usuarios
router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);

export default router;



import { getFirestore, COLLECTIONS, convertFirestoreDoc } from '../services/firestore.js';

const db = getFirestore();

/**
 * Obtener estadísticas del dashboard
 */
export async function getDashboardStats(req, res) {
  try {
    // Total de productos
    const productsSnapshot = await db.collection(COLLECTIONS.PRODUCTS).get();
    const totalProducts = productsSnapshot.size;

    // Total de órdenes
    const ordersSnapshot = await db.collection(COLLECTIONS.ORDERS).get();
    const totalOrders = ordersSnapshot.size;

    // Total de usuarios
    const usersSnapshot = await db.collection(COLLECTIONS.USERS).get();
    const totalUsers = usersSnapshot.size;

    // Ventas totales
    let totalSales = 0;
    ordersSnapshot.forEach(doc => {
      const order = doc.data();
      totalSales += order.total || 0;
    });

    // Órdenes por estado
    const ordersByStatus = {};
    ordersSnapshot.forEach(doc => {
      const order = doc.data();
      const status = order.status || 'pending';
      ordersByStatus[status] = (ordersByStatus[status] || 0) + 1;
    });

    // Órdenes recientes (últimas 10)
    const recentOrdersSnapshot = await db.collection(COLLECTIONS.ORDERS)
      .orderBy('createdAt', 'desc')
      .limit(10)
      .get();
    
    const recentOrders = [];
    recentOrdersSnapshot.forEach(doc => {
      recentOrders.push(convertFirestoreDoc(doc));
    });

    // Ventas del último mes
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const monthlyOrdersSnapshot = await db.collection(COLLECTIONS.ORDERS)
      .where('createdAt', '>=', thirtyDaysAgo)
      .get();
    
    const monthlySales = {};
    monthlyOrdersSnapshot.forEach(doc => {
      const order = doc.data();
      const date = order.createdAt?.toDate ? order.createdAt.toDate().toISOString().split('T')[0] : null;
      if (date) {
        monthlySales[date] = (monthlySales[date] || 0) + (order.total || 0);
      }
    });

    const monthlySalesArray = Object.entries(monthlySales)
      .map(([date, total]) => ({ date, total }))
      .sort((a, b) => b.date.localeCompare(a.date));

    res.json({
      totalProducts,
      totalOrders,
      totalUsers,
      totalSales: parseFloat(totalSales.toFixed(2)),
      ordersByStatus: Object.entries(ordersByStatus).map(([status, count]) => ({ status, count })),
      recentOrders,
      monthlySales: monthlySalesArray
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

/**
 * Obtener todas las órdenes (admin)
 */
export async function getAllOrders(req, res) {
  try {
    const { status, limit = 50 } = req.query;
    
    let query = db.collection(COLLECTIONS.ORDERS).orderBy('createdAt', 'desc');
    
    if (status) {
      query = query.where('status', '==', status);
    }
    
    query = query.limit(parseInt(limit));
    
    const snapshot = await query.get();
    
    const orders = [];
    const userIds = new Set();
    
    snapshot.forEach(doc => {
      const order = convertFirestoreDoc(doc);
      orders.push(order);
      if (order.userId) {
        userIds.add(order.userId);
      }
    });

    // Obtener información de usuarios
    const usersMap = {};
    if (userIds.size > 0) {
      const usersPromises = Array.from(userIds).map(async (userId) => {
        const userDoc = await db.collection(COLLECTIONS.USERS).doc(userId).get();
        if (userDoc.exists) {
          const user = convertFirestoreDoc(userDoc);
          usersMap[userId] = user;
        }
      });
      await Promise.all(usersPromises);
    }

    // Agregar información de usuario a cada orden
    const ordersWithUsers = orders.map(order => ({
      ...order,
      email: usersMap[order.userId]?.email || null,
      userName: usersMap[order.userId]?.name || null
    }));

    res.json(ordersWithUsers);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

/**
 * Actualizar estado de una orden
 */
export async function updateOrderStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'processing', 'shipped', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Estado inválido' });
    }

    const orderDoc = await db.collection(COLLECTIONS.ORDERS).doc(id).get();
    if (!orderDoc.exists) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    await db.collection(COLLECTIONS.ORDERS).doc(id).update({
      status,
      updatedAt: new Date()
    });

    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

/**
 * Obtener todos los usuarios (admin)
 */
export async function getAllUsers(req, res) {
  try {
    const snapshot = await db.collection(COLLECTIONS.USERS)
      .orderBy('createdAt', 'desc')
      .get();

    const users = [];
    snapshot.forEach(doc => {
      const user = convertFirestoreDoc(doc);
      // No devolver la contraseña
      delete user.password;
      users.push(user);
    });

    res.json(users);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

/**
 * Actualizar rol de usuario
 */
export async function updateUserRole(req, res) {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const validRoles = ['user', 'admin'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: 'Rol inválido' });
    }

    const userDoc = await db.collection(COLLECTIONS.USERS).doc(id).get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await db.collection(COLLECTIONS.USERS).doc(id).update({
      role,
      updatedAt: new Date()
    });

    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

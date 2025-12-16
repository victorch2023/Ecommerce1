import { getFirestore, COLLECTIONS, convertFirestoreDoc } from '../services/firestore.js';
import { verifyToken } from '../services/auth.js';

const db = getFirestore();

export async function createOrder(req, res) {
  try {
    // Verificar autenticación
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Autenticación requerida' });
    }

    const decoded = verifyToken(token);
    const userId = decoded.id;

    const { items, total } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Items son requeridos' });
    }

    if (!total || total <= 0) {
      return res.status(400).json({ error: 'Total inválido' });
    }

    const orderData = {
      userId,
      items,
      total: parseFloat(total),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await db.collection(COLLECTIONS.ORDERS).add(orderData);

    res.json({ id: docRef.id });
  } catch (e) {
    if (e.message === 'Token inválido') {
      return res.status(403).json({ error: 'Token inválido' });
    }
    res.status(500).json({ error: e.message });
  }
}

export async function getOrder(req, res) {
  try {
    // Verificar autenticación
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Autenticación requerida' });
    }

    const decoded = verifyToken(token);
    const userId = decoded.id;

    const orderDoc = await db.collection(COLLECTIONS.ORDERS).doc(req.params.id).get();
    
    if (!orderDoc.exists) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    const order = convertFirestoreDoc(orderDoc);
    
    // Verificar que la orden pertenece al usuario
    if (order.userId !== userId) {
      return res.status(403).json({ error: 'No tienes permiso para ver esta orden' });
    }
    
    res.json(order);
  } catch (e) {
    if (e.message === 'Token inválido') {
      return res.status(403).json({ error: 'Token inválido' });
    }
    res.status(500).json({ error: e.message });
  }
}

export async function getUserOrders(req, res) {
  try {
    // Verificar autenticación
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Autenticación requerida' });
    }

    const decoded = verifyToken(token);
    const userId = decoded.id;

    const ordersRef = db.collection(COLLECTIONS.ORDERS);
    const snapshot = await ordersRef
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();

    const orders = [];
    snapshot.forEach(doc => {
      orders.push(convertFirestoreDoc(doc));
    });

    res.json(orders);
  } catch (e) {
    if (e.message === 'Token inválido') {
      return res.status(403).json({ error: 'Token inválido' });
    }
    res.status(500).json({ error: e.message });
  }
}

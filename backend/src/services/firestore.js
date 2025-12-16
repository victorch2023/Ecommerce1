import { initFirebase, db as firestoreDb } from './firebaseAdmin.js';

// Inicializar Firebase si no está inicializado
if (!firestoreDb) {
  initFirebase();
}

// Obtener referencia a Firestore
let db = null;

export function getFirestore() {
  if (!firestoreDb) {
    throw new Error('Firestore no está inicializado. Verifica que serviceAccountKey.json exista.');
  }
  return firestoreDb;
}

// Helper para convertir timestamps de Firestore
export function convertTimestamp(timestamp) {
  if (!timestamp) return null;
  if (timestamp.toDate) {
    return timestamp.toDate().toISOString();
  }
  if (timestamp instanceof Date) {
    return timestamp.toISOString();
  }
  return timestamp;
}

// Helper para convertir documentos de Firestore a objetos planos
export function convertFirestoreDoc(doc) {
  if (!doc) return null;
  
  const data = doc.data();
  if (!data) return null;
  
  return {
    id: doc.id,
    ...data,
    createdAt: convertTimestamp(data.createdAt),
    updatedAt: convertTimestamp(data.updatedAt)
  };
}

// Colecciones
export const COLLECTIONS = {
  USERS: 'users',
  PRODUCTS: 'products',
  ORDERS: 'orders',
  CARTS: 'carts'
};

// Inicializar db
db = getFirestore();

export default db;


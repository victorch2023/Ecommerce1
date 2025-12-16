import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';
import { initFirebase } from '../services/firebaseAdmin.js';
import { getFirestore, COLLECTIONS } from '../services/firestore.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializar Firebase
initFirebase();
const db = getFirestore();

// Ruta a la base de datos SQLite
const SQLITE_DB_PATH = path.join(__dirname, '..', '..', 'data', 'ecommerce.db');

async function migrateUsers() {
  console.log('📦 Migrando usuarios...');
  
  if (!existsSync(SQLITE_DB_PATH)) {
    console.log('   ⚠️  Base de datos SQLite no encontrada, saltando usuarios');
    return;
  }

  const sqliteDb = new Database(SQLITE_DB_PATH);
  const users = sqliteDb.prepare('SELECT * FROM users').all();
  
  if (users.length === 0) {
    console.log('   ℹ️  No hay usuarios para migrar');
    sqliteDb.close();
    return;
  }

  const batch = db.batch();
  const usersRef = db.collection(COLLECTIONS.USERS);
  let count = 0;

  for (const user of users) {
    // Verificar si el usuario ya existe (por email)
    const existingSnapshot = await usersRef.where('email', '==', user.email).limit(1).get();
    
    if (!existingSnapshot.empty) {
      console.log(`   ⏭️  Usuario ${user.email} ya existe, saltando...`);
      continue;
    }

    const docRef = usersRef.doc();
    batch.set(docRef, {
      email: user.email,
      password: user.password, // Mantener el hash de la contraseña
      name: user.name || null,
      role: user.role || 'user',
      createdAt: user.createdAt ? new Date(user.createdAt) : new Date(),
      updatedAt: user.updatedAt ? new Date(user.updatedAt) : new Date()
    });
    count++;
  }

  if (count > 0) {
    await batch.commit();
    console.log(`   ✅ ${count} usuarios migrados exitosamente`);
  } else {
    console.log('   ℹ️  No se migraron usuarios nuevos');
  }

  sqliteDb.close();
}

async function migrateProducts() {
  console.log('📦 Migrando productos...');
  
  if (!existsSync(SQLITE_DB_PATH)) {
    console.log('   ⚠️  Base de datos SQLite no encontrada, saltando productos');
    return;
  }

  const sqliteDb = new Database(SQLITE_DB_PATH);
  const products = sqliteDb.prepare('SELECT * FROM products').all();
  
  if (products.length === 0) {
    console.log('   ℹ️  No hay productos para migrar');
    sqliteDb.close();
    return;
  }

  const batch = db.batch();
  const productsRef = db.collection(COLLECTIONS.PRODUCTS);
  let count = 0;

  // Procesar en lotes de 500 (límite de Firestore)
  for (let i = 0; i < products.length; i += 500) {
    const batch = db.batch();
    const batchProducts = products.slice(i, i + 500);

    for (const product of batchProducts) {
      const docRef = productsRef.doc();
      batch.set(docRef, {
        name: product.name,
        price: parseFloat(product.price),
        description: product.description || null,
        stock: product.stock || 0,
        image: product.image || null,
        createdAt: product.createdAt ? new Date(product.createdAt) : new Date(),
        updatedAt: product.updatedAt ? new Date(product.updatedAt) : new Date()
      });
      count++;
    }

    await batch.commit();
    console.log(`   📊 Procesados ${Math.min(i + 500, products.length)}/${products.length} productos...`);
  }

  console.log(`   ✅ ${count} productos migrados exitosamente`);
  sqliteDb.close();
}

async function migrateOrders() {
  console.log('📦 Migrando órdenes...');
  
  if (!existsSync(SQLITE_DB_PATH)) {
    console.log('   ⚠️  Base de datos SQLite no encontrada, saltando órdenes');
    return;
  }

  const sqliteDb = new Database(SQLITE_DB_PATH);
  const orders = sqliteDb.prepare('SELECT * FROM orders').all();
  
  if (orders.length === 0) {
    console.log('   ℹ️  No hay órdenes para migrar');
    sqliteDb.close();
    return;
  }

  // Necesitamos mapear los IDs de usuarios de SQLite a Firestore
  // Primero, obtener todos los usuarios de Firestore para mapear emails a IDs
  const usersSnapshot = await db.collection(COLLECTIONS.USERS).get();
  const emailToFirestoreId = {};
  usersSnapshot.forEach(doc => {
    const user = doc.data();
    emailToFirestoreId[user.email] = doc.id;
  });

  // Obtener usuarios de SQLite para mapear
  const sqliteUsers = sqliteDb.prepare('SELECT id, email FROM users').all();
  const sqliteIdToFirestoreId = {};
  
  for (const sqliteUser of sqliteUsers) {
    const firestoreId = emailToFirestoreId[sqliteUser.email];
    if (firestoreId) {
      sqliteIdToFirestoreId[sqliteUser.id] = firestoreId;
    }
  }

  let count = 0;
  let skipped = 0;

  // Procesar en lotes de 500
  for (let i = 0; i < orders.length; i += 500) {
    const batch = db.batch();
    const batchOrders = orders.slice(i, i + 500);

    for (const order of batchOrders) {
      const firestoreUserId = sqliteIdToFirestoreId[order.userId];
      
      if (!firestoreUserId) {
        console.log(`   ⚠️  Orden ${order.id}: Usuario no encontrado en Firestore, saltando...`);
        skipped++;
        continue;
      }

      // Parsear items si es string JSON
      let items = order.items;
      if (typeof items === 'string') {
        try {
          items = JSON.parse(items);
        } catch (e) {
          console.log(`   ⚠️  Orden ${order.id}: Error al parsear items, usando array vacío`);
          items = [];
        }
      }

      const docRef = db.collection(COLLECTIONS.ORDERS).doc();
      batch.set(docRef, {
        userId: firestoreUserId,
        items: items,
        total: parseFloat(order.total),
        status: order.status || 'pending',
        createdAt: order.createdAt ? new Date(order.createdAt) : new Date(),
        updatedAt: order.updatedAt ? new Date(order.updatedAt) : new Date()
      });
      count++;
    }

    await batch.commit();
    console.log(`   📊 Procesadas ${Math.min(i + 500, orders.length)}/${orders.length} órdenes...`);
  }

  console.log(`   ✅ ${count} órdenes migradas exitosamente`);
  if (skipped > 0) {
    console.log(`   ⚠️  ${skipped} órdenes saltadas (usuarios no encontrados)`);
  }
  sqliteDb.close();
}

async function main() {
  console.log('🚀 Iniciando migración de SQLite a Firestore...\n');

  try {
    await migrateUsers();
    console.log('');
    await migrateProducts();
    console.log('');
    await migrateOrders();
    console.log('');
    console.log('✅ Migración completada exitosamente!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error durante la migración:', error);
    process.exit(1);
  }
}

main();


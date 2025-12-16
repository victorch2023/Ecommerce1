import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import productsRouter from './routes/products.js';
import ordersRouter from './routes/orders.js';
import storageRouter from './routes/storage.js';
import authRouter from './routes/auth.js';
import adminRouter from './routes/admin.js';
import { initFirebase, db as firestoreDb } from './services/firebaseAdmin.js';
import { getFirestore } from './services/firestore.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Servir archivos estáticos desde el directorio público
const publicDir = path.join(__dirname, '..', 'public');
app.use('/uploads', express.static(path.join(publicDir, 'uploads')));

// Inicializar Firebase/Firestore
initFirebase();
if (firestoreDb) {
  console.log('✅ Firestore inicializado correctamente');
} else {
  console.warn('⚠️  Firestore no está inicializado. Verifica que serviceAccountKey.json exista.');
}

app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/storage', storageRouter);
app.use('/api/admin', adminRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log('Backend listening on', PORT));

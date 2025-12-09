import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import productsRouter from './routes/products.js';
import ordersRouter from './routes/orders.js';
import { initFirebase } from './services/firebaseAdmin.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

initFirebase(); // initialize admin SDK (needs serviceAccountKey.json in backend/)

app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log('Backend listening on', PORT));

import express from 'express';
import { createOrder, getOrder, getUserOrders } from '../controllers/ordersController.js';
const router = express.Router();

router.post('/', createOrder);
router.get('/my-orders', getUserOrders);
router.get('/:id', getOrder);

export default router;

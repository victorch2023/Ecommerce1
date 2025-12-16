import express from 'express';
import { register, login, getProfile, refreshToken } from '../controllers/authController.js';
import { authenticateToken } from '../services/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateToken, getProfile);
router.post('/refresh-token', authenticateToken, refreshToken);

export default router;



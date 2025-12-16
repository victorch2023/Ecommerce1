import express from 'express';
// Usar almacenamiento local en lugar de GCS/Cloudinary
import { uploadFile, deleteFile, listFiles } from '../controllers/storageControllerLocal.js';
const router = express.Router();

// Rutas para almacenamiento local
router.post('/upload', uploadFile);
router.delete('/delete', deleteFile);
router.get('/list', listFiles);

export default router;


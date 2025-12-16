import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync, mkdirSync, readFileSync, copyFileSync } from 'fs';
import { unlink } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directorio base para almacenar archivos
const UPLOAD_DIR = path.join(__dirname, '..', '..', 'uploads');
const PUBLIC_DIR = path.join(__dirname, '..', '..', 'public', 'uploads');

// Crear directorios si no existen
[UPLOAD_DIR, PUBLIC_DIR].forEach(dir => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
});

// Configurar multer para guardar archivos localmente
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determinar subdirectorio según el tipo
    const subdir = req.body.folder || 'general';
    const destPath = path.join(UPLOAD_DIR, subdir);
    
    if (!existsSync(destPath)) {
      mkdirSync(destPath, { recursive: true });
    }
    
    cb(null, destPath);
  },
  filename: (req, file, cb) => {
    // Generar nombre único: timestamp + nombre original
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB máximo
  fileFilter: (req, file, cb) => {
    // Permitir solo imágenes por defecto
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos de imagen (jpeg, jpg, png, gif, webp)'));
    }
  }
});

/**
 * Subir archivo localmente
 */
export const uploadFile = async (req, res) => {
  try {
    const uploadMiddleware = upload.single('file');
    
    uploadMiddleware(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'No se proporcionó archivo' });
      }

      const folder = req.body.folder || 'general';
      const fileName = req.file.filename;
      const filePath = path.join(folder, fileName);
      
      // Crear enlace simbólico o copia en directorio público para servir archivos
      const publicPath = path.join(PUBLIC_DIR, folder);
      if (!existsSync(publicPath)) {
        mkdirSync(publicPath, { recursive: true });
      }
      
      // Copiar archivo al directorio público
      const publicFilePath = path.join(publicPath, fileName);
      // Multer guarda el archivo en disco, así que solo necesitamos copiarlo
      copyFileSync(req.file.path, publicFilePath);
      
      // URL pública del archivo
      const publicUrl = `/uploads/${filePath}`;
      
      res.json({ 
        url: publicUrl,
        path: filePath,
        filename: fileName
      });
    });
  } catch (error) {
    console.error('Error en uploadFile:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Eliminar archivo localmente
 */
export const deleteFile = async (req, res) => {
  try {
    const { path: filePath } = req.body;
    if (!filePath) {
      return res.status(400).json({ error: 'Path no proporcionado' });
    }

    // Eliminar del directorio de uploads
    const uploadFilePath = path.join(UPLOAD_DIR, filePath);
    if (existsSync(uploadFilePath)) {
      await unlink(uploadFilePath);
    }
    
    // Eliminar del directorio público
    const publicFilePath = path.join(PUBLIC_DIR, filePath);
    if (existsSync(publicFilePath)) {
      await unlink(publicFilePath);
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error en deleteFile:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Obtener lista de archivos (opcional)
 */
export const listFiles = async (req, res) => {
  try {
    const folder = req.query.folder || 'general';
    const folderPath = path.join(UPLOAD_DIR, folder);
    
    if (!existsSync(folderPath)) {
      return res.json({ files: [] });
    }
    
    const files = require('fs').readdirSync(folderPath).map(file => ({
      name: file,
      url: `/uploads/${folder}/${file}`,
      path: `${folder}/${file}`
    }));
    
    res.json({ files });
  } catch (error) {
    console.error('Error en listFiles:', error);
    res.status(500).json({ error: error.message });
  }
};


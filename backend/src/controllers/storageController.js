import { Storage } from '@google-cloud/storage';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar multer para manejar archivos
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB máximo
});

// Inicializar Google Cloud Storage
let gcsStorage = null;
const serviceAccountPath = path.join(__dirname, '..', '..', 'serviceAccountKey.json');

if (existsSync(serviceAccountPath)) {
  try {
    gcsStorage = new Storage({
      keyFilename: serviceAccountPath,
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID || 'ecommerce1-chowwha'
    });
    console.log('✅ Google Cloud Storage inicializado');
  } catch (error) {
    console.warn('⚠️  Error al inicializar GCS:', error.message);
  }
} else {
  console.warn('⚠️  serviceAccountKey.json no encontrado. GCS no disponible.');
}

// Configurar Cloudinary (opcional)
if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log('✅ Cloudinary configurado');
}

// Obtener bucket de GCS
function getBucket() {
  if (!gcsStorage) {
    throw new Error('Google Cloud Storage no está configurado');
  }
  const bucketName = process.env.GCS_BUCKET_NAME || `${process.env.GOOGLE_CLOUD_PROJECT_ID || 'ecommerce1-chowwha'}.appspot.com`;
  return gcsStorage.bucket(bucketName);
}

/**
 * Subir archivo a Google Cloud Storage
 */
export const uploadFile = async (req, res) => {
  try {
    if (!gcsStorage) {
      return res.status(500).json({ error: 'Google Cloud Storage no está configurado' });
    }

    const uploadMiddleware = upload.single('file');
    
    uploadMiddleware(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'No se proporcionó archivo' });
      }

      const filePath = req.body.path || `uploads/${Date.now()}_${req.file.originalname}`;
      const bucket = getBucket();
      const file = bucket.file(filePath);

      // Subir archivo
      const stream = file.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
        },
        public: true, // Hacer el archivo público
      });

      stream.on('error', (error) => {
        console.error('Error al subir archivo:', error);
        res.status(500).json({ error: 'Error al subir archivo' });
      });

      stream.on('finish', async () => {
        // Hacer el archivo público
        await file.makePublic();
        
        // Obtener URL pública
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;
        
        res.json({ 
          url: publicUrl,
          path: filePath 
        });
      });

      stream.end(req.file.buffer);
    });
  } catch (error) {
    console.error('Error en uploadFile:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Eliminar archivo de Google Cloud Storage
 */
export const deleteFile = async (req, res) => {
  try {
    if (!gcsStorage) {
      return res.status(500).json({ error: 'Google Cloud Storage no está configurado' });
    }

    const { path: filePath } = req.body;
    if (!filePath) {
      return res.status(400).json({ error: 'Path no proporcionado' });
    }

    const bucket = getBucket();
    const file = bucket.file(filePath);
    
    await file.delete();
    res.json({ success: true });
  } catch (error) {
    console.error('Error en deleteFile:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Subir archivo a Cloudinary
 */
export const uploadToCloudinary = async (req, res) => {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      return res.status(500).json({ error: 'Cloudinary no está configurado' });
    }

    const uploadMiddleware = upload.single('file');
    
    uploadMiddleware(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'No se proporcionó archivo' });
      }

      const folder = req.body.folder || 'uploads';
      
      // Convertir buffer a base64 para Cloudinary
      const base64 = req.file.buffer.toString('base64');
      const dataUri = `data:${req.file.mimetype};base64,${base64}`;

      const result = await cloudinary.uploader.upload(dataUri, {
        folder: folder,
        resource_type: 'auto',
      });

      res.json({ 
        url: result.secure_url,
        publicId: result.public_id 
      });
    });
  } catch (error) {
    console.error('Error en uploadToCloudinary:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Eliminar archivo de Cloudinary
 */
export const deleteFromCloudinary = async (req, res) => {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      return res.status(500).json({ error: 'Cloudinary no está configurado' });
    }

    const { publicId } = req.body;
    if (!publicId) {
      return res.status(400).json({ error: 'publicId no proporcionado' });
    }

    const result = await cloudinary.uploader.destroy(publicId);
    res.json({ success: true, result });
  } catch (error) {
    console.error('Error en deleteFromCloudinary:', error);
    res.status(500).json({ error: error.message });
  }
};




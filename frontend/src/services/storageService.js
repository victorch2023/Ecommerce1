/**
 * Servicio de almacenamiento usando Google Cloud Storage directamente
 * Alternativa gratuita a Firebase Storage
 * 
 * Tier gratuito de GCS:
 * - 5 GB de almacenamiento
 * - 1 GB de transferencia de salida por mes
 * - Operaciones ilimitadas (dentro de límites razonables)
 */

// Opción 1: Usar Google Cloud Storage directamente (requiere backend)
// Opción 2: Usar Cloudinary (tier gratuito: 25GB almacenamiento, 25GB transferencia)
// Opción 3: Usar Supabase Storage (tier gratuito: 1GB)

// Por ahora, implementamos una interfaz que puede usar diferentes proveedores
class StorageService {
  constructor(provider = 'gcs') {
    this.provider = provider;
  }

  /**
   * Subir una imagen de producto
   * @param {File} file - Archivo a subir
   * @param {string} productId - ID del producto
   * @returns {Promise<string>} URL pública de la imagen
   */
  async uploadProductImage(file, productId) {
    if (this.provider === 'local') {
      return this.uploadToLocal(file, `products/${productId}`);
    } else if (this.provider === 'gcs') {
      return this.uploadToGCS(file, `products/${productId}/${file.name}`);
    } else if (this.provider === 'cloudinary') {
      return this.uploadToCloudinary(file, `products/${productId}`);
    }
    throw new Error(`Provider ${this.provider} no soportado`);
  }

  /**
   * Subir imagen de perfil de usuario
   * @param {File} file - Archivo a subir
   * @param {string} userId - ID del usuario
   * @returns {Promise<string>} URL pública de la imagen
   */
  async uploadUserImage(file, userId) {
    if (this.provider === 'local') {
      return this.uploadToLocal(file, `users/${userId}`);
    } else if (this.provider === 'gcs') {
      return this.uploadToGCS(file, `users/${userId}/${file.name}`);
    } else if (this.provider === 'cloudinary') {
      return this.uploadToCloudinary(file, `users/${userId}`);
    }
    throw new Error(`Provider ${this.provider} no soportado`);
  }

  /**
   * Subir a almacenamiento local (backend)
   */
  async uploadToLocal(file, folder) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const response = await fetch('http://localhost:4000/api/storage/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al subir archivo');
    }

    const data = await response.json();
    // Retornar URL completa con el host del backend
    return `http://localhost:4000${data.url}`;
  }

  /**
   * Subir a Google Cloud Storage (requiere backend)
   */
  async uploadToGCS(file, filePath) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', filePath);

    const response = await fetch('http://localhost:4000/api/storage/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al subir archivo');
    }

    const data = await response.json();
    return data.url;
  }

  /**
   * Subir a Cloudinary (directo desde frontend)
   */
  async uploadToCloudinary(file, folder) {
    // Cloudinary permite subir directamente desde el frontend
    // Necesitas configurar CLOUDINARY_CLOUD_NAME y CLOUDINARY_UPLOAD_PRESET
    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error('Cloudinary no está configurado. Agrega REACT_APP_CLOUDINARY_CLOUD_NAME y REACT_APP_CLOUDINARY_UPLOAD_PRESET');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', folder);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Error al subir archivo a Cloudinary');
    }

    const data = await response.json();
    return data.secure_url;
  }

  /**
   * Eliminar una imagen
   * @param {string} url - URL de la imagen a eliminar
   */
  async deleteImage(url) {
    if (this.provider === 'local') {
      // Extraer el path del URL local
      const path = this.extractPathFromLocalURL(url);
      await fetch('http://localhost:4000/api/storage/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path }),
      });
    } else if (this.provider === 'gcs') {
      // Extraer el path del URL y llamar al backend
      const path = this.extractPathFromGCSURL(url);
      await fetch('http://localhost:4000/api/storage/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path }),
      });
    } else if (this.provider === 'cloudinary') {
      // Cloudinary requiere backend para eliminar (necesita signature)
      const publicId = this.extractPublicIdFromCloudinaryURL(url);
      await fetch('http://localhost:4000/api/storage/delete-cloudinary', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId }),
      });
    }
  }

  extractPathFromLocalURL(url) {
    // Extraer path de URL local: http://localhost:4000/uploads/products/123/file.jpg
    const match = url.match(/\/uploads\/(.+)$/);
    return match ? match[1] : null;
  }

  extractPathFromGCSURL(url) {
    // Extraer path de URL de GCS
    const match = url.match(/\/o\/(.+)\?/);
    return match ? decodeURIComponent(match[1]) : null;
  }

  extractPublicIdFromCloudinaryURL(url) {
    // Extraer public_id de URL de Cloudinary
    const match = url.match(/\/v\d+\/(.+)\.\w+$/);
    return match ? match[1] : null;
  }
}

// Exportar instancia por defecto (usando almacenamiento local)
export default new StorageService(process.env.REACT_APP_STORAGE_PROVIDER || 'local');

// Exportar clase para crear instancias personalizadas
export { StorageService };


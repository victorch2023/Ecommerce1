# ✅ Configuración de Almacenamiento Alternativo - COMPLETADA

## 🎉 Lo que se ha configurado

### 1. Servicio de Almacenamiento en Frontend
- ✅ `frontend/src/services/storageService.js` - Servicio que soporta múltiples proveedores
- ✅ Soporte para Google Cloud Storage (GCS)
- ✅ Soporte para Cloudinary (alternativa)

### 2. API de Almacenamiento en Backend
- ✅ `backend/src/routes/storage.js` - Rutas para subir/eliminar archivos
- ✅ `backend/src/controllers/storageController.js` - Controladores para GCS y Cloudinary
- ✅ Integrado en `backend/src/server.js`

### 3. Dependencias Instaladas
- ✅ `@google-cloud/storage` - Para Google Cloud Storage
- ✅ `multer` - Para manejar uploads de archivos
- ✅ `cloudinary` - Para Cloudinary (opcional)

## 🚀 Próximos Pasos para Usar GCS

### Paso 1: Crear Bucket de Google Cloud Storage

El bucket por defecto de Firebase es: `ecommerce1-chowwha.appspot.com`

Si no existe automáticamente, puedes crearlo:

**Opción A: Desde Google Cloud Console**
1. Ve a [Google Cloud Console - Storage](https://console.cloud.google.com/storage)
2. Selecciona proyecto: `ecommerce1-chowwha`
3. Haz clic en "Create Bucket"
4. Nombre: `ecommerce1-chowwha.appspot.com` (o el que prefieras)
5. Ubicación: Misma que Firestore (probablemente `us-central`)
6. Permisos: Público para lectura (si quieres imágenes públicas)

**Opción B: Desde Terminal (si tienes gcloud CLI)**
```bash
gsutil mb -p ecommerce1-chowwha -c STANDARD -l us-central gs://ecommerce1-chowwha.appspot.com
```

### Paso 2: Configurar Variables de Entorno

Crea `backend/.env`:

```env
GOOGLE_CLOUD_PROJECT_ID=ecommerce1-chowwha
GCS_BUCKET_NAME=ecommerce1-chowwha.appspot.com
```

### Paso 3: Verificar Service Account

Asegúrate de que `backend/serviceAccountKey.json` tenga permisos de Storage:
- `Storage Object Admin` o
- `Storage Admin`

Si no los tiene, en Google Cloud Console:
1. IAM & Admin → Service Accounts
2. Selecciona tu service account
3. Agrega el rol "Storage Object Admin"

### Paso 4: Probar el Servicio

```bash
# Iniciar backend
cd backend
npm run dev

# En otro terminal, probar upload
curl -X POST http://localhost:4000/api/storage/upload \
  -F "file=@ruta/a/imagen.jpg" \
  -F "path=test/imagen.jpg"
```

## 📝 Uso en el Código

### Ejemplo: Subir Imagen de Producto

```javascript
import storageService from './services/storageService';

// En un componente React
const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const imageUrl = await storageService.uploadProductImage(file, productId);
    console.log('Imagen subida:', imageUrl);
    // Usar imageUrl para guardar en Firestore
  } catch (error) {
    console.error('Error al subir imagen:', error);
  }
};
```

## 🎯 Ventajas de esta Configuración

1. ✅ **Gratuito**: 5 GB de almacenamiento + 1 GB transferencia/mes
2. ✅ **Flexible**: Puedes cambiar a Cloudinary fácilmente
3. ✅ **Integrado**: Usa el mismo proyecto de Google Cloud
4. ✅ **Escalable**: Fácil migrar a Firebase Storage después si lo necesitas

## 🔄 Cambiar a Cloudinary (Opcional)

Si prefieres Cloudinary por su tier más generoso:

1. Crea cuenta en [Cloudinary](https://cloudinary.com)
2. Obtén credenciales del Dashboard
3. Configura variables de entorno (ver `docs/STORAGE_ALTERNATIVO.md`)
4. Cambia `REACT_APP_STORAGE_PROVIDER=cloudinary` en frontend

## 📚 Documentación Adicional

- Ver `docs/STORAGE_ALTERNATIVO.md` para detalles completos
- Ver `frontend/src/services/storageService.js` para API del servicio
- Ver `backend/src/controllers/storageController.js` para API del backend

## ✅ Estado Actual

- ✅ Código configurado y listo
- ✅ Dependencias instaladas
- ⏳ Pendiente: Crear bucket de GCS (si no existe automáticamente)
- ⏳ Pendiente: Configurar variables de entorno en `backend/.env`
- ⏳ Pendiente: Verificar permisos del service account

¡Todo está listo para usar! Solo falta crear el bucket y configurar las variables de entorno.




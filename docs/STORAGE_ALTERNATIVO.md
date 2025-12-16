# 📦 Configuración de Almacenamiento Alternativo (Gratuito)

Este proyecto soporta múltiples opciones de almacenamiento gratuitas como alternativa a Firebase Storage.

## 🎯 Opciones Disponibles

### 1. Google Cloud Storage (GCS) - Recomendado
**Tier Gratuito:**
- ✅ 5 GB de almacenamiento
- ✅ 1 GB de transferencia de salida por mes
- ✅ Operaciones ilimitadas (dentro de límites razonables)

**Ventajas:**
- Mismo ecosistema que Firebase
- Usa el mismo proyecto de Google Cloud
- No requiere configuración adicional si ya tienes Firebase

### 2. Cloudinary - Alternativa Popular
**Tier Gratuito:**
- ✅ 25 GB de almacenamiento
- ✅ 25 GB de transferencia por mes
- ✅ Transformaciones de imagen incluidas

**Ventajas:**
- Más generoso en el tier gratuito
- Transformaciones de imagen automáticas
- CDN global incluido

## 🚀 Configuración

### Opción A: Google Cloud Storage (GCS)

#### Paso 1: Habilitar Google Cloud Storage

1. Ve a [Google Cloud Console](https://console.cloud.google.com/storage)
2. Selecciona tu proyecto: `ecommerce1-chowwha`
3. Crea un bucket (o usa el bucket por defecto de Firebase)

#### Paso 2: Configurar Variables de Entorno (Backend)

Crea un archivo `backend/.env`:

```env
GOOGLE_CLOUD_PROJECT_ID=ecommerce1-chowwha
GCS_BUCKET_NAME=ecommerce1-chowwha.appspot.com
```

El bucket por defecto de Firebase es: `{project-id}.appspot.com`

#### Paso 3: Instalar Dependencias

```bash
cd backend
npm install
```

#### Paso 4: Verificar Service Account

Asegúrate de tener `backend/serviceAccountKey.json` con permisos de Storage.

**Permisos necesarios:**
- `storage.objects.create`
- `storage.objects.delete`
- `storage.objects.get`

### Opción B: Cloudinary

#### Paso 1: Crear Cuenta en Cloudinary

1. Ve a [Cloudinary](https://cloudinary.com/users/register_free)
2. Crea una cuenta gratuita
3. Obtén tus credenciales del Dashboard

#### Paso 2: Configurar Variables de Entorno

**Backend (`backend/.env`):**
```env
CLOUDINARY_CLOUD_NAME=tu-cloud-name
CLOUDINARY_API_KEY=tu-api-key
CLOUDINARY_API_SECRET=tu-api-secret
```

**Frontend (`frontend/.env.local`):**
```env
REACT_APP_CLOUDINARY_CLOUD_NAME=tu-cloud-name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=tu-upload-preset
REACT_APP_STORAGE_PROVIDER=cloudinary
```

#### Paso 3: Crear Upload Preset en Cloudinary

1. Ve a Cloudinary Dashboard → Settings → Upload
2. Crea un "Upload Preset" sin firmar (unsigned)
3. Copia el nombre del preset a `REACT_APP_CLOUDINARY_UPLOAD_PRESET`

#### Paso 4: Instalar Dependencias

```bash
cd backend
npm install
```

## 📝 Uso en el Código

### Frontend

```javascript
import storageService from './services/storageService';

// Subir imagen de producto
const file = event.target.files[0];
const imageUrl = await storageService.uploadProductImage(file, productId);

// Subir imagen de perfil
const profileUrl = await storageService.uploadUserImage(file, userId);

// Eliminar imagen
await storageService.deleteImage(imageUrl);
```

### Backend

Las rutas están disponibles en:
- `POST /api/storage/upload` - Subir a GCS
- `DELETE /api/storage/delete` - Eliminar de GCS
- `POST /api/storage/upload-cloudinary` - Subir a Cloudinary
- `DELETE /api/storage/delete-cloudinary` - Eliminar de Cloudinary

## 🔄 Cambiar de Proveedor

Para cambiar el proveedor, actualiza la variable de entorno:

```env
REACT_APP_STORAGE_PROVIDER=gcs      # Para Google Cloud Storage
REACT_APP_STORAGE_PROVIDER=cloudinary  # Para Cloudinary
```

## 📊 Comparación de Opciones

| Característica | GCS | Cloudinary |
|---------------|-----|-----------|
| Almacenamiento Gratuito | 5 GB | 25 GB |
| Transferencia Gratuita | 1 GB/mes | 25 GB/mes |
| Transformaciones | ❌ | ✅ |
| CDN | ✅ | ✅ |
| Integración Firebase | ✅ Nativa | ❌ |
| Facilidad de Setup | ⭐⭐⭐ | ⭐⭐⭐⭐ |

## 🎯 Recomendación

- **Para proyectos pequeños/desarrollo**: Usa **GCS** (ya está integrado con Firebase)
- **Para proyectos que necesitan transformaciones de imagen**: Usa **Cloudinary**
- **Para máximo almacenamiento gratuito**: Usa **Cloudinary**

## ⚠️ Notas Importantes

1. **GCS**: Requiere `serviceAccountKey.json` con permisos de Storage
2. **Cloudinary**: Permite subir directamente desde el frontend (más fácil)
3. Ambos servicios tienen límites en el tier gratuito
4. Las imágenes subidas a GCS son públicas por defecto (configurable)

## 🔒 Seguridad

- **GCS**: Configura permisos del bucket según tus necesidades
- **Cloudinary**: Usa upload presets con restricciones (tamaño, formato, etc.)

## 📚 Recursos

- [Google Cloud Storage Pricing](https://cloud.google.com/storage/pricing)
- [Cloudinary Free Tier](https://cloudinary.com/pricing)
- [Documentación GCS](https://cloud.google.com/storage/docs)
- [Documentación Cloudinary](https://cloudinary.com/documentation)




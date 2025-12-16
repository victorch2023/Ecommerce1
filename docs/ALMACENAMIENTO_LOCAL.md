# 💾 Almacenamiento Local - Configuración

Este proyecto está configurado para usar **almacenamiento local** en tu computadora en lugar de servicios en la nube como Google Cloud Storage.

## ✅ Ventajas del Almacenamiento Local

- ✅ **Gratis**: No requiere servicios externos ni facturación
- ✅ **Rápido**: Acceso inmediato sin latencia de red
- ✅ **Simple**: No requiere configuración adicional
- ✅ **Privado**: Los archivos están solo en tu máquina
- ✅ **Ideal para desarrollo**: Perfecto para pruebas y desarrollo local

## 📁 Estructura de Directorios

Los archivos se almacenan en:

```
backend/
├── uploads/          # Archivos originales subidos
│   ├── products/     # Imágenes de productos
│   └── users/        # Imágenes de perfil
└── public/
    └── uploads/      # Archivos servidos públicamente (copias)
        ├── products/
        └── users/
```

## 🚀 Uso

### Subir una Imagen

```javascript
import storageService from './services/storageService';

// Subir imagen de producto
const file = event.target.files[0];
const imageUrl = await storageService.uploadProductImage(file, productId);
console.log('URL de la imagen:', imageUrl);
// Ejemplo: http://localhost:4000/uploads/products/123/1234567890-imagen.jpg
```

### Eliminar una Imagen

```javascript
await storageService.deleteImage(imageUrl);
```

## 🔧 Configuración

### Backend

El backend está configurado para:
- ✅ Recibir archivos en `/api/storage/upload`
- ✅ Servir archivos estáticos desde `/uploads`
- ✅ Eliminar archivos en `/api/storage/delete`
- ✅ Listar archivos en `/api/storage/list`

### Frontend

El frontend está configurado para usar almacenamiento local por defecto.

Para cambiar el proveedor, crea `frontend/.env.local`:

```env
REACT_APP_STORAGE_PROVIDER=local  # local, gcs, o cloudinary
```

## 📝 Límites

- **Tamaño máximo**: 10 MB por archivo
- **Tipos permitidos**: Solo imágenes (jpeg, jpg, png, gif, webp)
- **Almacenamiento**: Limitado por el espacio en disco de tu computadora

## ⚠️ Consideraciones

### Desarrollo vs Producción

- **Desarrollo**: Almacenamiento local es perfecto
- **Producción**: Para producción, considera usar un servicio en la nube:
  - Google Cloud Storage
  - AWS S3
  - Cloudinary
  - Otros servicios de almacenamiento

### Backup

Los archivos están solo en tu computadora. Asegúrate de:
- Hacer backups regulares
- No subir archivos importantes sin respaldo
- Considerar migrar a la nube para producción

## 🔄 Migrar a la Nube (Futuro)

Si más adelante quieres usar Google Cloud Storage o Cloudinary:

1. Cambia `REACT_APP_STORAGE_PROVIDER` a `gcs` o `cloudinary`
2. Configura las credenciales necesarias
3. El código ya está preparado para soportar múltiples proveedores

## 📊 Comparación

| Característica | Local | GCS | Cloudinary |
|---------------|-------|-----|------------|
| Costo | Gratis | Gratis (tier limitado) | Gratis (tier limitado) |
| Velocidad | ⚡⚡⚡ Muy rápida | ⚡⚡ Rápida | ⚡⚡ Rápida |
| Escalabilidad | ❌ Limitada | ✅ Ilimitada | ✅ Ilimitada |
| Backup | Manual | ✅ Automático | ✅ Automático |
| Uso | Desarrollo | Producción | Producción |

## 🎯 Estado Actual

- ✅ Backend configurado para almacenamiento local
- ✅ Frontend configurado para usar almacenamiento local
- ✅ Rutas API funcionando
- ✅ Servicio de archivos estáticos configurado
- ✅ Directorios creados automáticamente

¡Todo listo para usar! 🎉




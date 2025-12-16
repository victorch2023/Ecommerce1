# 💻 Sistema Local Completo - Sin Dependencias de Firebase

Este proyecto ahora funciona **completamente en local**, sin necesidad de servicios externos como Firebase.

## ✅ Lo que se ha Reemplazado

### 1. Base de Datos: Firestore → SQLite
- **Antes**: Firebase Firestore (en la nube)
- **Ahora**: SQLite (archivo local en `backend/data/ecommerce.db`)
- **Ventajas**: 
  - ✅ Gratis e ilimitado
  - ✅ Rápido (sin latencia de red)
  - ✅ Datos completamente privados
  - ✅ No requiere configuración externa

### 2. Autenticación: Firebase Auth → JWT Local
- **Antes**: Firebase Authentication
- **Ahora**: JWT (JSON Web Tokens) + bcrypt
- **Ventajas**:
  - ✅ Control total sobre usuarios
  - ✅ Sin límites de usuarios
  - ✅ Datos almacenados localmente

### 3. Almacenamiento: Firebase Storage → Sistema de Archivos Local
- **Antes**: Firebase Storage (en la nube)
- **Ahora**: Archivos en `backend/uploads/` y `backend/public/uploads/`
- **Ventajas**:
  - ✅ Gratis e ilimitado (limitado solo por tu disco)
  - ✅ Acceso instantáneo
  - ✅ Sin costos de transferencia

## 📁 Estructura de Archivos Locales

```
backend/
├── data/
│   └── ecommerce.db          # Base de datos SQLite
├── uploads/                   # Archivos subidos (originales)
│   ├── products/
│   └── users/
└── public/
    └── uploads/              # Archivos servidos públicamente
        ├── products/
        └── users/
```

## 🚀 Cómo Usar

### 1. Instalar Dependencias

```bash
cd backend
npm install
```

### 2. Poblar Base de Datos (Opcional)

```bash
npm run seed
```

Esto creará 4 productos de ejemplo.

### 3. Iniciar el Backend

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:4000`

### 4. Iniciar el Frontend

```bash
cd frontend
npm install
npm start
```

El frontend estará disponible en `http://localhost:3000`

## 📊 Estructura de la Base de Datos

### Tabla: `users`
- `id` (INTEGER, PRIMARY KEY)
- `email` (TEXT, UNIQUE)
- `password` (TEXT, hasheado con bcrypt)
- `name` (TEXT, opcional)
- `createdAt` (DATETIME)
- `updatedAt` (DATETIME)

### Tabla: `products`
- `id` (INTEGER, PRIMARY KEY)
- `name` (TEXT)
- `price` (REAL)
- `description` (TEXT)
- `stock` (INTEGER)
- `image` (TEXT, URL)
- `createdAt` (DATETIME)
- `updatedAt` (DATETIME)

### Tabla: `orders`
- `id` (INTEGER, PRIMARY KEY)
- `userId` (INTEGER, FOREIGN KEY)
- `items` (TEXT, JSON)
- `total` (REAL)
- `status` (TEXT, default: 'pending')
- `createdAt` (DATETIME)
- `updatedAt` (DATETIME)

### Tabla: `carts`
- `id` (INTEGER, PRIMARY KEY)
- `userId` (INTEGER, UNIQUE, FOREIGN KEY)
- `items` (TEXT, JSON)
- `updatedAt` (DATETIME)

## 🔐 Autenticación

### Registro de Usuario

```javascript
POST /api/auth/register
Body: {
  "email": "usuario@example.com",
  "password": "contraseña123",
  "name": "Nombre Usuario" // opcional
}
```

### Login

```javascript
POST /api/auth/login
Body: {
  "email": "usuario@example.com",
  "password": "contraseña123"
}

Response: {
  "token": "jwt-token-here",
  "user": {
    "id": 1,
    "email": "usuario@example.com",
    "name": "Nombre Usuario"
  }
}
```

### Usar Token en Requests

```javascript
Headers: {
  "Authorization": "Bearer jwt-token-here"
}
```

## 📝 APIs Disponibles

### Productos
- `GET /api/products` - Listar todos los productos
- `GET /api/products/:id` - Obtener un producto
- `POST /api/products` - Crear producto (requiere autenticación)
- `PUT /api/products/:id` - Actualizar producto (requiere autenticación)
- `DELETE /api/products/:id` - Eliminar producto (requiere autenticación)

### Autenticación
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/profile` - Obtener perfil (requiere autenticación)

### Órdenes
- `POST /api/orders` - Crear orden (requiere autenticación)
- `GET /api/orders/my-orders` - Mis órdenes (requiere autenticación)
- `GET /api/orders/:id` - Obtener orden (requiere autenticación)

### Almacenamiento
- `POST /api/storage/upload` - Subir archivo
- `DELETE /api/storage/delete` - Eliminar archivo
- `GET /api/storage/list` - Listar archivos

## 🔄 Migración desde Firebase

Si tenías datos en Firebase, puedes migrarlos:

1. **Exportar datos de Firestore** (desde Firebase Console)
2. **Convertir a formato SQLite** (script de migración)
3. **Importar a SQLite** usando el script

## ⚠️ Consideraciones

### Desarrollo vs Producción

- **Desarrollo**: ✅ Perfecto para desarrollo local
- **Producción**: Para producción, considera:
  - Base de datos: PostgreSQL, MySQL, o mantener SQLite
  - Autenticación: El sistema JWT funciona bien en producción
  - Almacenamiento: Para producción, considera CDN o servicios en la nube

### Backup

- **Base de datos**: Hacer backup de `backend/data/ecommerce.db`
- **Archivos**: Hacer backup de `backend/uploads/`
- **Recomendación**: Configurar backups automáticos

### Escalabilidad

- SQLite es excelente para desarrollo y aplicaciones pequeñas/medianas
- Para aplicaciones grandes con muchos usuarios concurrentes, considera PostgreSQL o MySQL

## 🎯 Estado Actual

- ✅ Base de datos SQLite configurada y funcionando
- ✅ Sistema de autenticación JWT implementado
- ✅ Almacenamiento local de archivos funcionando
- ✅ Frontend actualizado para usar APIs locales
- ✅ Seeder funcionando (4 productos de ejemplo creados)
- ✅ Todo funciona sin dependencias de Firebase

## 🚀 Próximos Pasos

1. **Iniciar el backend**: `cd backend && npm run dev`
2. **Iniciar el frontend**: `cd frontend && npm start`
3. **Probar el sistema**:
   - Ver productos en la página Home
   - Registrar un nuevo usuario
   - Iniciar sesión
   - Ver detalles de productos

¡Todo está listo para funcionar completamente en local! 🎉



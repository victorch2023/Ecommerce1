# 🛒 E-commerce - Sistema Completo con Firestore

Proyecto de e-commerce completo con React (frontend) y Node.js/Express (backend), usando **Firestore** como base de datos en la nube (gratis permanentemente).

## ✨ Características

- ✅ **Base de datos en la nube**: Firestore (gratis permanentemente - 1GB)
- ✅ **Autenticación**: JWT + bcrypt
- ✅ **Almacenamiento local**: Sistema de archivos (opcional: Cloud Storage)
- ✅ **Completamente gratuito**: Tier gratuito permanente de Firestore
- ✅ **Escalable**: Se adapta automáticamente al crecimiento

## 🚀 Inicio Rápido

### 1. Instalar Dependencias

```bash
# Backend
cd backend
npm install

# Frontend (en otra terminal)
cd frontend
npm install
```

### 2. Configurar Firestore

**IMPORTANTE**: Antes de iniciar la aplicación, necesitas configurar Firestore. Sigue la guía completa en **[MIGRACION_FIRESTORE.md](MIGRACION_FIRESTORE.md)**.

Resumen rápido:
1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilita Firestore Database
3. Configura las reglas de seguridad
4. Descarga `serviceAccountKey.json` y colócalo en `backend/`
5. (Opcional) Migra datos existentes: `npm run migrate`

### 3. Poblar Base de Datos (Opcional)

```bash
cd backend
npm run seed
```

Esto creará 4 productos de ejemplo en Firestore.

### 4. Iniciar la Aplicación

**Opción A: Script Automático (Recomendado)**
```bash
./start.sh
```

**Opción B: Manual (2 terminales)**

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### 5. Acceder a la Aplicación

Una vez iniciados los servidores, abre tu navegador en:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000/api

La aplicación se abrirá automáticamente en tu navegador.

## 📁 Estructura del Proyecto

- **frontend/**: Aplicación React
  - Componentes: Home, Product, Cart, Login
  - Servicios: API local, Storage local
  
- **backend/**: API REST con Node.js + Express
  - Base de datos: Firestore (Google Cloud)
  - Autenticación: JWT
  - Almacenamiento: Sistema de archivos local
  
- **docs/**: Documentación completa

## 🗄️ Base de Datos Firestore

La base de datos Firestore se configura en la nube con las siguientes colecciones:

- `users` - Usuarios registrados
- `products` - Catálogo de productos
- `orders` - Órdenes de compra
- `carts` - Carritos de compra

**Ventajas de Firestore:**
- ✅ Gratis permanentemente (1GB, 50K lecturas/día, 20K escrituras/día)
- ✅ Escalable automáticamente
- ✅ Accesible desde cualquier lugar
- ✅ Backups automáticos

## 🔐 Autenticación

Sistema de autenticación local usando JWT:

- **Registro**: `POST /api/auth/register`
- **Login**: `POST /api/auth/login`
- **Perfil**: `GET /api/auth/profile` (requiere token)

Los tokens se guardan en `localStorage` del navegador.

## 📦 Almacenamiento

Los archivos se guardan localmente en:
- `backend/uploads/` - Archivos originales
- `backend/public/uploads/` - Archivos servidos públicamente

## 🛠️ Comandos Disponibles

### Backend
```bash
npm install      # Instalar dependencias
npm start        # Iniciar servidor
npm run dev      # Iniciar con nodemon (auto-reload)
npm run seed     # Sembrar datos de prueba en Firestore
npm run migrate  # Migrar datos de SQLite a Firestore
```

### Frontend
```bash
npm install      # Instalar dependencias
npm start        # Iniciar servidor de desarrollo
npm build        # Construir para producción
```

## 📚 Documentación

- **[Migración a Firestore](MIGRACION_FIRESTORE.md)** - Guía completa para migrar a Firestore
- **[Índices de Firestore](INDICES_FIRESTORE.md)** - Información sobre índices necesarios
- **[Sistema Local Completo](docs/SISTEMA_LOCAL_COMPLETO.md)** - Guía del sistema anterior (SQLite)
- **[Almacenamiento Local](docs/ALMACENAMIENTO_LOCAL.md)** - Cómo funciona el almacenamiento

## ⚙️ Configuración

### Variables de Entorno (Opcional)

**Backend** (`backend/.env`):
```env
JWT_SECRET=tu-secret-key-cambiar-en-produccion
JWT_EXPIRES_IN=7d
PORT=4000
```

**Frontend** (`frontend/.env.local`):
```env
REACT_APP_API_URL=http://localhost:4000/api
REACT_APP_STORAGE_PROVIDER=local
```

## 🎯 Estado Actual

- ✅ Base de datos Firestore configurada
- ✅ Autenticación JWT implementada
- ✅ Almacenamiento local configurado
- ✅ Frontend conectado a APIs
- ✅ Seeder funcionando (4 productos de ejemplo)
- ✅ Script de migración desde SQLite disponible

## 🐛 Solución de Problemas

### Error: "Cannot find module 'better-sqlite3'"
```bash
cd backend && npm install
```

### Error: "ECONNREFUSED" al conectar al backend
- Verifica que el backend esté corriendo: `cd backend && npm run dev`
- Verifica que el puerto 4000 esté disponible

### Error: "Firestore no está inicializado"
- Verifica que `backend/serviceAccountKey.json` exista
- Sigue la guía en [MIGRACION_FIRESTORE.md](MIGRACION_FIRESTORE.md)
- Reinicia el servidor después de agregar el archivo

### Error: "Permission denied" en Firestore
- Verifica que hayas aplicado las reglas de seguridad en Firebase Console
- Consulta [MIGRACION_FIRESTORE.md](MIGRACION_FIRESTORE.md) para las reglas correctas

### No se ven productos
- Ejecuta el seeder: `cd backend && npm run seed`
- Verifica que el backend esté corriendo

## 🔒 Seguridad

⚠️ **IMPORTANTE**: 
- Cambia `JWT_SECRET` en producción
- **NUNCA** subas `backend/serviceAccountKey.json` a Git (ya está en `.gitignore`)
- No subas archivos `.env` con secretos
- Configura las reglas de seguridad de Firestore correctamente

## 🚀 Próximos Pasos

1. ✅ Sistema funcionando con Firestore
2. 🔄 Agregar funcionalidad de carrito de compras
3. 🔄 Implementar sistema de pagos
4. 🔄 Migrar imágenes a Cloud Storage (opcional)
5. 🔄 Agregar más funcionalidades según necesidades

¡Disfruta de tu e-commerce con Firestore! 🎉

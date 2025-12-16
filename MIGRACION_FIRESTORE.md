# 🚀 Guía de Migración a Firestore

Esta guía te ayudará a migrar tu base de datos SQLite local a Firestore (gratis permanentemente).

## 📋 Requisitos Previos

1. **Cuenta de Google**: Necesitas una cuenta de Google
2. **Tarjeta de crédito**: Firebase requiere una tarjeta para verificar tu identidad, pero **NO se cobrará** si no excedes el tier gratuito
3. **Base de datos SQLite existente**: Tu base de datos actual en `backend/data/ecommerce.db`

## 🔧 Paso 1: Crear Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en **"Agregar proyecto"** o **"Add project"**
3. Ingresa un nombre para tu proyecto (ej: "ecommerce-firestore")
4. Sigue los pasos del asistente:
   - Opcionalmente desactiva Google Analytics (no es necesario)
   - Haz clic en **"Crear proyecto"**
5. Espera a que se cree el proyecto (puede tomar unos minutos)

## 🔥 Paso 2: Habilitar Firestore

1. En el menú lateral de Firebase Console, ve a **"Firestore Database"**
2. Haz clic en **"Crear base de datos"** o **"Create database"**
3. Selecciona **"Comenzar en modo de prueba"** (Start in test mode) - luego configuraremos las reglas
4. Elige una ubicación (recomendado: `us-central` o la más cercana a ti)
5. Haz clic en **"Habilitar"** o **"Enable"**

## 🔐 Paso 3: Configurar Reglas de Seguridad de Firestore

1. En Firestore Database, ve a la pestaña **"Rules"** o **"Reglas"**
2. Copia y pega las siguientes reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuarios: solo lectura/escritura propia o admin
    match /users/{userId} {
      allow read: if request.auth != null && (request.auth.uid == userId || get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow write: if request.auth != null && (request.auth.uid == userId || get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    
    // Productos: lectura pública, escritura solo admin
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Órdenes: solo lectura/escritura propia o admin
    match /orders/{orderId} {
      allow read: if request.auth != null && (resource.data.userId == request.auth.uid || get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow update: if request.auth != null && (resource.data.userId == request.auth.uid || get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    
    // Carritos: solo lectura/escritura propia
    match /carts/{cartId} {
      allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
    }
  }
}
```

3. Haz clic en **"Publicar"** o **"Publish"**

> ⚠️ **Nota**: Estas reglas permiten lectura pública de productos (necesario para tu tienda), pero requieren autenticación para todo lo demás. Para producción, puedes ajustar las reglas según tus necesidades.

## 🔑 Paso 4: Obtener Service Account Key

1. En Firebase Console, ve a **"Configuración del proyecto"** (ícono de engranaje) → **"Configuración"**
2. Ve a la pestaña **"Cuentas de servicio"** o **"Service accounts"**
3. Haz clic en **"Generar nueva clave privada"** o **"Generate new private key"**
4. Se descargará un archivo JSON (ej: `ecommerce-firestore-xxxxx.json`)
5. **Renombra este archivo** a `serviceAccountKey.json`
6. **Mueve el archivo** a la carpeta `backend/` de tu proyecto

```
backend/
├── serviceAccountKey.json  ← Aquí debe estar
├── package.json
└── src/
```

> ⚠️ **IMPORTANTE**: 
> - **NUNCA** subas este archivo a GitHub o repositorios públicos
> - Ya está incluido en `.gitignore` para protegerlo
> - Este archivo da acceso completo a tu base de datos

## 📦 Paso 5: Migrar Datos de SQLite a Firestore

Una vez que tengas el `serviceAccountKey.json` en la carpeta `backend/`, ejecuta el script de migración:

```bash
cd backend
npm run migrate
```

Este script:
- ✅ Lee todos los datos de tu base de datos SQLite (`backend/data/ecommerce.db`)
- ✅ Migra usuarios (manteniendo las contraseñas hasheadas)
- ✅ Migra productos
- ✅ Migra órdenes (mapeando IDs de usuarios correctamente)
- ✅ Evita duplicados (no migra si ya existen)

## ✅ Paso 6: Verificar la Migración

1. Ve a Firebase Console → Firestore Database
2. Deberías ver las colecciones: `users`, `products`, `orders`
3. Verifica que los datos se hayan migrado correctamente

## 🚀 Paso 7: Probar la Aplicación

1. Inicia el backend:
```bash
cd backend
npm run dev
```

2. Deberías ver en la consola:
```
✅ Firestore inicializado correctamente
Backend listening on 4000
```

3. Prueba las funcionalidades:
   - Login/Registro
   - Ver productos
   - Crear órdenes
   - Panel de administración

## 📊 Límites del Tier Gratuito de Firestore

- ✅ **1 GB de almacenamiento** (gratis permanentemente)
- ✅ **50,000 lecturas/día**
- ✅ **20,000 escrituras/día**
- ✅ **20,000 eliminaciones/día**
- ✅ **10 GB/día de tráfico de red**

Para un e-commerce pequeño/mediano, estos límites son más que suficientes.

## 🔄 Si Necesitas Volver a SQLite

Si por alguna razón necesitas volver a SQLite:

1. El archivo `backend/data/ecommerce.db` sigue existiendo
2. Puedes cambiar `backend/src/services/database.js` para usar SQLite nuevamente
3. Los controladores ya están migrados a Firestore, así que necesitarías revertir los cambios

## 🆘 Solución de Problemas

### Error: "Firestore no está inicializado"
- Verifica que `backend/serviceAccountKey.json` exista
- Verifica que el archivo JSON sea válido
- Reinicia el servidor

### Error: "Permission denied" en Firestore
- Verifica que hayas aplicado las reglas de seguridad en Firebase Console
- Asegúrate de que las reglas estén publicadas

### Error: "Service account key not found"
- Verifica que el archivo esté en `backend/serviceAccountKey.json`
- Verifica que el nombre del archivo sea exactamente `serviceAccountKey.json`

### Los datos no se migraron
- Verifica que `backend/data/ecommerce.db` exista
- Revisa los logs del script de migración
- Verifica que Firestore esté habilitado en Firebase Console

## 📝 Notas Importantes

1. **Backup**: Tu base de datos SQLite original (`ecommerce.db`) NO se elimina, así que tienes un backup
2. **IDs**: Los IDs en Firestore son strings (no números como en SQLite)
3. **Timestamps**: Firestore usa objetos Timestamp, pero el código los convierte automáticamente
4. **Consultas**: Firestore requiere índices para algunas consultas complejas. Si ves errores sobre índices, Firebase te dará un enlace para crearlos automáticamente.

## 🎉 ¡Listo!

Tu aplicación ahora está usando Firestore, que es:
- ✅ Gratis permanentemente (dentro de los límites)
- ✅ Escalable automáticamente
- ✅ Accesible desde cualquier lugar
- ✅ Con backups automáticos

¡Disfruta de tu nueva base de datos en la nube! 🚀


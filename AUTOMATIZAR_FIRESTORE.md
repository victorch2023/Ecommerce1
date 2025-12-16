# 🤖 Automatización de Configuración de Firestore

## ⚠️ Limitación

La autenticación inicial en Firebase Console requiere verificación de identidad (código de verificación, 2FA, etc.) que solo tú puedes completar.

## ✅ Lo que SÍ puedo automatizar

Una vez que estés autenticado en Firebase Console, puedo ayudarte con:

1. **Navegación automática** a las secciones correctas
2. **Configuración de reglas** de seguridad
3. **Verificación** de que todo esté configurado

## 🚀 Pasos Manuales Necesarios (Una vez autenticado)

### Opción A: Usar el Navegador con Automatización

1. **Completa la verificación de Google** en el navegador
2. Una vez en Firebase Console, avísame y continuaré automatizando los pasos

### Opción B: Hacerlo Manualmente (Más Rápido)

Sigue estos pasos directamente:

#### 1. Crear Proyecto (2 min)
- Ve a: https://console.firebase.google.com/
- Haz clic en **"Agregar proyecto"** o **"Add project"**
- Nombre: `ecommerce-firestore`
- Sigue el asistente
- Espera a que se cree

#### 2. Habilitar Firestore (1 min)
- En el menú lateral → **"Firestore Database"**
- Haz clic en **"Crear base de datos"**
- Selecciona **"Comenzar en modo de prueba"**
- Ubicación: `us-central`
- Haz clic en **"Habilitar"**

#### 3. Configurar Reglas (2 min)
- En Firestore Database → pestaña **"Rules"**
- Copia las reglas de abajo
- Pégalas y haz clic en **"Publicar"**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null && (request.auth.uid == userId || get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow write: if request.auth != null && (request.auth.uid == userId || get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    match /orders/{orderId} {
      allow read: if request.auth != null && (resource.data.userId == request.auth.uid || get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow update: if request.auth != null && (resource.data.userId == request.auth.uid || get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    match /carts/{cartId} {
      allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
    }
  }
}
```

#### 4. Descargar Service Account Key (2 min)
- Configuración del proyecto (ícono de engranaje) → **"Configuración"**
- Pestaña **"Cuentas de servicio"** o **"Service accounts"**
- Haz clic en **"Generar nueva clave privada"**
- Se descargará un archivo JSON
- **Renombra** a: `serviceAccountKey.json`
- **Mueve** a: `backend/`

## 🔄 Después de Completar los Pasos

Ejecuta estos comandos:

```bash
cd backend

# Verificar configuración
npm run verify

# Migrar datos (opcional)
npm run migrate

# Iniciar servidor
npm run dev
```

## 💡 Recomendación

**Hazlo manualmente** - Es más rápido (7 minutos total) y tienes control total. Los pasos son muy simples y directos.

Si prefieres que continúe con la automatización una vez que estés autenticado, avísame cuando hayas completado la verificación de Google y continuaré desde ahí.


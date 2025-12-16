# ⚡ Pasos Rápidos para Configurar Firestore

## 🎯 Resumen: 5 Pasos Simples

### Paso 1: Crear Proyecto Firebase (2 minutos)
1. Ve a: https://console.firebase.google.com/
2. Haz clic en **"Agregar proyecto"**
3. Nombre: `ecommerce-firestore` (o el que prefieras)
4. Sigue el asistente (puedes desactivar Analytics si quieres)
5. Espera a que se cree

### Paso 2: Habilitar Firestore (1 minuto)
1. En el menú lateral → **"Firestore Database"**
2. Haz clic en **"Crear base de datos"**
3. Selecciona **"Comenzar en modo de prueba"**
4. Ubicación: `us-central` (o la más cercana)
5. Haz clic en **"Habilitar"**

### Paso 3: Configurar Reglas de Seguridad (2 minutos)
1. En Firestore Database → pestaña **"Rules"**
2. Copia las reglas de abajo
3. Pégalas en el editor
4. Haz clic en **"Publicar"**

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

### Paso 4: Descargar Service Account Key (2 minutos)
1. Configuración del proyecto (ícono de engranaje) → **"Configuración"**
2. Pestaña **"Cuentas de servicio"** o **"Service accounts"**
3. Haz clic en **"Generar nueva clave privada"** o **"Generate new private key"**
4. Se descargará un archivo JSON (ej: `ecommerce-firestore-xxxxx.json`)
5. **Renombra** el archivo a: `serviceAccountKey.json`
6. **Mueve** el archivo a la carpeta `backend/` de tu proyecto

```
backend/
├── serviceAccountKey.json  ← Aquí debe estar
├── package.json
└── src/
```

### Paso 5: Migrar Datos y Probar (1 minuto)

Una vez que tengas `serviceAccountKey.json` en `backend/`, ejecuta:

```bash
cd backend
npm run migrate    # Migra datos de SQLite a Firestore
npm run dev        # Inicia el servidor
```

## ✅ Verificación

Si todo está bien, verás:
```
✅ Firestore inicializado correctamente
Backend listening on 4000
```

## 🆘 Si Algo Sale Mal

- **Error: "Firestore no está inicializado"**
  → Verifica que `backend/serviceAccountKey.json` exista

- **Error: "Permission denied"**
  → Verifica que hayas publicado las reglas en Firebase Console

- **No se ven datos**
  → Ejecuta `npm run migrate` para migrar desde SQLite

## 📚 Documentación Completa

Para más detalles, consulta: [MIGRACION_FIRESTORE.md](MIGRACION_FIRESTORE.md)


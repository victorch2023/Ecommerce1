# Guía de Configuración - Firebase E-commerce

## Paso 1: Crear Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Agregar proyecto"
3. Ingresa un nombre para tu proyecto (ej: "ecommerce-demo")
4. Sigue los pasos del asistente
5. Una vez creado, selecciona tu proyecto

## Paso 2: Configurar Authentication

1. En el menú lateral, ve a **Authentication**
2. Haz clic en "Comenzar"
3. Habilita el proveedor **Email/Password**
4. Guarda los cambios

## Paso 3: Crear Base de Datos Firestore

1. En el menú lateral, ve a **Firestore Database**
2. Haz clic en "Crear base de datos"
3. Selecciona modo **Producción** (o Prueba para desarrollo)
4. Elige una ubicación (ej: us-central)
5. Haz clic en "Habilitar"

## Paso 4: Aplicar Reglas de Firestore

1. En Firestore Database, ve a la pestaña **Rules**
2. Abre el archivo `docs/firestore.rules` de este proyecto
3. Copia todo el contenido
4. Pégalo en el editor de reglas de Firebase Console
5. Haz clic en "Publicar"

## Paso 5: Habilitar Firebase Storage (Opcional pero Recomendado)

1. En el menú lateral, ve a **Storage**
2. Haz clic en "Comenzar" o "Get started"
3. Acepta las reglas por defecto (luego las actualizamos)
4. Elige la ubicación (misma que Firestore)

## Paso 6: Aplicar Reglas de Storage

1. En Storage, ve a la pestaña **Rules**
2. Abre el archivo `docs/storage.rules` de este proyecto
3. Copia todo el contenido
4. Pégalo en el editor de reglas de Firebase Console
5. Haz clic en "Publicar"

## Paso 7: Obtener Configuración del Frontend

1. Ve a **Project Settings** (ícono de engranaje)
2. Desplázate hasta "Your apps"
3. Haz clic en el ícono de **Web** (`</>`)
4. Registra un nombre para la app (ej: "ecommerce-frontend")
5. Copia los valores de configuración que aparecen

## Paso 8: Configurar Frontend

### Opción A: Usando archivo .env.local (Recomendado)

1. Crea el archivo `frontend/.env.local` (copia de `frontend/.env.example` si existe)
2. Pega los valores de Firebase:

```env
REACT_APP_FIREBASE_API_KEY=tu_api_key_aqui
REACT_APP_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=tu-proyecto-id
REACT_APP_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abcdef
```

### Opción B: Editar directamente firebase.js

1. Abre `frontend/src/firebase.js`
2. Reemplaza los valores `YOUR_*` con tus credenciales reales de Firebase

## Paso 9: Configurar Backend (Service Account)

1. En Firebase Console, ve a **Project Settings**
2. Ve a la pestaña **Service Accounts**
3. Haz clic en "Generate new private key"
4. Se descargará un archivo JSON
5. Renombra ese archivo a `serviceAccountKey.json`
6. Muévelo a la carpeta `backend/`

⚠️ **IMPORTANTE**: Nunca subas este archivo a Git. Ya está en `.gitignore`

## Paso 10: Verificar Dominios Autorizados

1. En Firebase Console, ve a **Authentication → Settings → Authorized domains**
2. Verifica que estén incluidos:
   - `localhost` (ya debería estar)
   - Tu dominio de producción (si aplica)

## Paso 11: Instalar Dependencias

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

## Paso 12: Sembrar Datos de Prueba (Opcional pero Recomendado)

```bash
cd backend
npm run seed
```

Esto creará algunos productos de ejemplo en Firestore.

## Paso 13: Ejecutar la Aplicación

### Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Deberías ver: `Backend listening on 4000` y `✅ Firebase admin inicializado correctamente`

### Terminal 2 - Frontend:
```bash
cd frontend
npm start
```

La aplicación se abrirá automáticamente en `http://localhost:3000`

## Verificación

1. ✅ El frontend debería cargar sin errores en la consola del navegador
2. ✅ Deberías ver productos en la página Home (si ejecutaste el seeder)
3. ✅ El login debería funcionar (puedes crear una cuenta nueva)
4. ✅ El backend debería responder en `http://localhost:4000/api/products`

## Solución de Problemas

### Error: "Firebase no está configurado"
- Verifica que `frontend/.env.local` tenga los valores correctos
- O que `frontend/src/firebase.js` tenga los valores reales (no `YOUR_*`)
- Reinicia el servidor de desarrollo (`npm start`)

### Error: "serviceAccountKey.json no encontrado"
- Asegúrate de haber descargado el service account key desde Firebase
- Verifica que esté en `backend/serviceAccountKey.json` (no en otra carpeta)
- Verifica que el archivo tenga el formato JSON correcto

### Error: "Permission denied" en Firestore
- Verifica que hayas aplicado las reglas de Firestore en Firebase Console
- Asegúrate de que las reglas permitan lectura de productos (`allow read: if true`)
- Si estás intentando escribir, verifica que estés autenticado

### No se ven productos
- Ejecuta el seeder: `cd backend && npm run seed`
- Verifica en Firebase Console que exista la colección "products" en Firestore
- Verifica que las reglas de Firestore permitan lectura pública

### Error: "Firebase admin init failed"
- Verifica que `backend/serviceAccountKey.json` exista y sea válido
- Verifica que el archivo JSON no esté corrupto
- Asegúrate de que el proyecto ID en el service account coincida con tu proyecto

### Error de CORS en el navegador
- Verifica que el backend esté corriendo en el puerto 4000
- Verifica que `backend/src/server.js` tenga `app.use(cors())` configurado

## Estructura de Datos en Firestore

### Colección: `products`
```javascript
{
  name: string,
  price: number,
  description: string,
  stock: number,
  image: string (URL opcional)
}
```

### Colección: `orders`
```javascript
{
  userId: string,
  items: array,
  total: number,
  createdAt: timestamp
}
```

### Colección: `carts`
```javascript
{
  userId: string,
  items: array,
  updatedAt: timestamp
}
```

## Próximos Pasos

- [ ] Agregar funcionalidad de carrito de compras
- [ ] Implementar sistema de pagos
- [ ] Agregar imágenes reales de productos usando Firebase Storage
- [ ] Implementar sistema de roles (admin/user)
- [ ] Agregar búsqueda y filtros de productos
- [ ] Implementar reviews/ratings de productos





# 🪣 Crear Bucket de Google Cloud Storage

## 🎯 Opción 1: Habilitar Firebase Storage (Recomendado - Crea el bucket automáticamente)

Firebase Storage crea automáticamente el bucket `ecommerce1-chowwha.appspot.com` cuando lo habilitas.

### Pasos:

1. **Ve a Firebase Console:**
   👉 https://console.firebase.google.com/project/ecommerce1-chowwha/storage

2. **Haz clic en "Get Started" o "Comenzar"**

3. **Acepta las reglas por defecto** (luego las actualizaremos)

4. **Elige la ubicación** (recomiendo `us-central` - misma que Firestore)

5. **Haz clic en "Done"**

✅ **El bucket se creará automáticamente como:** `ecommerce1-chowwha.appspot.com`

---

## 🎯 Opción 2: Crear Bucket Manualmente con Script

Si prefieres crear el bucket directamente sin habilitar Firebase Storage:

### Paso 1: Obtener Service Account Key

1. Ve a [Firebase Console - Service Accounts](https://console.firebase.google.com/project/ecommerce1-chowwha/settings/serviceaccounts/adminsdk)
2. Haz clic en "Generate new private key"
3. Guarda el archivo JSON como `backend/serviceAccountKey.json`

### Paso 2: Ejecutar Script

```bash
cd backend
./src/scripts/setupGCS.sh
```

O directamente:

```bash
cd backend
node src/scripts/createBucket.js
```

---

## 🎯 Opción 3: Crear desde Google Cloud Console

1. Ve a [Google Cloud Console - Storage](https://console.cloud.google.com/storage?project=ecommerce1-chowwha)
2. Haz clic en "Create Bucket"
3. Nombre: `ecommerce1-chowwha.appspot.com` (o el que prefieras)
4. Ubicación: `us-central` (recomendado)
5. Clase: `Standard`
6. Haz clic en "Create"

---

## ✅ Verificación

Después de crear el bucket, verifica que existe:

```bash
# Si tienes gcloud CLI instalado
gsutil ls gs://ecommerce1-chowwha.appspot.com

# O desde el código (una vez tengas serviceAccountKey.json)
cd backend
node src/scripts/createBucket.js
```

---

## 📝 Nota Importante

**El bucket por defecto de Firebase es:** `{project-id}.appspot.com`

En tu caso: `ecommerce1-chowwha.appspot.com`

Este bucket se crea automáticamente cuando habilitas Firebase Storage, así que la **Opción 1 es la más simple**.

---

## 🚀 Después de Crear el Bucket

Una vez que el bucket existe, puedes:

1. **Desplegar reglas de Storage:**
   ```bash
   firebase deploy --only storage:rules
   ```

2. **Usar el servicio de almacenamiento:**
   - El código ya está configurado en `frontend/src/services/storageService.js`
   - Las rutas del backend están en `backend/src/routes/storage.js`

3. **Configurar variables de entorno:**
   ```env
   # backend/.env
   GOOGLE_CLOUD_PROJECT_ID=ecommerce1-chowwha
   GCS_BUCKET_NAME=ecommerce1-chowwha.appspot.com
   ```




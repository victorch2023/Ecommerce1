# 🔐 Cómo Obtener Tokens de Autenticación

Esta guía te explica dónde obtener los tokens necesarios para diferentes servicios.

## 🔑 GitHub Personal Access Token

### ¿Cuándo lo necesitas?
- Para hacer `git push` a repositorios privados
- Para usar `gh-pages` para deploy
- Para autenticación en GitHub desde terminal

### ¿Dónde obtenerlo?

1. **Ve a GitHub:**
   - URL: https://github.com/settings/tokens
   - O: GitHub → Tu foto (arriba derecha) → Settings → Developer settings → Personal access tokens → Tokens (classic)

2. **Crear nuevo token:**
   - Click en **"Generate new token (classic)"**
   - **Note:** Pon un nombre descriptivo (ej: "Ecommerce1 Deploy")
   - **Expiration:** Elige cuánto tiempo quieres que dure (90 días, 1 año, o sin expiración)
   - **Select scopes:** Marca estas opciones:
     - ✅ `repo` (marca TODA la sección, no solo una casilla)
     - ✅ `workflow` (si usas GitHub Actions)

3. **Generar:**
   - Click en **"Generate token"** (abajo)
   - **⚠️ IMPORTANTE:** Copia el token INMEDIATAMENTE (solo se muestra una vez)
   - El token se verá así: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### ¿Dónde insertarlo?

**Opción 1: Cuando git pide credenciales**
```
Username: victorch2023
Password: [pega aquí el token]
```

**Opción 2: En la URL del remote (temporal)**
```bash
git remote set-url origin https://TU_TOKEN@github.com/victorch2023/Ecommerce1.git
```

**Opción 3: En ~/.git-credentials (permanente)**
```bash
echo "https://TU_TOKEN@github.com" > ~/.git-credentials
git config --global credential.helper store
```

## 🔥 Firebase Service Account Key

### ¿Cuándo lo necesitas?
- Para que el backend se conecte a Firestore
- Para usar Firebase Admin SDK

### ¿Dónde obtenerlo?

1. **Ve a Firebase Console:**
   - URL: https://console.firebase.google.com/
   - Selecciona tu proyecto

2. **Obtener Service Account:**
   - Click en el ícono de ⚙️ (Configuración) → **Project settings**
   - Ve a la pestaña **"Service accounts"**
   - Click en **"Generate new private key"**
   - Click en **"Generate key"** en el diálogo

3. **Descargar:**
   - Se descargará un archivo JSON
   - Renómbralo a `serviceAccountKey.json`

### ¿Dónde insertarlo?

**En el proyecto:**
```bash
# Coloca el archivo en:
backend/serviceAccountKey.json
```

**⚠️ IMPORTANTE:** Este archivo NO debe subirse a GitHub (ya está en .gitignore)

## 🌐 Render (Variables de Entorno)

### ¿Cuándo lo necesitas?
- Para desplegar el backend en Render
- Para configurar SERVICE_ACCOUNT_KEY en Render

### ¿Dónde obtenerlo?

1. **Service Account Key de Firebase:**
   - Sigue los pasos de arriba para obtener `serviceAccountKey.json`
   - Convierte el JSON a una sola línea:
     ```bash
     cat serviceAccountKey.json | jq -c .
     ```
   - O simplemente copia todo el contenido del JSON

### ¿Dónde insertarlo?

**En Render Dashboard:**
1. Ve a tu servicio en Render: https://dashboard.render.com
2. Click en tu servicio (ej: `ecommerce1-backend`)
3. Ve a **"Environment"** (menú lateral)
4. Click en **"Add Environment Variable"**
5. **Key:** `SERVICE_ACCOUNT_KEY`
6. **Value:** (pega el JSON completo, una sola línea)
7. Click en **"Save Changes"**

## 📋 Resumen de Tokens

| Servicio | Token | Dónde Obtener | Dónde Insertar |
|----------|-------|---------------|----------------|
| GitHub | Personal Access Token | github.com/settings/tokens | Terminal (cuando pide password) |
| Firebase | serviceAccountKey.json | Firebase Console → Service Accounts | `backend/serviceAccountKey.json` |
| Render | SERVICE_ACCOUNT_KEY | Mismo que Firebase | Render Dashboard → Environment |

## 🔒 Seguridad

- ⚠️ **NUNCA** subas tokens a GitHub
- ⚠️ **NUNCA** compartas tokens públicamente
- ✅ Usa tokens con permisos mínimos necesarios
- ✅ Rota tokens periódicamente
- ✅ Revoca tokens que ya no uses

## 💡 Tips

1. **GitHub Token:** Si expira, simplemente genera uno nuevo
2. **Firebase Key:** Solo necesitas uno por proyecto
3. **Render:** Puedes actualizar variables de entorno sin redeploy


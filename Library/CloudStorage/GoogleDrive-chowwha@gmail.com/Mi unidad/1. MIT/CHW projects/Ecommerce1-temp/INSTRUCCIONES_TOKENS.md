# 🔐 Instrucciones para Tokens - Guía Rápida

## 📋 Resumen

Cuando necesites un token para autenticación, aquí está exactamente dónde obtenerlo y cómo usarlo.

---

## 🔑 GitHub Personal Access Token

### ¿Cuándo lo necesitas?
- Para hacer `git push` a GitHub
- Para usar `gh-pages` para deploy
- Para cualquier operación que requiera escribir en GitHub

### 📍 Dónde obtenerlo:

1. **Abre tu navegador y ve a:**
   ```
   https://github.com/settings/tokens
   ```

2. **O navega manualmente:**
   - GitHub.com → Tu foto (arriba derecha) → **Settings**
   - Menú lateral izquierdo → **Developer settings**
   - **Personal access tokens** → **Tokens (classic)**

3. **Crear nuevo token:**
   - Click en **"Generate new token (classic)"**
   - **Note:** Pon un nombre (ej: "Ecommerce1 Deploy")
   - **Expiration:** Elige duración (90 días, 1 año, o sin expiración)
   - **Select scopes:** 
     - ✅ Marca **TODA la sección `repo`** (no solo una casilla)
     - ✅ Si usas GitHub Actions, marca también `workflow`
   - Click en **"Generate token"** (abajo)

4. **⚠️ IMPORTANTE:** 
   - Copia el token INMEDIATAMENTE
   - Se verá así: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - **Solo se muestra una vez** - si lo pierdes, crea uno nuevo

### 🔧 Dónde insertarlo:

**Cuando git pide credenciales:**
```
Username: victorch2023
Password: [pega aquí el token completo]
```

**O en la URL del remote (temporal):**
```bash
git remote set-url origin https://TU_TOKEN@github.com/victorch2023/Ecommerce1.git
```

---

## 🔥 Firebase Service Account Key

### ¿Cuándo lo necesitas?
- Para que el backend se conecte a Firestore
- Para usar Firebase Admin SDK

### 📍 Dónde obtenerlo:

1. **Abre tu navegador y ve a:**
   ```
   https://console.firebase.google.com/
   ```

2. **Selecciona tu proyecto** (ej: `ecommerce1-chowwha`)

3. **Obtener Service Account:**
   - Click en el ícono de ⚙️ (arriba izquierda) → **Project settings**
   - Pestaña **"Service accounts"**
   - Click en **"Generate new private key"**
   - Click en **"Generate key"** en el diálogo de confirmación

4. **Descargar:**
   - Se descargará un archivo JSON automáticamente
   - Renómbralo a `serviceAccountKey.json`

### 🔧 Dónde insertarlo:

**En tu proyecto local:**
```bash
# Coloca el archivo en:
backend/serviceAccountKey.json
```

**⚠️ IMPORTANTE:** Este archivo NO debe subirse a GitHub (ya está en `.gitignore`)

**Para Render (producción):**
1. Ve a: https://dashboard.render.com
2. Selecciona tu servicio (ej: `ecommerce1-backend`)
3. **Environment** → **Add Environment Variable**
4. **Key:** `SERVICE_ACCOUNT_KEY`
5. **Value:** Copia TODO el contenido del JSON (una sola línea)
6. **Save Changes**

---

## 📝 Resumen Visual

```
GitHub Token:
┌─────────────────────────────────────┐
│ 1. https://github.com/settings/     │
│    tokens                            │
│ 2. Generate new token (classic)     │
│ 3. Marca toda la sección "repo"     │
│ 4. Copia el token (ghp_xxxxx)       │
│ 5. Úsalo cuando git pida password   │
└─────────────────────────────────────┘

Firebase Key:
┌─────────────────────────────────────┐
│ 1. https://console.firebase.google. │
│    com/                             │
│ 2. Project Settings → Service        │
│    Accounts                          │
│ 3. Generate new private key         │
│ 4. Descarga el JSON                 │
│ 5. Colócalo en backend/              │
└─────────────────────────────────────┘
```

---

## ✅ Checklist Rápido

- [ ] **GitHub Token:** ¿Tienes uno creado?
  - Si no: https://github.com/settings/tokens
  - Permisos: `repo` (toda la sección)

- [ ] **Firebase Key:** ¿Existe `backend/serviceAccountKey.json`?
  - Si no: Firebase Console → Service Accounts → Generate key

- [ ] **Render Variables:** ¿Está `SERVICE_ACCOUNT_KEY` configurada?
  - Si no: Render Dashboard → Environment → Add Variable

---

## 💡 Tips

1. **GitHub Token expira:** Simplemente crea uno nuevo cuando expire
2. **Firebase Key:** Solo necesitas uno por proyecto
3. **Nunca compartas tokens:** Son como contraseñas
4. **Rota tokens periódicamente:** Por seguridad

---

## 🆘 Si algo falla

**Error: "Permission denied"**
- Verifica que el token tenga permisos `repo` completos
- Crea un token nuevo si es necesario

**Error: "Firestore no está inicializado"**
- Verifica que `serviceAccountKey.json` exista en `backend/`
- Verifica que el JSON sea válido

**Error: "403 Forbidden" en GitHub**
- El token puede haber expirado
- Crea un token nuevo con permisos completos


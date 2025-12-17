# 🔐 Token de GitHub con Permiso Workflow

## ⚠️ Problema Detectado

El token actual no tiene el permiso `workflow` necesario para actualizar GitHub Actions workflows.

## 🎯 Solución: Generar Nuevo Token con Permiso Workflow

### Paso 1: Ir a Configuración de Tokens

1. Ve a: **https://github.com/settings/tokens**
2. O navega:
   - Tu foto de perfil → **Settings**
   - **Developer settings** (menú izquierdo)
   - **Personal access tokens**
   - **Tokens (classic)**

### Paso 2: Generar Nuevo Token

1. Click en **Generate new token (classic)**

### Paso 3: Configurar Permisos

**Note:**
```
Ecommerce1 Full Access
```

**Expiration:**
- 90 días o No expiration

**Scopes - Marca ESTAS casillas:**

1. ✅ **repo** (marca TODA la sección)
   - repo:status
   - repo_deployment
   - public_repo
   - repo:invite
   - security_events

2. ✅ **workflow** (IMPORTANTE - necesario para workflows)
   - Permite actualizar GitHub Actions workflows

### Paso 4: Generar y Copiar

1. Click en **Generate token**
2. **⚠️ COPIA EL TOKEN INMEDIATAMENTE**
   - Se muestra solo UNA VEZ
   - Formato: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Paso 5: Usar el Nuevo Token

**Opción A: En la URL (Temporal)**
```bash
git remote set-url origin https://TU_NUEVO_TOKEN@github.com/victorch2023/Ecommerce1.git
git push origin main
git remote set-url origin https://github.com/victorch2023/Ecommerce1.git
```

**Opción B: Cuando Pida Credenciales**
- Username: `victorch2023`
- Password: `TU_NUEVO_TOKEN` (pega el token completo)

## 📋 Después de Obtener el Token

Una vez que tengas el nuevo token con permiso `workflow`:

1. **Hacer push del workflow:**
   ```bash
   cd "/Users/chowwha/Library/CloudStorage/GoogleDrive-chowwha@gmail.com/Mi unidad/1. MIT/CHW projects/Ecommerce1-temp"
   git remote set-url origin https://TU_NUEVO_TOKEN@github.com/victorch2023/Ecommerce1.git
   git push origin main
   git remote set-url origin https://github.com/victorch2023/Ecommerce1.git
   ```

2. **Verificar que el workflow se subió:**
   - Ve a: https://github.com/victorch2023/Ecommerce1/tree/main/.github/workflows
   - Deberías ver `deploy-gh-pages.yml`

3. **El deploy automático funcionará** en futuros pushes a `main`

## ✅ Resumen de Permisos Necesarios

- ✅ **repo** - Para hacer push/pull
- ✅ **workflow** - Para actualizar GitHub Actions workflows


# 🔐 Cómo Obtener Token de GitHub

## 📋 Cuándo Necesitas un Token

Necesitas un **Personal Access Token (PAT)** de GitHub cuando:
- Haces `git push` desde terminal
- Ejecutas `npm run deploy` para GitHub Pages
- GitHub te pide autenticación

## 🎯 Pasos para Obtener el Token

### Paso 1: Ir a Configuración de Tokens

1. Ve a: **https://github.com/settings/tokens**
2. O navega manualmente:
   - Click en tu foto de perfil (esquina superior derecha)
   - Click en **Settings**
   - En el menú izquierdo, click en **Developer settings**
   - Click en **Personal access tokens**
   - Click en **Tokens (classic)**

### Paso 2: Generar Nuevo Token

1. Click en **Generate new token**
2. Selecciona **Generate new token (classic)**

### Paso 3: Configurar el Token

**Note (Nombre):**
```
Ecommerce1 Deploy
```
(O cualquier nombre que te ayude a recordar)

**Expiration (Expiración):**
- Selecciona el tiempo que quieras (recomendado: 90 días o No expiration)

**Scopes (Permisos):**
**IMPORTANTE:** Marca estas casillas:
- ✅ **repo** (marca TODA la sección, no solo una casilla)
  - Esto incluye automáticamente:
    - repo:status
    - repo_deployment
    - public_repo
    - repo:invite
    - security_events
- ✅ **workflow** (necesario para actualizar GitHub Actions workflows)

### Paso 4: Generar y Copiar

1. Click en **Generate token** (al final de la página)
2. **⚠️ IMPORTANTE:** Copia el token INMEDIATAMENTE
   - Se muestra solo UNA VEZ
   - Si lo pierdes, tendrás que generar uno nuevo
   - El token se verá así: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Paso 5: Guardar el Token

Guarda el token en un lugar seguro:
- Notas seguras
- Gestor de contraseñas
- Archivo de texto encriptado

**⚠️ NUNCA** subas el token a GitHub o lo compartas públicamente.

## 🔧 Cómo Usar el Token

### Opción 1: En la URL del Remote (Temporal)

```bash
git remote set-url origin https://TU_TOKEN@github.com/victorch2023/Ecommerce1.git
git push origin main
git remote set-url origin https://github.com/victorch2023/Ecommerce1.git  # Restaurar
```

### Opción 2: Cuando Git Pide Credenciales

Cuando ejecutes `git push` o `npm run deploy` y pida credenciales:

**Username (Usuario):**
```
victorch2023
```

**Password (Contraseña):**
```
TU_TOKEN_AQUI
```
(Pega el token completo, NO tu contraseña de GitHub)

### Opción 3: Configurar Git Credential Helper (Permanente)

```bash
# Guardar credenciales
git config --global credential.helper store

# La primera vez que hagas push, pega el token cuando pida password
# Después se guardará automáticamente
```

## 📝 Ejemplo Completo

```bash
# 1. Hacer cambios
git add .
git commit -m "Mis cambios"

# 2. Hacer push (pedirá credenciales)
git push origin main

# Cuando pida:
# Username: victorch2023
# Password: ghp_tu_token_aqui
```

## ⚠️ Seguridad

1. **NUNCA** subas el token a GitHub
2. **NUNCA** lo compartas públicamente
3. Si el token se expone, revócalo inmediatamente:
   - Ve a: https://github.com/settings/tokens
   - Click en el token
   - Click en **Revoke**

## 🔄 Renovar Token

Si el token expira:

1. Ve a: https://github.com/settings/tokens
2. Genera un nuevo token (mismo proceso)
3. Reemplaza el token antiguo con el nuevo

## ✅ Verificar que Funciona

```bash
git push origin main
```

Si funciona sin pedir credenciales o acepta el token, está correcto.


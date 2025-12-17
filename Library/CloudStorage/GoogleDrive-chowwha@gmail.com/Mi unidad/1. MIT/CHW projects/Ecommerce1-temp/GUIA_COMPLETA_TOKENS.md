# 🔐 Guía Completa: Tokens de GitHub

## 📋 Resumen

Esta guía explica **exactamente** cómo obtener y usar tokens de GitHub cuando se requiere autorización.

## 🎯 Cuándo Necesitas un Token

- ✅ Hacer `git push` desde terminal
- ✅ Ejecutar `npm run deploy` para GitHub Pages
- ✅ GitHub pide autenticación
- ✅ Actualizar GitHub Actions workflows

## 📍 Dónde Obtener el Token

### URL Directa:
**https://github.com/settings/tokens**

### Navegación Manual:
1. Ve a **github.com**
2. Click en tu **foto de perfil** (esquina superior derecha)
3. Click en **Settings**
4. En el menú izquierdo, click en **Developer settings**
5. Click en **Personal access tokens**
6. Click en **Tokens (classic)**
7. Click en **Generate new token (classic)**

## 🔧 Cómo Configurar el Token

### Paso 1: Nombre del Token
```
Ecommerce1 Full Access
```
(O cualquier nombre descriptivo)

### Paso 2: Expiración
- **Recomendado:** 90 días o No expiration

### Paso 3: Permisos (Scopes)

**Marca estas casillas:**

1. ✅ **repo** (marca TODA la sección)
   - Esto incluye automáticamente:
     - repo:status
     - repo_deployment
     - public_repo
     - repo:invite
     - security_events

2. ✅ **workflow** (si necesitas actualizar GitHub Actions)
   - Permite modificar workflows de GitHub Actions

### Paso 4: Generar
1. Scroll hacia abajo
2. Click en **Generate token** (botón verde)

### Paso 5: Copiar el Token
- ⚠️ **IMPORTANTE:** Copia el token INMEDIATAMENTE
- Se muestra solo UNA VEZ
- Formato: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- Si lo pierdes, tendrás que generar uno nuevo

## 💾 Dónde Guardar el Token

Guarda el token en un lugar seguro:
- ✅ Notas seguras (aplicación de notas con contraseña)
- ✅ Gestor de contraseñas (1Password, LastPass, etc.)
- ✅ Archivo de texto encriptado
- ❌ NO en GitHub
- ❌ NO en código público
- ❌ NO en mensajes de texto sin encriptar

## 🔨 Cómo Usar el Token

### Opción 1: En la URL del Remote (Temporal)

```bash
# Configurar remote con token
git remote set-url origin https://TU_TOKEN@github.com/victorch2023/Ecommerce1.git

# Hacer push
git push origin main

# Restaurar remote (sin token por seguridad)
git remote set-url origin https://github.com/victorch2023/Ecommerce1.git
```

### Opción 2: Cuando Git Pide Credenciales

Cuando ejecutes comandos como `git push` o `npm run deploy`:

**Username (Usuario):**
```
victorch2023
```

**Password (Contraseña):**
```
TU_TOKEN_AQUI
```
⚠️ Pega el **token completo**, NO tu contraseña de GitHub.

### Opción 3: Configurar Git Credential Helper (Permanente)

```bash
# Guardar credenciales automáticamente
git config --global credential.helper store

# La primera vez que hagas push, pega el token cuando pida password
# Después se guardará automáticamente
```

## 📝 Ejemplo Completo

```bash
# 1. Hacer cambios
cd "/Users/chowwha/Library/CloudStorage/GoogleDrive-chowwha@gmail.com/Mi unidad/1. MIT/CHW projects/Ecommerce1"
git add .
git commit -m "Mis cambios"

# 2. Hacer push (pedirá credenciales)
git push origin main

# Cuando pida:
# Username: victorch2023
# Password: ghp_tu_token_aqui
```

## ⚠️ Seguridad

### ✅ Hacer:
- Guardar el token de forma segura
- Usar tokens con expiración razonable
- Revocar tokens que ya no uses

### ❌ NO Hacer:
- Subir el token a GitHub
- Compartir el token públicamente
- Dejar el token en código sin encriptar
- Usar el mismo token en múltiples proyectos públicos

## 🔄 Si el Token se Expone

Si accidentalmente expones tu token:

1. **Revócalo inmediatamente:**
   - Ve a: https://github.com/settings/tokens
   - Click en el token expuesto
   - Click en **Revoke**

2. **Genera un nuevo token** (mismo proceso)

3. **Reemplaza el token antiguo** en todos los lugares donde lo usabas

## 🔄 Renovar Token Expirado

Si tu token expira:

1. Ve a: https://github.com/settings/tokens
2. Genera un nuevo token (mismo proceso)
3. Reemplaza el token antiguo con el nuevo
4. Actualiza cualquier configuración que use el token

## ✅ Verificar que Funciona

```bash
git push origin main
```

Si funciona sin errores de autenticación, el token está correcto.

## 📚 Referencias

- **Configuración de Tokens:** https://github.com/settings/tokens
- **Documentación de GitHub:** https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

## 🆘 Problemas Comunes

### Error: "Permission denied"
- **Causa:** Token sin permisos suficientes
- **Solución:** Genera nuevo token con permisos `repo` y `workflow`

### Error: "Token expired"
- **Causa:** Token expiró
- **Solución:** Genera nuevo token y reemplázalo

### Error: "Invalid credentials"
- **Causa:** Token incorrecto o copiado mal
- **Solución:** Verifica que copiaste el token completo (empieza con `ghp_`)


# Desplegar Reglas de Firebase Automáticamente

Este documento explica cómo usar Firebase CLI para aplicar las reglas automáticamente, sin necesidad de copiar/pegar manualmente.

## 🎯 Ventajas del Método Automático

- ✅ Aplicación instantánea de reglas
- ✅ Versionado de reglas junto con el código
- ✅ Posibilidad de automatizar en CI/CD
- ✅ Menos errores humanos

## 📋 Requisitos Previos

1. Tener Node.js instalado
2. Tener un proyecto Firebase creado
3. Tener permisos de administrador en el proyecto Firebase

## 🚀 Instalación y Configuración

### Paso 1: Instalar Firebase CLI

```bash
npm install -g firebase-tools
```

### Paso 2: Autenticarse en Firebase

```bash
firebase login
```

Esto abrirá tu navegador para autenticarte con tu cuenta de Google.

### Paso 3: Inicializar Firebase en el Proyecto

Desde la raíz del proyecto, ejecuta:

```bash
firebase init
```

Cuando te pregunte qué servicios configurar:
- ✅ Selecciona **Firestore** (presiona Espacio para seleccionar)
- ✅ Selecciona **Storage** (presiona Espacio para seleccionar)
- Presiona Enter para continuar

Cuando te pregunte qué proyecto usar:
- Selecciona tu proyecto Firebase de la lista
- O escribe el ID de tu proyecto manualmente

Para las preguntas sobre archivos:
- **Firestore rules file**: `docs/firestore.rules` (ya existe)
- **Firestore indexes file**: Presiona Enter (no necesario por ahora)
- **Storage rules file**: `docs/storage.rules` (ya existe)

### Paso 4: Actualizar .firebaserc (si es necesario)

Si ya tienes un proyecto configurado, edita `.firebaserc` y reemplaza `"your-project-id"` con el ID real de tu proyecto Firebase.

## 🎬 Desplegar las Reglas

### Opción A: Usando el Script Automático (Recomendado)

#### En macOS/Linux:
```bash
chmod +x scripts/deploy-rules.sh
./scripts/deploy-rules.sh
```

#### En Windows o si prefieres Node.js:
```bash
node scripts/deploy-rules.js
```

### Opción B: Usando Firebase CLI Directamente

```bash
# Desplegar solo reglas de Firestore
firebase deploy --only firestore:rules

# Desplegar solo reglas de Storage
firebase deploy --only storage:rules

# Desplegar ambas
firebase deploy --only firestore:rules,storage:rules
```

## 🔍 Verificación

Después de desplegar, verifica en Firebase Console:

1. Ve a **Firestore Database → Rules** - deberías ver las nuevas reglas
2. Ve a **Storage → Rules** - deberías ver las nuevas reglas

## 🔄 Actualizar Reglas en el Futuro

Cada vez que modifiques `docs/firestore.rules` o `docs/storage.rules`, simplemente ejecuta:

```bash
./scripts/deploy-rules.sh
# o
node scripts/deploy-rules.js
# o
firebase deploy --only firestore:rules,storage:rules
```

## ⚠️ Solución de Problemas

### Error: "Firebase CLI not found"
```bash
npm install -g firebase-tools
```

### Error: "Not logged in"
```bash
firebase login
```

### Error: "No project selected"
```bash
firebase use your-project-id
# o edita .firebaserc manualmente
```

### Error: "Permission denied"
- Verifica que tengas permisos de administrador en el proyecto Firebase
- Verifica que estés usando la cuenta correcta: `firebase login:list`

### Error: "Storage rules deployment failed"
- Esto es normal si Storage no está habilitado en tu proyecto
- Puedes ignorar este error o habilitar Storage en Firebase Console

## 🎓 Comandos Útiles de Firebase CLI

```bash
# Ver proyectos disponibles
firebase projects:list

# Cambiar de proyecto
firebase use project-id

# Ver configuración actual
firebase projects:list

# Ver reglas actuales
firebase firestore:rules:get
firebase storage:rules:get
```

## 📝 Notas Importantes

- Las reglas se aplican **inmediatamente** después del deploy
- No necesitas reiniciar servidores
- Los cambios son **irreversibles** sin un backup, así que verifica antes de desplegar
- Puedes ver el historial de cambios en Firebase Console

## 🔐 Seguridad

- Nunca compartas tu token de autenticación de Firebase CLI
- El archivo `.firebaserc` puede estar en Git (solo contiene el ID del proyecto)
- El archivo `firebase.json` puede estar en Git (solo contiene rutas a archivos de reglas)





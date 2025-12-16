# 🚀 Inicio Rápido - Configurar Firebase CLI

Firebase CLI ya está **instalado** en tu sistema. Solo necesitas autenticarte y configurar tu proyecto.

## ⚡ Configuración en 3 Pasos

### Paso 1: Autenticarte (Requiere Interacción)

Ejecuta este comando. Se abrirá tu navegador para que inicies sesión:

```bash
firebase login
```

**Qué esperar:**
1. Se abrirá tu navegador automáticamente
2. Inicia sesión con tu cuenta de Google (la misma que usas en Firebase Console)
3. Autoriza el acceso a Firebase CLI
4. Verás un mensaje de éxito en la terminal

### Paso 2: Configurar tu Proyecto

**Opción A: Script Automático (Recomendado)**

```bash
./scripts/setup-firebase.sh
```

Este script te guiará paso a paso:
- Te mostrará tus proyectos disponibles
- Te pedirá que ingreses el ID de tu proyecto
- Configurará todo automáticamente
- Desplegará las reglas

**Opción B: Manual**

```bash
# Ver tus proyectos
firebase projects:list

# Seleccionar tu proyecto (reemplaza YOUR-PROJECT-ID)
firebase use YOUR-PROJECT-ID

# O agregarlo como proyecto por defecto
firebase use YOUR-PROJECT-ID --add
```

### Paso 3: Desplegar Reglas

Si usaste el script automático, las reglas ya están desplegadas. Si no, ejecuta:

```bash
# Desplegar ambas reglas
firebase deploy --only firestore:rules,storage:rules

# O usar el script
./scripts/deploy-rules.sh
```

## ✅ Verificación

Después de completar los pasos, verifica en Firebase Console:

1. **Firestore Database → Rules** - Deberías ver las nuevas reglas
2. **Storage → Rules** - Deberías ver las nuevas reglas

## 🔄 Desplegar Reglas en el Futuro

Cada vez que modifiques `docs/firestore.rules` o `docs/storage.rules`:

```bash
./scripts/deploy-rules.sh
```

O directamente:

```bash
firebase deploy --only firestore:rules,storage:rules
```

## 🆘 Problemas Comunes

### "Error: Cannot run login in non-interactive mode"
- Ejecuta `firebase login` en tu terminal (no desde un script)
- Asegúrate de tener una sesión de terminal interactiva

### "Error: Failed to authenticate"
- Asegúrate de haber completado `firebase login` exitosamente
- Verifica que estés usando la misma cuenta de Google que en Firebase Console

### "Error: No project selected"
- Ejecuta `firebase use YOUR-PROJECT-ID`
- O edita `.firebaserc` manualmente con tu project ID

### "Permission denied" al desplegar
- Verifica que tengas permisos de administrador en el proyecto Firebase
- Verifica que estés usando la cuenta correcta: `firebase login:list`

## 📝 Notas

- Firebase CLI está instalado globalmente: `firebase --version` muestra la versión
- Tu autenticación se guarda localmente, no necesitas hacer login cada vez
- Las reglas se aplican inmediatamente después del deploy
- Puedes ver el historial de cambios en Firebase Console





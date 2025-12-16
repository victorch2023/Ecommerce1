# Cómo Aplicar las Reglas de Firebase

Este documento explica cómo copiar y pegar las reglas de seguridad en Firebase Console.

## 📋 Reglas de Firestore

### Paso 1: Abrir el Editor de Reglas
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto
3. En el menú lateral, ve a **Firestore Database**
4. Haz clic en la pestaña **Rules**

### Paso 2: Copiar las Reglas
1. Abre el archivo `docs/firestore.rules` de este proyecto
2. Selecciona todo el contenido (Cmd+A / Ctrl+A)
3. Copia (Cmd+C / Ctrl+C)

### Paso 3: Pegar y Publicar
1. En Firebase Console, borra el contenido actual del editor
2. Pega las reglas copiadas (Cmd+V / Ctrl+V)
3. Haz clic en el botón **"Publicar"** (arriba a la derecha)
4. Espera a que se confirme la publicación

✅ **Listo**: Las reglas de Firestore están aplicadas.

---

## 📦 Reglas de Storage

### Paso 1: Abrir el Editor de Reglas
1. En Firebase Console, ve a **Storage**
2. Haz clic en la pestaña **Rules**

### Paso 2: Copiar las Reglas
1. Abre el archivo `docs/storage.rules` de este proyecto
2. Selecciona todo el contenido (Cmd+A / Ctrl+A)
3. Copia (Cmd+C / Ctrl+C)

### Paso 3: Pegar y Publicar
1. En Firebase Console, borra el contenido actual del editor
2. Pega las reglas copiadas (Cmd+V / Ctrl+V)
3. Haz clic en el botón **"Publicar"** (arriba a la derecha)
4. Espera a que se confirme la publicación

✅ **Listo**: Las reglas de Storage están aplicadas.

---

## 🔍 Verificación

Después de aplicar las reglas, puedes verificar que funcionan:

1. **Firestore**: Intenta leer productos desde el frontend - debería funcionar sin autenticación
2. **Storage**: Si subes una imagen, debería funcionar para usuarios autenticados

## ⚠️ Nota Importante

Las reglas se aplican **inmediatamente** después de publicarlas. No hay necesidad de reiniciar servidores o hacer deploy.

## 🛠️ Alternativa: Firebase CLI

Si tienes Firebase CLI instalado, puedes aplicar las reglas automáticamente:

```bash
# Instalar Firebase CLI (si no lo tienes)
npm install -g firebase-tools

# Login
firebase login

# Inicializar Firebase en el proyecto (solo la primera vez)
firebase init firestore
firebase init storage

# Aplicar reglas
firebase deploy --only firestore:rules
firebase deploy --only storage:rules
```

Pero el método manual (copiar/pegar) es más simple y no requiere instalaciones adicionales.





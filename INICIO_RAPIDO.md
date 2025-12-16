# 🚀 Inicio Rápido - E-commerce Local

## Pasos para iniciar la aplicación

### 1️⃣ Instalar Dependencias (solo la primera vez)

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2️⃣ Poblar Base de Datos (opcional, solo la primera vez)

```bash
cd backend
npm run seed
```

Esto creará 4 productos de ejemplo en la base de datos.

### 3️⃣ Iniciar la Aplicación

**Opción A: Script Automático (Recomendado)**
```bash
./start.sh
```

**Opción B: Manual - Dos Terminales**

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### 4️⃣ Abrir en el Navegador

La aplicación se abrirá automáticamente en:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000/api

Si no se abre automáticamente, copia y pega la URL en tu navegador.

## ✅ Verificación

1. **Backend funcionando**: Deberías ver "Backend listening on 4000"
2. **Frontend funcionando**: Deberías ver "Compiled successfully!" y el navegador se abrirá
3. **Base de datos**: Se crea automáticamente en `backend/data/ecommerce.db`

## 🔐 Acceso de Administrador

Si necesitas acceso de administrador:

1. Inicia sesión con tu usuario
2. Ve a: http://localhost:3000/refresh-admin
3. O ejecuta en el backend:
   ```bash
   cd backend
   node src/scripts/makeAdmin.js tu-email@ejemplo.com
   ```

## 🐛 Solución de Problemas

### Error: "Cannot find module"
```bash
# Reinstalar dependencias
cd backend && npm install
cd ../frontend && npm install
```

### Error: "Port already in use"
```bash
# Detener procesos en los puertos
lsof -ti:3000 | xargs kill -9
lsof -ti:4000 | xargs kill -9
```

### La página está en blanco
1. Abre la consola del navegador (F12)
2. Verifica que el backend esté corriendo
3. Verifica que no haya errores en la consola

### No se ven productos
```bash
cd backend
npm run seed
```

## 📝 Notas

- El backend debe estar corriendo antes de usar el frontend
- La base de datos se crea automáticamente al iniciar el backend
- Los cambios en el código se reflejan automáticamente (hot reload)


# 🌐 Acceso a la Aplicación Web

## ✅ Estado Actual

Los servidores están corriendo:

- ✅ **Backend**: http://localhost:4000
- ✅ **Frontend**: http://localhost:3000

## 🚀 Cómo Acceder

### Opción 1: Abrir Manualmente en el Navegador

1. Abre tu navegador (Chrome, Firefox, Safari, etc.)
2. Ve a la siguiente dirección:
   ```
   http://localhost:3000
   ```

### Opción 2: Abrir desde la Terminal (macOS)

```bash
open http://localhost:3000
```

## 📋 Verificación

Si la página se abre correctamente, deberías ver:
- ✅ El título "🛒 Tienda Local"
- ✅ Una lista de productos (4 productos de ejemplo)
- ✅ Navegación con: Inicio, Carrito, Iniciar Sesión

## 🔧 Si No Funciona

### La página está en blanco
1. Abre la consola del navegador (F12 o Cmd+Option+I)
2. Revisa si hay errores en la pestaña "Console"
3. Verifica que el backend esté corriendo:
   ```bash
   curl http://localhost:4000/api/products
   ```

### Error de conexión
1. Verifica que ambos servidores estén corriendo:
   ```bash
   lsof -ti:3000  # Frontend
   lsof -ti:4000  # Backend
   ```
2. Si no están corriendo, inícialos:
   ```bash
   # Backend (Terminal 1)
   cd backend && npm run dev
   
   # Frontend (Terminal 2)
   cd frontend && npm start
   ```

### El navegador no se abre automáticamente
- Esto es normal, simplemente abre manualmente: http://localhost:3000

## 🎯 URLs Importantes

- **Página Principal**: http://localhost:3000
- **Login**: http://localhost:3000/login
- **Carrito**: http://localhost:3000/cart
- **Panel Admin**: http://localhost:3000/admin (requiere login como admin)
- **API Backend**: http://localhost:4000/api

## 📝 Notas

- El frontend necesita el backend para funcionar completamente
- Los cambios en el código se reflejan automáticamente (hot reload)
- Para detener los servidores, presiona Ctrl+C en las terminales donde están corriendo


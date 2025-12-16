# 🛒 Cómo Ver la Tienda Virtual en el Navegador

## ✅ Estado Actual

- ✅ **Backend funcionando**: http://localhost:4000
- ✅ **Base de datos**: 4 productos cargados
- ✅ **Frontend**: Iniciándose en http://localhost:3000

## 🚀 Pasos para Ver la Tienda

### Opción 1: Si los Servidores Ya Están Corriendo

1. **Abre tu navegador**
2. **Ve a**: http://localhost:3000
3. **Deberías ver**:
   - Página principal con 4 productos
   - Navegación: Home | Cart | Login

### Opción 2: Si Necesitas Iniciar los Servidores

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Espera a ver:
```
✅ Base de datos SQLite inicializada
✅ Base de datos SQLite lista
Backend listening on 4000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

Espera a que se abra automáticamente en http://localhost:3000

## 🎯 Qué Puedes Hacer en la Tienda

### 1. Ver Productos
- **URL**: http://localhost:3000
- **Qué verás**: Lista de 4 productos de ejemplo
- **Acción**: Haz clic en cualquier producto para ver detalles

### 2. Ver Detalles de Producto
- **URL**: http://localhost:3000/product/1 (o cualquier ID)
- **Qué verás**: Nombre, precio, descripción, stock, imagen

### 3. Registrarse / Iniciar Sesión
- **URL**: http://localhost:3000/login
- **Qué puedes hacer**:
  - Crear una cuenta nueva
  - Iniciar sesión con tu cuenta
  - El token se guarda automáticamente

### 4. Ver Carrito
- **URL**: http://localhost:3000/cart
- **Nota**: El carrito aún está en desarrollo

## 🔍 Verificar que Todo Funciona

### Backend (API)
Abre en tu navegador o usa curl:
- http://localhost:4000/api/products
- Deberías ver un JSON con 4 productos

### Frontend
- http://localhost:3000
- Deberías ver la página principal con productos

## 🐛 Si Algo No Funciona

### Error: "Cannot GET /"
- Verifica que el frontend esté corriendo
- Verifica que no haya errores en la terminal

### Error: "Network Error" o "Failed to fetch"
- Verifica que el backend esté corriendo en el puerto 4000
- Verifica la consola del navegador (F12) para más detalles

### No se ven productos
- Verifica que el backend esté respondiendo: http://localhost:4000/api/products
- Verifica la consola del navegador para errores

### Puerto 3000 o 4000 en uso
- Cierra otros procesos que usen esos puertos
- O cambia los puertos en las configuraciones

## 📸 Lo que Deberías Ver

1. **Página Principal**:
   - Título "Productos"
   - Lista de 4 productos:
     - Camiseta Básica - $19.99
     - Taza de Cerámica - $9.50
     - Laptop Stand - $29.99
     - Auriculares Inalámbricos - $79.99

2. **Página de Login**:
   - Formulario para registrarse o iniciar sesión
   - Botón para cambiar entre login y registro

3. **Página de Producto**:
   - Detalles completos del producto
   - Precio, descripción, stock

## 🎉 ¡Listo!

Tu tienda virtual está funcionando completamente en local. Puedes:
- ✅ Ver productos
- ✅ Registrarte e iniciar sesión
- ✅ Ver detalles de productos
- ✅ Todo funciona sin necesidad de internet (excepto para cargar imágenes placeholder)

¡Disfruta explorando tu tienda! 🛒



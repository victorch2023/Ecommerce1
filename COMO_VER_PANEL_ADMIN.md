# 🔐 Cómo Ver el Panel de Administrador

## 📋 Pasos para Acceder al Panel

### Paso 1: Verificar que los Servidores Estén Corriendo

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Deberías ver:
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

Deberías ver:
```
Compiled successfully!
You can now view the app in the browser.
  Local:            http://localhost:3000
```

### Paso 2: Abrir el Navegador

1. **Abre tu navegador** (Chrome, Firefox, Safari, etc.)

2. **Ve a:** http://localhost:3000

3. **Deberías ver** la página principal de la tienda

### Paso 3: Iniciar Sesión como Administrador

1. **Haz clic en "Iniciar Sesión"** en la navegación superior

2. **Ingresa tus credenciales:**
   - **Email:** `victor.chau777@hotmail.com`
   - **Contraseña:** (tu contraseña actual)

3. **Haz clic en "Iniciar Sesión"**

4. **Después de iniciar sesión**, verás:
   - Tu nombre/email en la navegación
   - **Un nuevo link "Admin"** en la navegación (solo visible para administradores)

### Paso 4: Acceder al Panel de Administración

**Opción A - Desde la Navegación:**
- Haz clic en el link **"Admin"** que aparece en la barra de navegación

**Opción B - URL Directa:**
- Ve directamente a: http://localhost:3000/admin

### Paso 5: Explorar el Panel

Una vez en el panel, verás:

1. **Dashboard Principal** (`/admin`)
   - Estadísticas generales
   - Órdenes recientes
   - Accesos rápidos

2. **Gestión de Productos** (`/admin/products`)
   - Crear, editar, eliminar productos

3. **Gestión de Órdenes** (`/admin/orders`)
   - Ver y gestionar todas las órdenes

4. **Gestión de Usuarios** (`/admin/users`)
   - Ver usuarios y cambiar roles

## 🔍 Si No Ves el Link "Admin"

### Verificación 1: ¿Estás logueado?
- Verifica que veas tu nombre/email en la navegación
- Si no, inicia sesión primero

### Verificación 2: ¿Tu usuario es admin?
```bash
cd backend
sqlite3 data/ecommerce.db "SELECT email, role FROM users WHERE email = 'victor.chau777@hotmail.com';"
```

Deberías ver: `victor.chau777@hotmail.com|admin`

### Verificación 3: ¿El rol está en el token?
- Cierra sesión y vuelve a iniciar sesión
- El rol se actualiza cuando haces login

### Verificación 4: ¿Los servidores están corriendo?
- Verifica que el backend responda: http://localhost:4000/api/products
- Verifica que el frontend responda: http://localhost:3000

## 🚨 Solución de Problemas

### Error: "Acceso denegado. Se requiere rol de administrador"
- Tu usuario no tiene rol admin
- Solución: Ejecuta:
  ```bash
  cd backend
  sqlite3 data/ecommerce.db "UPDATE users SET role = 'admin' WHERE email = 'victor.chau777@hotmail.com';"
  ```
- Luego cierra sesión y vuelve a iniciar sesión

### Error: "Cannot GET /admin"
- El frontend no está corriendo
- Solución: Inicia el frontend con `npm start`

### No aparece el link "Admin"
- Verifica que estés logueado
- Verifica que tu usuario tenga rol `admin`
- Cierra sesión y vuelve a iniciar sesión

## ✅ Resumen Rápido

1. ✅ Servidores corriendo (backend + frontend)
2. ✅ Abrir http://localhost:3000
3. ✅ Iniciar sesión con `victor.chau777@hotmail.com`
4. ✅ Ver link "Admin" en navegación
5. ✅ Hacer clic en "Admin" o ir a http://localhost:3000/admin

¡Listo! Ya puedes gestionar tu tienda desde el panel de administración 🎉



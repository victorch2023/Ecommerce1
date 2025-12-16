# 👑 Asignar Rol de Administrador

## ✅ Rol Asignado

He asignado el rol de administrador a tu usuario `victor.chau777@hotmail.com`.

## 🔄 Pasos para Activar el Rol

### Paso 1: Cerrar Sesión

1. **Haz clic en "Cerrar Sesión"** en la navegación
2. O ve a: http://localhost:3000/clear-storage

### Paso 2: Iniciar Sesión Nuevamente

1. **Haz clic en "Iniciar Sesión"**
2. Ingresa tus credenciales:
   - Email: `victor.chau777@hotmail.com`
   - Tu contraseña
3. **Haz clic en "Iniciar Sesión"**

### Paso 3: Acceder al Panel

1. **Haz clic en "PANEL ADMIN"** en la navegación
2. Ahora deberías poder acceder sin problemas

## 🔍 Verificación

Para verificar que el rol está asignado:

```bash
cd backend
sqlite3 data/ecommerce.db "SELECT email, role FROM users WHERE email = 'victor.chau777@hotmail.com';"
```

Deberías ver: `victor.chau777@hotmail.com|admin`

## 🛠️ Script para Asignar Rol a Otros Usuarios

Si necesitas asignar rol admin a otro usuario:

```bash
cd backend
node src/scripts/makeAdmin.js <email-del-usuario>
```

Ejemplo:
```bash
node src/scripts/makeAdmin.js otro@email.com
```

## ⚠️ Importante

- El rol se actualiza en la base de datos inmediatamente
- Pero necesitas **cerrar sesión y volver a iniciar sesión** para que el cambio tome efecto en el frontend
- Esto es porque el rol se guarda en el token JWT y en localStorage cuando haces login

## ✅ Estado Actual

- ✅ Tu usuario tiene rol `admin` en la base de datos
- ✅ El script de asignación está creado
- ⏳ Necesitas cerrar sesión y volver a iniciar sesión

¡Después de reiniciar sesión, podrás acceder al panel de administración! 🎉



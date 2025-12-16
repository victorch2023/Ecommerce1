# 📊 Índices de Firestore

Firestore requiere índices para consultas complejas. Si ves un error sobre índices faltantes, Firebase te dará un enlace directo para crearlos automáticamente.

## Índices Necesarios

### Colección: `orders`

1. **Consulta de órdenes por usuario ordenadas por fecha:**
   - Campo: `userId` (Ascending)
   - Campo: `createdAt` (Descending)
   - **Uso**: Cuando un usuario ve sus órdenes

2. **Consulta de órdenes por estado ordenadas por fecha:**
   - Campo: `status` (Ascending)
   - Campo: `createdAt` (Descending)
   - **Uso**: Panel de administración filtrando por estado

### Colección: `products`

1. **Consulta de productos ordenados por fecha:**
   - Campo: `createdAt` (Descending)
   - **Uso**: Lista de productos (ya está indexado automáticamente)

## 🔧 Cómo Crear Índices

### Opción 1: Automática (Recomendada)

Cuando ejecutes una consulta que requiera un índice, Firestore te mostrará un error con un enlace directo. Simplemente:

1. Haz clic en el enlace del error
2. Se abrirá Firebase Console con el índice pre-configurado
3. Haz clic en "Crear índice" o "Create index"
4. Espera a que se cree (puede tomar unos minutos)

### Opción 2: Manual

1. Ve a Firebase Console → Firestore Database → Indexes
2. Haz clic en "Crear índice" o "Create index"
3. Selecciona la colección
4. Agrega los campos necesarios
5. Configura el orden (Ascending/Descending)
6. Haz clic en "Crear"

## ⚠️ Nota Importante

Los índices se crean automáticamente cuando los necesitas. No es necesario crearlos de antemano a menos que quieras evitar el primer error.


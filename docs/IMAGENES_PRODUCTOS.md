# 🖼️ Imágenes de Productos - Sin Derechos de Autor

## ✅ Imágenes Actualizadas

Todos los productos en la tienda ahora usan imágenes reales de alta calidad, **completamente gratuitas y sin derechos de autor**, obtenidas de:

### Fuente: Unsplash
- **Licencia**: Unsplash License (gratuita para uso comercial y personal)
- **Calidad**: Alta resolución (500x500px optimizadas)
- **Sin atribución requerida**: Aunque es opcional y apreciada

## 📦 Productos con Imágenes Reales

1. **Camiseta Básica**
   - URL: `https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop`
   - Imagen profesional de camiseta

2. **Taza de Cerámica**
   - URL: `https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&h=500&fit=crop`
   - Imagen de taza de café

3. **Laptop Stand**
   - URL: `https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop`
   - Imagen de soporte para laptop

4. **Auriculares Inalámbricos**
   - URL: `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop`
   - Imagen de auriculares profesionales

## 🔄 Actualizar Imágenes

Si necesitas actualizar las imágenes de los productos, puedes:

### Opción 1: Usar el Script Automático
```bash
cd backend
node src/scripts/updateProductImages.js
```

### Opción 2: Actualizar Manualmente en la Base de Datos
```bash
cd backend
sqlite3 data/ecommerce.db
UPDATE products SET image = 'NUEVA_URL' WHERE id = 1;
```

### Opción 3: Usar la API
```bash
PUT /api/products/:id
{
  "image": "https://nueva-url-de-imagen.com/imagen.jpg"
}
```

## 📚 Recursos de Imágenes Gratuitas

Si necesitas más imágenes en el futuro, puedes usar:

### 1. Unsplash (Recomendado)
- **URL**: https://unsplash.com
- **Licencia**: Gratuita para uso comercial
- **API**: Disponible con registro gratuito
- **Calidad**: Excelente

### 2. Pexels
- **URL**: https://www.pexels.com
- **Licencia**: Gratuita para uso comercial
- **API**: Disponible
- **Calidad**: Muy buena

### 3. Pixabay
- **URL**: https://pixabay.com
- **Licencia**: Gratuita (CC0)
- **API**: Disponible
- **Calidad**: Buena

### 4. Freepik
- **URL**: https://www.freepik.com
- **Licencia**: Gratuita con atribución
- **Calidad**: Excelente

## 🎨 Formato de URLs de Unsplash

Para obtener imágenes de Unsplash con tamaño específico:

```
https://images.unsplash.com/photo-[ID]?w=[ANCHO]&h=[ALTO]&fit=crop
```

Ejemplo:
```
https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop
```

## ⚠️ Notas Importantes

1. **Caché**: Las imágenes de Unsplash pueden estar en caché. Si no ves cambios, limpia la caché del navegador.

2. **Disponibilidad**: Las URLs de Unsplash son estables, pero si una imagen se elimina, necesitarás actualizarla.

3. **Rendimiento**: Las imágenes están optimizadas para carga rápida (500x500px).

4. **Fallback**: Si una imagen no carga, el componente mostrará una imagen placeholder automáticamente.

## 🔍 Verificar Imágenes

Para verificar que las imágenes están funcionando:

1. **En el navegador**: Abre http://localhost:3000 y verifica que se muestren las imágenes
2. **Directamente**: Abre las URLs de las imágenes en el navegador
3. **API**: Verifica con `GET /api/products` que las URLs estén correctas

## ✨ Ventajas

- ✅ **Gratis**: Sin costos de licencia
- ✅ **Alta calidad**: Imágenes profesionales
- ✅ **Sin derechos**: Uso comercial permitido
- ✅ **Optimizadas**: Tamaño adecuado para web
- ✅ **Estables**: URLs confiables de Unsplash

¡Tus productos ahora lucen profesionales con imágenes reales! 🎉



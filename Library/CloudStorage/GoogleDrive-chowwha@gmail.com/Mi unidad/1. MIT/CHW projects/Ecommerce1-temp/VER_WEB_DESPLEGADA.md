# 🌐 Cómo Ver la Web Desplegada

## 📍 URL de Tu Aplicación

Tu e-commerce está (o estará) disponible en:

**👉 https://victorch2023.github.io/Ecommerce1**

## 🔍 Verificar que Está Desplegada

### Paso 1: Abrir en el Navegador

1. **Abre tu navegador** (Chrome, Safari, Firefox, etc.)
2. **Ve a la URL:**
   ```
   https://victorch2023.github.io/Ecommerce1
   ```

3. **Deberías ver:**
   - La página principal del e-commerce
   - Lista de productos
   - Navegación funcionando

### Paso 2: Verificar GitHub Pages está Habilitado

1. **Ve a GitHub:**
   ```
   https://github.com/victorch2023/Ecommerce1/settings/pages
   ```

2. **Verifica la configuración:**
   - **Source:** Debe ser `Deploy from a branch`
   - **Branch:** Debe ser `gh-pages` → `/ (root)`
   - **Custom domain:** (opcional, puede estar vacío)

3. **Si no está habilitado:**
   - Selecciona `gh-pages` branch
   - Selecciona `/ (root)` como carpeta
   - Click en **Save**

### Paso 3: Verificar el Deploy Automático (GitHub Actions)

1. **Ve a GitHub Actions:**
   ```
   https://github.com/victorch2023/Ecommerce1/actions
   ```

2. **Deberías ver:**
   - Un workflow llamado "Deploy to GitHub Pages"
   - Estado: ✅ verde (éxito) o 🟡 amarillo (en progreso)

3. **Si hay errores:**
   - Click en el workflow fallido
   - Revisa los logs para ver qué salió mal

## ⏱️ Tiempos de Despliegue

- **Primera vez:** 2-5 minutos
- **Actualizaciones:** 1-2 minutos
- **GitHub Actions:** Compila y despliega automáticamente

## 🐛 Si No Se Ve la Web

### Problema 1: Página 404

**Síntoma:** Ve la página pero dice "404 - Page not found"

**Solución:**
1. Verifica que GitHub Pages esté habilitado (ver Paso 2)
2. Verifica que la rama `gh-pages` exista y tenga archivos
3. Espera 2-3 minutos y recarga la página

### Problema 2: Página en Blanco

**Síntoma:** La página carga pero está en blanco

**Solución:**
1. Abre la consola del navegador (F12 → Console)
2. Busca errores en rojo
3. Verifica que el backend esté funcionando:
   ```
   https://ecommerce1-backend.onrender.com/api/products
   ```

### Problema 3: GitHub Actions Falló

**Síntoma:** En Actions ves un ❌ rojo

**Solución:**
1. Click en el workflow fallido
2. Revisa los logs
3. Posibles causas:
   - Error de compilación del frontend
   - Problemas con dependencias
   - Archivos faltantes

### Problema 4: "This site can't be reached"

**Síntoma:** El navegador no puede conectar

**Solución:**
1. Verifica que la URL sea correcta
2. Espera unos minutos (puede estar desplegándose)
3. Verifica tu conexión a internet

## ✅ Verificación Rápida

**Checklist:**
- [ ] GitHub Pages habilitado en Settings → Pages
- [ ] Rama `gh-pages` existe en GitHub
- [ ] GitHub Actions ejecutó el workflow exitosamente
- [ ] Backend está funcionando en Render
- [ ] URL correcta: `https://victorch2023.github.io/Ecommerce1`

## 🔗 Enlaces Útiles

- **Tu aplicación:** https://victorch2023.github.io/Ecommerce1
- **GitHub Pages Settings:** https://github.com/victorch2023/Ecommerce1/settings/pages
- **GitHub Actions:** https://github.com/victorch2023/Ecommerce1/actions
- **Backend API:** https://ecommerce1-backend.onrender.com/api/products

## 💡 Tips

1. **Primera carga puede tardar:** GitHub Pages puede tardar 1-2 minutos en servir la página la primera vez
2. **Recarga la página:** Si no ves cambios, prueba Ctrl+Shift+R (o Cmd+Shift+R en Mac) para recarga forzada
3. **Verifica la consola:** F12 → Console para ver errores de JavaScript
4. **Verifica la red:** F12 → Network para ver qué recursos no cargan


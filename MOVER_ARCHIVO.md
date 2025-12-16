# ⚡ Mover Service Account Key - Instrucciones Rápidas

## Opción 1: Usando el Script (Más Rápido)

1. **Encuentra el archivo JSON** en tu carpeta de Descargas
2. **Ejecuta este comando** (reemplaza la ruta con la real):

```bash
cd backend
node src/scripts/moverServiceAccount.js ~/Downloads/ecommerce1-chowwha-xxxxx.json
```

## Opción 2: Manualmente (También Rápido)

```bash
# Desde la carpeta del proyecto
mv ~/Downloads/ecommerce1-chowwha-*.json backend/serviceAccountKey.json
```

## Opción 3: Arrastrar y Soltar

1. Abre Finder
2. Ve a Descargas
3. Encuentra el archivo JSON (nombre como `ecommerce1-chowwha-xxxxx.json`)
4. Renómbralo a: `serviceAccountKey.json`
5. Arrástralo a la carpeta `backend/`

## ✅ Después de mover el archivo:

```bash
cd backend
npm run verify
npm run migrate
npm run dev
```

**¡Eso es todo! Solo toma 30 segundos.** 🚀


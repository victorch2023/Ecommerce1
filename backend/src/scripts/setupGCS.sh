#!/bin/bash

# Script para configurar Google Cloud Storage
# Este script crea el bucket si no existe

echo "🔧 Configurando Google Cloud Storage..."
echo ""

# Verificar service account
if [ ! -f "serviceAccountKey.json" ]; then
    echo "❌ serviceAccountKey.json no encontrado"
    echo ""
    echo "Para obtenerlo:"
    echo "1. Ve a Firebase Console → Project Settings → Service Accounts"
    echo "2. Haz clic en 'Generate new private key'"
    echo "3. Guarda el archivo como backend/serviceAccountKey.json"
    echo ""
    exit 1
fi

echo "✅ Service account encontrado"
echo ""

# Ejecutar script de Node.js para crear bucket
echo "🚀 Creando bucket de GCS..."
node src/scripts/createBucket.js

echo ""
echo "✅ Configuración completada!"
echo ""
echo "El bucket está listo en: gs://ecommerce1-chowwha.appspot.com"




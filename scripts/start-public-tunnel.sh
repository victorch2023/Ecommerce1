#!/bin/bash

# Script para exponer la tienda local a internet usando ngrok
# Esto crea un link público que funciona en cualquier navegador

echo "🌐 Iniciando túnel público para la tienda..."
echo ""
echo "⚠️  IMPORTANTE: Asegúrate de que el backend y frontend estén corriendo:"
echo "   - Backend: http://localhost:4000"
echo "   - Frontend: http://localhost:3000"
echo ""

# Verificar si ngrok está instalado
if ! command -v ngrok &> /dev/null; then
    echo "❌ ngrok no está instalado."
    echo ""
    echo "📥 Para instalar ngrok:"
    echo "   1. Visita: https://ngrok.com/download"
    echo "   2. O instala con Homebrew: brew install ngrok/ngrok/ngrok"
    echo "   3. O con npm: npm install -g ngrok"
    echo ""
    exit 1
fi

# Verificar que el frontend esté corriendo
if ! curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "⚠️  El frontend no está corriendo en http://localhost:3000"
    echo "   Inicia el frontend primero: cd frontend && npm start"
    echo ""
    read -p "¿Deseas continuar de todos modos? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "✅ Iniciando túnel público..."
echo "📋 El link público aparecerá en unos segundos..."
echo ""

# Iniciar ngrok en el puerto del frontend (3000)
ngrok http 3000



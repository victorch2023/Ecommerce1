#!/bin/bash

# Script para desplegar reglas de Firebase usando Firebase CLI
# Uso: ./scripts/deploy-rules.sh

echo "🚀 Desplegando reglas de Firebase..."
echo ""

# Verificar si Firebase CLI está instalado
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI no está instalado."
    echo ""
    echo "Para instalarlo, ejecuta:"
    echo "  npm install -g firebase-tools"
    echo ""
    echo "Luego ejecuta este script nuevamente."
    exit 1
fi

# Verificar si el usuario está autenticado
if ! firebase projects:list &> /dev/null; then
    echo "⚠️  No estás autenticado en Firebase CLI."
    echo ""
    echo "Ejecutando 'firebase login'..."
    firebase login
    echo ""
fi

# Verificar si firebase.json existe
if [ ! -f "firebase.json" ]; then
    echo "❌ firebase.json no encontrado."
    echo "Asegúrate de estar en la raíz del proyecto."
    exit 1
fi

# Desplegar reglas de Firestore
echo "📋 Desplegando reglas de Firestore..."
firebase deploy --only firestore:rules

if [ $? -eq 0 ]; then
    echo "✅ Reglas de Firestore desplegadas correctamente"
else
    echo "❌ Error al desplegar reglas de Firestore"
    exit 1
fi

echo ""

# Desplegar reglas de Storage
echo "📦 Desplegando reglas de Storage..."
firebase deploy --only storage:rules

if [ $? -eq 0 ]; then
    echo "✅ Reglas de Storage desplegadas correctamente"
else
    echo "⚠️  Error al desplegar reglas de Storage (puede que Storage no esté habilitado)"
fi

echo ""
echo "🎉 ¡Despliegue completado!"





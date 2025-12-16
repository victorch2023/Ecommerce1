#!/bin/bash

# Script interactivo para configurar Firebase CLI y desplegar reglas
# Uso: ./scripts/setup-firebase.sh

set -e

echo "🔥 Configuración de Firebase CLI"
echo "=================================="
echo ""

# Verificar si Firebase CLI está instalado
if ! command -v firebase &> /dev/null; then
    echo "📦 Instalando Firebase CLI..."
    npm install -g firebase-tools
    echo "✅ Firebase CLI instalado"
    echo ""
fi

# Verificar versión
FIREBASE_VERSION=$(firebase --version)
echo "✅ Firebase CLI versión: $FIREBASE_VERSION"
echo ""

# Verificar si el usuario está autenticado
if ! firebase projects:list &> /dev/null; then
    echo "🔐 Necesitas autenticarte en Firebase"
    echo ""
    echo "Se abrirá tu navegador para autenticarte..."
    echo "Presiona Enter para continuar..."
    read
    
    firebase login
    echo ""
fi

# Verificar autenticación exitosa
if ! firebase projects:list &> /dev/null; then
    echo "❌ Error: No se pudo autenticar. Intenta nuevamente."
    exit 1
fi

echo "✅ Autenticación exitosa"
echo ""

# Listar proyectos disponibles
echo "📋 Tus proyectos de Firebase:"
echo ""
firebase projects:list
echo ""

# Pedir al usuario que seleccione o ingrese el project ID
echo "Ingresa el ID de tu proyecto Firebase (o presiona Enter para seleccionar de la lista):"
read -r PROJECT_ID

if [ -z "$PROJECT_ID" ]; then
    echo ""
    echo "Por favor, ingresa el ID de tu proyecto:"
    read -r PROJECT_ID
fi

if [ -z "$PROJECT_ID" ]; then
    echo "❌ Error: Se requiere un project ID"
    exit 1
fi

# Configurar el proyecto
echo ""
echo "🔧 Configurando proyecto: $PROJECT_ID"
firebase use "$PROJECT_ID" --add

# Actualizar .firebaserc
if [ -f ".firebaserc" ]; then
    # Actualizar el project ID en .firebaserc
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/\"default\": \".*\"/\"default\": \"$PROJECT_ID\"/" .firebaserc
    else
        # Linux
        sed -i "s/\"default\": \".*\"/\"default\": \"$PROJECT_ID\"/" .firebaserc
    fi
    echo "✅ .firebaserc actualizado"
fi

echo ""
echo "🚀 Desplegando reglas..."
echo ""

# Desplegar reglas de Firestore
echo "📋 Desplegando reglas de Firestore..."
if firebase deploy --only firestore:rules; then
    echo "✅ Reglas de Firestore desplegadas"
else
    echo "⚠️  Error al desplegar reglas de Firestore"
fi

echo ""

# Desplegar reglas de Storage
echo "📦 Desplegando reglas de Storage..."
if firebase deploy --only storage:rules; then
    echo "✅ Reglas de Storage desplegadas"
else
    echo "⚠️  Error al desplegar reglas de Storage (puede que Storage no esté habilitado)"
fi

echo ""
echo "🎉 ¡Configuración completada!"
echo ""
echo "Para desplegar reglas en el futuro, ejecuta:"
echo "  ./scripts/deploy-rules.sh"
echo ""





#!/usr/bin/env node

/**
 * Script para desplegar reglas de Firebase usando Firebase CLI
 * Uso: node scripts/deploy-rules.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Desplegando reglas de Firebase...\n');

// Verificar si Firebase CLI está instalado
function checkFirebaseCLI() {
  try {
    execSync('firebase --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

// Verificar si el usuario está autenticado
function checkAuth() {
  try {
    execSync('firebase projects:list', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

// Función principal
async function main() {
  // Verificar Firebase CLI
  if (!checkFirebaseCLI()) {
    console.error('❌ Firebase CLI no está instalado.\n');
    console.log('Para instalarlo, ejecuta:');
    console.log('  npm install -g firebase-tools\n');
    console.log('Luego ejecuta este script nuevamente.');
    process.exit(1);
  }

  // Verificar autenticación
  if (!checkAuth()) {
    console.log('⚠️  No estás autenticado en Firebase CLI.\n');
    console.log('Ejecutando "firebase login"...\n');
    try {
      execSync('firebase login', { stdio: 'inherit' });
    } catch (error) {
      console.error('❌ Error al hacer login en Firebase');
      process.exit(1);
    }
  }

  // Verificar firebase.json
  if (!fs.existsSync('firebase.json')) {
    console.error('❌ firebase.json no encontrado.');
    console.log('Asegúrate de estar en la raíz del proyecto.');
    process.exit(1);
  }

  // Desplegar reglas de Firestore
  console.log('📋 Desplegando reglas de Firestore...');
  try {
    execSync('firebase deploy --only firestore:rules', { stdio: 'inherit' });
    console.log('✅ Reglas de Firestore desplegadas correctamente\n');
  } catch (error) {
    console.error('❌ Error al desplegar reglas de Firestore');
    process.exit(1);
  }

  // Desplegar reglas de Storage
  console.log('📦 Desplegando reglas de Storage...');
  try {
    execSync('firebase deploy --only storage:rules', { stdio: 'inherit' });
    console.log('✅ Reglas de Storage desplegadas correctamente\n');
  } catch (error) {
    console.warn('⚠️  Error al desplegar reglas de Storage (puede que Storage no esté habilitado)\n');
  }

  console.log('🎉 ¡Despliegue completado!');
}

main().catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});





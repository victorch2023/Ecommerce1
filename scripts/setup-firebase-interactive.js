#!/usr/bin/env node

/**
 * Script interactivo para configurar Firebase CLI y desplegar reglas
 * Uso: node scripts/setup-firebase-interactive.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function exec(command, options = {}) {
  try {
    return execSync(command, { 
      stdio: options.silent ? 'ignore' : 'inherit',
      encoding: 'utf8'
    });
  } catch (error) {
    return null;
  }
}

async function main() {
  console.log('🔥 Configuración de Firebase CLI');
  console.log('==================================\n');

  // Verificar si Firebase CLI está instalado
  const version = exec('firebase --version', { silent: true });
  if (!version) {
    console.log('📦 Instalando Firebase CLI...');
    exec('npm install -g firebase-tools');
    console.log('✅ Firebase CLI instalado\n');
  } else {
    console.log(`✅ Firebase CLI versión: ${version.trim()}\n`);
  }

  // Verificar autenticación
  const isAuthenticated = exec('firebase projects:list', { silent: true }) !== null;

  if (!isAuthenticated) {
    console.log('🔐 Necesitas autenticarte en Firebase\n');
    console.log('Se abrirá tu navegador para autenticarte...');
    await question('Presiona Enter para continuar...');
    
    console.log('\n🔗 Abriendo navegador...');
    exec('firebase login');
    console.log('');
  }

  // Verificar autenticación nuevamente
  const projectsList = exec('firebase projects:list', { silent: true });
  if (!projectsList) {
    console.error('❌ Error: No se pudo autenticar. Intenta nuevamente.');
    process.exit(1);
  }

  console.log('✅ Autenticación exitosa\n');
  console.log('📋 Tus proyectos de Firebase:\n');
  exec('firebase projects:list');

  // Pedir project ID
  console.log('');
  const projectId = await question('Ingresa el ID de tu proyecto Firebase: ');

  if (!projectId || projectId.trim() === '') {
    console.error('❌ Error: Se requiere un project ID');
    process.exit(1);
  }

  const cleanProjectId = projectId.trim();

  // Configurar proyecto
  console.log(`\n🔧 Configurando proyecto: ${cleanProjectId}`);
  exec(`firebase use ${cleanProjectId} --add`);

  // Actualizar .firebaserc
  if (fs.existsSync('.firebaserc')) {
    const firebasercContent = fs.readFileSync('.firebaserc', 'utf8');
    const updated = firebasercContent.replace(
      /"default":\s*"[^"]*"/,
      `"default": "${cleanProjectId}"`
    );
    fs.writeFileSync('.firebaserc', updated);
    console.log('✅ .firebaserc actualizado');
  }

  // Desplegar reglas
  console.log('\n🚀 Desplegando reglas...\n');

  console.log('📋 Desplegando reglas de Firestore...');
  const firestoreResult = exec('firebase deploy --only firestore:rules', { silent: true });
  if (firestoreResult !== null) {
    console.log('✅ Reglas de Firestore desplegadas');
  } else {
    console.log('⚠️  Error al desplegar reglas de Firestore');
  }

  console.log('');

  console.log('📦 Desplegando reglas de Storage...');
  const storageResult = exec('firebase deploy --only storage:rules', { silent: true });
  if (storageResult !== null) {
    console.log('✅ Reglas de Storage desplegadas');
  } else {
    console.log('⚠️  Error al desplegar reglas de Storage (puede que Storage no esté habilitado)');
  }

  console.log('\n🎉 ¡Configuración completada!\n');
  console.log('Para desplegar reglas en el futuro, ejecuta:');
  console.log('  ./scripts/deploy-rules.sh\n');

  rl.close();
}

main().catch(error => {
  console.error('❌ Error:', error.message);
  rl.close();
  process.exit(1);
});





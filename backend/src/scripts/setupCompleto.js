import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.join(__dirname, '..', '..', 'serviceAccountKey.json');

console.log('🚀 Verificación Final de Configuración\n');

// 1. Verificar Service Account Key
console.log('1️⃣  Verificando Service Account Key...');
if (existsSync(serviceAccountPath)) {
  console.log('   ✅ serviceAccountKey.json encontrado\n');
} else {
  console.log('   ❌ serviceAccountKey.json NO encontrado');
  console.log('   📋 El archivo se descargó cuando hiciste clic en "Generar nueva clave privada"');
  console.log('   📁 Búscalo en tu carpeta de Descargas y muévelo a: backend/serviceAccountKey.json\n');
}

// 2. Verificar Firestore
console.log('2️⃣  Verificando Firestore...');
try {
  const { initFirebase, db } = await import('../services/firebaseAdmin.js');
  initFirebase();
  if (db) {
    console.log('   ✅ Firestore inicializado correctamente\n');
  } else {
    console.log('   ⚠️  Firestore no inicializado (necesita serviceAccountKey.json)\n');
  }
} catch (e) {
  console.log('   ⚠️  Error al inicializar Firestore:', e.message, '\n');
}

// 3. Verificar reglas
console.log('3️⃣  Verificando reglas de seguridad...');
const rulesPath = path.join(__dirname, '..', '..', '..', 'firestore.rules');
if (existsSync(rulesPath)) {
  console.log('   ✅ Archivo firestore.rules encontrado');
  console.log('   📋 Para aplicar: firebase deploy --only firestore:rules\n');
} else {
  console.log('   ⚠️  firestore.rules no encontrado\n');
}

// Resumen
console.log('📊 RESUMEN:\n');
if (existsSync(serviceAccountPath)) {
  console.log('✅ Todo listo para migrar datos!');
  console.log('   Ejecuta: npm run migrate\n');
} else {
  console.log('⏳ Falta: Service Account Key');
  console.log('   Una vez que lo tengas, ejecuta: npm run verify\n');
}


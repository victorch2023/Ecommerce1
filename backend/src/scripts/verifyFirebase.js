import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initFirebase, db as firestoreDb } from '../services/firebaseAdmin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.join(__dirname, '..', '..', 'serviceAccountKey.json');

console.log('🔍 Verificando configuración de Firebase...\n');

// Verificar archivo serviceAccountKey.json
if (!existsSync(serviceAccountPath)) {
  console.log('❌ serviceAccountKey.json no encontrado');
  console.log(`   Ubicación esperada: ${serviceAccountPath}\n`);
  console.log('📋 Pasos para obtenerlo:');
  console.log('   1. Ve a Firebase Console → Configuración del proyecto');
  console.log('   2. Pestaña "Cuentas de servicio"');
  console.log('   3. Haz clic en "Generar nueva clave privada"');
  console.log('   4. Renombra el archivo a: serviceAccountKey.json');
  console.log('   5. Colócalo en: backend/\n');
  process.exit(1);
}

console.log('✅ serviceAccountKey.json encontrado');

// Intentar inicializar Firebase
try {
  initFirebase();
  
  if (!firestoreDb) {
    console.log('❌ Firestore no se pudo inicializar');
    console.log('   Verifica que el archivo serviceAccountKey.json sea válido\n');
    process.exit(1);
  }
  
  console.log('✅ Firestore inicializado correctamente');
  
  // Intentar una operación simple
  try {
    const testRef = firestoreDb.collection('_test');
    await testRef.limit(1).get();
    console.log('✅ Conexión a Firestore funcionando\n');
    
    console.log('🎉 ¡Todo está configurado correctamente!\n');
    console.log('Próximos pasos:');
    console.log('   1. Ejecuta: npm run migrate (para migrar datos)');
    console.log('   2. Ejecuta: npm run dev (para iniciar el servidor)\n');
    
    process.exit(0);
  } catch (error) {
    console.log('⚠️  Error al conectar con Firestore:');
    console.log(`   ${error.message}\n`);
    console.log('   Verifica que:');
    console.log('   - Firestore esté habilitado en Firebase Console');
    console.log('   - Las reglas de seguridad estén configuradas\n');
    process.exit(1);
  }
} catch (error) {
  console.log('❌ Error al inicializar Firebase:');
  console.log(`   ${error.message}\n`);
  console.log('   Verifica que serviceAccountKey.json sea válido\n');
  process.exit(1);
}


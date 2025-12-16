import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function main() {
  console.log('🔧 Configuración de Firebase/Firestore\n');
  console.log('Este script te guiará para configurar Firebase.\n');

  const serviceAccountPath = path.join(__dirname, '..', '..', 'serviceAccountKey.json');
  
  if (existsSync(serviceAccountPath)) {
    console.log('✅ Ya existe serviceAccountKey.json');
    const continueSetup = await question('\n¿Deseas continuar con la configuración de todos modos? (s/n): ');
    if (continueSetup.toLowerCase() !== 's' && continueSetup.toLowerCase() !== 'y') {
      console.log('Configuración cancelada.');
      rl.close();
      return;
    }
  }

  console.log('\n📋 Pasos para configurar Firebase:\n');
  console.log('1. Ve a https://console.firebase.google.com/');
  console.log('2. Haz clic en "Agregar proyecto" o "Add project"');
  console.log('3. Ingresa un nombre para tu proyecto');
  console.log('4. Sigue los pasos del asistente\n');
  
  const hasProject = await question('¿Ya tienes un proyecto de Firebase creado? (s/n): ');
  
  if (hasProject.toLowerCase() !== 's' && hasProject.toLowerCase() !== 'y') {
    console.log('\n⏸️  Por favor crea un proyecto en Firebase Console primero.');
    console.log('   Luego ejecuta este script nuevamente.\n');
    rl.close();
    return;
  }

  console.log('\n📝 Configurando Firestore...\n');
  console.log('1. En Firebase Console, ve a "Firestore Database"');
  console.log('2. Haz clic en "Crear base de datos"');
  console.log('3. Selecciona "Comenzar en modo de prueba"');
  console.log('4. Elige una ubicación (recomendado: us-central)');
  console.log('5. Haz clic en "Habilitar"\n');

  const firestoreEnabled = await question('¿Ya habilitaste Firestore? (s/n): ');
  
  if (firestoreEnabled.toLowerCase() !== 's' && firestoreEnabled.toLowerCase() !== 'y') {
    console.log('\n⏸️  Por favor habilita Firestore primero.');
    console.log('   Luego ejecuta este script nuevamente.\n');
    rl.close();
    return;
  }

  console.log('\n🔐 Obteniendo Service Account Key...\n');
  console.log('1. En Firebase Console, ve a Configuración del proyecto (ícono de engranaje)');
  console.log('2. Ve a la pestaña "Cuentas de servicio" o "Service accounts"');
  console.log('3. Haz clic en "Generar nueva clave privada" o "Generate new private key"');
  console.log('4. Se descargará un archivo JSON\n');

  const hasKey = await question('¿Ya descargaste el archivo JSON? (s/n): ');
  
  if (hasKey.toLowerCase() !== 's' && hasKey.toLowerCase() !== 'y') {
    console.log('\n⏸️  Por favor descarga el Service Account Key primero.');
    console.log('   Luego ejecuta este script nuevamente.\n');
    rl.close();
    return;
  }

  console.log('\n📁 Ubicación del archivo...\n');
  console.log(`El archivo debe estar en: ${serviceAccountPath}\n`);
  console.log('Pasos:');
  console.log('1. Renombra el archivo descargado a: serviceAccountKey.json');
  console.log(`2. Muévelo a la carpeta: backend/`);
  console.log(`   (Ruta completa: ${path.dirname(serviceAccountPath)})\n`);

  const filePlaced = await question('¿Ya colocaste el archivo serviceAccountKey.json en backend/? (s/n): ');
  
  if (filePlaced.toLowerCase() !== 's' && filePlaced.toLowerCase() !== 'y') {
    console.log('\n⏸️  Por favor coloca el archivo primero.');
    console.log('   Luego ejecuta este script nuevamente.\n');
    rl.close();
    return;
  }

  if (!existsSync(serviceAccountPath)) {
    console.log('\n❌ El archivo no se encuentra en la ubicación esperada.');
    console.log(`   Buscado en: ${serviceAccountPath}`);
    console.log('\n   Por favor verifica:');
    console.log('   1. El nombre del archivo es exactamente: serviceAccountKey.json');
    console.log('   2. El archivo está en la carpeta backend/');
    console.log('   3. La ruta es correcta\n');
    rl.close();
    return;
  }

  console.log('\n✅ ¡Archivo encontrado!');
  console.log('\n🔒 Configurando reglas de seguridad...\n');
  console.log('Ahora necesitas configurar las reglas de Firestore:');
  console.log('1. En Firebase Console, ve a Firestore Database → Rules');
  console.log('2. Copia las reglas del archivo MIGRACION_FIRESTORE.md');
  console.log('3. Pégalas en el editor de reglas');
  console.log('4. Haz clic en "Publicar"\n');

  const rulesConfigured = await question('¿Ya configuraste las reglas de seguridad? (s/n): ');
  
  if (rulesConfigured.toLowerCase() !== 's' && rulesConfigured.toLowerCase() !== 'y') {
    console.log('\n⚠️  Es importante configurar las reglas antes de usar la aplicación.');
    console.log('   Consulta MIGRACION_FIRESTORE.md para las reglas correctas.\n');
  }

  console.log('\n✅ Configuración completada!\n');
  console.log('Próximos pasos:');
  console.log('1. Verifica que todo esté correcto');
  console.log('2. Ejecuta: npm run migrate (para migrar datos de SQLite)');
  console.log('3. Ejecuta: npm run dev (para iniciar el servidor)');
  console.log('4. Prueba la aplicación\n');

  rl.close();
}

main();


import { existsSync, copyFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta destino
const destino = path.join(__dirname, '..', '..', 'serviceAccountKey.json');

// Obtener ruta del archivo desde argumentos
const archivoOrigen = process.argv[2];

if (!archivoOrigen) {
  console.log('❌ Por favor proporciona la ruta del archivo JSON\n');
  console.log('Uso: node moverServiceAccount.js /ruta/al/archivo.json\n');
  console.log('Ejemplo:');
  console.log('  node moverServiceAccount.js ~/Downloads/ecommerce1-chowwha-xxxxx.json\n');
  process.exit(1);
}

if (!existsSync(archivoOrigen)) {
  console.log(`❌ El archivo no existe: ${archivoOrigen}\n`);
  process.exit(1);
}

try {
  copyFileSync(archivoOrigen, destino);
  console.log(`✅ Archivo copiado exitosamente!`);
  console.log(`   Desde: ${archivoOrigen}`);
  console.log(`   Hacia: ${destino}\n`);
  console.log('🎉 ¡Service Account Key configurado correctamente!\n');
} catch (error) {
  console.log(`❌ Error al copiar archivo: ${error.message}\n`);
  process.exit(1);
}


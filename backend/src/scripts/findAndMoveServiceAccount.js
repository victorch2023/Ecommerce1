import { existsSync, readdirSync, statSync, copyFileSync, unlinkSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetPath = path.join(__dirname, '..', '..', 'serviceAccountKey.json');
const homeDir = process.env.HOME || process.env.USERPROFILE;

// Directorios donde buscar
const searchDirs = [
  path.join(homeDir, 'Downloads'),
  path.join(homeDir, 'Desktop'),
  path.join(homeDir, 'Documents')
];

console.log('🔍 Buscando Service Account Key descargado...\n');

let found = false;

for (const dir of searchDirs) {
  if (!existsSync(dir)) {
    continue;
  }

  try {
    const files = readdirSync(dir);
    const jsonFiles = files.filter(f => 
      f.endsWith('.json') && 
      (f.includes('ecommerce') || f.includes('firebase') || f.includes('service'))
    );

    for (const file of jsonFiles) {
      const filePath = path.join(dir, file);
      const stats = statSync(filePath);
      const ageInMinutes = (Date.now() - stats.mtimeMs) / (1000 * 60);

      // Solo archivos modificados en los últimos 30 minutos
      if (ageInMinutes < 30) {
        console.log(`✅ Encontrado: ${filePath}`);
        console.log(`   Modificado hace ${Math.round(ageInMinutes)} minutos\n`);

        // Leer el archivo para verificar que es un Service Account Key
        try {
          const content = require(filePath);
          if (content.type === 'service_account' && content.project_id) {
            console.log(`✅ Verificado: Es un Service Account Key válido`);
            console.log(`   Proyecto: ${content.project_id}\n`);

            // Copiar a backend/
            copyFileSync(filePath, targetPath);
            console.log(`✅ Archivo copiado a: ${targetPath}\n`);

            // Opcional: eliminar el original (descomentar si quieres)
            // unlinkSync(filePath);
            // console.log(`✅ Archivo original eliminado\n`);

            found = true;
            break;
          }
        } catch (e) {
          console.log(`⚠️  No es un Service Account Key válido, continuando...\n`);
        }
      }
    }

    if (found) break;
  } catch (e) {
    // Continuar con el siguiente directorio
  }
}

if (!found) {
  console.log('❌ No se encontró el Service Account Key automáticamente.\n');
  console.log('📋 Pasos manuales:');
  console.log('1. Busca el archivo JSON descargado en tu carpeta de Descargas');
  console.log('2. Cópialo a: backend/serviceAccountKey.json\n');
  process.exit(1);
} else {
  console.log('🎉 ¡Service Account Key configurado correctamente!\n');
  process.exit(0);
}


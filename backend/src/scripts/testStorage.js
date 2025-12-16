#!/usr/bin/env node

/**
 * Script de prueba para el sistema de almacenamiento local
 */

import { existsSync, mkdirSync, writeFileSync, readFileSync, unlinkSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOAD_DIR = path.join(__dirname, '..', '..', 'uploads');
const PUBLIC_DIR = path.join(__dirname, '..', '..', 'public', 'uploads');

console.log('🧪 Probando sistema de almacenamiento local...\n');

// Test 1: Verificar que los directorios se crean
console.log('1️⃣ Verificando creación de directorios...');
[UPLOAD_DIR, PUBLIC_DIR].forEach(dir => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
    console.log(`   ✅ Creado: ${dir}`);
  } else {
    console.log(`   ✅ Ya existe: ${dir}`);
  }
});

// Test 2: Crear un archivo de prueba
console.log('\n2️⃣ Creando archivo de prueba...');
const testFolder = path.join(UPLOAD_DIR, 'test');
const testPublicFolder = path.join(PUBLIC_DIR, 'test');

if (!existsSync(testFolder)) {
  mkdirSync(testFolder, { recursive: true });
}
if (!existsSync(testPublicFolder)) {
  mkdirSync(testPublicFolder, { recursive: true });
}

const testFileName = `test-${Date.now()}.txt`;
const testFilePath = path.join(testFolder, testFileName);
const testPublicPath = path.join(testPublicFolder, testFileName);

writeFileSync(testFilePath, 'Este es un archivo de prueba');
console.log(`   ✅ Archivo creado: ${testFilePath}`);

// Test 3: Copiar archivo al directorio público
console.log('\n3️⃣ Copiando archivo al directorio público...');
const { copyFileSync } = await import('fs');
copyFileSync(testFilePath, testPublicPath);
console.log(`   ✅ Archivo copiado: ${testPublicPath}`);

// Test 4: Verificar que el archivo existe en ambos lugares
console.log('\n4️⃣ Verificando existencia de archivos...');
if (existsSync(testFilePath) && existsSync(testPublicPath)) {
  console.log('   ✅ Archivo existe en ambos directorios');
  
  const content1 = readFileSync(testFilePath, 'utf8');
  const content2 = readFileSync(testPublicPath, 'utf8');
  
  if (content1 === content2) {
    console.log('   ✅ Contenido coincide');
  } else {
    console.log('   ❌ Contenido no coincide');
  }
} else {
  console.log('   ❌ Archivo no encontrado');
}

// Test 5: Limpiar archivos de prueba
console.log('\n5️⃣ Limpiando archivos de prueba...');
try {
  if (existsSync(testFilePath)) {
    unlinkSync(testFilePath);
    console.log('   ✅ Archivo de uploads eliminado');
  }
  if (existsSync(testPublicPath)) {
    unlinkSync(testPublicPath);
    console.log('   ✅ Archivo público eliminado');
  }
} catch (error) {
  console.log(`   ⚠️  Error al limpiar: ${error.message}`);
}

// Test 6: Verificar estructura de rutas
console.log('\n6️⃣ Verificando estructura de rutas...');
const testProductFolder = path.join(UPLOAD_DIR, 'products', '123');
const testUserFolder = path.join(UPLOAD_DIR, 'users', 'user1');

[testProductFolder, testUserFolder].forEach(folder => {
  if (!existsSync(folder)) {
    mkdirSync(folder, { recursive: true });
    console.log(`   ✅ Creado: ${folder}`);
  }
});

console.log('\n✅ Todas las pruebas completadas!');
console.log('\n📁 Estructura de directorios:');
console.log(`   ${UPLOAD_DIR}`);
console.log(`   ${PUBLIC_DIR}`);
console.log('\n🚀 El sistema de almacenamiento está listo para usar!');




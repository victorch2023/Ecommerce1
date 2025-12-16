#!/usr/bin/env node

/**
 * Script para probar las APIs de almacenamiento mediante HTTP
 */

import { createWriteStream, existsSync, unlinkSync } from 'fs';
import { writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_URL = 'http://localhost:4000/api/storage';
const TEST_IMAGE_PATH = path.join(__dirname, '..', '..', 'test-image.png');

console.log('🧪 Probando APIs de almacenamiento...\n');

// Crear una imagen de prueba simple (1x1 pixel PNG)
function createTestImage() {
  // PNG mínimo válido (1x1 pixel transparente)
  const pngData = Buffer.from([
    0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
    0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52, // IHDR chunk
    0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, // 1x1 pixel
    0x08, 0x06, 0x00, 0x00, 0x00, 0x1F, 0x15, 0xC4, 0x89,
    0x00, 0x00, 0x00, 0x0A, 0x49, 0x44, 0x41, 0x54, // IDAT chunk
    0x78, 0x9C, 0x63, 0x00, 0x01, 0x00, 0x00, 0x05, 0x00, 0x01,
    0x0D, 0x0A, 0x2D, 0xB4, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, // IEND
    0xAE, 0x42, 0x60, 0x82
  ]);
  
  writeFileSync(TEST_IMAGE_PATH, pngData);
  console.log('✅ Imagen de prueba creada');
}

async function testUpload() {
  console.log('\n1️⃣ Probando subida de archivo...');
  
  if (!existsSync(TEST_IMAGE_PATH)) {
    createTestImage();
  }
  
  try {
    const FormData = (await import('form-data')).default;
    const { createReadStream } = await import('fs');
    const formData = new FormData();
    formData.append('file', createReadStream(TEST_IMAGE_PATH));
    formData.append('folder', 'test/products/123');
    
    const response = await fetch(API_URL + '/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('   ✅ Archivo subido exitosamente');
      console.log(`   📁 URL: ${data.url}`);
      console.log(`   📁 Path: ${data.path}`);
      console.log(`   📁 Filename: ${data.filename}`);
      return data;
    } else {
      const error = await response.json();
      console.log(`   ❌ Error: ${error.error}`);
      return null;
    }
  } catch (error) {
    console.log(`   ⚠️  Error de conexión: ${error.message}`);
    console.log('   💡 Asegúrate de que el servidor esté corriendo: npm run dev');
    return null;
  }
}

async function testList() {
  console.log('\n2️⃣ Probando listado de archivos...');
  
  try {
    const response = await fetch(API_URL + '/list?folder=test/products/123');
    
    if (response.ok) {
      const data = await response.json();
      console.log(`   ✅ Archivos encontrados: ${data.files.length}`);
      data.files.forEach(file => {
        console.log(`      - ${file.name}`);
      });
      return data;
    } else {
      console.log('   ⚠️  No se pudo listar archivos');
      return null;
    }
  } catch (error) {
    console.log(`   ⚠️  Error: ${error.message}`);
    return null;
  }
}

async function testDelete(uploadData) {
  if (!uploadData) {
    console.log('\n3️⃣ ⏭️  Omitiendo prueba de eliminación (no hay archivo subido)');
    return;
  }
  
  console.log('\n3️⃣ Probando eliminación de archivo...');
  
  try {
    const response = await fetch(API_URL + '/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: uploadData.path }),
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('   ✅ Archivo eliminado exitosamente');
      return data;
    } else {
      const error = await response.json();
      console.log(`   ❌ Error: ${error.error}`);
      return null;
    }
  } catch (error) {
    console.log(`   ⚠️  Error: ${error.message}`);
    return null;
  }
}

async function cleanup() {
  console.log('\n🧹 Limpiando archivos de prueba...');
  if (existsSync(TEST_IMAGE_PATH)) {
    unlinkSync(TEST_IMAGE_PATH);
    console.log('   ✅ Archivo de prueba eliminado');
  }
}

async function main() {
  const uploadData = await testUpload();
  await testList();
  await testDelete(uploadData);
  await cleanup();
  
  console.log('\n✅ Pruebas completadas!');
  console.log('\n💡 Para probar con el servidor corriendo:');
  console.log('   1. En una terminal: cd backend && npm run dev');
  console.log('   2. En otra terminal: node src/scripts/testStorageAPI.js');
}

main().catch(console.error);


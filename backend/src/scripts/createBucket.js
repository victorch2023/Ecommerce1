#!/usr/bin/env node

/**
 * Script para crear el bucket de Google Cloud Storage
 */

import { Storage } from '@google-cloud/storage';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ID = 'ecommerce1-chowwha';
const BUCKET_NAME = `${PROJECT_ID}.appspot.com`;
const LOCATION = 'us-central'; // Misma ubicación que Firestore

async function createBucket() {
  try {
    // Verificar service account
    const serviceAccountPath = path.join(__dirname, '..', '..', 'serviceAccountKey.json');
    
    if (!existsSync(serviceAccountPath)) {
      console.error('❌ serviceAccountKey.json no encontrado en backend/');
      console.error('   Por favor, descárgalo desde Firebase Console:');
      console.error('   Project Settings → Service Accounts → Generate new private key');
      process.exit(1);
    }

    console.log('🔧 Inicializando Google Cloud Storage...');
    const storage = new Storage({
      keyFilename: serviceAccountPath,
      projectId: PROJECT_ID
    });

    console.log(`📦 Verificando bucket: ${BUCKET_NAME}...`);
    
    // Verificar si el bucket ya existe
    const bucket = storage.bucket(BUCKET_NAME);
    const [exists] = await bucket.exists();
    
    if (exists) {
      console.log(`✅ El bucket ${BUCKET_NAME} ya existe`);
      
      // Verificar configuración
      const [metadata] = await bucket.getMetadata();
      console.log(`   Ubicación: ${metadata.location}`);
      console.log(`   Clase de almacenamiento: ${metadata.storageClass}`);
      
      return;
    }

    console.log(`🚀 Creando bucket: ${BUCKET_NAME}...`);
    
    // Crear el bucket
    const [bucketCreated] = await storage.createBucket(BUCKET_NAME, {
      location: LOCATION,
      storageClass: 'STANDARD',
      versioning: {
        enabled: false
      },
      // Configurar CORS para permitir acceso desde el frontend
      cors: [
        {
          origin: ['http://localhost:3000', 'https://*.firebaseapp.com'],
          method: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD'],
          responseHeader: ['Content-Type', 'Access-Control-Allow-Origin'],
          maxAgeSeconds: 3600
        }
      ]
    });

    console.log(`✅ Bucket creado exitosamente: ${BUCKET_NAME}`);
    console.log(`   Ubicación: ${LOCATION}`);
    console.log(`   URL: https://console.cloud.google.com/storage/browser/${BUCKET_NAME}`);
    
    // Configurar permisos públicos para lectura (opcional)
    console.log('\n🔓 Configurando permisos...');
    await bucketCreated.makePublic();
    console.log('✅ Bucket configurado como público para lectura');
    
    console.log('\n🎉 ¡Bucket listo para usar!');
    console.log(`\nPara subir archivos, usa: gs://${BUCKET_NAME}/ruta/al/archivo`);
    
  } catch (error) {
    if (error.code === 409) {
      console.log(`✅ El bucket ${BUCKET_NAME} ya existe`);
    } else if (error.code === 403) {
      console.error('❌ Error de permisos. Verifica que el service account tenga:');
      console.error('   - Storage Admin o');
      console.error('   - Storage Object Admin');
      console.error('\nPara agregar permisos:');
      console.error('1. Ve a Google Cloud Console → IAM & Admin → Service Accounts');
      console.error('2. Selecciona tu service account');
      console.error('3. Agrega el rol "Storage Admin"');
    } else {
      console.error('❌ Error al crear bucket:', error.message);
      console.error('   Código:', error.code);
    }
    process.exit(1);
  }
}

createBucket();




import admin from 'firebase-admin';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

let db = null;

export function initFirebase(){
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const servicePath = path.join(__dirname, '..', '..', 'serviceAccountKey.json');
    
    if (!existsSync(servicePath)) {
      console.warn('⚠️  serviceAccountKey.json no encontrado en backend/');
      console.warn('   El backend funcionará pero no podrá acceder a Firestore.');
      console.warn('   Para solucionarlo:');
      console.warn('   1. Ve a Firebase Console -> Project Settings -> Service Accounts');
      console.warn('   2. Genera una nueva clave privada');
      console.warn('   3. Guarda el JSON como backend/serviceAccountKey.json');
      return;
    }
    
    admin.initializeApp({
      credential: admin.credential.cert(servicePath)
    });
    
    db = admin.firestore();
    console.log('✅ Firebase admin inicializado correctamente');
  } catch(err){
    console.error('❌ Error al inicializar Firebase admin:', err.message);
    console.warn('   Verifica que serviceAccountKey.json sea válido');
  }
}

export { db };

import admin from 'firebase-admin';
import path from 'path';
import { fileURLToPath } from 'url';

export function initFirebase(){
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const servicePath = path.join(__dirname, '..', '..', 'serviceAccountKey.json');
    admin.initializeApp({
      credential: admin.credential.cert(servicePath)
    });
    console.log('Firebase admin initialized');
  } catch(err){
    console.warn('Firebase admin init failed. Add serviceAccountKey.json to backend/ for production.');
  }
}

export const db = admin.firestore();

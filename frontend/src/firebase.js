// Replace with your Firebase config (from Firebase console)
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Obtener configuración desde variables de entorno o usar valores por defecto
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "YOUR_SENDER_ID",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "YOUR_APP_ID"
};

// Validar que la configuración no sea placeholder
const hasPlaceholder = Object.values(firebaseConfig).some(val => 
  typeof val === 'string' && val.startsWith('YOUR_')
);

let app, auth, db;

try {
  if (hasPlaceholder) {
    console.warn('⚠️ Firebase no está configurado. El sistema funcionará en modo local.');
    console.warn('   Si necesitas Firebase, actualiza frontend/src/firebase.js con tus credenciales.');
    // Crear objetos dummy para evitar errores
    app = null;
    auth = null;
    db = null;
  } else {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  }
} catch (error) {
  console.warn('⚠️ Error al inicializar Firebase:', error.message);
  console.warn('   El sistema funcionará en modo local sin Firebase.');
  app = null;
  auth = null;
  db = null;
}

export { auth, db };
export const storage = getStorage(app);

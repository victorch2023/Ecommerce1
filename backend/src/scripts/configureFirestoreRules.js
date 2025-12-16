import { readFileSync, writeFileSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rules = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null && (request.auth.uid == userId || get(/databases/\$(database)/documents/users/\$(request.auth.uid)).data.role == 'admin');
      allow write: if request.auth != null && (request.auth.uid == userId || get(/databases/\$(database)/documents/users/\$(request.auth.uid)).data.role == 'admin');
    }
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && get(/databases/\$(database)/documents/users/\$(request.auth.uid)).data.role == 'admin';
    }
    match /orders/{orderId} {
      allow read: if request.auth != null && (resource.data.userId == request.auth.uid || get(/databases/\$(database)/documents/users/\$(request.auth.uid)).data.role == 'admin');
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow update: if request.auth != null && (resource.data.userId == request.auth.uid || get(/databases/\$(database)/documents/users/\$(request.auth.uid)).data.role == 'admin');
    }
    match /carts/{cartId} {
      allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
    }
  }
}`;

// Guardar las reglas en un archivo para referencia
const rulesPath = path.join(__dirname, '..', '..', '..', 'firestore.rules');
writeFileSync(rulesPath, rules);

console.log('✅ Reglas de Firestore guardadas en:', rulesPath);
console.log('\n📋 Para aplicar las reglas:');
console.log('1. Ve a: https://console.firebase.google.com/project/ecommerce1-chowwha/firestore/databases/-default-/security/rules');
console.log('2. Copia el contenido de firestore.rules');
console.log('3. Pégalo en el editor de reglas');
console.log('4. Haz clic en "Publicar"\n');

console.log('O usa Firebase CLI:');
console.log('firebase deploy --only firestore:rules\n');


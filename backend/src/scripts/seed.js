import { seedSampleProducts } from '../services/seeder.js';
import { initFirebase } from '../services/firebaseAdmin.js';

async function main() {
  console.log('🚀 Iniciando seeder para Firestore...');
  
  // Inicializar Firebase
  initFirebase();
  
  try {
    await seedSampleProducts();
    console.log('\n✅ Base de datos poblada exitosamente');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
}

main();




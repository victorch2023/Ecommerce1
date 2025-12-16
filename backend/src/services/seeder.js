import { getFirestore, COLLECTIONS } from './firestore.js';

const db = getFirestore();

export async function seedSampleProducts() {
  // Imágenes de Unsplash - gratuitas y sin derechos de autor
  const products = [
    { 
      name: 'Camiseta Básica', 
      price: 19.99, 
      description: 'Camiseta de algodón 100% cómoda y suave', 
      stock: 100,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop'
    },
    { 
      name: 'Taza de Cerámica', 
      price: 9.50, 
      description: 'Taza de cerámica resistente al microondas', 
      stock: 50,
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&h=500&fit=crop'
    },
    { 
      name: 'Laptop Stand', 
      price: 29.99, 
      description: 'Soporte ergonómico para laptop, ajustable', 
      stock: 30,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop'
    },
    { 
      name: 'Auriculares Inalámbricos', 
      price: 79.99, 
      description: 'Auriculares con cancelación de ruido y batería de 20h', 
      stock: 25,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop'
    }
  ];
  
  console.log('🌱 Sembrando productos de ejemplo en Firestore...');
  
  const batch = db.batch();
  const productsRef = db.collection(COLLECTIONS.PRODUCTS);
  
  const now = new Date();
  
  products.forEach(product => {
    const docRef = productsRef.doc();
    batch.set(docRef, {
      ...product,
      price: parseFloat(product.price),
      createdAt: now,
      updatedAt: now
    });
  });
  
  try {
    await batch.commit();
    console.log(`   ✅ ${products.length} productos creados exitosamente`);
    console.log('✅ Seeding completado');
  } catch (error) {
    console.error('   ❌ Error al sembrar productos:', error.message);
    throw error;
  }
}

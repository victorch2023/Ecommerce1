import { db } from './firebaseAdmin.js';

export async function seedSampleProducts(){
  const products = [
    { name:'Sample T-shirt', price:19.99, description:'Comfortable cotton shirt', stock:100 },
    { name:'Sample Mug', price:9.5, description:'Ceramic mug', stock:50 }
  ];
  for(const p of products){
    await db.collection('products').add(p);
  }
  console.log('Seeded sample products');
}

#!/usr/bin/env node

/**
 * Script para actualizar las imágenes de los productos con URLs de imágenes reales sin derechos de autor
 * Usa Unsplash Source API para obtener imágenes gratuitas
 */

import db from '../services/database.js';

// URLs de imágenes de Unsplash (gratuitas, sin derechos de autor)
// Formato: https://source.unsplash.com/featured/WIDTHxHEIGHT/?KEYWORD
// O usando Unsplash API directa con IDs específicos

const productImages = {
  1: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop', // Camiseta
  2: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&h=500&fit=crop', // Taza
  3: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop', // Laptop Stand
  4: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop', // Auriculares
};

// Alternativa: usar Pexels (también gratuito)
const productImagesPexels = {
  1: 'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop', // Camiseta
  2: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop', // Taza
  3: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop', // Laptop Stand
  4: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop', // Auriculares
};

function updateProductImages() {
  console.log('🖼️  Actualizando imágenes de productos con URLs reales...\n');

  const update = db.prepare(`
    UPDATE products 
    SET image = ?, updatedAt = CURRENT_TIMESTAMP
    WHERE id = ?
  `);

  // Usar imágenes de Unsplash (más confiables)
  const images = productImages;
  
  let updated = 0;
  for (const [id, imageUrl] of Object.entries(images)) {
    try {
      const result = update.run(imageUrl, id);
      if (result.changes > 0) {
        const product = db.prepare('SELECT name FROM products WHERE id = ?').get(id);
        console.log(`   ✅ Producto ID ${id} (${product.name}): Imagen actualizada`);
        updated++;
      } else {
        console.log(`   ⚠️  Producto ID ${id}: No encontrado`);
      }
    } catch (error) {
      console.error(`   ❌ Error al actualizar producto ID ${id}:`, error.message);
    }
  }

  console.log(`\n✅ ${updated} productos actualizados exitosamente`);
}

updateProductImages();



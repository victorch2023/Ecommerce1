#!/usr/bin/env node

/**
 * Script para asignar rol de administrador a un usuario
 * Uso: node src/scripts/makeAdmin.js <email>
 */

import db from '../services/database.js';

const email = process.argv[2];

if (!email) {
  console.error('❌ Error: Debes proporcionar un email');
  console.log('Uso: node src/scripts/makeAdmin.js <email>');
  console.log('Ejemplo: node src/scripts/makeAdmin.js victor.chau777@hotmail.com');
  process.exit(1);
}

try {
  // Verificar que el usuario existe
  const user = db.prepare('SELECT id, email, role FROM users WHERE email = ?').get(email);
  
  if (!user) {
    console.error(`❌ Error: Usuario con email "${email}" no encontrado`);
    process.exit(1);
  }

  // Actualizar rol a admin
  db.prepare('UPDATE users SET role = ?, updatedAt = CURRENT_TIMESTAMP WHERE email = ?').run('admin', email);
  
  // Verificar el cambio
  const updatedUser = db.prepare('SELECT id, email, role FROM users WHERE email = ?').get(email);
  
  console.log('✅ Rol de administrador asignado exitosamente');
  console.log(`   Usuario: ${updatedUser.email}`);
  console.log(`   Rol: ${updatedUser.role}`);
  console.log('\n⚠️  IMPORTANTE: Cierra sesión y vuelve a iniciar sesión para que el cambio tome efecto');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}



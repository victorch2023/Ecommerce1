#!/usr/bin/env node

/**
 * Script para forzar la actualización del token de un usuario
 * Útil cuando se cambia el rol y el usuario ya tiene un token activo
 */

import db from '../services/database.js';
import { loginUser } from '../services/auth.js';

const email = process.argv[2] || 'victor.chau777@hotmail.com';

console.log('🔄 Forzando actualización de token para:', email);
console.log('');

try {
  // Verificar que el usuario existe y tiene rol admin
  const user = db.prepare('SELECT id, email, name, role FROM users WHERE email = ?').get(email);
  
  if (!user) {
    console.error('❌ Usuario no encontrado');
    process.exit(1);
  }

  console.log('✅ Usuario encontrado:');
  console.log(`   Email: ${user.email}`);
  console.log(`   Nombre: ${user.name || 'N/A'}`);
  console.log(`   Rol: ${user.role || 'user'}`);
  console.log('');

  if (user.role !== 'admin') {
    console.log('⚠️  El usuario NO tiene rol admin');
    console.log('   Ejecuta primero: node src/scripts/makeAdmin.js ' + email);
    process.exit(1);
  }

  console.log('📋 INSTRUCCIONES PARA EL USUARIO:');
  console.log('');
  console.log('1. Ve a: http://localhost:3000/clear-storage');
  console.log('2. Inicia sesión nuevamente con tu email y contraseña');
  console.log('3. O ve directamente a: http://localhost:3000/refresh-admin');
  console.log('');
  console.log('💡 El problema es que tu token JWT tiene el rol antiguo.');
  console.log('   Al cerrar sesión y volver a iniciar, se generará un nuevo token con el rol correcto.');
  console.log('');

} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}


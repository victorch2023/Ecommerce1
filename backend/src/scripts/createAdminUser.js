#!/usr/bin/env node

/**
 * Script para crear un nuevo usuario con rol de administrador
 * Uso: node src/scripts/createAdminUser.js <email> <password> <name>
 */

import db from '../services/database.js';
import bcrypt from 'bcryptjs';

const email = process.argv[2];
const password = process.argv[3];
const name = process.argv[4] || 'Administrador';

if (!email || !password) {
  console.error('❌ Error: Debes proporcionar email y contraseña');
  console.log('');
  console.log('Uso: node src/scripts/createAdminUser.js <email> <password> [nombre]');
  console.log('');
  console.log('Ejemplo:');
  console.log('  node src/scripts/createAdminUser.js admin@ejemplo.com miPassword123 "Juan Admin"');
  process.exit(1);
}

if (password.length < 6) {
  console.error('❌ Error: La contraseña debe tener al menos 6 caracteres');
  process.exit(1);
}

try {
  // Verificar si el usuario ya existe
  const existingUser = db.prepare('SELECT id, email FROM users WHERE email = ?').get(email);
  
  if (existingUser) {
    console.error(`❌ Error: El usuario con email "${email}" ya existe`);
    console.log('');
    console.log('Opciones:');
    console.log(`  1. Usar otro email`);
    console.log(`  2. Asignar rol admin al usuario existente:`);
    console.log(`     node src/scripts/makeAdmin.js ${email}`);
    process.exit(1);
  }

  // Hashear la contraseña
  console.log('🔐 Creando usuario administrador...');
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insertar usuario con rol admin directamente
  const result = db.prepare(`
    INSERT INTO users (email, password, name, role)
    VALUES (?, ?, ?, 'admin')
  `).run(email, hashedPassword, name);

  // Verificar el usuario creado
  const newUser = db.prepare('SELECT id, email, name, role FROM users WHERE id = ?').get(result.lastInsertRowid);

  console.log('');
  console.log('✅ Usuario administrador creado exitosamente!');
  console.log('');
  console.log('═'.repeat(60));
  console.log('📋 DATOS DEL USUARIO:');
  console.log('═'.repeat(60));
  console.log(`   Email: ${newUser.email}`);
  console.log(`   Contraseña: ${password}`);
  console.log(`   Nombre: ${newUser.name}`);
  console.log(`   Rol: ${newUser.role}`);
  console.log(`   ID: ${newUser.id}`);
  console.log('═'.repeat(60));
  console.log('');
  console.log('🚀 PRÓXIMOS PASOS:');
  console.log('');
  console.log('1. Ve a: http://localhost:3000/login');
  console.log(`2. Inicia sesión con:`);
  console.log(`   Email: ${email}`);
  console.log(`   Contraseña: ${password}`);
  console.log('3. Tendrás acceso completo al panel de administración');
  console.log('');

} catch (error) {
  console.error('❌ Error al crear usuario:', error.message);
  process.exit(1);
}


#!/usr/bin/env node

/**
 * Script para probar el acceso de administrador
 * Simula lo que hace el frontend para verificar permisos
 */

import db from '../services/database.js';
import { verifyToken } from '../services/auth.js';

// Obtener el usuario admin
const adminUser = db.prepare('SELECT * FROM users WHERE email = ?').get('victor.chau777@hotmail.com');

if (!adminUser) {
  console.error('❌ Usuario no encontrado');
  process.exit(1);
}

console.log('📋 Información del usuario:');
console.log(`   ID: ${adminUser.id}`);
console.log(`   Email: ${adminUser.email}`);
console.log(`   Nombre: ${adminUser.name || 'N/A'}`);
console.log(`   Rol: ${adminUser.role || 'no definido'}`);
console.log('');

if (adminUser.role === 'admin') {
  console.log('✅ El usuario tiene rol de administrador en la base de datos');
} else {
  console.log('❌ El usuario NO tiene rol de administrador');
  console.log('   Ejecuta: node src/scripts/makeAdmin.js victor.chau777@hotmail.com');
  process.exit(1);
}

console.log('\n🔍 Verificando estructura de la tabla users:');
const tableInfo = db.prepare("PRAGMA table_info(users)").all();
tableInfo.forEach(col => {
  console.log(`   - ${col.name}: ${col.type} (default: ${col.dflt_value || 'NULL'})`);
});

console.log('\n✅ Todo está correcto en la base de datos');
console.log('\n💡 Si el frontend aún no funciona:');
console.log('   1. Cierra sesión completamente');
console.log('   2. Ve a: http://localhost:3000/clear-storage');
console.log('   3. Inicia sesión nuevamente');
console.log('   4. El role se actualizará automáticamente');



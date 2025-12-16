#!/usr/bin/env node

/**
 * Script de diagnóstico para problemas de permisos de administrador
 */

import db from '../services/database.js';
import { verifyToken } from '../services/auth.js';

const email = 'victor.chau777@hotmail.com';

console.log('🔍 Diagnóstico de Permisos de Administrador\n');
console.log('═'.repeat(60));

// 1. Verificar usuario en BD
console.log('\n1️⃣ Verificando usuario en base de datos...');
const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

if (!user) {
  console.error('❌ Usuario no encontrado en la base de datos');
  process.exit(1);
}

console.log('✅ Usuario encontrado:');
console.log(`   ID: ${user.id}`);
console.log(`   Email: ${user.email}`);
console.log(`   Nombre: ${user.name || 'N/A'}`);
console.log(`   Rol en BD: ${user.role || 'no definido'}`);
console.log(`   Es admin?: ${user.role === 'admin' ? '✅ SÍ' : '❌ NO'}`);

if (user.role !== 'admin') {
  console.log('\n❌ PROBLEMA ENCONTRADO: El usuario NO tiene rol admin en la BD');
  console.log('   Solución: node src/scripts/makeAdmin.js ' + email);
  process.exit(1);
}

// 2. Verificar estructura de la tabla
console.log('\n2️⃣ Verificando estructura de la tabla users...');
const tableInfo = db.prepare("PRAGMA table_info(users)").all();
const hasRoleColumn = tableInfo.some(col => col.name === 'role');
console.log(`   Columna 'role' existe: ${hasRoleColumn ? '✅' : '❌'}`);

if (!hasRoleColumn) {
  console.log('\n❌ PROBLEMA: La columna role no existe en la tabla');
  console.log('   Solución: La columna debería crearse automáticamente');
}

// 3. Verificar función getUserById
console.log('\n3️⃣ Verificando función getUserById...');
const { getUserById } = await import('../services/auth.js');
const userById = getUserById(user.id);
console.log(`   Usuario obtenido por ID: ${userById ? '✅' : '❌'}`);
if (userById) {
  console.log(`   Rol obtenido: ${userById.role || 'no definido'}`);
  console.log(`   Es admin?: ${userById.role === 'admin' ? '✅ SÍ' : '❌ NO'}`);
}

// 4. Verificar middleware requireAdmin
console.log('\n4️⃣ Verificando lógica del middleware requireAdmin...');
if (userById && userById.role === 'admin') {
  console.log('✅ El middleware debería permitir el acceso');
} else {
  console.log('❌ El middleware DENEGARÁ el acceso');
}

// 5. Instrucciones
console.log('\n' + '═'.repeat(60));
console.log('\n📋 INSTRUCCIONES PARA EL USUARIO:\n');
console.log('1. Cierra sesión completamente en el frontend');
console.log('2. Ve a: http://localhost:3000/clear-storage');
console.log('3. Inicia sesión nuevamente con tu email y contraseña');
console.log('4. O ve directamente a: http://localhost:3000/refresh-admin');
console.log('\n💡 El problema más común es que el token JWT tiene el rol antiguo.');
console.log('   Al cerrar sesión y volver a iniciar, se generará un nuevo token con el rol correcto.');

console.log('\n✅ Diagnóstico completado\n');


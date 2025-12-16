#!/usr/bin/env node

/**
 * Script completo para probar todo el sistema local
 */

const API_URL = 'http://localhost:4000/api';

console.log('🧪 Probando Sistema Local Completo\n');
console.log('⚠️  Asegúrate de que el servidor esté corriendo: npm run dev\n');

async function testAPI(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    const data = await response.json();
    return { ok: response.ok, data, status: response.status };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

async function runTests() {
  let passed = 0;
  let failed = 0;

  // Test 1: Listar productos
  console.log('1️⃣ Probando GET /api/products...');
  const productsTest = await testAPI('/products');
  if (productsTest.ok && Array.isArray(productsTest.data)) {
    console.log(`   ✅ Productos encontrados: ${productsTest.data.length}`);
    passed++;
  } else {
    console.log(`   ❌ Error: ${productsTest.error || productsTest.data?.error}`);
    failed++;
  }

  // Test 2: Obtener un producto específico
  if (productsTest.ok && productsTest.data.length > 0) {
    console.log('\n2️⃣ Probando GET /api/products/:id...');
    const productId = productsTest.data[0].id;
    const productTest = await testAPI(`/products/${productId}`);
    if (productTest.ok && productTest.data.id) {
      console.log(`   ✅ Producto obtenido: ${productTest.data.name}`);
      passed++;
    } else {
      console.log(`   ❌ Error: ${productTest.error || productTest.data?.error}`);
      failed++;
    }
  }

  // Test 3: Registrar usuario
  console.log('\n3️⃣ Probando POST /api/auth/register...');
  const testEmail = `test-${Date.now()}@example.com`;
  const registerTest = await testAPI('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: testEmail,
      password: 'test123456',
      name: 'Usuario de Prueba'
    })
  });
  
  let token = null;
  if (registerTest.ok) {
    console.log(`   ✅ Usuario registrado: ${testEmail}`);
    passed++;
  } else {
    console.log(`   ❌ Error: ${registerTest.error || registerTest.data?.error}`);
    failed++;
  }

  // Test 4: Login
  console.log('\n4️⃣ Probando POST /api/auth/login...');
  const loginTest = await testAPI('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: testEmail,
      password: 'test123456'
    })
  });

  if (loginTest.ok && loginTest.data.token) {
    token = loginTest.data.token;
    console.log(`   ✅ Login exitoso, token obtenido`);
    passed++;
  } else {
    console.log(`   ❌ Error: ${loginTest.error || loginTest.data?.error}`);
    failed++;
  }

  // Test 5: Obtener perfil (con autenticación)
  if (token) {
    console.log('\n5️⃣ Probando GET /api/auth/profile (con autenticación)...');
    const profileTest = await testAPI('/auth/profile', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (profileTest.ok && profileTest.data.email) {
      console.log(`   ✅ Perfil obtenido: ${profileTest.data.email}`);
      passed++;
    } else {
      console.log(`   ❌ Error: ${profileTest.error || profileTest.data?.error}`);
      failed++;
    }
  }

  // Test 6: Crear orden (con autenticación)
  if (token && productsTest.ok && productsTest.data.length > 0) {
    console.log('\n6️⃣ Probando POST /api/orders (con autenticación)...');
    const orderTest = await testAPI('/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        items: [
          { productId: productsTest.data[0].id, quantity: 1, price: productsTest.data[0].price }
        ],
        total: productsTest.data[0].price
      })
    });

    if (orderTest.ok && orderTest.data.id) {
      console.log(`   ✅ Orden creada: ID ${orderTest.data.id}`);
      passed++;
    } else {
      console.log(`   ❌ Error: ${orderTest.error || orderTest.data?.error}`);
      failed++;
    }
  }

  // Resumen
  console.log('\n' + '='.repeat(50));
  console.log(`📊 Resumen de Pruebas:`);
  console.log(`   ✅ Pasadas: ${passed}`);
  console.log(`   ❌ Fallidas: ${failed}`);
  console.log(`   📈 Total: ${passed + failed}`);
  
  if (failed === 0) {
    console.log('\n🎉 ¡Todas las pruebas pasaron! El sistema está funcionando correctamente.');
  } else {
    console.log('\n⚠️  Algunas pruebas fallaron. Verifica que el servidor esté corriendo.');
  }
}

runTests().catch(console.error);



#!/usr/bin/env node

/**
 * Script para exponer la tienda local a internet usando ngrok
 * Esto crea un link público que funciona en cualquier navegador
 */

import { spawn } from 'child_process';
import http from 'http';

const FRONTEND_PORT = 3000;
const BACKEND_PORT = 4000;

// Verificar que los servidores estén corriendo
function checkServer(port, name) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}`, (res) => {
      resolve(true);
    });
    req.on('error', () => {
      resolve(false);
    });
    req.setTimeout(2000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function startTunnel() {
  console.log('🌐 Iniciando túnel público para la tienda...\n');
  
  // Verificar servidores
  console.log('🔍 Verificando servidores...');
  const frontendRunning = await checkServer(FRONTEND_PORT, 'Frontend');
  const backendRunning = await checkServer(BACKEND_PORT, 'Backend');
  
  if (!frontendRunning) {
    console.error('❌ El frontend no está corriendo en http://localhost:3000');
    console.error('   Inicia el frontend primero: cd frontend && npm start\n');
    process.exit(1);
  }
  
  if (!backendRunning) {
    console.warn('⚠️  El backend no está corriendo en http://localhost:4000');
    console.warn('   La tienda no funcionará correctamente sin el backend\n');
  } else {
    console.log('✅ Backend corriendo en http://localhost:4000');
  }
  
  console.log('✅ Frontend corriendo en http://localhost:3000\n');
  console.log('📋 Iniciando túnel público con ngrok...');
  console.log('📋 El link público aparecerá en unos segundos...\n');
  console.log('💡 Presiona Ctrl+C para detener el túnel\n');
  
  // Iniciar ngrok
  const ngrok = spawn('ngrok', ['http', FRONTEND_PORT.toString()], {
    stdio: 'inherit',
    shell: true
  });
  
  ngrok.on('error', (err) => {
    console.error('\n❌ Error al iniciar ngrok:', err.message);
    console.error('\n📥 Para instalar ngrok:');
    console.error('   1. Visita: https://ngrok.com/download');
    console.error('   2. O instala con Homebrew: brew install ngrok/ngrok/ngrok');
    console.error('   3. O con npm: npm install -g ngrok\n');
    process.exit(1);
  });
  
  ngrok.on('exit', (code) => {
    console.log(`\n\n🔌 Túnel cerrado (código: ${code})`);
    process.exit(code);
  });
  
  // Manejar Ctrl+C
  process.on('SIGINT', () => {
    console.log('\n\n🛑 Deteniendo túnel...');
    ngrok.kill();
    process.exit(0);
  });
}

startTunnel();



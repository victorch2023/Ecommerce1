# 🌐 Cómo Compartir tu Tienda con un Link Público

## 🚀 Método Rápido (ngrok)

### Paso 1: Instalar ngrok

**Opción A - Homebrew (Recomendado):**
```bash
brew install ngrok/ngrok/ngrok
```

**Opción B - Descarga Directa:**
1. Visita: https://ngrok.com/download
2. Descarga para macOS
3. Extrae y ejecuta: `./ngrok` (o muévelo a `/usr/local/bin/`)

**Opción C - npm:**
```bash
npm install -g ngrok
```

### Paso 2: Asegúrate de que los Servidores Estén Corriendo

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

Espera a que ambos estén corriendo correctamente.

### Paso 3: Inicia el Túnel Público

**Terminal 3 - Túnel:**
```bash
# Opción A: Script automático
cd scripts
./start-public-tunnel.sh

# Opción B: Manual
ngrok http 3000
```

### Paso 4: Obtén tu Link Público

ngrok mostrará algo como:
```
Forwarding  https://abc123.ngrok.io -> http://localhost:3000
```

**¡Ese link (https://abc123.ngrok.io) funciona desde cualquier navegador!**

### Paso 5: Comparte el Link

- ✅ Funciona en móviles
- ✅ Funciona en tablets
- ✅ Funciona en cualquier computadora
- ✅ Funciona desde cualquier lugar del mundo

## ⚙️ Configuración Adicional (Opcional)

### Si el Backend No Responde

Si las llamadas a la API fallan, necesitas exponer también el backend:

**Terminal 4 - Túnel Backend:**
```bash
ngrok http 4000
```

Luego actualiza la configuración del frontend:

1. Crea `frontend/.env.local`:
```env
REACT_APP_API_URL=https://tu-backend-ngrok-url.ngrok.io/api
```

2. Reinicia el frontend

## 🎯 Alternativas Rápidas

### localtunnel (Sin Registro)
```bash
npm install -g localtunnel
lt --port 3000
```

### Cloudflare Tunnel (Gratis)
```bash
brew install cloudflare/cloudflare/cloudflared
cloudflared tunnel --url http://localhost:3000
```

## 📋 Resumen de Comandos

```bash
# 1. Instalar ngrok
brew install ngrok/ngrok/ngrok

# 2. Iniciar backend (Terminal 1)
cd backend && npm run dev

# 3. Iniciar frontend (Terminal 2)
cd frontend && npm start

# 4. Iniciar túnel (Terminal 3)
ngrok http 3000

# 5. Copiar el link que ngrok muestra y compartirlo
```

## ⚠️ Notas Importantes

- **Temporal**: Los links gratuitos de ngrok cambian cada vez que reinicias
- **Límites**: ngrok free tiene límites de conexiones
- **Solo desarrollo**: No uses para producción real
- **Seguridad**: No compartas links con datos sensibles sin autenticación

## 🆘 Solución de Problemas

**"ngrok: command not found"**
→ Instala ngrok (ver Paso 1)

**"Connection refused"**
→ Verifica que el frontend esté corriendo en puerto 3000

**Las imágenes no cargan**
→ Verifica tu conexión a internet (las imágenes vienen de Unsplash)

**El backend no funciona**
→ Crea un túnel separado para el backend (ver Configuración Adicional)

## 📚 Más Información

Ver `docs/ACCESO_PUBLICO.md` para opciones avanzadas y deploy permanente.

¡Listo! Ahora puedes compartir tu tienda con el mundo 🌍



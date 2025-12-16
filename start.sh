#!/bin/bash

# Script para iniciar el e-commerce local
# Inicia el backend y el frontend

echo "🚀 Iniciando E-commerce Local..."
echo ""

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar que estamos en el directorio correcto
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Error: Este script debe ejecutarse desde la raíz del proyecto"
    exit 1
fi

# Función para verificar si un puerto está en uso
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        return 0
    else
        return 1
    fi
}

# Verificar puertos
if check_port 4000; then
    echo -e "${YELLOW}⚠️  El puerto 4000 (backend) ya está en uso${NC}"
else
    echo -e "${BLUE}📦 Iniciando backend en puerto 4000...${NC}"
    cd backend
    npm run dev > ../backend.log 2>&1 &
    BACKEND_PID=$!
    cd ..
    echo -e "${GREEN}✅ Backend iniciado (PID: $BACKEND_PID)${NC}"
    echo "   Logs: tail -f backend.log"
    sleep 2
fi

if check_port 3000; then
    echo -e "${YELLOW}⚠️  El puerto 3000 (frontend) ya está en uso${NC}"
else
    echo -e "${BLUE}🌐 Iniciando frontend en puerto 3000...${NC}"
    cd frontend
    npm start > ../frontend.log 2>&1 &
    FRONTEND_PID=$!
    cd ..
    echo -e "${GREEN}✅ Frontend iniciado (PID: $FRONTEND_PID)${NC}"
    echo "   Logs: tail -f frontend.log"
fi

echo ""
echo -e "${GREEN}✅ Aplicación iniciada${NC}"
echo ""
echo "📍 URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:4000/api"
echo ""
echo "📋 Para detener los servidores:"
echo "   pkill -f 'node.*server.js'  # Backend"
echo "   pkill -f 'react-scripts'    # Frontend"
echo ""
echo "📝 Ver logs:"
echo "   tail -f backend.log"
echo "   tail -f frontend.log"


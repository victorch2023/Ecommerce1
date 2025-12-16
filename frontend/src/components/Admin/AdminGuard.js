import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/api';

/**
 * Componente que protege las rutas de admin
 * ⚠️ PERMISOS DESACTIVADOS: Cualquier usuario puede acceder
 */
export default function AdminGuard({ children }) {
  // ⚠️ PERMISOS DESACTIVADOS - Permitir acceso a todos sin verificación
  console.log('✅ Acceso al panel de administración permitido (permisos desactivados)');
  
  return <>{children}</>;
}


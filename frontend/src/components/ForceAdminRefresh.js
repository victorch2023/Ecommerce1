import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

/**
 * Componente que fuerza la actualización del rol del usuario
 * Útil para cuando se cambia el rol en la base de datos
 */
export default function ForceAdminRefresh() {
  const navigate = useNavigate();

  useEffect(() => {
    async function refreshUser() {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          alert('❌ No estás autenticado. Por favor inicia sesión.');
          navigate('/login');
          return;
        }

        console.log('🔄 Refrescando token con rol actualizado...');
        
        try {
          // Refrescar el token para obtener el rol actualizado desde la base de datos
          const result = await authAPI.refreshToken();
          console.log('✅ Token actualizado:', result);
          
          const profile = result.user || result;
          
          if (profile.role === 'admin') {
            console.log('✅ Usuario es admin, redirigiendo al panel...');
            // Forzar recarga de la página para asegurar que todo se actualice
            setTimeout(() => {
              window.location.href = '/admin';
            }, 500);
          } else {
            console.log('❌ Usuario no es admin. Role:', profile.role);
            alert(`⚠️ Tu rol actual es: ${profile.role || 'user'}. Se requiere rol admin.\n\nSi acabas de recibir permisos de admin, cierra sesión y vuelve a iniciar sesión.`);
            navigate('/');
          }
        } catch (refreshError) {
          console.error('❌ Error al refrescar token:', refreshError);
          // Si falla el refresh, intentar obtener el perfil directamente
          try {
            const profile = await authAPI.getProfile();
            console.log('✅ Perfil obtenido:', profile);
            
            if (profile.role === 'admin') {
              // Actualizar localStorage manualmente
              const currentUser = authAPI.getCurrentUser();
              if (currentUser) {
                const updatedUser = { ...currentUser, role: 'admin' };
                localStorage.setItem('user', JSON.stringify(updatedUser));
              }
              setTimeout(() => {
                window.location.href = '/admin';
              }, 500);
            } else {
              alert(`⚠️ Tu rol actual es: ${profile.role || 'user'}. Se requiere rol admin.\n\nPor favor, cierra sesión y vuelve a iniciar sesión.`);
              navigate('/');
            }
          } catch (profileError) {
            console.error('❌ Error al obtener perfil:', profileError);
            alert('❌ Error al verificar permisos: ' + profileError.message + '\n\nPor favor, cierra sesión y vuelve a iniciar sesión.');
            navigate('/');
          }
        }
      } catch (error) {
        console.error('❌ Error general:', error);
        alert('❌ Error: ' + error.message + '\n\nPor favor, cierra sesión y vuelve a iniciar sesión.');
        navigate('/');
      }
    }

    refreshUser();
  }, [navigate]);

  return (
    <div className="container">
      <div className="loading">Actualizando permisos...</div>
    </div>
  );
}


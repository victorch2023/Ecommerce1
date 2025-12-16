import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';

export default function Login(){
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');
  const [mode, setMode] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  async function submit(e){
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try{
      if(mode==='login'){
        const result = await authAPI.login(email, pass);
        setSuccess('¡Sesión iniciada exitosamente!');
        // Disparar evento para actualizar el estado del usuario en App
        window.dispatchEvent(new Event('userLoggedIn'));
        setTimeout(() => {
          navigate('/');
          window.location.reload();
        }, 1000);
      } else {
        await authAPI.register(email, pass, name);
        setSuccess('¡Usuario creado exitosamente! Iniciando sesión...');
        // Auto-login después de registro
        await authAPI.login(email, pass);
        setTimeout(() => {
          navigate('/');
          window.location.reload();
        }, 1500);
      }
    } catch(err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="form-container">
        <h3>{mode==='login' ? 'Iniciar Sesión' : 'Crear Cuenta'}</h3>
        
        {error && (
          <div className="error">
            {error}
          </div>
        )}
        
        {success && (
          <div className="success">
            {success}
          </div>
        )}
        
        <form onSubmit={submit}>
          {mode === 'register' && (
            <div className="form-group">
              <label htmlFor="name">Nombre (opcional)</label>
              <input 
                id="name"
                type="text"
                placeholder='Tu nombre' 
                value={name} 
                onChange={e=>setName(e.target.value)} 
              />
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              id="email"
              type='email'
              placeholder='tu@email.com'
              value={email} 
              onChange={e=>setEmail(e.target.value)} 
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input 
              id="password"
              type='password' 
              placeholder='Mínimo 6 caracteres'
              value={pass} 
              onChange={e=>setPass(e.target.value)} 
              required
              minLength={6}
            />
          </div>
          
          <button 
            type='submit' 
            className="btn btn-primary btn-full"
            disabled={loading}
            style={{marginTop: '1rem'}}
          >
            {loading ? 'Procesando...' : (mode==='login' ? 'Iniciar Sesión' : 'Crear Cuenta')}
          </button>
        </form>
        
        <div style={{marginTop: '1.5rem', textAlign: 'center'}}>
          <button 
            type='button' 
            className="btn btn-secondary btn-full"
            onClick={()=>{
              setMode(mode==='login'?'register':'login');
              setError(null);
              setSuccess(null);
            }}
          >
            {mode==='login' 
              ? '¿No tienes cuenta? Regístrate aquí' 
              : '¿Ya tienes cuenta? Inicia sesión aquí'}
          </button>
        </div>
        
        <div style={{marginTop: '1.5rem', textAlign: 'center'}}>
          <Link to="/" style={{color: 'var(--primary-color)'}}>
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}

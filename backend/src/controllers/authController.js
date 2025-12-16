import { registerUser, loginUser } from '../services/auth.js';

export async function register(req, res) {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }

    const user = await registerUser(email, password, name);
    res.status(201).json({ message: 'Usuario registrado exitosamente', user });
  } catch (error) {
    if (error.message === 'El usuario ya existe') {
      return res.status(409).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    const result = await loginUser(email, password);
    res.json(result);
  } catch (error) {
    if (error.message === 'Credenciales inválidas') {
      return res.status(401).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
}

export async function getProfile(req, res) {
  try {
    // El usuario viene del middleware authenticateToken
    const { getUserById } = await import('../services/auth.js');
    const user = await getUserById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function refreshToken(req, res) {
  try {
    // El usuario viene del middleware authenticateToken
    const { refreshToken: refreshTokenService } = await import('../services/auth.js');
    const result = await refreshTokenService(req.user.id);
    
    res.json({
      message: 'Token actualizado exitosamente',
      ...result
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



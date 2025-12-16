import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getFirestore, COLLECTIONS, convertFirestoreDoc } from './firestore.js';

const JWT_SECRET = process.env.JWT_SECRET || 'tu-secret-key-cambiar-en-produccion';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const db = getFirestore();

/**
 * Registrar un nuevo usuario
 */
export async function registerUser(email, password, name = null) {
  try {
    // Verificar si el usuario ya existe
    const usersRef = db.collection(COLLECTIONS.USERS);
    const snapshot = await usersRef.where('email', '==', email).limit(1).get();
    
    if (!snapshot.empty) {
      throw new Error('El usuario ya existe');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario en Firestore
    const userData = {
      email,
      password: hashedPassword,
      name: name || null,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await usersRef.add(userData);
    const userDoc = await docRef.get();

    return {
      id: docRef.id,
      email,
      name,
      role: 'user'
    };
  } catch (error) {
    throw error;
  }
}

/**
 * Autenticar usuario (login)
 */
export async function loginUser(email, password) {
  try {
    // Buscar usuario
    const usersRef = db.collection(COLLECTIONS.USERS);
    const snapshot = await usersRef.where('email', '==', email).limit(1).get();
    
    if (snapshot.empty) {
      throw new Error('Credenciales inválidas');
    }

    const userDoc = snapshot.docs[0];
    const user = convertFirestoreDoc(userDoc);
    
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    // Verificar contraseña
    const isValid = await bcrypt.compare(password, user.password);
    
    if (!isValid) {
      throw new Error('Credenciales inválidas');
    }

    // Obtener el rol actualizado
    const currentRole = user.role || 'user';
    
    // Generar token JWT (incluir role en el token)
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email,
        role: currentRole
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    console.log(`✅ Login exitoso para ${email} con rol: ${currentRole}`);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: currentRole
      }
    };
  } catch (error) {
    throw error;
  }
}

/**
 * Verificar token JWT
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Token inválido');
  }
}

/**
 * Middleware para proteger rutas
 */
export async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = verifyToken(token);
    // Obtener el usuario completo de la base de datos para asegurar que tenemos el role actualizado
    const user = await getUserById(decoded.id);
    if (user) {
      req.user = {
        ...decoded,
        role: user.role || decoded.role || 'user'
      };
    } else {
      req.user = decoded;
    }
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido' });
  }
}

/**
 * Obtener usuario por ID
 */
export async function getUserById(userId) {
  try {
    const userDoc = await db.collection(COLLECTIONS.USERS).doc(userId).get();
    if (!userDoc.exists) {
      return null;
    }
    const user = convertFirestoreDoc(userDoc);
    // No devolver la contraseña
    if (user) {
      delete user.password;
    }
    return user;
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    return null;
  }
}

/**
 * Refrescar token con el rol actualizado desde la base de datos
 */
export async function refreshToken(userId) {
  const user = await getUserById(userId);
  
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  // Generar nuevo token con el rol actualizado desde la base de datos
  const token = jwt.sign(
    { 
      id: user.id, 
      email: user.email,
      role: user.role || 'user'
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role || 'user'
    }
  };
}

/**
 * Middleware para verificar si el usuario es admin
 */
export async function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: 'Autenticación requerida' });
  }

  // Siempre obtener el usuario actualizado de la base de datos
  const user = await getUserById(req.user.id);
  
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  // Verificar el role desde la base de datos (no del token)
  if (user.role !== 'admin') {
    console.log(`Acceso denegado para usuario ${user.email}. Role actual: ${user.role}`);
    return res.status(403).json({ 
      error: 'Acceso denegado. Se requiere rol de administrador',
      currentRole: user.role 
    });
  }

  // Actualizar req.user con el role correcto
  req.user.role = user.role;
  next();
}

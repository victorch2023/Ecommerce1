import React, { useEffect, useState } from 'react';
import { adminAPI } from '../../services/adminAPI';
import { Link } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    stock: '',
    image: ''
  });

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);
      const data = await adminAPI.getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(product) {
    setEditing(product.id);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description || '',
      stock: product.stock || '',
      image: product.image || ''
    });
    setImageFile(null);
    setImagePreview(product.image || null);
  }

  function handleCancel() {
    setEditing(null);
    setFormData({
      name: '',
      price: '',
      description: '',
      stock: '',
      image: ''
    });
    setImageFile(null);
    setImagePreview(null);
  }

  async function handleImageUpload(file) {
    if (!file) return null;

    // Validar tipo de archivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Solo se permiten archivos de imagen (JPEG, PNG, GIF, WEBP)');
      return null;
    }

    // Validar tamaño (10MB máximo)
    if (file.size > 10 * 1024 * 1024) {
      alert('El archivo es demasiado grande. Máximo 10MB');
      return null;
    }

    setUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('folder', 'products');

      const response = await fetch(`${API_BASE_URL}/storage/upload`, {
        method: 'POST',
        body: uploadFormData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error al subir la imagen');
      }

      const result = await response.json();
      console.log('Respuesta del servidor:', result);
      
      // Construir la URL completa - el backend devuelve /uploads/...
      const imageUrl = result.url.startsWith('http') 
        ? result.url 
        : `http://localhost:4000${result.url}`;
      
      console.log('URL de imagen construida:', imageUrl);
      
      // Actualizar formData con la URL de la imagen
      setFormData(prev => {
        const updated = { ...prev, image: imageUrl };
        console.log('FormData actualizado:', updated);
        return updated;
      });
      setImagePreview(imageUrl);
      setImageFile(null);
      alert('✅ Imagen subida exitosamente');
      return imageUrl;
    } catch (err) {
      alert('Error al subir la imagen: ' + err.message);
      return null;
    } finally {
      setUploading(false);
    }
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Crear preview local
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleSave() {
    try {
      // Verificar que tenemos los datos necesarios
      if (!formData.name || !formData.price) {
        alert('Nombre y precio son requeridos');
        return;
      }

      let finalImageUrl = formData.image;

      // Si hay un archivo seleccionado pero no se ha subido, subirlo primero
      if (imageFile && !uploading) {
        console.log('Subiendo imagen antes de guardar...');
        const uploadedUrl = await handleImageUpload(imageFile);
        if (uploadedUrl) {
          finalImageUrl = uploadedUrl;
        } else {
          alert('No se pudo subir la imagen. Por favor, inténtalo de nuevo.');
          return;
        }
      }

      // Preparar datos finales con la URL de imagen correcta
      const finalFormData = {
        ...formData,
        image: finalImageUrl || formData.image || ''
      };

      console.log('Guardando producto con datos:', finalFormData);

      if (editing) {
        await adminAPI.updateProduct(editing, finalFormData);
      } else {
        await adminAPI.createProduct(finalFormData);
      }
      await loadProducts();
      handleCancel();
    } catch (err) {
      console.error('Error al guardar:', err);
      alert(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) {
      return;
    }

    try {
      await adminAPI.deleteProduct(id);
      await loadProducts();
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) {
    return <div className="container"><div className="loading">Cargando productos...</div></div>;
  }

  if (error) {
    return <div className="container"><div className="error">{error}</div></div>;
  }

  return (
    <div className="container">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <h1>Gestión de Productos</h1>
        <Link to="/admin" className="btn btn-secondary">← Volver al Dashboard</Link>
      </div>

      <div className="admin-form-card">
        <h2>{editing ? 'Editar Producto' : 'Nuevo Producto'}</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Nombre *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Precio *</label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Stock</label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({...formData, stock: e.target.value})}
            />
          </div>
          <div className="form-group full-width">
            <label>Imagen del Producto</label>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              {/* Opción 1: Subir archivo */}
              <div>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500'}}>
                  Subir imagen desde archivo:
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  onChange={handleFileChange}
                  disabled={uploading}
                  style={{
                    padding: '0.5rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    width: '100%'
                  }}
                />
                {imageFile && (
                  <div style={{display: 'flex', gap: '0.5rem', marginTop: '0.5rem'}}>
                    <button
                      type="button"
                      onClick={() => handleImageUpload(imageFile)}
                      disabled={uploading}
                      className="btn btn-secondary"
                      style={{
                        fontSize: '0.875rem',
                        padding: '0.5rem 1rem'
                      }}
                    >
                      {uploading ? 'Subiendo...' : 'Subir Imagen'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(formData.image || null);
                      }}
                      className="btn btn-secondary"
                      style={{
                        fontSize: '0.875rem',
                        padding: '0.5rem 1rem',
                        background: '#ef4444',
                        color: 'white'
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>

              {/* Opción 2: URL */}
              <div>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500'}}>
                  O ingresar URL de imagen:
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => {
                    setFormData({...formData, image: e.target.value});
                    setImagePreview(e.target.value);
                  }}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  style={{
                    padding: '0.5rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    width: '100%'
                  }}
                />
              </div>

              {/* Preview de imagen */}
              {(imagePreview || formData.image) && (
                <div style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  border: '2px dashed var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center'
                }}>
                  <p style={{marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)'}}>
                    Vista previa:
                  </p>
                  <img
                    src={imagePreview || formData.image}
                    alt="Preview"
                    style={{
                      maxWidth: '200px',
                      maxHeight: '200px',
                      objectFit: 'contain',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div style={{display: 'none', color: 'var(--text-secondary)', fontSize: '0.875rem'}}>
                    No se pudo cargar la imagen
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="form-group full-width">
            <label>Descripción</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows="3"
            />
          </div>
        </div>
        <div style={{display: 'flex', gap: '1rem'}}>
          <button onClick={handleSave} className="btn btn-primary">
            {editing ? 'Guardar Cambios' : 'Crear Producto'}
          </button>
          {editing && (
            <button onClick={handleCancel} className="btn btn-secondary">
              Cancelar
            </button>
          )}
        </div>
      </div>

      <div className="admin-table">
        <h2>Lista de Productos</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <img 
                    src={product.image || 'https://via.placeholder.com/50'} 
                    alt={product.name}
                    style={{
                      width: '50px', 
                      height: '50px', 
                      objectFit: 'cover', 
                      borderRadius: '4px',
                      border: '1px solid var(--border-color)'
                    }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/50?text=Sin+imagen';
                    }}
                  />
                </td>
                <td>{product.name}</td>
                <td>S/ {product.price.toFixed(2)}</td>
                <td>{product.stock || 0}</td>
                <td>
                  <button 
                    onClick={() => handleEdit(product)}
                    className="btn btn-secondary btn-sm"
                    style={{marginRight: '0.5rem'}}
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="btn btn-secondary btn-sm"
                    style={{background: '#ef4444', color: 'white'}}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



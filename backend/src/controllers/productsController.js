import { getFirestore, COLLECTIONS, convertFirestoreDoc } from '../services/firestore.js';

const db = getFirestore();

export async function listProducts(req, res) {
  try {
    const productsRef = db.collection(COLLECTIONS.PRODUCTS);
    const snapshot = await productsRef.orderBy('createdAt', 'desc').get();
    
    const products = [];
    snapshot.forEach(doc => {
      products.push(convertFirestoreDoc(doc));
    });
    
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export async function getProduct(req, res) {
  try {
    const productDoc = await db.collection(COLLECTIONS.PRODUCTS).doc(req.params.id).get();
    
    if (!productDoc.exists) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    const product = convertFirestoreDoc(productDoc);
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export async function createProduct(req, res) {
  try {
    const { name, price, description, stock, image } = req.body;
    
    if (!name || price === undefined) {
      return res.status(400).json({ error: 'Nombre y precio son requeridos' });
    }

    console.log('Creando producto con imagen:', image);

    const productData = {
      name,
      price: parseFloat(price),
      description: description || null,
      stock: stock || 0,
      image: image || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await db.collection(COLLECTIONS.PRODUCTS).add(productData);
    const savedProductDoc = await docRef.get();
    const savedProduct = convertFirestoreDoc(savedProductDoc);
    
    console.log('Producto guardado:', savedProduct);

    res.json({ id: docRef.id, product: savedProduct });
  } catch (e) {
    console.error('Error al crear producto:', e);
    res.status(500).json({ error: e.message });
  }
}

export async function updateProduct(req, res) {
  try {
    const { name, price, description, stock, image } = req.body;
    const productId = req.params.id;

    console.log('Actualizando producto:', productId, 'con imagen:', image);

    // Verificar que el producto existe
    const productDoc = await db.collection(COLLECTIONS.PRODUCTS).doc(productId).get();
    if (!productDoc.exists) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Preparar datos de actualización
    const updateData = {
      updatedAt: new Date()
    };

    if (name !== undefined) updateData.name = name;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (description !== undefined) updateData.description = description;
    if (stock !== undefined) updateData.stock = stock;
    if (image !== undefined) {
      // Si image es una cadena vacía, mantener null
      updateData.image = image === '' ? null : image;
    }

    await db.collection(COLLECTIONS.PRODUCTS).doc(productId).update(updateData);

    // Obtener el producto actualizado
    const updatedProductDoc = await db.collection(COLLECTIONS.PRODUCTS).doc(productId).get();
    const updatedProduct = convertFirestoreDoc(updatedProductDoc);
    console.log('Producto actualizado:', updatedProduct);

    res.json({ ok: true, product: updatedProduct });
  } catch (e) {
    console.error('Error al actualizar producto:', e);
    res.status(500).json({ error: e.message });
  }
}

export async function deleteProduct(req, res) {
  try {
    const productId = req.params.id;

    // Verificar que el producto existe
    const productDoc = await db.collection(COLLECTIONS.PRODUCTS).doc(productId).get();
    if (!productDoc.exists) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await db.collection(COLLECTIONS.PRODUCTS).doc(productId).delete();
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

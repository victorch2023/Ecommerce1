/**
 * Servicio de carrito de compras
 * Usa localStorage para persistencia
 */

const CART_STORAGE_KEY = 'ecommerce_cart';

/**
 * Obtener el carrito del localStorage
 */
export function getCart() {
  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error al obtener carrito:', error);
    return [];
  }
}

/**
 * Guardar el carrito en localStorage
 */
function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    // Disparar evento personalizado para notificar cambios
    window.dispatchEvent(new Event('cartUpdated'));
  } catch (error) {
    console.error('Error al guardar carrito:', error);
  }
}

/**
 * Agregar producto al carrito
 */
export function addToCart(product, quantity = 1) {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    // Si ya existe, actualizar cantidad
    existingItem.quantity += quantity;
    if (existingItem.quantity > (product.stock || 999)) {
      existingItem.quantity = product.stock || 999;
    }
  } else {
    // Si no existe, agregar nuevo item
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      stock: product.stock,
      quantity: Math.min(quantity, product.stock || 999)
    });
  }

  saveCart(cart);
  return cart;
}

/**
 * Remover producto del carrito
 */
export function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
  return cart;
}

/**
 * Actualizar cantidad de un producto en el carrito
 */
export function updateCartItemQuantity(productId, quantity) {
  const cart = getCart();
  const item = cart.find(item => item.id === productId);

  if (item) {
    if (quantity <= 0) {
      // Si la cantidad es 0 o menor, eliminar el item
      return removeFromCart(productId);
    }
    
    // Verificar stock disponible
    if (item.stock && quantity > item.stock) {
      quantity = item.stock;
    }
    
    item.quantity = quantity;
    saveCart(cart);
  }

  return cart;
}

/**
 * Limpiar el carrito
 */
export function clearCart() {
  saveCart([]);
  return [];
}

/**
 * Obtener el total de items en el carrito
 */
export function getCartItemCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Obtener el total del carrito
 */
export function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/**
 * Verificar si el carrito está vacío
 */
export function isCartEmpty() {
  return getCart().length === 0;
}

/**
 * Obtener un item específico del carrito
 */
export function getCartItem(productId) {
  const cart = getCart();
  return cart.find(item => item.id === productId);
}



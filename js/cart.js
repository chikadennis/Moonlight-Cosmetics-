/* =========================================================
   MOONLIGHT COSMETICS — CART LOGIC
   Depends on data.js (PRODUCTS/SERVICES/findProductById/findVariant).
   Loaded on every page, right after data.js.
   ========================================================= */

var CART_KEY = "moonlight_cart";

function getCart() {
  try {
    var raw = window.localStorage.getItem(CART_KEY);
    var parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
}

function saveCart(items) {
  try {
    window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch (err) {
    /* localStorage unavailable (e.g. private mode) - fail silently */
  }
  updateCartBadge();
}

function addToCart(productId, variantId, qty) {
  qty = qty || 1;
  var items = getCart();
  var line = items.find(function (i) {
    return i.productId === productId && i.variantId === variantId;
  });

  if (line) {
    line.qty += qty;
  } else {
    items.push({ productId: productId, variantId: variantId, qty: qty });
  }

  saveCart(items);

  if (typeof showToast === "function") {
    var product = findProductById(productId);
    showToast((product ? product.name : "Item") + " added to your cart.");
  }
}

function removeFromCart(productId, variantId) {
  var items = getCart().filter(function (i) {
    return !(i.productId === productId && i.variantId === variantId);
  });
  saveCart(items);
}

function updateQty(productId, variantId, newQty) {
  var items = getCart();
  var line = items.find(function (i) {
    return i.productId === productId && i.variantId === variantId;
  });

  if (!line) return;

  if (newQty < 1) {
    removeFromCart(productId, variantId);
    return;
  }

  line.qty = newQty;
  saveCart(items);
}

function clearCart() {
  saveCart([]);
}

function getCartLineTotal(line) {
  var product = findProductById(line.productId);
  var variant = product ? findVariant(product, line.variantId) : null;
  var price = variant ? variant.price : 0;
  return price * line.qty;
}

function getCartCount() {
  return getCart().reduce(function (sum, i) { return sum + i.qty; }, 0);
}

function getCartTotal() {
  return getCart().reduce(function (sum, line) { return sum + getCartLineTotal(line); }, 0);
}

function updateCartBadge() {
  var badge = document.getElementById("cartBadge");
  if (!badge) return;

  var count = getCartCount();
  badge.textContent = String(count);
  badge.classList.toggle("hide", count === 0);
}

document.addEventListener("DOMContentLoaded", updateCartBadge);

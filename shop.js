/* =========================================================
   RETROVAULT — shared shop logic
   Cart state lives in localStorage under key "retrovault_cart"
   Shape: { [productId]: quantity }
   ========================================================= */

const CART_KEY = "retrovault_cart";
const SHIPPING_FLAT = 0; // verzendkosten verwijderd: altijd gratis verzending
const VALID_PROMO = { code: "RETRO10", percent: 10 };

/* ---------- Category labels ---------- */
function categoryLabel(category){
  const labels = {
    console: "Console",
    game: "Game",
    accessoire: "Accessoire"
  };
  return labels[category] || category;
}

/* ---------- Cart storage ---------- */
function getCart(){
  try{
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : {};
  }catch(e){
    return {};
  }
}
function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}
function addToCart(productId, qty){
  qty = qty || 1;
  const product = getProductById(productId);
  if(!product || product.stock <= 0) return false;
  const cart = getCart();
  const current = cart[productId] || 0;
  const next = Math.min(current + qty, product.stock);
  cart[productId] = next;
  saveCart(cart);
  return true;
}
function setCartQty(productId, qty){
  const product = getProductById(productId);
  const cart = getCart();
  if(qty <= 0){
    delete cart[productId];
  }else{
    const max = product ? product.stock : 99;
    cart[productId] = Math.min(qty, max);
  }
  saveCart(cart);
}
function removeFromCart(productId){
  const cart = getCart();
  delete cart[productId];
  saveCart(cart);
}
function clearCart(){
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}
function getCartItems(){
  const cart = getCart();
  return Object.keys(cart).map(id => {
    const product = getProductById(id);
    if(!product) return null;
    return { product, qty: cart[id] };
  }).filter(Boolean);
}
function getCartCount(){
  const cart = getCart();
  return Object.values(cart).reduce((sum, q) => sum + q, 0);
}
function getCartSubtotal(){
  return getCartItems().reduce((sum, item) => sum + item.product.price * item.qty, 0);
}

/* ---------- Promo code (session-scoped, demo only) ---------- */
function getAppliedPromo(){
  return null; // kortingscodes zijn uitgeschakeld
}
function applyPromoCode(code){
  const normalized = (code || "").trim().toUpperCase();
  if(normalized === VALID_PROMO.code){
    sessionStorage.setItem("retrovault_promo", JSON.stringify(VALID_PROMO));
    return { ok: true, percent: VALID_PROMO.percent };
  }
  sessionStorage.removeItem("retrovault_promo");
  return { ok: false };
}
function clearPromo(){
  sessionStorage.removeItem("retrovault_promo");
}

/* ---------- Totals calculation (used by cart + checkout) ---------- */
function computeTotals(){
  const subtotal = getCartSubtotal();
  const promo = getAppliedPromo();
  const discount = promo ? subtotal * (promo.percent / 100) : 0;
  const afterDiscount = subtotal - discount;
  const shipping = SHIPPING_FLAT;
  const total = afterDiscount + shipping;
  return { subtotal, discount, shipping, total, promo };
}

/* ---------- Header badge ---------- */
function updateCartBadge(){
  const badge = document.querySelector("[data-cart-count]");
  if(badge){
    const count = getCartCount();
    badge.textContent = count;
    badge.style.display = count > 0 ? "inline-flex" : "none";
  }
}

/* ---------- Toast ---------- */
let toastTimer = null;
function showToast(message){
  let toast = document.querySelector(".toast");
  if(!toast){
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  requestAnimationFrame(() => toast.classList.add("show"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

/* ---------- Mobile nav toggle ---------- */
function initNavToggle(){
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if(toggle && nav){
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
  }
}

/* ---------- Init on every page ---------- */
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  initNavToggle();
});

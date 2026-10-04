/* =========================================================
   RETROVAULT — shared header & footer
   Injected into any element with id="site-header" / "site-footer"
   data-active attribute on body sets the active nav link
   ========================================================= */

function renderHeader(){
  const el = document.getElementById("site-header");
  if(!el) return;
  const active = document.body.getAttribute("data-active") || "";
  const navItem = (href, label, key) =>
    `<a href="${href}" class="${active === key ? 'active' : ''}">${label}</a>`;

  el.innerHTML = `
    <div class="header-inner">
      <a href="index.html" class="logo">
        <span class="dot"></span>GAMEMANIAK<span style="color:var(--paper-dim);font-size:11px;margin-left:4px;">.shop</span>
      </a>
      <nav class="main-nav">
        ${navItem("index.html", "Home", "home")}
        ${navItem("producten.html", "Alle producten", "producten")}
        ${navItem("producten.html?cat=console", "Consoles", "consoles")}
        ${navItem("producten.html?cat=game", "PSP & Android Games", "games")}
        ${navItem("producten.html?cat=accessoire", "Entertainment Apps", "accessoires")}
      </nav>
      <div class="header-actions">
        <button class="nav-toggle" aria-label="Menu">☰</button>
        <a href="winkelwagen.html" class="cart-link">
          🛒 Winkelwagen
          <span class="cart-count" data-cart-count style="display:none;">0</span>
        </a>
      </div>
    </div>
  `;
}

function renderFooter(){
  const el = document.getElementById("site-footer");
  if(!el) return;
  el.innerHTML = `
    <div class="footer-inner">
      <div>
        <div class="logo" style="margin-bottom:12px;">
          <span class="dot"></span>GAMEMANIAK
        </div>
        <p style="max-width:32ch; color:var(--paper-dim); font-family:var(--font-mono); font-size:11.5px;">
          Gloednieuwe retro consoles, games &amp; accessoires. Getest, en klaar om te verzenden & spelen.
        </p>
      </div>
      <div class="footer-cols">
        <div class="footer-col">
          <h4>Shop</h4>
          <a href="producten.html?cat=console">Consoles</a>
          <a href="producten.html?cat=game">Games</a>
          <a href="producten.html?cat=accessoire">Accessoires</a>
        </div>
        <div class="footer-col">
          <h4>Klantenservice</h4>
          <a href="winkelwagen.html">Winkelwagen</a>
          <a href="checkout.html">Afrekenen</a>
          <a href="#" onclick="return false;">Verzending &amp; retour</a>
        </div>
        <div class="footer-col">
          <h4>Info</h4>
          <span style="display:block; margin-bottom:8px;">30 dagen garantie</span>
          <span style="display:block; margin-bottom:8px;">Gratis verzending</span>
          <span style="display:block;">Gamemaniak-webshop</span>
        </div>
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  updateCartBadge();
});

/* =========================================================
   GAMEMANIAK — shared header & footer
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
      <nav class="main-nav" id="main-nav">
        ${navItem("index.html", "Home", "home")}
        ${navItem("producten.html", "Alle producten", "producten")}
        ${navItem("producten.html?cat=console", "Consoles", "consoles")}
        ${navItem("producten.html?cat=game", "PSP & Android Games", "games")}
        ${navItem("producten.html?cat=accessoire", "Entertainment Apps", "accessoires")}
      </nav>
      <div class="header-actions">
        <button class="nav-toggle" aria-label="Menu" aria-expanded="false" aria-controls="main-nav">☰</button>
        <a href="winkelwagen.html" class="cart-link" aria-label="Winkelwagen">
          <span class="cart-icon">🛒</span><span class="cart-label">Winkelwagen</span>
          <span class="cart-count" data-cart-count style="display:none;">0</span>
        </a>
      </div>
    </div>
  `;

  // Mobiel menu open/dicht
  const toggle = el.querySelector(".nav-toggle");
  const nav = el.querySelector(".main-nav");
  if(toggle && nav){
    const setOpen = (open) => {
      nav.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "✕" : "☰";
    };
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      setOpen(!nav.classList.contains("open"));
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("click", (e) => {
      if(!el.contains(e.target)) setOpen(false);
    });
  }
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
        <p style="max-width:32ch; font-size:12.5px;">
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

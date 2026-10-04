/* =========================================================
   RETROVAULT — shared product card markup
   ========================================================= */

function stockBadge(product){
  if(product.stock <= 0) return `<span class="badge badge-out">Uitverkocht</span>`;
  if(product.stock <= 3) return `<span class="badge badge-low">Nog ${product.stock}</span>`;
  return `<span class="badge badge-stock">Op voorraad</span>`;
}

function renderProductCard(product){
  const disabled = product.stock <= 0 ? "disabled" : "";
  const btnLabel = product.stock <= 0 ? "Uitverkocht" : "In winkelwagen";
  return `
    <div class="card">
      <div class="card-media">
        ${stockBadge(product)}
        <span class="badge-cat">${product.platform}</span>
        ${product.tag ? `<span class="badge-tag">${product.tag}</span>` : ""}
        ${product.image
          ? `<img src="${product.image}" alt="${product.name}" class="card-image" loading="lazy">`
          : `<span class="glyph">${product.glyph}</span>`}
      </div>
      <div class="card-body">
        <span class="card-eyebrow">${categoryLabel(product.category)}</span>
        <h3 class="card-title"><a href="product.html?id=${product.id}">${product.name}</a></h3>
        <div class="card-price-row">
          <span>
            ${product.oldPrice ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>` : ""}
            <span class="price">${formatPrice(product.price)}</span>
          </span>
        </div>
        <div class="card-actions">
          <a href="product.html?id=${product.id}" class="btn btn-outline btn-sm" style="flex:1;">Bekijk</a>
          <button class="btn btn-primary btn-sm" style="flex:1;" ${disabled}
            onclick="handleQuickAdd('${product.id}', this)">${btnLabel}</button>
        </div>
      </div>
    </div>
  `;
}

function categoryLabel(cat){
  if(cat === "console") return "Console";
  if(cat === "game") return "PSP Game";
  if(cat === "accessoire") return "Accessoire";
  return cat;
}

function handleQuickAdd(productId, btnEl){
  const ok = addToCart(productId, 1);
  const product = getProductById(productId);
  if(ok){
    showToast(`${product.name} toegevoegd aan winkelwagen`);
    if(btnEl){
      const original = btnEl.textContent;
      btnEl.textContent = "Toegevoegd ✓";
      setTimeout(() => { btnEl.textContent = original; }, 1200);
    }
  }
}

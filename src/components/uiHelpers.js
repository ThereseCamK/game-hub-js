import { formatPrice } from "../utils/format.js";

/**
 * Rendre produktkort i en slider og initialiser autoplay + fade + dots
 * @param {Array} products - produktobjekter
 * @param {string} slidesId - id på slides container
 * @param {string} dotsId - id på dots container
 */
 

export function escapeHtml(str='') {
  return String(str).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
}

export function productCardHtml(p, cart = []) {

  const inCart = cart.some(item => item.id === p.id);

  return `
    <div class="product-card" data-id="${p.id}">
      ${p.onSale ? `<span class="badge">SALE</span>` : ""}
      <img src="${p.image.url || ''}" alt="${escapeHtml(p.title || '')}" />
      <h3>${escapeHtml(p.title || '')}</h3>
      ${priceHtml(p)}
      <p class="genre">${escapeHtml(p.genre || p.category || '')}</p>
      <a href="#/product/${p.id}" class="details-btn">See details</a>
      ${ inCart ? `<button class="cart-btn in-cart" data-id="${p.id}" disabled>✔ In Cart allready</button>` : `<button class="cart-btn" data-id="${p.id}">🛒 Add To Cart </button>`}
    </div>
  `;
  
}

export function attachAddToCartDelegation( controller) {
     const buttons = document.querySelectorAll(".cart-btn");
      buttons.forEach(btn =>
      btn.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        const product = controller.products.find(p => p.id === id);
        if(product){
          controller.addToCart(product);
          e.target.textContent = "✅ Added to your Cart";
          e.target.classList.add("in-cart");
          e.target.disabled = true;
        }
      })
    );
    controller.updateCartCount();

}

export function renderProductList(products, targetSelector, controller) {
  const target = document.querySelector(targetSelector);
  
  if (!target) return;
  if (!products || products.length === 0) {
    target.innerHTML = "<p>No products found.</p>";
    return;
  }

  else {
  target.innerHTML = products.map(p => productCardHtml(p, controller.cart)).join("");
  }

  

}



export function renderLoading(targetSelector){
   const el = document.querySelector(targetSelector); 
   if(!el) return;

   el.innerHTML = `
   <div class="loading-spinner"></div>
    <p>Loading...</p>
   `;
}

export function priceHtml(product){
 const priceHtml = product.onSale ? `<p class="price"><span class="old-price">${formatPrice(product.price)}</span> 
      <span class="sale-price">${formatPrice(product.discountedPrice)}</span></p>` : 
      `<p class="price">${formatPrice(product.price)}</p>`;
      return priceHtml;
}



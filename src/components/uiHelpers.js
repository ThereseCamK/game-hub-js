import { formatPrice } from "../utils/format.js";


export function escapeHtml(str='') {
  return String(str).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
}

export function productCardHtml(p, cart = []) {

  const inCart = cart.some(item => item.id === p.id);

  return `
    <div class="product-card" data-id="${p.id}">
      ${p.onSale ? `<span class="badge">SALE</span>` : `<span class=" notsale"></span>`}
        <div class="image-wrapper">
          <div class="img-loader spinner"></div>
            <a  href="#/product/${p.id}">
              <img  
              src="${p.image.url || ''}" 
              alt="${escapeHtml(p.title || '')}" 
               />
            </a>
        </div>

      <h3>${escapeHtml(p.title || '')}</h3>
        ${priceHtml(p)}
        <p class="genre">Genre: ${escapeHtml(p.genre || p.category || '')}</p>
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

export function initImageLoading(){
   const images = document.querySelectorAll(".image-wrapper img"); 
   if(!images) return;

   images.forEach(img => {
    if(img.complete){
      showImage(img);
    }
    else{
      img.addEventListener("load", () => showImage(img));
      img.addEventListener("error", () => img.remove());
    }
   })
}

function showImage(img) {
   setTimeout(() => {
      img.classList.add("loaded");

      const wrapper = img.closest(".image-wrapper");
      const loader = wrapper?.querySelector(".img-loader");

      if (loader) loader.remove();
    }, 1000);
}

export function priceHtml(product){
 const priceHtml = product.onSale ? `<p class="price"> Price: <span class="old-price"> ${formatPrice(product.price)}</span> 
      <span class="sale-price"> ${formatPrice(product.discountedPrice)}</span></p>` : 
      `<p class="price">Price: ${formatPrice(product.price)}</p>`;
      return priceHtml;
}



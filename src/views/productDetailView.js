import { 
  renderLoading, attachAddToCartDelegation, priceHtml } from "../components/uiHelpers.js";
 

export const meta = {
    title: "Game Hub | Single game ",
    description: "More information about one single product",
};

export function render() {
  return /*HTML*/`<section id="product-detail"><div class="loading-spinner"></div></section>`;
}

export async function init(controller, param){
  console.log(param)

    const container = document.querySelector("#product-detail");

    renderLoading("#product-detail");
      
      let product = controller.products.find(p => p.id === param);
      const inCart = controller.cart.some(item => item.id === product.id);   
      if (!product) product = await (await import("../models/productModel.js")).productModel.getProductById(param);

      if (!product) {
        container.innerHTML = "<p>Product not found.</p>";
        return;
      }

    document.title = `Game Hub | ${product.title}`;

    container.innerHTML =  `
          <article class="product-detail-card">
            <a href="#/products" class="confirm-btn" >Back to all Products</a>

            <img src="${product.image.url}" alt="${product.title}">
            <div class="details">
              <h2>${product.title}</h2>
              <p>${product.ageRating}</p>
              <p>${product.released}</p>
              <p>${product.genre}</p>
              <p>${product.description}</p>
             ${priceHtml(product)}
              <div>
                ${ inCart ? `<button class="cart-btn in-cart" data-id="${product.id}" disabled>✔ In Cart allready</button>` : `<button class="cart-btn" data-id="${product.id}">🛒 Add To Cart </button>`}
              
              </div>
            </div>
          </article>
    `;

     attachAddToCartDelegation( controller)   
}
  
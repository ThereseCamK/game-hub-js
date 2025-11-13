import {controller} from "../controller/appController.js";

export const meta = {
    title: "Game Hub | Single game ",
    description: "More information about one single product",
};

export function render(){
    return `
        <section id="product-detail">
            <h2>Loading Product</h2>
        </section>
    `;
}

export async function init(controller, productID){
      document.title = meta.title;
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", meta.description);
    const container = document.querySelector("#product-detail");
    const product = await controller.getProduct(productID);
    const prod = product.data;
    if(!product){
        container.innerHTML ="<p> Could not fintd this product!</p>";
        return;
    }

    document.title = `Game Hub | ${prod.title}`;
    console.log(prod);
    const inCart = controller.isInCart(prod.id);
    container.innerHTML = `
        <article class="product-detail-card">
            <img src="${prod.image.url}" alt="${prod.title}" />
            <div class="details">
                <h2>${prod.title}</h2>
                <p>${prod.released}</p>
                 <p>${prod.onSale ?`
              <p class="price">
                <span class="old-price">${prod.price}$</span>
                <span class="sale-price">${prod.discountedPrice}$</span>
              </p>
              <span class="badge">SALE!</span>
              `: `<p class="price">${prod.price} $</p>`}</p>
                <p>${prod.description}</p>
                <p>Genre: ${prod.genre}</p>
                 ${
              inCart
               ? `<button class="cart-btn in-cart" data-id="${prod.id}">✅Is already in your cart</button>`
               : `<button class="cart-btn" data-id="${prod.id}">add to cart</button>`
            }
                <a href="#/products" class="back-btn">← Back to Products</a>
            </div>
        </article>
    `;
           
    const buttons = document.querySelectorAll(".cart-btn");
    buttons.forEach(btn =>
      btn.addEventListener("click", (e) => {
        const id= e.target.dataset.id;
        const product = controller.products.find(p => p.id === id);
        if(product){
          controller.addToCart(product);
          e.target.textContent = "✅ Added to your Cart";
          e.target.classList.add("in-cart");
          e.target.disabled = true;
        }
      })
    );
  

}
  
import {controller} from "../controller/appController.js";

export const meta = {
    title: "Game Hub | Products",
    description: "Explore all of our games add to cart or click on one single product to get more information",
};

export function render(){
    return `
        <section> 
            <h2>Products</h2>
            <div id="products" class="product-grid">Loading Products...</div>
        </section>
    `;
}

export async function init() {
  document.title = meta.title;
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", meta.description);

  const app = document.getElementById("app");
  app.innerHTML = render();

  const allProducts = await controller.getProducts();
  let filteredProducts = [...allProducts];

  displayProducts(filteredProducts);

  setupFilters();

  function render() {
    return `
      <section>
        <h2>Products</h2>

        <form class="filters">
          <input type="text" id="searchInput" placeholder="Search for a game">
          <select id="sortSelect">
            <option value="default">Filter by genre</option>
            <option value="sports">Sports</option>
            <option value="adventure">Adventure</option>
            <option value="action">Action</option>
            <option value="horror">Horror</option>
          </select>
        </form>

        <div id="products" class="product-grid"></div>
      </section>
    `;
  }

  function displayProducts(products) {
    const container = document.getElementById("products");
    
    if (!products.length) {
      container.innerHTML = "<p>No products  found </p>";
      return;
    }

    container.innerHTML = products
      .map(p => {
          const inCart = controller.isInCart(p.id);
      return `
          <div class="product-card">
            <img src="${p.image.url}" alt="${p.title}" />
            <h3>${p.title}</h3>
            <p>${p.genre.toUpperCase()}</p>
            <p>${p.onSale ?`
              <p class="price">
                <span class="old-price">${p.price}$</span>
                <span class="sale-price">${p.discountedPrice}$</span>
              </p>
              <span class="badge">SALE!</span>
              `: `<p class="price">${p.price} $</p>`}</p>
            <a href="#/product/${p.id}" class="details-btn">See details</a>
            ${
              inCart
               ? `<button class="cart-btn in-cart" data-id="${p.id}">✅Is already in your cart</button>`
               : `<button class="cart-btn" data-id="${p.id}">add to cart</button>`
            }
            
          </div>
        `}
      )
      .join("");

   setUpAddToCart();
  }

  function setUpAddToCart(){
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

  function setupFilters() {
    const searchInput = document.querySelector('#searchInput');
    const sortSelect = document.querySelector('#sortSelect');

 
    searchInput.addEventListener('input', function() {
      const searchTerm = searchInput.value.toLowerCase();
      filteredProducts = allProducts.filter(p =>
        p.title.toLowerCase().includes(searchTerm)
      );
      displayProducts(filteredProducts);
    });

    
    sortSelect.addEventListener('change', e => {
      const value = e.target.value;
      if (value === "default") {
        filteredProducts = [...allProducts];
      } else {
        filteredProducts = allProducts.filter(p => p.genre.toLowerCase() === value);
      }
      displayProducts(filteredProducts);
    });
  }
}
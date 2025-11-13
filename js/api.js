

const API_URL = "https://v2.api.noroff.dev/gamehub";
let allProducts = [];
let filteredProducts = [];
let cart = [];

async function loadPage(page) {
    const main = document.querySelector('#content');

    try {
        const response = await fetch(`pages/${page}.html`);
        const html = await response.text();
        main.innerHTML = html;

        if(page === "home") showHome();
        if(page === "products") initProductsPage();
        if(page === "cart") renderCart();

    }
    catch(error){
        main.innerHTML = "<p> wrong with loading page </p>"
    }
    
}

function showHome(){

    
}

function setupNavigation() {
  const links = document.querySelectorAll(".nav-links a");
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const page = e.target.dataset.page;
      loadPage(page);
    });
  });
}

async function initProductsPage() {
  await fetchProducts();
  setupFilters();
 
}


async function fetchProducts(){
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        allProducts = data.data;
        filteredProducts = data;
        displayProducts(data.data);
        console.log(data.data)
    } catch(error){
        console.log("Wrong fetching data ")
    }
}

function displayProducts(products){
    const container = document.querySelector("#products-container");
    container.innerHTML = "";
        products.map(prod =>{
            const card = document.createElement("div");
            card.className = "product-card";
            card.innerHTML = `
                <img src="${prod.image.url}" alt="${prod.title}"
                <p><strong>$${prod.price}</strong></p>
                <button id="buy-${prod.id}">Add to cart</button>
            `;
            container.appendChild(card);
            document.getElementById(`buy-${prod.id}`).addEventListener("click", () => addToCart(prod));
        });
       
}

function addToCart(product){
    console.log('added to cart', product)
    const exist = cart.find(item => item.id === product.id);

    if(exist){
        exist.quantity++;
        alert(`✅ one more "${product.title}" is added to your cart, total is now ${exist.quantity}`)
    }else{
        cart.push({...product, quantity: 1});  
        alert(`✅ "${product.title}" is added to your cart`)
    }
    updateCartCount();
    
}

function removeFromCart(id){
    cart = cart.filter(item => item.id !== id);
        renderCart();
        updateCartCount();
}

function updateCartCount(){
    console.log('updateCart')
    const count = cart.reduce((sum, item) => sum += item.quantity, 0);
    document.querySelector("#cart-count").textContent = count;
 
}

//show cart

function renderCart(){
    console.log('render cart working');
    const cartContainer = document.querySelector('#cart-items');
    const totalElements = document.querySelector('#cart-total');

    cartContainer.innerHTML = "";
    if(cart.length === 0){
        cartContainer.innerHTML = "<p> Cart is empty";
        totalElements.textContent = "";
        return;
    }

    cart.map(item => {
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <span> ${item.title} (x${item.quantity}) - ${item.price} $ </span>
            <button id="remove-${item.id}">delete</button>
        `;
        cartContainer.appendChild(div);

        document.querySelector(`#remove-${item.id}`).addEventListener("click", () => removeFromCart(item.id));
    })

}
function setupFilters() {
    const searchInput = document.querySelector('#searchInput');
    const sortSelect = document.querySelector('#sortSelect');

    searchInput.addEventListener('input', function() {
        const searchTherm = searchInput.value.toLowerCase();
        filteredProducts = allProducts.filter(p => p.title.toLowerCase().includes(searchTherm));
        console.log(filteredProducts);
        displayProducts(filteredProducts)

    });

    sortSelect.addEventListener('change', e =>{
        const value = e.target.value;
        filteredProducts = allProducts.filter(p => p.genre.toLowerCase().includes(value));
        displayProducts(filteredProducts);
    })
 
}

document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  loadPage("home"); // Start på hjem-siden
});
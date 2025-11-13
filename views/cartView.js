
export const meta = {
  title: "Game Hub | cart",
  description: "explore your games in your cart",
};

export function render() {
  return `
    <section id="cart">
      <h2>Shopping cart</h2>
      <div id="cart-items">Loading cart...</div>
      <p id="cart-total"></p>
    </section>
  `;
}

export async function init(controller) {
    document.title = meta.title;
    document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", meta.description);

  const itemsContainer = document.querySelector("#cart-items");
  const totalContainer = document.querySelector("#cart-total");

  renderCart();

  function renderCart(){


 
      if (!controller.cart.length) {
          itemsContainer.innerHTML = "<p>Your cart is empty🛒</p>";
          totalContainer.textContent = "";
          return;
      }

      itemsContainer.innerHTML = controller.cart
        .map(
            item => `
                <div class="cart-item ${item.onSale ? "on-sale" : ""}">
                  <img src="${item.image.url}" alt="${item.title}" />
                  <div class="info">
                    <h3>${item.title}</h3>
                    ${
                      item.onSale
                        ? `
                          <p>
                            <span class="old-price">${item.price} $</span>
                            <span class="sale-price">${item.discountedPrice} $</span>
                          </p>
                        `
                        : `<p>${item.price} kr</p>`
                    }
                    <div class="qty-control">
                      <button class="qty-btn-decrease" data-id="${item.id}">−</button>
                      <span>${item.quantity}</span>
                      <button class="qty-btn-increase" data-id="${item.id}">+</button>
                    </div>
                    <p class="subtotal">Delsum: <strong>${(
                      (item.onSale ? item.discountedPrice : item.price) * item.quantity
                    ).toFixed(2)} $</strong></p>
                    <button class="remove-btn" data-id="${item.id}">Remove</button>
                  </div>
                </div>
              `
          )
          .join("");

       const hasDiscount = controller.cart.some(item => item.onSale);
        totalContainer.innerHTML = `
            <hr>
              <p class="total">
                Totalt: <strong>${controller.getCartTotal()} $</strong>
                ${hasDiscount ? '<span class="discount-info">(included discount 🎉)</span>' : ""}
              </p>
              <button class="checkout-btn">Go to Summary</button>
            `;


        document.querySelectorAll(".remove-btn").forEach(btn => {
          btn.addEventListener("click", e => {
              const id = e.target.dataset.id;
              controller.removeFromCart(id);
               renderCart();
            });
          });

        itemsContainer.querySelectorAll(".qty-btn-increase").forEach(btn => {
          btn.addEventListener("click", e => {
            const id = e.target.dataset.id;
            controller.increaseQuantity(id);
           renderCart();
          });
        });

        itemsContainer.querySelectorAll(".qty-btn-decrease").forEach(btn => {
          btn.addEventListener("click", e => {
            const id = e.target.dataset.id;
            controller.decreaseQuantity(id);
            renderCart();
          });
        });

        document.querySelector(".checkout-btn").addEventListener("click", () =>{
          window.location.hash ="#/checkout";
        });
  }
}
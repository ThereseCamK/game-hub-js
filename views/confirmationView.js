export const meta = {
    title: "Game Hub | Confirmed purchase",
    description: "Thank you for your purchase",
};

export function render(){
    return /*HTML*/ `
    <section class="confirmation-page">
        <h2>Thank you for your Purchase!</h2>
        
        <div id="orderSummary"></div>
        <button id="backToShop" class="confirm-btn">Back to store</button>
    </section>
    `;
}

export async function init(controller){
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);

    const summary = document.querySelector("#orderSummary");
    const {cart, shipping} = controller;
   
    if(cart.length >= 1){
    const items = cart.map(i=> `
        <li>${i.title} (${i.quantity})</li>`).join("");
        summary.innerHTML = `
        <p>Your order is confirmed</p>
        <p>Deliver to: <strong>${shipping.firstName}</strong>, ${shipping.address}, ${shipping.city}</p>
        <ul>${items}</ul>
        <p>total:<strong>${controller.getCartTotal()} $</strong></p>
    `;  
    }
    else{
        summary.innerHTML = `your cart is empty`
    }

    
  

    controller.cart = [];
    controller.updateCartCount();
    controller.clearCart();

    document.querySelector("#backToShop").addEventListener("click", () => {
        window.location.hash ="#/products";
    });
}
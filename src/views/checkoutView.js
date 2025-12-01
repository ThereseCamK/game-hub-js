import {renderProgress} from "../components/progressBar.js";
export const meta = {
    title: "Game Hub | Check out",
    description: "Get a overview over your cart, before you move on to shipping",
};

export function render(){
    return /*HTML*/`
        <section> 
            <h2>Complete your purcase</h2> 
             ${renderProgress("summery")}
            <div id="checkoutSummary"></div>
            <button id="goToShipping" class="confirm-btn">Go to shipping</button>
        </section>
    `;
}

export async function init(controller){

    const summaryContainer = document.getElementById("checkoutSummary");

    if(controller.cart.length === 0){
        summaryContainer.innerHTML = "<p>Your cart is empty</p>";
        document.getElementById("confirmPhurchase").style.display = "none";
        return;
    }
    const productsHtml = controller.cart
        .map(
            item => /*HTML*/`
                <div class="checkout-item">
                    <div>
                        <strong>${item.title}</strong> Qty:(${item.quantity})
                    </div>
                    <div>
                        ${
                            item.onSale 
                            ? `<span class="old-price">${item.price} $</span>
                             <span class="sale-price">${item.discountedPrice} $</span>`
                             : `<span>${item.price}</span>`
                        }
                    </div>
                </div>
            `
        ).join("");

        const total = controller.getCartTotal();

       summaryContainer.innerHTML = /*HTML*/`
            <div class="checkout-list">
            ${productsHtml}
            </div>
            <hr>
            <p class="checkout-total">Totalt: <strong>${total} kr</strong></p>
        `;

        document
        .getElementById("goToShipping")
        .addEventListener("click", () => {
        window.location.hash = "#/shipping"; 
        }); 
}
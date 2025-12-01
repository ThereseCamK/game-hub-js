import {renderProgress} from "../components/progressBar.js";
export const meta ={
    title: "Game Hub | Payment",
    description: "Complete payment for your order",
};

export function render(){
    return /*HTML*/`
        <section class="payment-page">
            <h2>Payment</h2>
            ${renderProgress("payment")}
                <form id="paymentForm" class="checkout-form">
                    <label>Name on Card: <input type="text" name="cardName" required></label>
                    <label>Card Number: <input type="number" name="cardNumber"  required></label>
                    <label>MM/YY: <input type="text" name="mmyy" placeholder="MM/YY" required></label>
                    <label>CVV: <input type="text" name="cvv" placeholder="CVV" required></label>
                    <button type="submit" class="confirm-btn">Complete order</button>
                </form>
        </section>
    `;
}

export async function init(controller){
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);

    const form = document.querySelector("#paymentForm");
    form.addEventListener("submit", e => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(form));
        controller.savePaymentData(formData);
        window.location.hash ="#/confirmation";
    });
}
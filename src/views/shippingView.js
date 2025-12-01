import {renderProgress} from "../components/progressBar.js";
export const meta = {
    title: "Game Hub | Shipping detail",
    description: "Fill in your address and delivery information",
};

export function render(){
    return /*HTML*/`
        <section>
            <h2>Shipping information</h2>
             ${renderProgress("shipping")}
            <form id="shippingForm" class="checkout-form">
                <label for="firstName">First name: 
                    <input type="text" name="firstName" title="Enter your firstname here" required>
                </label>
                <label for="lastName">Last name: 
                    <input type="text" name="lastName" title="Enter your lastname here" required>
                </label>
                <label for="address">Address: 
                    <input type="text" name="address" title="Enter your Street address here" required>
                </label>
                <label for="apt">Apt/ Suite / Unit (optional): 
                    <input type="text" name="apt" title="Enter your apartment, Suite or unit here (optional)">
                </label>
                <label for="city">City: 
                    <input type="text" name="city" title="Enter City">
                </label>
                <label for="province">Province: 
                    <input type="text" name="province" title="Enter province">
                </label>
                <label for="postalCode">Postal Code: 
                    <input type="text" name="postalCode" title="Enter postalcode" required>
                </label>
                <label for="phoneNumber">Phone number: 
                    <input type="number" name="phoneNumber" title="phoneNumber">
                </label>
                <button type="submit" class="confirm-btn">Continue to payment</button>
            </form>
        </section>
    `;
}

export async function init(controller){

    const form = document.querySelector('#shippingForm');
      if (controller.shipping) {
        Object.entries(controller.shipping).forEach(([k,v]) => {
        const el = form.elements[k]; if (el) el.value = v;
        });
    }
    form.addEventListener("submit", e => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(form));
        controller.saveShipping(formData);
        window.location.hash ="#/payment";
    });
}
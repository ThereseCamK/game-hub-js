export const meta = {
    title: "Game Hub | Shipping detail",
    description: "Fill in your address and delivery information",
};

export function render(){
    return /*HTML*/`
        <section>
            <h2>Shipping information</h2>
            <form id="shippingForm" class="checkout-form">
                <label>First name: <input type="text" name="firstName" required></label>
                <label>Last name: <input type="text" name="lastName" required></label>
                <label>Address: <input type="text" name="address" required></label>
                <label>Apt/ Suite / Unit (optional): <input type="text" name="apt"></label>
                <label>City: <input type="text" name="city"></label>
                <label>Province: <input type="text" name="province"></label>
                <label>Postal Code: <input type="text" name="postalCode" required></label>
                <label>Phone number: <input type="number" name="phoneNumber"></label>
                <button type="submit" class="confirm-btn">Continue to payment</button>
            </form>
        </section>
    `;
}

export async function init(controller){
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);

    const form = document.querySelector('#shippingForm');
    form.addEventListener("submit", e => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(form));
        controller.saveShipping(formData);
        window.location.hash ="#/payment";
    });
}
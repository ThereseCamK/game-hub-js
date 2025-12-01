export function renderProgress(step){
    const steps = ["cart", "summery", "shipping", "payment", "confirmation"];

    return `
        <div class="checkout-progress">
            ${steps.map(
                (s, i) => `
                <div class="progress-step ${step === s ? "current" : ""}
                    ${steps.indexOf(step) > i ? "done" : ""}">
                    <span> ${i + 1}</span>
                    <p>${s.charAt(0).toUpperCase() + s.slice(1)}</p>    
                </div>`
            ).join("")}
        </div>
    `;
}
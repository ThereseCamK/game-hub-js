export function renderPrivacyModal() {
    if (localStorage.getItem("privacyAccepted")) return "";

    return `
        <div class="privacy-modal-backdrop" id="privacy-backdrop">
            <div class="privacy-modal">
                <h2>Privacy & Cookie Notice</h2>
                <p>
                    Game Hub uses cookies to provide essential site functionality, 
                    improve user experience, and process secure payments. 
                    By continuing, you agree to our 
                    <a href="#/privacy" class="policy-link">Privacy Policy</a>.
                </p>

                <div class="btn-group">
                    <button id="privacy-accept" class="primary-btn">Accept</button>
                    <button id="privacy-read" class="secondary-btn">Read Policy</button>
                </div>
            </div>
        </div>
    `;
}

export function initPrivacyModal() {
    const acceptBtn = document.getElementById("privacy-accept");
    const readBtn = document.getElementById("privacy-read");
    const backdrop = document.getElementById("privacy-backdrop");

    if (!acceptBtn) return;

    acceptBtn.addEventListener("click", () => {
        localStorage.setItem("privacyAccepted", "true");
        backdrop.remove();
    });

    readBtn.addEventListener("click", () => {
        backdrop.remove();
        window.location.hash = "#/privacy";
    });
}
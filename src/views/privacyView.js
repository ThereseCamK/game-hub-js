export const meta = {
    title: "Game Hub | Privacy policy",
    description: "Privacy policy",
}

export function render(){
    return `
        <section class="privacy-view">
        <h1> Game Hub – Privacy Policy</h1>
        <h2>Last updated: 01.12.2025</h2>
        <p>At Game Hub, we are committed to protecting your personal data and respecting your privacy. 
        This Privacy Policy explains how we collect, use, store, 
        and safeguard your information when you interact with our website, purchase products, 
        or use any of our services.
        Game Hub complies with the General Data Protection Regulation (GDPR)
        and all applicable data protection laws.</p>

        <p>1. Information We Collect
            We may collect the following types of information:
            1.1 Automatically Collected Information
            When you browse our website, we may automatically collect:
            IP address
            Browser type and device information
            Pages visited and time spent
            Referring/exit pages
            Cookies necessary for website functionality
            We do not collect unnecessary tracking data without your consent.
        </p>
        <p>
            2. Information Collected During Purchases
            If you place an order, we may collect:
            Full name
            Shipping address
            Email address
            Payment status (we never store card information)
            Cart information
            Payment processing is handled securely through trusted third-party providers, and Game Hub does not store your payment card details.
        </p>
        <p>
            3. Legal Basis for Processing
            We process your data under the following legal bases:
            Contractual necessity: To fulfill orders and provide customer support.
            Legal obligation: To comply with tax and accounting laws.
            Legitimate interest: To improve the website experience and prevent fraud.
            Consent: For cookies and optional marketing communication.
        </p>
        <p>
            4. How We Use Your Information
            We use your data to:
            Process and deliver orders
            Improve website performance and user experience
            Provide customer service
            Send transactional emails (order confirmations, shipping updates)
            Display cart functionality and personalized content
            Comply with legal requirements
            We do not sell or rent your data to third parties.
        </p>
        <p>
    
            5. Cookies and Tracking Technologies
            We use cookies only for:
            Essential site operation (shopping cart, login state)
            Remembering user preferences
            Analytics (only if consented)
            You can control cookie settings at any time through your browser or our consent modal.
        </p>
        <p>
            6. Data Retention
            We retain data only as long as necessary:
            Order data: up to 7 years (legal requirement)
            Account data: until account deletion
            Cookies: according to their expiration or until consent is withdrawn
        </p>
        <p>
            7. Your Rights (GDPR)
            You have the right to:
            Access your personal data
            Request correction
            Request deletion (“right to be forgotten”)
            Object to processing
            Request data portability
            Withdraw cookie consent
            To exercise your rights, contact:
            📧 privacy@gamehub.com
        </p>
        <p>

            8. Data Security
            We implement industry-standard security measures:
            Encrypted communication (HTTPS)
            Secure servers
            Access control
            No local storage of payment data
            Despite this, no online system is 100% secure, but we follow best practices.
        </p>
        <p>
            9. Third-Party Services
            We may share limited information with:
            Payment processors (Stripe, PayPal, etc.)
            Shipping providers
            Analytics services (only with consent)
            All third-party partners comply with GDPR requirements.
        </p>
        <p>
            10. Changes to This Policy
            We may update the Privacy Policy occasionally. Updates take effect immediately upon posting.
        </p>
        <p>
            11. Contact Us
            If you have any questions regarding privacy or data usage, contact us at:
            📧 privacy@gamehub.com
            🌐 www.gamehub.com
        </p>
        <p style="margin-top:20px;">
            <button id="delete-data" class="danger-btn">Delete stored data</button>
        </p>
    </section>

    `
}

export function init(controller){
    document.querySelector("#delete-data")?.addEventListener("click", () => {
        localStorage.clear();
        alert("All data stored locally has been deleted.");
        window.location.reload();
    });
}


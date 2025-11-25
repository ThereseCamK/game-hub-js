import { setMeta } from "./metaManager.js";

const routes = {
    home: () => import("./views/homeView.js"),
    products: () => import("./views/productsView.js"),
    product: () => import("./views/productDetailView.js"),
    cart: () => import("./views/cartView.js"),
    checkout: () => import("./views/checkoutView.js"),
    shipping: () => import("./views/shippingView.js"),
    payment: () => import("./views/paymentView.js"),
    confirmation: () => import("./views/confirmationView.js"),
};

export async function initRouter(controller){
    window.addEventListener("hashchange", () => route(controller));
    window.addEventListener("load", () => route(controller));
   
}

async function route(controller) {
    const hash = window.location.hash.slice(2) || "home"; 
    console.log(hash)
    const [routeName, param] = hash.split("/");

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.classList.toggle("active", link.dataset.link === routeName);
    });

    const loader = document.getElementById("app");
    loader.innerHTML = `<div class="loading-spinner"></div>`;

    const load = routes[routeName];
    if(!load){
        loader.innerHTML = `<h2>404 - page not found!</h2>`;
        document.title = `404 - not found`;
        return;
    }

    try {
        const mod = await load();

        if(mod.meta) setMeta(mod.meta);
        loader.innerHTML = mod.render(param);
        if(mod.init) await mod.init(controller, param);

    } catch (err){
        console.error(err);
        loader.innerHTML = "<p>Error loading page</p>";
        document.title = "Error";
    }
}
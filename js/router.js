import { controller } from "../controller/appController.js";
import {renderLoading } from "../views/loadingView.js";


const routes = {
    home: () => import("../views/homeView.js"),
    products: () => import("../views/productsView.js"),
    product: () => import("../views/productDetailView.js"),
    cart: () => import("../views/cartView.js"),
    checkout: () => import("../views/checkoutView.js"),
    shipping: () => import("../views/shippingView.js"),
    payment: () => import("../views/paymentView.js"),
    confirmation: () => import("../views/confirmationView.js"),
};

export async function initRouter(){
    window.addEventListener("hashchange", router);
    window.addEventListener("load", router);
}

async function router() {
    const hash = window.location.hash.slice(2) || "home";
    const [route, param] = hash.split("/");
    const app = document.getElementById("app");
    const loadPage = routes[route];

    app.innerHTML = renderLoading();

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.classList.toggle("active", link.dataset.link === route)
    });

    if(!loadPage){
        app.innerHTML = `<h2> 404 - page not found! </h2>`;
        document.title = `404- not found`;
        return;
    }

    const module = await loadPage();

    if(module.meta){
        document.title = module.meta.title || `Game hub - online game store`;
        const descTag = document.querySelector("meta[name='description']");
        if(descTag) descTag.setAttribute("content", module.meta.description || '');
    }

    app.innerHTML = module.render(param);
    if(module.init) module.init(controller, param);
}
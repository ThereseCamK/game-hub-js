import {controller} from "./controller/appController.js";
import {initRouter} from "./router.js";

async function bootstrap(){
    initRouter(controller);
    await controller.init();
    controller.updateCartCount();
}

document.addEventListener("DOMContentLoaded", bootstrap);
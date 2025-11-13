import {initRouter} from "./router.js";
import {controller} from "../controller/appController.js";

document.addEventListener("DOMContentLoaded", () =>{
    controller.init();
    initRouter();
});
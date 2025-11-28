import { attachAddToCartDelegation, renderLoading} from "../components/uiHelpers.js";
import { renderProductSlider} from "../components/slideSlider.js"

export const meta = {
    title: "Game hub - home",
    description: "Explore and buy our online games",
};

export function render(){
     return /*HTML*/`
        <section class="home">
            <h1> Welcome to Game Hub </h1>

            <h2 >Newest Games!</h2>
            <div class="slider-container" id="newest-slider">
              <div class="slides" id="newest-slides"></div>
              <div class="slider-dots" id="newest-dots"></div>
            </div>

            <h2>Sale!</h2>
            <div class="slider-container" id="sale-slider">
              <div class="slides" id="sale-slides"></div>
              <div class="slider-dots" id="sale-dots"></div>
            </div>

        </section>
        `;
}


export async function init(controller) {
  const newestTarget = "#newest"; 
  const saleTarget = "#sale";
  renderLoading(newestTarget); 
  renderLoading(saleTarget);


  if (!controller.products.length) await controller.init();

  const newest = [...controller.products].sort((a,b) => b.released - a.released).slice(0,5);
   renderProductSlider(newest, "newest-slides", "newest-dots");
  const sale = controller.products.filter(p => p.onSale);
  renderProductSlider(sale, "sale-slides", "sale-dots");

  attachAddToCartDelegation( controller);
}

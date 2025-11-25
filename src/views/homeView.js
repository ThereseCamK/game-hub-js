import { renderProductList, attachAddToCartDelegation, renderLoading } from "../components/uiHelpers.js";

export const meta = {
    title: "Game hub - home",
    description: "Explore and buy our online games",
};

export function render(){
     return /*HTML*/`
        <section>
            <h2> Welcome to Game Hub </h2>

            <h3>Newest Games!</h3>
            <div id="newest" class="product-grid"></div>
            
            <h3>Sale!</h3>
            <div id="sale" class="product-grid"></div>

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
  const sale = controller.products.filter(p => p.onSale);

  renderProductList(newest, newestTarget, controller);
  renderProductList(sale, saleTarget, controller);

  // attachAddToCartDelegation(newestTarget, controller);
  attachAddToCartDelegation( controller);
}

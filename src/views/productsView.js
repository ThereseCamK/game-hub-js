import { renderProductList, attachAddToCartDelegation, renderLoading } from "../components/uiHelpers.js";


export const meta = {
    title: "Game Hub | Products",
    description: "Explore all of our games add to cart or click on one single product to get more information, and filter by genre or search for a spesific game",
};

export function render(){
    return /*HTML*/`
        <section>
        <h2>Products</h2>

        <form class="filters">
          <input type="text" id="searchInput" placeholder="Search for a game">
          <select id="sortSelect">
            <option value="default">Filter by genre</option>
            <option value="sports">Sports</option>
            <option value="adventure">Adventure</option>
            <option value="action">Action</option>
            <option value="horror">Horror</option>
          </select>
        </form>

        <div id="productList" class="product-grid"></div>
      </section>
    `;
}

export async function init(controller) {
  const target = "#productList";
  renderLoading(target);
  if (!controller.products.length) await controller.init();

  let all = controller.products;
  let filtered = [...all];
  renderProductList(filtered, target, controller);
  attachAddToCartDelegation( controller);

  const search = document.getElementById("searchInput");
  const sort = document.getElementById("sortSelect");


  search.addEventListener("input", (e) => {
    
    const val = e.target.value.toLowerCase();
    filtered = all.filter(p => p.title.toLowerCase().includes(val));
    renderProductList(filtered, target, controller);
    attachAddToCartDelegation(controller);
  });

  sort.addEventListener("change", (e) => {
     const value = e.target.value;
      if (value === "default") {
        filtered = all;
      } else {
        filtered = all.filter(p => p.genre.toLowerCase() === value);
      }
    renderProductList(filtered, target, controller);
    attachAddToCartDelegation( controller);
  });


}
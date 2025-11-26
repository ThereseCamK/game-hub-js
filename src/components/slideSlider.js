import { productCardHtml } from "./uiHelpers.js";

export function renderProductSlider(products, slidesId, dotsId) {
  const container = document.getElementById(slidesId);
  const dotsContainer = document.getElementById(dotsId);

  if (!container || !dotsContainer) return;

  container.innerHTML = products.map(p => `
    <div class="slide">
      ${productCardHtml(p)}
    </div>
  `).join("");

  const slides = Array.from(container.querySelectorAll(".slide"));
  dotsContainer.innerHTML = slides.map(( i) => `<span data-index="${i}"></span>`).join("");
  const dots = dotsContainer.querySelectorAll("span");

  let index = 0;
  let interval;

  function showSlide(i) {
    const offset = -i * 100; 
    container.style.transform = `translateX(${offset}%)`;
    dots.forEach((d, idx) => d.classList.toggle("active", idx === i));
    index = i;
  }

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      clearInterval(interval);
      showSlide(parseInt(dot.dataset.index));
      startAutoplay();
    });
  });

  function nextSlide() {
    showSlide((index + 1) % slides.length);
  }

  function startAutoplay() {
    interval = setInterval(nextSlide, 4000);
  }

  showSlide(0);
  startAutoplay();
}
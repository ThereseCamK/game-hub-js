import { productCardHtml } from "./uiHelpers.js";

export function renderProductSlider(products, slidesId, dotsId, prevId, nextId) {
  const container = document.getElementById(slidesId);
  const dotsContainer = document.getElementById(dotsId);
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);

  if (!container || !dotsContainer) return;

  container.innerHTML = products.map(p => `
    <div class="slide">
      ${productCardHtml(p)}
    </div>
  `).join("");

  const slides = Array.from(container.querySelectorAll(".slide"));

  dotsContainer.innerHTML = slides.map((_, i) => `<span data-index="${i}"></span>`).join("");

  const dots = dotsContainer.querySelectorAll("span");

  let index = 0;
  let interval;

  function showSlide(i) {
    index = i;
    const offset = -i * 100; 
    container.style.transform = `translateX(${offset}%)`;

    dots.forEach((d, idx) => d.classList.toggle("active", idx === i));
    
  }
  function nextSlide(){
    index = (index + 1) % slides.length;
    showSlide(index);
  }
  function prevSlide(){
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  }
  function resetAutoplay(){
    clearInterval(interval);
    startAutoplay();
  }

   dots.forEach(dot =>
    dot.addEventListener("click", () => {
      resetAutoplay();
      showSlide(parseInt(dot.dataset.index));
    })
  );

  function startAutoplay() {
    interval = setInterval(nextSlide, 4000);
  }

  if (nextBtn) nextBtn.addEventListener("click", () => { resetAutoplay(); nextSlide(); });
  if (prevBtn) prevBtn.addEventListener("click", () => { resetAutoplay(); prevSlide(); });

  showSlide(0);
  startAutoplay();
}
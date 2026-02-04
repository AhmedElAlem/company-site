// Slider (auto)
(() => {
  const slides = Array.from(document.querySelectorAll(".slide"));
  const dots = Array.from(document.querySelectorAll(".dot"));
  let index = 0;

  function setActive(i) {
    slides.forEach(s => s.classList.remove("is-active"));
    dots.forEach(d => d.classList.remove("is-active"));
    slides[i].classList.add("is-active");
    dots[i].classList.add("is-active");
  }

  setInterval(() => {
    index = (index + 1) % slides.length;
    setActive(index);
  }, 4500);
})();

// Smooth scroll with offset-friendly behavior (CSS scroll-margin-top handles it)
// Optional: close any mobile menus (not used now)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

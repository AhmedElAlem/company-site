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
// Lightbox for Work Gallery
(() => {
  const galleryImages = Array.from(document.querySelectorAll(".work-grid img"));
  const lightbox = document.getElementById("lightbox");
  const lbImg = lightbox.querySelector(".lb-image");
  const btnPrev = lightbox.querySelector(".lb-prev");
  const btnNext = lightbox.querySelector(".lb-next");
  const btnClose = lightbox.querySelector(".lb-close");

  let currentIndex = 0;

  function openLightbox(index){
    currentIndex = index;
    const img = galleryImages[currentIndex];
    lbImg.src = img.src;
    lbImg.alt = img.alt || "صورة من أعمالنا";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox(){
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    // optional: clear src after transition
    setTimeout(() => { lbImg.src = ""; }, 50);
  }

  function showNext(){
    currentIndex = (currentIndex + 1) % galleryImages.length;
    const img = galleryImages[currentIndex];
    lbImg.src = img.src;
    lbImg.alt = img.alt || "صورة من أعمالنا";
  }

  function showPrev(){
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    const img = galleryImages[currentIndex];
    lbImg.src = img.src;
    lbImg.alt = img.alt || "صورة من أعمالنا";
  }

  // Open on image click
  galleryImages.forEach((img, idx) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => openLightbox(idx));
  });

  // Arrows
  btnNext.addEventListener("click", (e) => { e.stopPropagation(); showNext(); });
  btnPrev.addEventListener("click", (e) => { e.stopPropagation(); showPrev(); });

  // Close button
  btnClose.addEventListener("click", (e) => { e.stopPropagation(); closeLightbox(); });

  // Click outside image closes
  lightbox.addEventListener("click", (e) => {
    // لو ضغطت على الخلفية/المساحة الفاضية (مش على الصورة أو الأزرار)
    if (e.target === lightbox) closeLightbox();
  });

  // Prevent click on inner content from closing
  lightbox.querySelector(".lightbox-inner").addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Keyboard controls
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });
})();

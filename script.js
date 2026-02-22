// ===== FADE-IN AU SCROLL =====
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// ===== ANIMATION DES BARS DE COMPETENCES =====
const fills = document.querySelectorAll('.fill');
window.addEventListener('scroll', () => {
  fills.forEach(fill => {
    const rect = fill.getBoundingClientRect();
    if(rect.top < window.innerHeight - 50){
      fill.style.width = fill.dataset.width;
    }
  });
});

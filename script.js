// Animation fade-in au scroll
document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll(".fade-in");

  const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -30px 0px"
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("appear");
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // Smooth scroll pour les ancres avec offset pour le header fixe
  const navLinks = document.querySelectorAll('nav a');
  const header = document.querySelector('header');
  const headerHeight = header ? header.offsetHeight : 80;

  navLinks.forEach(anchor => {
    if (anchor.getAttribute('href') && anchor.getAttribute('href').startsWith('#')) {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - headerHeight,
            behavior: 'smooth'
          });
        }
      });
    }
  });
});

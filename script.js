// Particules Canvas
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Création des particules
const particles = [];
const particleCount = 100;

for (let i = 0; i < particleCount; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: (Math.random() - 0.5) * 0.3,
    opacity: Math.random() * 0.5 + 0.2
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach(p => {
    p.x += p.speedX;
    p.y += p.speedY;
    
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
    
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(108, 92, 231, ${p.opacity})`;
    ctx.fill();
  });
  
  requestAnimationFrame(animateParticles);
}
animateParticles();

// Cursor personnalisé
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    cursorFollower.style.transform = `translate(${e.clientX - 15}px, ${e.clientY - 15}px)`;
  });
  
  // Hover effect sur les éléments interactifs
  const hoverElements = document.querySelectorAll('a, button, .flip-card, .competence-card, .glass-card');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorFollower.style.transform = `scale(1.5)`;
      cursorFollower.style.borderColor = '#FFD966';
    });
    el.addEventListener('mouseleave', () => {
      cursorFollower.style.transform = `scale(1)`;
      cursorFollower.style.borderColor = '#FFD966';
    });
  });
}

// Animation fade-in au scroll
document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll(".fade-in");

  const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // Smooth scroll pour les ancres
  const navLinks = document.querySelectorAll('nav a, .cta-button');
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

// Animation des compétences au scroll
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.style.width;
      entry.target.style.width = '0';
      setTimeout(() => {
        entry.target.style.width = width;
      }, 100);
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// Menu mobile toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    if (navMenu.classList.contains('active')) {
      navMenu.style.display = 'flex';
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '70px';
      navMenu.style.left = '0';
      navMenu.style.width = '100%';
      navMenu.style.background = 'rgba(30, 30, 47, 0.95)';
      navMenu.style.backdropFilter = 'blur(12px)';
      navMenu.style.padding = '2rem';
      navMenu.style.gap = '1rem';
    } else {
      navMenu.style.display = '';
    }
  });
}

// Animation des statistiques au scroll
const statNumbers = document.querySelectorAll('.stat-number');
let animated = false;

const statsObserver = new IntersectionObserver((entries) => {
  if (animated) return;
  entries.forEach(entry => {
    if (entry.isIntersecting && !animated) {
      animated = true;
      statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
          } else {
            stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
          }
        }, 30);
      });
    }
  });
}, { threshold: 0.5 });

if (statNumbers.length) {
  statsObserver.observe(document.querySelector('.hero-stats'));
}

// Effet de texte glitch aléatoire
const glitchText = document.querySelector('.glitch-text');
if (glitchText) {
  setInterval(() => {
    glitchText.style.animation = 'none';
    setTimeout(() => {
      glitchText.style.animation = 'glitch 3s infinite';
    }, 10);
  }, 5000);
}

// Animation des cartes flip au survol (amélioration)
const flipCards = document.querySelectorAll('.flip-card');
flipCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    const inner = card.querySelector('.flip-card-inner');
    if (inner) {
      // Optionnel : ajouter un effet sonore ou visuel
    }
  });
});

// Effet de parallaxe sur le hero
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  const sphere = document.querySelector('.data-sphere');
  
  if (hero && sphere) {
    sphere.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.1}px))`;
  }
});

// Animation des timelines au hover
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'translateX(10px)';
  });
  item.addEventListener('mouseleave', () => {
    item.style.transform = 'translateX(0)';
  });
});

// Prévention du glitch des cartes flip sur mobile
if ('ontouchstart' in window) {
  const flipCardsInner = document.querySelectorAll('.flip-card-inner');
  flipCardsInner.forEach(card => {
    card.style.transition = 'transform 0.4s';
  });
}

// Effet de chargement des cartes une par une
const cards = document.querySelectorAll('.flip-card, .international-card, .objectif-card');
cards.forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, index * 100);
        cardObserver.unobserve(card);
      }
    });
  }, { threshold: 0.2 });
  
  cardObserver.observe(card);
});

// Animation des liens de navigation actifs
const sections = document.querySelectorAll('section');
const navLinksActive = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinksActive.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Effet de scintillement sur les particules
let time = 0;
function updateParticleOpacity() {
  time += 0.02;
  particles.forEach((p, i) => {
    p.opacity = 0.2 + Math.sin(time + i) * 0.2;
  });
  requestAnimationFrame(updateParticleOpacity);
}
updateParticleOpacity();

// Ajout d'un effet de suivi de souris pour le canvas
document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  
  particles.forEach(p => {
    const dx = p.x - mouseX;
    const dy = p.y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 100) {
      const angle = Math.atan2(dy, dx);
      const force = (100 - distance) / 100;
      p.x += Math.cos(angle) * force * 2;
      p.y += Math.sin(angle) * force * 2;
    }
  });
});

// Message de bienvenue dans la console
console.log('%c✨ Portfolio Surenthini SIVAKUMAR ✨', 'color: #FFD966; font-size: 16px; font-weight: bold;');
console.log('%cBienvenue sur mon portfolio Data Analyst !', 'color: #6C5CE7; font-size: 12px;');

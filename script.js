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

let time = 0;

function animateParticles() {
  time += 0.02;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    const flicker = 0.2 + Math.sin(time + i) * 0.2;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(108, 92, 231, ${Math.max(0.05, flicker)})`;
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}
animateParticles();

// Réseau de données animé dans le hero : signature visuelle du portfolio
const networkCanvas = document.querySelector('.data-network');
if (networkCanvas) {
  const netCtx = networkCanvas.getContext('2d');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let nodes = [];

  function resizeNetworkCanvas() {
    const rect = networkCanvas.parentElement.getBoundingClientRect();
    networkCanvas.width = rect.width;
    networkCanvas.height = rect.height;
  }

  function createNodes() {
    const count = 16;
    nodes = [];
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * networkCanvas.width,
        y: Math.random() * networkCanvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 1.5
      });
    }
  }

  function drawNetwork() {
    netCtx.clearRect(0, 0, networkCanvas.width, networkCanvas.height);

    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > networkCanvas.width) n.vx *= -1;
      if (n.y < 0 || n.y > networkCanvas.height) n.vy *= -1;
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          netCtx.strokeStyle = `rgba(255, 217, 102, ${0.5 - dist / 220})`;
          netCtx.lineWidth = 1;
          netCtx.beginPath();
          netCtx.moveTo(nodes[i].x, nodes[i].y);
          netCtx.lineTo(nodes[j].x, nodes[j].y);
          netCtx.stroke();
        }
      }
    }

    nodes.forEach(n => {
      netCtx.beginPath();
      netCtx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      netCtx.fillStyle = '#FFD966';
      netCtx.fill();
    });

    if (!prefersReducedMotion) requestAnimationFrame(drawNetwork);
  }

  resizeNetworkCanvas();
  createNodes();
  drawNetwork();
  window.addEventListener('resize', () => {
    resizeNetworkCanvas();
    createNodes();
  });
}

// Effet de suivi de souris sur le canvas (répulsion douce des particules)
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

// Curseur personnalisé (seulement sur souris/trackpad, voir style.css)
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

if (cursor && cursorFollower && hasFinePointer) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    cursorFollower.style.transform = `translate(${e.clientX - 15}px, ${e.clientY - 15}px)`;
  });

  const hoverElements = document.querySelectorAll('a, button, .flip-card, .qualite-card, .competence-card, .glass-card');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorFollower.style.transform += ' scale(1.5)';
      cursorFollower.style.borderColor = '#FFD966';
    });
    el.addEventListener('mouseleave', () => {
      cursorFollower.style.borderColor = '#FFD966';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Animation fade-in au scroll
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = { threshold: 0.2, rootMargin: '0px 0px -50px 0px' };

  const appearOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('appear');
      appearOnScroll.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => appearOnScroll.observe(fader));

  // Smooth scroll + fermeture du menu mobile au clic
  const header = document.querySelector('header');
  const headerHeight = header ? header.offsetHeight : 80;
  const navMenu = document.querySelector('nav ul');
  const menuToggle = document.querySelector('.menu-toggle');

  document.querySelectorAll('nav a, .cta-button').forEach(anchor => {
    const href = anchor.getAttribute('href');
    if (href && href.startsWith('#')) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.getElementById(href.substring(1));
        if (targetElement) {
          const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: elementPosition - headerHeight, behavior: 'smooth' });
        }
        if (navMenu && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });

  // Menu mobile toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Animation des barres de compétences au scroll
  const skillBars = document.querySelectorAll('.skill-progress');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target.getAttribute('data-width') || entry.target.style.width;
        entry.target.style.width = target;
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => {
    bar.setAttribute('data-width', bar.style.width);
    bar.style.width = '0';
    skillObserver.observe(bar);
  });

  // Animation des statistiques au scroll
  const statNumbers = document.querySelectorAll('.stat-number');
  const heroStats = document.querySelector('.hero-stats');
  let statsAnimated = false;

  if (heroStats && statNumbers.length) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          statNumbers.forEach(stat => {
            const hasPlus = stat.textContent.includes('+');
            const target = parseInt(stat.textContent, 10);
            let current = 0;
            const increment = Math.max(target / 50, 1);
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                stat.textContent = target + (hasPlus ? '+' : '');
                clearInterval(timer);
              } else {
                stat.textContent = Math.floor(current) + (hasPlus ? '+' : '');
              }
            }, 30);
          });
          statsObserver.unobserve(heroStats);
        }
      });
    }, { threshold: 0.5 });

    statsObserver.observe(heroStats);
  }

  // Barre de progression de lecture
  const scrollProgress = document.querySelector('.scroll-progress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollProgress.style.width = pct + '%';
    });
  }

  // Inclinaison 3D douce au survol (souris/trackpad uniquement)
  if (hasFinePointer) {
    const tiltSelectors = '.timeline-item, .competence-card, .international-card, .objectif-card, .contact-item, .apropos-container, .parcours-photo';
    document.querySelectorAll(tiltSelectors).forEach(el => {
      el.addEventListener('mouseenter', () => el.classList.add('tilting'));
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -4;
        const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 4;
        el.style.transform = `translateY(-5px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
      el.addEventListener('mouseleave', () => {
        el.classList.remove('tilting');
        el.style.transform = '';
      });
    });
  }

  // Animation des cartes flip (projets + qualités) : hover sur souris, clic/Entrée/Espace sur tactile et clavier
  const flippables = document.querySelectorAll('.flip-card, .qualite-card');
  flippables.forEach(card => {
    card.addEventListener('click', () => toggleFlip(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFlip(card);
      }
    });
  });

  function toggleFlip(card) {
    const isFlipped = card.classList.toggle('flipped');
    card.setAttribute('aria-pressed', isFlipped ? 'true' : 'false');
  }

  // Lien de navigation actif selon la section visible
  const sections = document.querySelectorAll('section[id]');
  const navLinksActive = document.querySelectorAll('nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinksActive.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  });

  // Effet de parallaxe léger sur le hero
  const hero = document.querySelector('.hero');
  const sphere = document.querySelector('.data-sphere');
  if (hero && sphere) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      sphere.style.transform = `translate(-50%, calc(-50% + ${scrolled * 0.1}px))`;
    });
  }

  // Effet de texte glitch périodique
  const glitchText = document.querySelector('.glitch-text');
  if (glitchText) {
    setInterval(() => {
      glitchText.style.animation = 'none';
      requestAnimationFrame(() => {
        glitchText.style.animation = 'glitch 3s infinite';
      });
    }, 5000);
  }

  // Apparition progressive des cartes au scroll
  const cards = document.querySelectorAll('.flip-card, .qualite-card, .international-card, .objectif-card');
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
          }, (index % 4) * 100);
          cardObserver.unobserve(card);
        }
      });
    }, { threshold: 0.2 });

    cardObserver.observe(card);
  });
});

// Message dans la console
console.log('%c✨ Portfolio Surenthini SIVAKUMAR ✨', 'color: #FFD966; font-size: 16px; font-weight: bold;');
console.log('%cBienvenue sur mon portfolio Data Analyst !', 'color: #6C5CE7; font-size: 12px;');

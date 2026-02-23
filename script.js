document.addEventListener("DOMContentLoaded", () => {

  // Animation fade-in
  const faders = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.2 });

  faders.forEach(fade => observer.observe(fade));


  // FOND PARTICULES INTERACTIF
  const canvas = document.getElementById("background-canvas");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  let mouse = {
    x: null,
    y: null,
    radius: 120
  };

  window.addEventListener("mousemove", function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
  });

  class Particle {
    constructor(x, y, dx, dy, size) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.size = size;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(99, 102, 241, 0.6)";
      ctx.fill();
    }

    update() {
      if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
      if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;

      this.x += this.dx;
      this.y += this.dy;

      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.radius) {
        this.size = 6;
      } else {
        this.size = 3;
      }

      this.draw();
    }
  }

  let particlesArray = [];

  function init() {
    particlesArray = [];
    for (let i = 0; i < 120; i++) {
      let size = 3;
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
      let dx = (Math.random() - 0.5);
      let dy = (Math.random() - 0.5);

      particlesArray.push(new Particle(x, y, dx, dy, size));
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => p.update());
    requestAnimationFrame(animate);
  }

  init();
  animate();
});

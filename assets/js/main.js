/* ─── PROGRESS BAR ─── */
const bar = document.getElementById('progress-bar-inner');
if (bar) {
  window.addEventListener('scroll', () => {
    const max = document.body.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / max * 100) + '%';
  });
}

/* ─── HAMBURGER ─── */
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

/* ─── SCROLL REVEAL ─── */
const reveals = document.querySelectorAll('.card, .reveal');
if (reveals.length) {
  const ro = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        ro.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => {
    el.classList.add('reveal');
    ro.observe(el);
  });
}

/* ─── CANVAS PARTICLES ─── */
const canvas = document.getElementById('bg-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  const resize = () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  const rand = (a, b) => Math.random() * (b - a) + a;

  class Particle {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x  = rand(0, W);
      this.y  = init ? rand(0, H) : H + 10;
      this.r  = rand(0.4, 1.6);
      this.vy = rand(-0.15, -0.45);
      this.vx = rand(-0.1, 0.1);
      this.a  = rand(0.1, 0.55);
      this.hue = Math.random() > 0.6 ? 220 : 250; // bleu ou violet
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.y < -10) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 90%, 65%, ${this.a})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 90; i++) particles.push(new Particle());

  const animate = () => {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  };
  animate();
}

/* ─── YEAR ─── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

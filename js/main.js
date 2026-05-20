/* ═══════════════════════════════════════════════════
   MECHNO SKILL — Main JavaScript
   Particles · Scroll · Counter · Filter · Form
═══════════════════════════════════════════════════ */

// ─── PRELOADER ───────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
  }, 1800);
});

// ─── CURSOR GLOW (desktop) ───────────────────────
if (window.innerWidth > 900) {
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}

// ─── HERO PARTICLE CANVAS ────────────────────────
(function initParticles() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x  = Math.random() * W;
      this.y  = init ? Math.random() * H : H + 10;
      this.r  = Math.random() * 1.5 + .3;
      this.vx = (Math.random() - .5) * .3;
      this.vy = -(Math.random() * .6 + .2);
      this.alpha = Math.random() * .5 + .1;
      this.life = 0;
      this.maxLife = 200 + Math.random() * 200;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life++;
      if (this.life > this.maxLife || this.y < -10) this.reset(false);
    }
    draw() {
      const fade = Math.min(this.life / 30, 1) * Math.min((this.maxLife - this.life) / 30, 1);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245,197,24,${this.alpha * fade})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = Array.from({ length: 120 }, () => new Particle());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // draw connection lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(245,197,24,${(1 - dist / 90) * .06})`;
          ctx.lineWidth = .5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(draw);
  }

  init();
  draw();
  window.addEventListener('resize', () => { resize(); });
})();

// ─── HEADER SCROLL EFFECT ────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ─── MOBILE HAMBURGER ────────────────────────────
const hamburger = document.getElementById('hamburger');
const mainNav   = document.getElementById('mainNav');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mainNav.classList.toggle('open');
  document.body.style.overflow = mainNav.classList.contains('open') ? 'hidden' : '';
});
mainNav?.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mainNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ─── ACTIVE NAV LINK ON SCROLL ───────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
      navLinks.forEach(l => l.classList.remove('active'));
      const match = document.querySelector(`.nav-link[href="#${sec.id}"]`);
      if (match) match.classList.add('active');
    }
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

// ─── INTERSECTION OBSERVER — REVEAL + COUNTERS ───
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
const counterEls = document.querySelectorAll('.counter');
const countedSets = new WeakSet();

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countedSets.has(entry.target)) {
      countedSets.add(entry.target);
      animateCounter(entry.target);
      counterObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

revealEls.forEach(el => revealObs.observe(el));
counterEls.forEach(el => counterObs.observe(el));

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step = 16;
  const steps = duration / step;
  let current = 0;

  const timer = setInterval(() => {
    current += target / steps;
    if (current >= target) {
      el.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current).toLocaleString();
    }
  }, step);
}

// ─── PRODUCT FILTER TABS ─────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const prodCards  = document.querySelectorAll('.prod-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    prodCards.forEach((card, i) => {
      const match = filter === 'all' || card.dataset.category === filter;
      if (match) {
        card.classList.remove('hidden');
        card.style.animationDelay = (i % 6) * 60 + 'ms';
        card.style.animation = 'none';
        requestAnimationFrame(() => {
          card.style.animation = '';
          card.style.animationDelay = '';
        });
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ─── BACK TO TOP ─────────────────────────────────
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop?.classList.toggle('visible', window.scrollY > 600);
}, { passive: true });

// ─── CONTACT FORM ────────────────────────────────
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('.form-submit span');
  btn.textContent = 'Sending…';

  // Simulate async send
  setTimeout(() => {
    contactForm.style.display = 'none';
    formSuccess.classList.add('visible');
  }, 1200);
});

// ─── SMOOTH SCROLL for anchor links ──────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── PARALLAX on hero background grid ────────────
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const scrolled = window.scrollY;
  hero.style.setProperty('--scroll-offset', scrolled * .3 + 'px');
}, { passive: true });

// ─── MAGNETIC HOVER on primary buttons ───────────
document.querySelectorAll('.btn-primary, .btn-outline, .btn-header').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top  - rect.height / 2;
    btn.style.transform = `translate(${x * .12}px, ${y * .18}px) translateY(-3px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ─── TILT EFFECT on product cards ────────────────
if (window.innerWidth > 768) {
  document.querySelectorAll('.prod-card, .why-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - .5;
      const y = (e.clientY - rect.top)  / rect.height - .5;
      card.style.transform = `perspective(800px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ─── HERO CHIP MOUSE PARALLAX (anti-gravity) ─────
const heroChips = document.querySelectorAll('.chip');
document.addEventListener('mousemove', e => {
  if (window.innerWidth <= 768) return;
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;
  heroChips.forEach((chip, i) => {
    const depth = (i + 1) * 5;
    chip.style.transform = `translateX(${dx * depth}px) translateY(${dy * depth - 5 * Math.sin(Date.now() / 1000 + i)}px)`;
  });
});

// ─── TICKER pause on hover (already via CSS) ─────
// ─── Gear continuous rotation handled via CSS ────

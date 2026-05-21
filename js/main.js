/* ═══════════════════════════════════════════════════
   MECHNO SKILL — Main JavaScript
   Particles · Scroll · Counter · Filter · Form
═══════════════════════════════════════════════════ */

// ─── PRELOADER SAFETY FALLBACK ───────────────────
// Hide after 4 s max regardless of load state
(function() {
  const hide = () => {
    const el = document.getElementById('preloader');
    if (el) el.classList.add('hidden');
  };
  window.addEventListener('load', () => setTimeout(hide, 600));
  setTimeout(hide, 4000);
})();

// ─── ADMIN CONTENT LOADER ────────────────────────
(function loadAdminContent() {
  const get = k => { try { return localStorage.getItem(k); } catch(e) { return null; } };

  const set = (sel, val, html) => {
    const el = document.querySelector(sel);
    if (el) html ? (el.innerHTML = val) : (el.textContent = val);
  };

  const heroBadge = get('ms_hero_badge');
  if (heroBadge) set('.hero-badge', heroBadge);

  const heroTitle = get('ms_hero_title');
  if (heroTitle) set('.hero-title', heroTitle, true);

  const heroSub = get('ms_hero_sub');
  if (heroSub) set('.hero-sub', heroSub, true);

  const aboutLead = get('ms_about_lead');
  if (aboutLead) set('.about-lead', aboutLead);

  const bodies = document.querySelectorAll('.about-body');
  const b1 = get('ms_about_body1'); if (b1 && bodies[0]) bodies[0].textContent = b1;
  const b2 = get('ms_about_body2'); if (b2 && bodies[1]) bodies[1].textContent = b2;

  const statCounters = document.querySelectorAll('.stats-bar .counter');
  const statLabels   = document.querySelectorAll('.stats-bar .stat-label');
  [1, 2, 3, 4].forEach((i, idx) => {
    const num = get(`ms_stat${i}_num`);
    const lbl = get(`ms_stat${i}_label`);
    if (num && statCounters[idx]) statCounters[idx].dataset.target = num;
    if (lbl && statLabels[idx])   statLabels[idx].textContent = lbl;
  });

  const addr = get('ms_contact_address');
  if (addr) { const el = document.querySelector('[data-ms="contact_address"]'); if (el) el.innerHTML = addr.replace(/\n/g, '<br>'); }

  const p1 = get('ms_contact_phone1');
  if (p1) { const el = document.querySelector('[data-ms="contact_phone1"]'); if (el) { el.textContent = p1; el.href = 'tel:' + p1.replace(/\s/g, ''); } }

  const p2 = get('ms_contact_phone2');
  if (p2) { const el = document.querySelector('[data-ms="contact_phone2"]'); if (el) { el.textContent = p2; el.href = 'tel:' + p2.replace(/\s/g, ''); } }

  const email = get('ms_contact_email');
  if (email) document.querySelectorAll('[data-ms="contact_email"]').forEach(el => { el.textContent = email; el.href = 'mailto:' + email; });

  const tagline = get('ms_footer_tagline');
  if (tagline) set('.footer-tagline', tagline, true);

  const copy = get('ms_copyright');
  if (copy) set('.footer-bottom p', copy);
})();

// ─── PRELOADER (handled by safety fallback above) ─

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
    particles = Array.from({ length: 60 }, () => new Particle());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // draw connection lines (skip on mobile for perf)
    if (W > 768) for (let i = 0; i < particles.length; i++) {
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

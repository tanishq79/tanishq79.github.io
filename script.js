/* ============================
   SCROLL REVEAL
   ============================ */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children in the same parent group
      const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.visible)');
      siblings.forEach((el, idx) => {
        setTimeout(() => el.classList.add('visible'), idx * 80);
      });
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ============================
   NAVBAR SCROLL BEHAVIOUR
   ============================ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

/* ============================
   HAMBURGER MENU
   ============================ */
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ============================
   SMOOTH ACTIVE NAV HIGHLIGHT
   ============================ */
const sections = document.querySelectorAll('section[id]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.remove('active-link');
        if (a.getAttribute('href') === `#${id}`) {
          a.classList.add('active-link');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ============================
   CURSOR GLOW EFFECT (desktop)
   ============================ */
if (window.matchMedia('(hover: hover)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(58,123,213,0.07) 0%, transparent 70%);
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 0;
    transition: opacity 0.3s ease;
    top: 0; left: 0;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

/* ============================
   HERO PARALLAX ORBS
   ============================ */
const orb1 = document.querySelector('.orb-1');
const orb2 = document.querySelector('.orb-2');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (orb1) orb1.style.transform = `translateY(${y * 0.15}px)`;
  if (orb2) orb2.style.transform = `translateY(${-y * 0.1}px)`;
}, { passive: true });

/* ============================
   ACTIVE NAV STYLE INJECTION
   ============================ */
const styleEl = document.createElement('style');
styleEl.textContent = `.nav-links a.active-link { color: #e8edf5 !important; }
.nav-links a.active-link::after { width: 100% !important; }`;
document.head.appendChild(styleEl);

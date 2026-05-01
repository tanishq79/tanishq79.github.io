/* ─────────────────────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const siblings = el.parentElement.querySelectorAll('.reveal:not(.visible)');
      siblings.forEach((sib, i) => {
        setTimeout(() => sib.classList.add('visible'), i * 70);
      });
      el.classList.add('visible');
      revealObserver.unobserve(el);
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ─────────────────────────────────────────────────────────
   NAVBAR — scroll shadow + active section highlight
───────────────────────────────────────────────────────── */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

// Add .scrolled on scroll
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// Active link via IntersectionObserver
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach((a) => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    });
  },
  { threshold: 0.45 }
);
sections.forEach((s) => sectionObserver.observe(s));

/* ─────────────────────────────────────────────────────────
   HAMBURGER MENU
───────────────────────────────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const navLinksList = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinksList.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinksList.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinksList.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

/* ─────────────────────────────────────────────────────────
   HERO PARALLAX — subtle orb movement on scroll
───────────────────────────────────────────────────────── */
const glow1 = document.querySelector('.glow-1');
const glow2 = document.querySelector('.glow-2');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (glow1) glow1.style.transform = `translateY(${y * 0.12}px)`;
  if (glow2) glow2.style.transform = `translateY(${-y * 0.08}px)`;
}, { passive: true });

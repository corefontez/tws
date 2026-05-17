/* TWS — School of Languages | script.js */

/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  // Show/hide mobile sticky CTA
  const sticky = document.getElementById('mobile-sticky-cta');
  if (sticky) sticky.style.display = window.scrollY > 300 ? 'block' : 'none';
});

/* ── Mobile nav toggle ── */
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');
navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ── Scroll reveal ── */
const revealEls = document.querySelectorAll([
  '#hero-left','#hero-right',
  '#contact-text','#contact-form-card',
  '#method-header','#method-grid',
  '#class-content','#class-image-area',
  '#dashboard-img-area','#dashboard-content',
  '#level-content',
  '#plans-header','#plan-free','#plan-explorer','#plan-voyager',
  '#community-content','#community-visual',
  '#final-cta .final-cta-inner',
  '#footer-brand','#footer-links','#footer-social',
].join(','));

revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 3) * 0.1}s`;
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* Method cards stagger */
document.querySelectorAll('.method-card').forEach((card, i) => {
  card.classList.add('reveal');
  card.style.transitionDelay = `${i * 0.08}s`;
  revealObserver.observe(card);
});

/* Pillar stagger */
document.querySelectorAll('.pillar').forEach((p, i) => {
  p.classList.add('reveal');
  p.style.transitionDelay = `${i * 0.1}s`;
  revealObserver.observe(p);
});

/* ── Contact form ── */
const form = document.getElementById('contact-form');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('[type="submit"]');
  btn.textContent = 'Enviando... 🌱';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Mensagem enviada! 💜';
    btn.style.background = 'var(--green)';
    form.reset();
  }, 1200);
});

/* ── Smooth active nav highlight ── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--purple)' : '';
  });
}, { passive: true });

/* ── Progress bar animation ── */
const progressFill = document.querySelector('.progress-fill');
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.transition = 'width 1.2s ease';
      e.target.style.width = '68%';
      progressObserver.unobserve(e.target);
    }
  });
});
if (progressFill) {
  progressFill.style.width = '0%';
  progressObserver.observe(progressFill);
}

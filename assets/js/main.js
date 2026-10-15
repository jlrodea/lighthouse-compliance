// Mobile menu toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Current year in footer
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Language: remember the visitor's choice, and on English pages suggest
// the Spanish version to visitors whose browser prefers Spanish (no redirect).
const langStore = {
  get() { try { return localStorage.getItem('lang'); } catch (e) { return null; } },
  set(value) { try { localStorage.setItem('lang', value); } catch (e) { /* storage unavailable */ } },
};
document.querySelectorAll('[data-lang]').forEach((link) => {
  link.addEventListener('click', () => langStore.set(link.dataset.lang));
});
const spanishLink = document.querySelector('.lang-switch a[data-lang="es"]');
const browserLang = ((navigator.languages && navigator.languages[0]) || navigator.language || '').toLowerCase();
if (document.documentElement.lang === 'en' && spanishLink && !langStore.get() && browserLang.startsWith('es')) {
  const bar = document.createElement('div');
  bar.className = 'lang-bar';
  bar.setAttribute('role', 'region');
  bar.setAttribute('aria-label', 'Idioma');
  bar.setAttribute('lang', 'es');
  bar.innerHTML = '<span>¿Prefiere ver el sitio en español?</span> <a data-lang="es">Ver en español →</a>' +
    '<button type="button" aria-label="Cerrar">×</button>';
  bar.querySelector('a').href = spanishLink.href;
  bar.querySelector('a').addEventListener('click', () => langStore.set('es'));
  bar.querySelector('button').addEventListener('click', () => {
    langStore.set('en');
    bar.remove();
  });
  document.body.prepend(bar);
}

// Scroll reveal: fade blocks in as they enter the viewport.
// Only elements that start below the fold are hidden, so nothing visible ever flashes.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !reduceMotion) {
  const selector = '.section-head, .card, .pain, .industry, .benefit, .offer, .steps li, .compare > div, .fact, .pillar, .note';
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add('in');
        observer.unobserve(el);
        // Hand transitions back to the element's own hover styles once revealed
        el.addEventListener('transitionend', () => {
          el.classList.remove('reveal', 'in');
          el.style.removeProperty('--d');
        }, { once: true });
      }
    });
  }, { rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll(selector).forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    // Stagger siblings in the same grid
    const index = Array.prototype.indexOf.call(el.parentElement.children, el);
    el.style.setProperty('--d', Math.min(index, 5) * 0.07 + 's');
    el.classList.add('reveal');
    observer.observe(el);
  });
}

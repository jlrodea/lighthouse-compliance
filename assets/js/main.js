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

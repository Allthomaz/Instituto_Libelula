(() => {
  'use strict';

  // 1. Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // 2. Nav mobile
  const toggle = document.querySelector('.nav-toggle');
  const mobile = document.getElementById('nav-mobile');
  if (toggle && mobile) {
    const closeMenu = () => { mobile.hidden = true; toggle.setAttribute('aria-expanded', 'false'); };
    toggle.addEventListener('click', () => {
      const open = mobile.hidden;
      mobile.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
    });
    mobile.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
  }

  // 3. Accordeon: fechar os outros ao abrir um (opcional, UX)
  document.querySelectorAll('.accordion').forEach((group) => {
    const items = group.querySelectorAll('details');
    items.forEach((d) => {
      d.addEventListener('toggle', () => {
        if (d.open) items.forEach((o) => { if (o !== d) o.open = false; });
      });
    });
  });

  // 4. Smooth-scroll para âncoras (fallback além do scroll-behavior)
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (ev) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) { ev.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      }
    });
  });
})();

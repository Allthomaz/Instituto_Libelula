(() => {
  'use strict';

  // Sinaliza JS ativo (progressive enhancement: sem JS, .reveal permanece visível)
  document.documentElement.classList.add('js');

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

  // 4. Guardiões: links funcionam sem JS; com suporte, abrem a arte em diálogo.
  const guardianDialog = document.getElementById('guardian-dialog');
  const guardianDialogImage = document.getElementById('guardian-dialog-image');
  const guardianDialogTitle = document.getElementById('guardian-dialog-title');
  const guardianDialogClose = guardianDialog?.querySelector('.guardian-dialog__close');
  const guardianTriggers = document.querySelectorAll('[data-guardian-art]');
  let lastGuardianTrigger = null;

  if (guardianDialog && guardianDialogImage && guardianDialogTitle && typeof guardianDialog.showModal === 'function') {
    guardianTriggers.forEach((trigger) => {
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        lastGuardianTrigger = trigger;
        const name = trigger.dataset.guardianName;
        guardianDialogImage.src = trigger.dataset.guardianArt;
        guardianDialogImage.alt = `Apresentação de ${name}`;
        guardianDialogTitle.textContent = `Apresentação de ${name}`;
        guardianDialog.showModal();
        guardianDialogClose?.focus();
      });
    });

    guardianDialogClose?.addEventListener('click', () => guardianDialog.close());
    guardianDialog.addEventListener('click', (event) => {
      if (event.target === guardianDialog) guardianDialog.close();
    });
    guardianDialog.addEventListener('close', () => {
      guardianDialogImage.removeAttribute('src');
      lastGuardianTrigger?.focus();
    });
  }
})();

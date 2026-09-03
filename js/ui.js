(() => {
  'use strict';

  // Sinaliza JS ativo (progressive enhancement: sem JS, .reveal permanece visível)
  document.documentElement.classList.add('js');

  // 0. Entrada sonora: a trilha só é iniciada por uma escolha explícita.
  const audioGate = document.getElementById('audio-gate');
  const audioGateEnable = document.getElementById('audio-gate-enable');
  const audioGateSkip = document.getElementById('audio-gate-skip');
  const backgroundAudio = document.getElementById('background-audio');
  const audioToggle = document.getElementById('audio-toggle');
  const audioStatus = document.getElementById('audio-status');

  if (audioGate && audioGateEnable && audioGateSkip && backgroundAudio && audioToggle) {
    const setAudioControl = (isPlaying, message) => {
      audioToggle.hidden = false;
      audioToggle.setAttribute('aria-pressed', String(isPlaying));
      const label = isPlaying ? 'Pausar som' : 'Ativar som';
      audioToggle.setAttribute('aria-label', label);
      audioToggle.setAttribute('title', label);
      audioToggle.classList.toggle('is-playing', isPlaying);
      if (audioStatus) audioStatus.textContent = message;
    };

    const closeAudioGate = () => {
      if (audioGate.open) audioGate.close();
    };

    const startAudio = () => {
      let playback;
      try {
        playback = backgroundAudio.play();
      } catch {
        setAudioControl(false, 'Não foi possível ativar o som.');
        return;
      }

      setAudioControl(true, 'Trilha ativada.');
      Promise.resolve(playback).catch(() => {
        setAudioControl(false, 'Não foi possível ativar o som. Você pode tentar novamente.');
      });
    };

    audioGateEnable.addEventListener('click', () => {
      startAudio();
      closeAudioGate();
    });

    audioGateSkip.addEventListener('click', () => {
      closeAudioGate();
      if (audioStatus) audioStatus.textContent = 'Você entrou sem som.';
    });

    audioGate.addEventListener('cancel', (event) => {
      event.preventDefault();
      closeAudioGate();
      if (audioStatus) audioStatus.textContent = 'Você entrou sem som.';
    });

    audioToggle.addEventListener('click', () => {
      if (backgroundAudio.paused) {
        startAudio();
      } else {
        backgroundAudio.pause();
        setAudioControl(false, 'Trilha pausada.');
      }
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden && !backgroundAudio.paused) {
        backgroundAudio.pause();
        setAudioControl(false, 'Trilha pausada.');
      }
    });

    backgroundAudio.addEventListener('ended', () => {
      setAudioControl(false, 'Trilha encerrada.');
    });

    if (typeof audioGate.showModal === 'function') audioGate.showModal();
  }

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

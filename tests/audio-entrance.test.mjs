import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

class FakeElement {
  constructor() {
    this.attributes = new Map();
    this.classes = new Set();
    this.handlers = new Map();
    this.hidden = false;
    this.textContent = '';
    this.classList = {
      contains: (name) => this.classes.has(name),
      toggle: (name, force) => {
        if (force === true) this.classes.add(name);
        else if (force === false) this.classes.delete(name);
        else if (this.classes.has(name)) this.classes.delete(name);
        else this.classes.add(name);
      },
    };
  }

  addEventListener(type, handler) {
    this.handlers.set(type, handler);
  }

  async dispatch(type) {
    return this.handlers.get(type)?.({ preventDefault() {} });
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }

  getAttribute(name) {
    return this.attributes.get(name) ?? null;
  }

  querySelector() {
    return null;
  }

  querySelectorAll() {
    return [];
  }

  focus() {}
}

class FakeDialog extends FakeElement {
  constructor() {
    super();
    this.open = false;
  }

  showModal() {
    this.open = true;
  }

  close() {
    this.open = false;
    this.dispatch('close');
  }
}

class FakeAudio extends FakeElement {
  constructor(playback) {
    super();
    this.playback = playback;
    this.paused = true;
    this.playCalls = 0;
    this.pauseCalls = 0;
  }

  play() {
    this.playCalls += 1;
    this.paused = false;
    return this.playback();
  }

  pause() {
    this.pauseCalls += 1;
    this.paused = true;
  }
}

async function loadUi({ playback = () => Promise.resolve() } = {}) {
  const elements = new Map([
    ['audio-gate', new FakeDialog()],
    ['audio-gate-enable', new FakeElement()],
    ['audio-gate-skip', new FakeElement()],
    ['background-audio', new FakeAudio(playback)],
    ['audio-toggle', new FakeElement()],
    ['audio-status', new FakeElement()],
  ]);
  elements.get('audio-toggle').hidden = true;

  const documentHandlers = new Map();
  const document = {
    documentElement: { classList: { add() {} } },
    hidden: false,
    addEventListener(type, handler) {
      documentHandlers.set(type, handler);
    },
    async dispatch(type) {
      return documentHandlers.get(type)?.();
    },
    querySelectorAll(selector) {
      if (['.reveal', '.accordion', '[data-guardian-art]'].includes(selector)) return [];
      return [];
    },
    querySelector() { return null; },
    getElementById(id) { return elements.get(id) ?? null; },
  };

  const source = await readFile('js/ui.js', 'utf8');
  vm.runInNewContext(source, { document, window: {}, console });
  return { document, elements };
}

test('oferece uma entrada opcional com trilha sob demanda', async () => {
  const html = await readFile('index.html', 'utf8');

  assert.match(html, /<dialog[^>]+id="audio-gate"/);
  assert.match(html, /id="audio-gate-enable"/);
  assert.match(html, /id="audio-gate-skip"/);
  assert.match(html, /<audio[^>]+id="background-audio"[^>]+preload="none"/);
  assert.match(html, /id="audio-toggle"/);
  assert.match(html, /id="audio-status"[^>]+aria-live="polite"/);
});

test('publica uma cópia otimizada da trilha para carregamento sob demanda', async () => {
  const published = await stat('assets/audio/instituto-libelula.mp3').catch(() => null);
  assert.ok(published, 'a trilha publicada deve existir');

  assert.ok(published.size <= 5_500_000, 'a trilha publicada deve respeitar o orçamento de 5,5 MB');
});

test('abre a entrada e só toca a trilha após escolher entrar com som', async () => {
  const { elements } = await loadUi();
  const gate = elements.get('audio-gate');
  const audio = elements.get('background-audio');
  const toggle = elements.get('audio-toggle');

  assert.equal(gate.open, true);
  assert.equal(audio.playCalls, 0);

  await elements.get('audio-gate-enable').dispatch('click');

  assert.equal(audio.playCalls, 1);
  assert.equal(gate.open, false);
  assert.equal(toggle.hidden, false);
  assert.equal(toggle.getAttribute('aria-pressed'), 'true');
  assert.equal(toggle.getAttribute('aria-label'), 'Pausar som');
  assert.equal(toggle.classList.contains('is-playing'), true);
});

test('entra sem som sem iniciar a trilha', async () => {
  const { elements } = await loadUi();
  const gate = elements.get('audio-gate');
  const audio = elements.get('background-audio');

  await elements.get('audio-gate-skip').dispatch('click');

  assert.equal(gate.open, false);
  assert.equal(audio.playCalls, 0);
});

test('oferece nova tentativa quando o navegador recusa a reprodução', async () => {
  const { elements } = await loadUi({ playback: () => Promise.reject(new Error('blocked')) });
  const toggle = elements.get('audio-toggle');
  const status = elements.get('audio-status');

  await elements.get('audio-gate-enable').dispatch('click');
  await new Promise((resolve) => setTimeout(resolve, 0));

  assert.equal(toggle.getAttribute('aria-pressed'), 'false');
  assert.equal(toggle.getAttribute('aria-label'), 'Ativar som');
  assert.match(status.textContent, /Não foi possível ativar o som/);
});

test('permite pausar e retomar a trilha pelo controle persistente', async () => {
  const { elements } = await loadUi();
  const audio = elements.get('background-audio');
  const toggle = elements.get('audio-toggle');

  await elements.get('audio-gate-enable').dispatch('click');
  await toggle.dispatch('click');

  assert.equal(audio.pauseCalls, 1);
  assert.equal(toggle.getAttribute('aria-pressed'), 'false');
  assert.equal(toggle.classList.contains('is-playing'), false);

  await toggle.dispatch('click');

  assert.equal(audio.playCalls, 2);
  assert.equal(toggle.getAttribute('aria-pressed'), 'true');
  assert.equal(toggle.classList.contains('is-playing'), true);
});

test('pausa a trilha quando a pessoa muda para outra aba', async () => {
  const { document, elements } = await loadUi();
  const audio = elements.get('background-audio');
  const toggle = elements.get('audio-toggle');

  await elements.get('audio-gate-enable').dispatch('click');
  document.hidden = true;
  await document.dispatch('visibilitychange');

  assert.equal(audio.pauseCalls, 1);
  assert.equal(toggle.getAttribute('aria-pressed'), 'false');
});

test('sincroniza o controle quando a trilha termina', async () => {
  const { elements } = await loadUi();
  const audio = elements.get('background-audio');
  const toggle = elements.get('audio-toggle');

  await elements.get('audio-gate-enable').dispatch('click');
  audio.paused = true;
  await audio.dispatch('ended');

  assert.equal(toggle.getAttribute('aria-pressed'), 'false');
  assert.equal(toggle.getAttribute('aria-label'), 'Ativar som');
});

import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('publica a cadência sazonal e o limite vigente de participantes', async () => {
  const html = await readFile('index.html', 'utf8');

  assert.match(html, /Rituais a cada equinócio e solstício, a cada 3 meses\./);
  assert.match(html, /Limite de 20 pessoas\./);
  assert.doesNotMatch(html, /30 vagas/i);
  assert.doesNotMatch(html, /primeiro sábado do mês/i);
});

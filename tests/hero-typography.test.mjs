import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('usa Montserrat Light e Medium somente no título principal', async () => {
  const [html, css] = await Promise.all([
    readFile('index.html', 'utf8'),
    readFile('css/styles.css', 'utf8'),
  ]);

  assert.match(html, /family=Montserrat:wght@300;500/);
  assert.match(css, /\.hero__title\s*\{[^}]*font-family:\s*'Montserrat',\s*sans-serif;/s);
  assert.match(css, /\.hero__title-line--top\s*\{[^}]*font-weight:\s*300;/s);
  assert.match(css, /\.hero__title-line--bottom\s*\{[^}]*font-weight:\s*500;/s);
  assert.doesNotMatch(css, /--font-(?:display|body):\s*'Montserrat'/);
});

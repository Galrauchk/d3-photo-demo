// Garde-fou : la demo doit rester invisible pour les moteurs de recherche (decision du 12/10/2026).
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const lire = (chemin) => readFileSync(new URL(`../${chemin}`, import.meta.url), 'utf8');

test('robots.txt interdit tout, sans Allow ni Sitemap', () => {
  const robots = lire('public/robots.txt');
  assert.match(robots, /^User-agent: \*\s*\nDisallow: \/\s*$/m);
  assert.doesNotMatch(robots, /^\s*Allow:/im);
  assert.doesNotMatch(robots, /^\s*Sitemap:/im);
});

test('le layout de base pose meta robots noindex, nofollow sur toutes les pages', () => {
  const layout = lire('src/layouts/Layout.astro');
  assert.match(layout, /<meta name="robots" content="noindex, nofollow"\s*\/>/);
  assert.doesNotMatch(layout, /\{\s*noindex[^}]*<meta name="robots"/);
  assert.doesNotMatch(layout, /rel="sitemap"/i);
});

test('l en-tete X-Robots-Tag noindex, nofollow est pose sur toutes les reponses', () => {
  const source = lire('public/_headers');
  assert.match(source, /X-Robots-Tag\s*[=:]\s*"?noindex, nofollow/i);
});

test('aucun sitemap n est genere', () => {
  assert.doesNotMatch(lire('astro.config.mjs'), /sitemap/i);
});

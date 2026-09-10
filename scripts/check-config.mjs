import assert from 'node:assert/strict';
import { createServer } from 'vite';

const server = await createServer({ server: { middlewareMode: true, hmr: false, watch: null }, appType: 'custom' });
try {
  const { client, theme, render, validateConfig } = await server.ssrLoadModule('/src/entry-server.tsx');
  validateConfig(client, theme);
  const html = render(client, theme);
  assert(html.includes(client.business.name));
  assert(html.includes(client.catalogue.products[0].name));
  assert(html.includes('aria-pressed="true"'));

  const changed = structuredClone(client);
  changed.business.name = 'Replacement Shop';
  changed.demo.enabled = false;
  changed.catalogue.products = changed.catalogue.products.slice(0, 1);
  validateConfig(changed, theme);
  const changedHtml = render(changed, theme);
  assert(changedHtml.includes('Replacement Shop'));
  assert(!changedHtml.includes('demo-banner'));

  const noStory = structuredClone(client);
  delete noStory.story;
  noStory.navigation = noStory.navigation.filter((link) => link.href !== '#story');
  noStory.hero.secondaryAction = undefined;
  validateConfig(noStory, theme);
  assert(!render(noStory, theme).includes('story-inner'));

  const invalidCategory = structuredClone(client);
  invalidCategory.catalogue.products[0].category = 'missing';
  assert.throws(() => validateConfig(invalidCategory, theme), /not configured/);

  const invalidLink = structuredClone(client);
  invalidLink.headerAction.href = '#missing';
  assert.throws(() => validateConfig(invalidLink, theme), /does not exist/);

  const newTheme = structuredClone(theme);
  newTheme.colours.primary = '#204060';
  validateConfig(client, newTheme);
  assert(render(client, newTheme).includes('--primary:#204060'));

  console.log('Client, product, category, optional story, link and colour configuration checks passed.');
} finally {
  await server.close();
}

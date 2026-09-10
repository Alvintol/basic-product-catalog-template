import { createServer } from 'vite';
import { readFile, writeFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';

// Render the configured React page at build time. Hosting needs only dist/.
const server = await createServer({ server: { middlewareMode: true, hmr: false, watch: null }, appType: 'custom' });
const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
try {
  const { client, theme, render, validateConfig } = await server.ssrLoadModule('/src/entry-server.tsx');
  validateConfig(client, theme);
  const checkAssets = async (value) => {
    if (!value || typeof value !== 'object') return;
    for (const [key, child] of Object.entries(value)) {
      if (key === 'src' && typeof child === 'string' && child.startsWith('images/')) await access(resolve('public', child));
      await checkAssets(child);
    }
  };
  await checkAssets(client);
  const head = [
    `<title>${escape(client.seo.title)}</title>`,
    `<meta name="description" content="${escape(client.seo.description)}" />`,
    `<meta name="robots" content="${client.seo.indexable && !client.demo.enabled ? 'index,follow' : 'noindex,nofollow'}" />`,
    `<meta name="theme-color" content="${theme.colours.background}" />`,
    `<meta property="og:title" content="${escape(client.seo.title)}" />`,
    `<meta property="og:description" content="${escape(client.seo.description)}" />`,
    '<meta property="og:type" content="website" />',
    ...(client.seo.url ? [`<link rel="canonical" href="${escape(client.seo.url)}" />`, `<meta property="og:url" content="${escape(client.seo.url)}" />`] : []),
  ].join('\n    ');
  let html = await readFile('dist/index.html', 'utf8');
  html = html.replace('<!--site-head-->', head).replace('<html lang="en-CA">', `<html lang="${escape(client.seo.language)}">`)
    .replace('<div id="root">', '<div id="root" data-prerendered="true">').replace('<!--site-content-->', render());
  await writeFile('dist/index.html', html);
  console.log(`Prerendered ${client.business.name}; configuration and local image paths checked.`);
} finally { await server.close(); }

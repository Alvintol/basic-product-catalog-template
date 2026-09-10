import type { ClientConfig, Theme } from '../types';

export const validateConfig = (client: ClientConfig, theme: Theme) => {
  const errors: string[] = [];
  const ids = new Set(['top', 'main', 'products', 'contact']);
  if (client.story) ids.add('story');

  const categories = new Set<string>();
  for (const category of client.catalogue.categories) {
    if (!/^[a-z][a-z0-9-]*$/.test(category.id)) errors.push(`Invalid category id: ${category.id}`);
    if (categories.has(category.id)) errors.push(`Duplicate category id: ${category.id}`);
    categories.add(category.id);
  }

  const productIds = new Set<string>();
  for (const product of client.catalogue.products) {
    if (!/^[a-z][a-z0-9-]*$/.test(product.id)) errors.push(`Invalid product id: ${product.id}`);
    if (productIds.has(product.id)) errors.push(`Duplicate product id: ${product.id}`);
    if (!categories.has(product.category)) errors.push(`${product.id}: category ${product.category} is not configured.`);
    productIds.add(product.id);
  }
  if (!client.catalogue.products.length) errors.push('Add at least one product.');

  const walk = (value: unknown, path = 'client') => {
    if (!value || typeof value !== 'object') return;
    for (const [key, item] of Object.entries(value)) {
      const name = `${path}.${key}`;
      if (key === 'href' && typeof item === 'string') {
        if (item.startsWith('#') && !ids.has(item.slice(1))) errors.push(`${name}: target ${item} does not exist.`);
        else if (!/^(#.+|https:\/\/\S+|mailto:[^\s]+|tel:\+?[\d\s()-]+)$/.test(item)) {
          errors.push(`${name}: use a section anchor, HTTPS, mailto, or tel link.`);
        }
      }
      if (key === 'src' && typeof item === 'string' && !/^(images\/[a-zA-Z0-9_./-]+|https:\/\/\S+)$/.test(item)) {
        errors.push(`${name}: use an images/ path or HTTPS URL.`);
      }
      if (key === 'alt' && typeof item === 'string' && !item.trim()) errors.push(`${name}: add a useful image description.`);
      walk(item, name);
    }
  };
  walk(client);

  if (!client.business.name.trim() || !client.seo.title.trim() || !client.seo.description.trim()) {
    errors.push('Business name, SEO title and description are required.');
  }
  if (client.demo.enabled && client.seo.indexable) errors.push('Keep fictional demo sites noindex.');
  if (client.seo.url && !/^https:\/\//.test(client.seo.url)) errors.push('SEO URL must use HTTPS.');
  for (const [name, colour] of Object.entries(theme.colours)) {
    if (!/^#[0-9a-f]{6}$/i.test(colour)) errors.push(`Theme colour ${name} must be a six-digit hex colour.`);
  }

  if (errors.length) throw new Error(`Configuration needs attention:\n${errors.map((error) => `- ${error}`).join('\n')}`);
};

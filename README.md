# Basic product catalogue — React + TypeScript template

Demo business: **Common Form**, a fictional independent home-goods shop.

This is an editorial product-showcase template for retailers, makers, wellness brands, wholesalers, and service businesses with package-like products. It includes a featured-product hero, category filters, a responsive product grid, optional product facts, an optional brand story, store highlights, and a contact call to action.

It is intentionally a catalogue rather than a checkout system. Each product button can link to Shopify, Square, Etsy, another ecommerce platform, a booking page, or the site's contact section.

## Run locally

Use Node.js 22.12 or later.

```bash
npm ci
npm run dev
```

Before deploying:

```bash
npm run check:config
npm run build
```

The build type-checks the React application, validates the client configuration and local image references, and prerenders the full page into `dist/index.html`.

## Create a client version

1. Copy this repository for the client.
2. Edit `src/config/client.ts` to replace the sample business, copy, products, categories, prices, links, and store details.
3. Add client images to `public/images/` and update their image objects in `client.ts`.
4. Edit `src/config/theme.ts` for the client's colour palette, font stacks, corners, and content width.
5. Change each product `action.href` to the correct product page, shop platform, booking page, or contact anchor.
6. When the demo is ready for the client, disable the demo banner and update the SEO settings.
7. Run both checks above and deploy the contents of `dist/`.

## Where changes go

| Change | File or field |
| --- | --- |
| Business name and store details | `src/config/client.ts` |
| Product cards | `client.catalogue.products` |
| Product filters | `client.catalogue.categories` |
| Featured hero product | `client.hero` |
| Navigation | `client.navigation` |
| Brand story | `client.story` |
| Colours and typography | `src/config/theme.ts` |
| Product and logo images | `public/images/` |
| Shared presentation | `src/styles.css` |

## Add a product

Add an object to `client.catalogue.products`:

```ts
{
  id: 'product-slug',
  name: 'Product name',
  category: 'home',
  description: 'A short, useful product description.',
  price: '$48 CAD',
  badge: 'New', // optional
  details: ['Material or ingredient', 'Size or finish'], // optional
  image: {
    src: 'images/product-name.webp',
    alt: 'Clear description of the product photo.',
    width: 1400,
    height: 1400,
    position: '50% 50%', // optional crop position
  },
  action: {
    label: 'View product',
    href: 'https://shop.example.com/products/product-slug',
  },
}
```

The `category` must match one of the category IDs. The build reports duplicate IDs, unknown categories, broken internal links, invalid URLs, and missing local images.

Square product photos work best. The template uses `object-fit: cover`, so mixed source dimensions still display consistently; use the optional `position` field to adjust a crop.

## Remove the story section

Delete `client.story`, remove the `#story` navigation link, and remove or change the hero's secondary action. The configuration check catches any link left pointing to the removed section.

## Theme tokens

The interface reads its brand styling from `src/config/theme.ts`:

- `background`, `surface`, `text`, `muted`, and `border` control the page.
- `primary` and `onPrimary` control major buttons and the story panel.
- `accent` and `onAccent` control badges, focus states, and the demo banner.
- `soft` and `onSoft` are available for quieter feature surfaces.
- Font stacks and corner styles are configurable without editing components.

Check colour contrast after inserting a client's brand colours.

## Contact and commerce links

The sample contact button uses `mailto:`. It can instead use a secure `https://` URL. Product links accept section anchors, HTTPS URLs, `mailto:`, and telephone links.

This template does not include inventory, a shopping cart, customer accounts, order storage, tax calculation, shipping quotes, or payment processing. Those should come from the client's commerce platform or a separately scoped premium build.

## Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist`
- Root directory: repository root
- Production branch: `main`

Attach a subdomain such as `shop-demo.example.com` to the Cloudflare Pages project without changing the main website.

## Demo assets

The sample product photography was generated specifically for this fictional template. Replace it with client-owned photography before launch. Generation details are in `ASSET-CREDITS.md`.

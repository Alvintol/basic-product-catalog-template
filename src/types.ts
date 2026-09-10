export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  position?: string;
};

export type Action = { label: string; href: string };

export type ProductCategory = {
  id: string;
  label: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  image: ImageAsset;
  action: Action;
  badge?: string;
  details?: string[];
};

export type ClientConfig = {
  demo: { enabled: boolean; label: string; note: string };
  business: { name: string; monogram: string; location: string; logo?: ImageAsset };
  seo: { title: string; description: string; language: string; indexable: boolean; url?: string };
  ui: {
    skipToContent: string;
    menuOpen: string;
    menuClose: string;
    navigationLabel: string;
    backToTop: string;
    allProducts: string;
    productCount: string;
  };
  navigation: Action[];
  headerAction: Action;
  hero: {
    eyebrow: string;
    title: string;
    titleAccent?: string;
    description: string;
    primaryAction: Action;
    secondaryAction?: Action;
    image: ImageAsset;
    featuredLabel: string;
    featuredName: string;
    featuredPrice: string;
  };
  catalogue: {
    eyebrow: string;
    title: string;
    description: string;
    categories: ProductCategory[];
    products: Product[];
  };
  story?: {
    eyebrow: string;
    title: string;
    body: string;
    image: ImageAsset;
    action?: Action;
    details?: { label: string; value: string }[];
  };
  highlights: { title: string; description: string }[];
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    action: Action;
    details: string[];
  };
  footer: { note: string; copyright: string; links: Action[] };
};

export type Theme = {
  colours: {
    background: string;
    surface: string;
    text: string;
    muted: string;
    border: string;
    primary: string;
    onPrimary: string;
    accent: string;
    onAccent: string;
    soft: string;
    onSoft: string;
  };
  fonts: { body: string; heading: string; accent: string };
  shape: { radius: string; buttonRadius: string; contentWidth: string };
};

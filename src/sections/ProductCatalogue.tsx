import { useState } from 'react';
import type { ClientConfig } from '../types';
import { ActionLink } from '../components/ActionLink';
import { Photo } from '../components/Photo';

type Props = Pick<ClientConfig, 'ui' | 'catalogue'>;

export const ProductCatalogue = ({ catalogue, ui }: Props) => {
  const [active, setActive] = useState('all');
  const categoryNames = new Map(catalogue.categories.map((category) => [category.id, category.label]));
  const products = active === 'all'
    ? catalogue.products
    : catalogue.products.filter((product) => product.category === active);

  return (
    <section className="catalogue container" id="products" aria-labelledby="products-title">
      <div className="catalogue-heading">
        <div>
          <p className="eyebrow">{catalogue.eyebrow}</p>
          <h2 id="products-title">{catalogue.title}</h2>
        </div>
        <p>{catalogue.description}</p>
      </div>
      <div className="catalogue-toolbar">
        <div className="filters" aria-label="Filter products">
          <button type="button" aria-pressed={active === 'all'} onClick={() => setActive('all')}>
            {ui.allProducts}
          </button>
          {catalogue.categories.map((category) => (
            <button type="button" key={category.id} aria-pressed={active === category.id}
              onClick={() => setActive(category.id)}>{category.label}</button>
          ))}
        </div>
        <p className="product-count" aria-live="polite">{products.length} {ui.productCount}</p>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <div className="product-image">
              <Photo image={product.image} />
              {product.badge && <span className="product-badge">{product.badge}</span>}
            </div>
            <div className="product-details">
              <p className="product-category">{categoryNames.get(product.category)}</p>
              <div className="product-title-row"><h3>{product.name}</h3><b>{product.price}</b></div>
              <p>{product.description}</p>
              {product.details && (
                <ul className="product-facts" aria-label={`${product.name} details`}>
                  {product.details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
              )}
              <ActionLink action={product.action} secondary />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

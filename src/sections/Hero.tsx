import type { ClientConfig } from '../types';
import { ActionLink } from '../components/ActionLink';
import { Photo } from '../components/Photo';

export const Hero = ({ hero }: { hero: ClientConfig['hero'] }) => (
  <section className="hero container" aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="eyebrow">{hero.eyebrow}</p>
      <h1 id="hero-title">
        {hero.title}
        {hero.titleAccent && <><br /><em>{hero.titleAccent}</em></>}
      </h1>
      <p className="hero-description">{hero.description}</p>
      <div className="hero-actions">
        <ActionLink action={hero.primaryAction} />
        {hero.secondaryAction && <ActionLink action={hero.secondaryAction} secondary />}
      </div>
    </div>
    <figure className="hero-product">
      <div className="hero-image">
        <Photo image={hero.image} priority />
      </div>
      <figcaption>
        <span>{hero.featuredLabel}</span>
        <strong>{hero.featuredName}</strong>
        <b>{hero.featuredPrice}</b>
      </figcaption>
    </figure>
  </section>
);

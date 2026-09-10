import type { ClientConfig, Theme } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { ProductCatalogue } from './sections/ProductCatalogue';
import { Story } from './sections/Story';
import { ActionLink } from './components/ActionLink';
import { themeVariables } from './lib/theme';

export const App = ({ client, theme }: { client: ClientConfig; theme: Theme }) => (
  <div className="site" id="top" style={themeVariables(theme)}>
    <a className="skip-link" href="#main">{client.ui.skipToContent}</a>
    {client.demo.enabled && (
      <aside className="demo-banner">
        <span>{client.demo.label}</span>
        <span>{client.demo.note}</span>
      </aside>
    )}
    <Header client={client} />
    <main id="main" tabIndex={-1}>
      <Hero hero={client.hero} />
      <ProductCatalogue catalogue={client.catalogue} ui={client.ui} />
      {client.story && <Story story={client.story} />}
      <section className="highlights container" aria-label="Store information">
        {client.highlights.map((item) => (
          <article key={item.title}>
            <div><h2>{item.title}</h2><p>{item.description}</p></div>
          </article>
        ))}
      </section>
      <section className="contact container" id="contact" aria-labelledby="contact-title">
        <div>
          <p className="eyebrow">{client.contact.eyebrow}</p>
          <h2 id="contact-title">{client.contact.title}</h2>
        </div>
        <div className="contact-copy">
          <p>{client.contact.description}</p>
          <ActionLink action={client.contact.action} />
          <ul>{client.contact.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
        </div>
      </section>
    </main>
    <Footer client={client} />
  </div>
);

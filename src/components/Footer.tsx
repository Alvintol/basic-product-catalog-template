import type { ClientConfig } from '../types';

export const Footer = ({ client }: { client: ClientConfig }) => (
  <footer className="site-footer container">
    <div>
      <a className="footer-brand" href="#top">{client.business.name}</a>
      <p>{client.footer.note}</p>
    </div>
    <div className="footer-links">
      {client.footer.links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
      <a href="#top">{client.ui.backToTop} ↑</a>
    </div>
    <p className="copyright">{client.footer.copyright}</p>
  </footer>
);

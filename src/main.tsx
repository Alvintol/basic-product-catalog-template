import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import { client } from './config/client';
import { theme } from './config/theme';
import './styles.css';

const root = document.getElementById('root')!;
const app = <StrictMode><App client={client} theme={theme} /></StrictMode>;
document.title = client.seo.title;
document.documentElement.lang = client.seo.language;
// Production includes readable HTML before React loads; development renders normally.
if (root.dataset.prerendered === 'true') hydrateRoot(root, app);
else createRoot(root).render(app);

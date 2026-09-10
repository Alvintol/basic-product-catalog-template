import { renderToString } from 'react-dom/server';
import { App } from './App';
import { client } from './config/client';
import { theme } from './config/theme';
import { validateConfig } from './lib/validate';

export { client, theme, validateConfig };
export const render = (data = client, tokens = theme) => renderToString(<App client={data} theme={tokens} />);

import type { Theme } from '../types';

// Swap these tokens for each client; components do not contain brand colours.
export const theme = {
  colours: {
    background: '#F4F0E9',
    surface: '#FBF9F5',
    text: '#211A16',
    muted: '#6B5E55',
    border: '#D8CEC3',
    primary: '#364338',
    onPrimary: '#F8F4ED',
    accent: '#B7785D',
    onAccent: '#FFF9F3',
    soft: '#E6DED4',
    onSoft: '#342A24',
  },
  fonts: {
    body: 'Inter, Helvetica, Arial, sans-serif',
    heading: 'Georgia, Times New Roman, serif',
    accent: 'Georgia, Times New Roman, serif',
  },
  shape: {
    radius: '0.2rem',
    buttonRadius: '999px',
    contentWidth: '82rem',
  },
} satisfies Theme;

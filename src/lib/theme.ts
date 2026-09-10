import type { CSSProperties } from 'react';
import type { Theme } from '../types';

export const themeVariables = (theme: Theme): CSSProperties => Object.fromEntries([
  ...Object.entries(theme.colours).map(([key, value]) => [`--${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`, value]),
  ...Object.entries(theme.fonts).map(([key, value]) => [`--font-${key}`, value]),
  ...Object.entries(theme.shape).map(([key, value]) => [`--${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`, value]),
]) as CSSProperties;

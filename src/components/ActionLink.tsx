import type { Action } from '../types';

export const ActionLink = ({ action, secondary = false }: { action: Action; secondary?: boolean }) => (
  <a className={`button${secondary ? ' button-secondary' : ''}`} href={action.href}>
    {action.label}<span aria-hidden="true">↗</span>
  </a>
);

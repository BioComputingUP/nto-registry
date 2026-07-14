// Minimal inline icon set (24x24, stroke-based) shared across the site's
// stat tiles and feature cards, kept visually consistent with the hero
// illustration in index.astro.

const wrap = (paths: string) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

export const ICONS: Record<string, string> = {
  layers: wrap(
    '<path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="M2 12l10 5 10-5"/><path d="M2 17l10 5 10-5"/>'
  ),
  grid: wrap(
    '<rect x="3" y="3" width="7" height="7" rx="1.4"/><rect x="14" y="3" width="7" height="7" rx="1.4"/><rect x="3" y="14" width="7" height="7" rx="1.4"/><rect x="14" y="14" width="7" height="7" rx="1.4"/>'
  ),
  server: wrap(
    '<rect x="4" y="4" width="16" height="16" rx="2.5"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 4v2M15 4v2M9 18v2M15 18v2M4 9h2M4 15h2M18 9h2M18 15h2"/>'
  ),
  flag: wrap('<path d="M5 3v18"/><path d="M5 4h13l-3 4 3 4H5"/>'),
  info: wrap('<circle cx="12" cy="12" r="9"/><path d="M12 11v6"/><path d="M12 7.5v.01"/>'),
  database: wrap(
    '<path d="M4 5c0-1.1 3.6-2 8-2s8 .9 8 2-3.6 2-8 2-8-.9-8-2Zm0 0v14c0 1.1 3.6 2 8 2s8-.9 8-2V5M4 12c0 1.1 3.6 2 8 2s8-.9 8-2"/>'
  ),
  code: wrap('<path d="M8 6 3 12l5 6M16 6l5 6-5 6"/>'),
  cap: wrap(
    '<path d="M12 3 2 8l10 5 10-5-10-5Zm-7 8v5c0 1.5 3 3 7 3s7-1.5 7-3v-5"/>'
  ),
  document: wrap(
    '<path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm7 0v5h5M9 13h6M9 17h6"/>'
  ),
  check: wrap('<path d="M21 12a9 9 0 1 1-3.5-7.1"/><path d="m9 12 2 2 4-5"/>'),
};

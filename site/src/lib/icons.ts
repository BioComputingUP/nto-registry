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
  users: wrap(
    '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'
  ),
  search: wrap('<circle cx="10" cy="10" r="6"/><path d="m20 20-5.5-5.5"/>'),
  quote: wrap(
    '<path d="M7 8c-2 0-3.5 1.5-3.5 4S5 15.5 7 15.5c0-3.5 1-4.5 3-4.5V8H7Zm10 0c-2 0-3.5 1.5-3.5 4s1.5 3.5 3.5 3.5c0-3.5 1-4.5 3-4.5V8h-3Z"/>'
  ),
  link: wrap(
    '<path d="M9 15 15 9"/><path d="M11 7l1-1a4 4 0 0 1 5.7 5.7l-1 1"/><path d="M13 17l-1 1a4 4 0 0 1-5.7-5.7l1-1"/>'
  ),
  book: wrap('<path d="M12 6c-2-1.3-5-1.7-8-1v13c3-.7 6-.3 8 1 2-1.3 5-1.7 8-1V5c-3-.7-6-.3-8 1Zm0 0v13"/>'),
  download: wrap('<path d="M12 3v11m0 0 4-4m-4 4-4-4"/><path d="M5 17v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2"/>'),
  "external-link": wrap(
    '<path d="M14 4h6v6"/><path d="M20 4 11 13"/><path d="M20 14v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"/>'
  ),
  plus: wrap('<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>'),
  scale: wrap(
    '<path d="M12 3v18"/><path d="M7 5h10"/><path d="M5 5 2 11a3 3 0 0 0 6 0L5 5Z"/><path d="M19 5l-3 6a3 3 0 0 0 6 0l-3-6Z"/><path d="M8 21h8"/>'
  ),
  building: wrap(
    '<path d="M3 10 12 4l9 6"/><path d="M5 10v9M9 10v9M15 10v9M19 10v9"/><path d="M3 21h18"/><path d="M3 10h18"/>'
  ),
  coins: wrap('<circle cx="9" cy="15" r="6"/><circle cx="15" cy="9" r="6"/>'),
  star: wrap(
    '<path d="M12 2.5 14.7 9l7 .6-5.3 4.6 1.6 6.8L12 17.6 5.9 21l1.7-6.8L2.3 9.6l7-.6L12 2.5Z"/>'
  ),
  award: wrap(
    '<circle cx="12" cy="8" r="5.5"/><path d="M8.5 12.8 7 21l5-3 5 3-1.5-8.2"/>'
  ),
  "trending-up": wrap('<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>'),
  "arrow-right": wrap('<path d="M4 12h16M14 6l6 6-6 6"/>'),
};

// Same stroke set as ICONS but rendered white, for use inside solid-color
// buttons (e.g. the OSF preprint CTA) where currentColor would be the
// button's own text color rather than a deliberate white icon.
export const WHITE_ICONS: Record<string, string> = {
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 6c-2-1.3-5-1.7-8-1v13c3-.7 6-.3 8 1 2-1.3 5-1.7 8-1V5c-3-.7-6-.3-8 1Zm0 0v13"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg>',
};

// GitHub mark, used wherever a link points to the repository (24x24 solid,
// distinct from the stroke-based set above since it's a filled brand mark).
export const GITHUB_ICON =
  '<svg viewBox="0 0 16 16" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>';

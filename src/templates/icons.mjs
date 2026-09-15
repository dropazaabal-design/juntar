/** Inline SVG icons. Kept tiny and stroke-based so they inherit currentColor. */
const s = (d, extra = '') =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${d}</svg>`;

export const icons = {
  merge: s('<path d="M7 3v6a4 4 0 0 0 4 4h6"/><path d="M7 21v-6a4 4 0 0 1 4-4h6"/><path d="m17 9 3 4-3 4"/>'),
  split: s('<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8.6 7.6 20 18M8.6 16.4 20 6"/>'),
  rotate: s('<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/>'),
  compress: s('<path d="M4 9h5V4M20 15h-5v5M9 9 3 3M15 15l6 6"/>'),
  pages: s('<rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/>'),
  trash: s('<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/>'),
  extract: s('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M12 18v-6M9 15l3 3 3-3"/>'),
  number: s('<path d="M4 6h4v6H4zM6 6v6"/><path d="M13 6h3a2 2 0 0 1 0 4h-1a2 2 0 0 0 0 4h3"/><path d="M3 20h18"/>'),
  water: s('<path d="M12 2.7S6 9.3 6 13.5a6 6 0 0 0 12 0C18 9.3 12 2.7 12 2.7z"/>'),
  word: s('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="m8.5 12 1.3 5 1.7-3.6L13.2 17l1.3-5"/>'),
  image: s('<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.6"/><path d="m21 16-5-5L6 20"/>'),
  text: s('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M8.5 13h7M8.5 17h5"/>'),
  lock: s('<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>'),
  unlock: s('<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 7.5-2"/>'),
  sign: s('<path d="M3 19c3.5 0 4-13 7-13s2 11 5 11c1.6 0 2.4-1.2 3-2.4"/><path d="M15 19h6"/>'),
  edit: s('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>'),
  upload: s('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 9l5-5 5 5M12 4v12"/>'),
  shield: s('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>'),
  bolt: s('<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>'),
  free: s('<circle cx="12" cy="12" r="9"/><path d="M14.8 9.3a3 3 0 0 0-5.3 1.9c0 3 5.3 1.6 5.3 4.6a3 3 0 0 1-5.3 1.9"/><path d="M12 6.5v11"/>'),
  nouser: s('<circle cx="12" cy="8" r="3.5"/><path d="M4.5 20a7.5 7.5 0 0 1 12-6"/><path d="m16 17 5 5M21 17l-5 5"/>'),
  flag: s('<path d="M4 21V4M4 5h13l-2 4 2 4H4"/>'),
  check: s('<path d="m5 13 4 4L19 7"/>', 'width="18" height="18"'),
  x: s('<path d="M6 6l12 12M18 6 6 18"/>', 'width="18" height="18"'),
  arrow: s('<path d="M5 12h14M13 6l6 6-6 6"/>', 'width="16" height="16"'),
  chev: s('<path d="m6 9 6 6 6-6"/>', 'width="14" height="14"'),
  grab: s('<circle cx="9" cy="6" r="1.4" fill="currentColor" stroke="none"/><circle cx="15" cy="6" r="1.4" fill="currentColor" stroke="none"/><circle cx="9" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="15" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="9" cy="18" r="1.4" fill="currentColor" stroke="none"/><circle cx="15" cy="18" r="1.4" fill="currentColor" stroke="none"/>', 'width="18" height="18"'),
  up: s('<path d="m6 15 6-6 6 6"/>', 'width="18" height="18"'),
  down: s('<path d="m6 9 6 6 6-6"/>', 'width="18" height="18"'),
  menu: s('<path d="M3 6h18M3 12h18M3 18h18"/>', 'width="18" height="18"'),
  book: s('<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 1 2-2h13"/>'),
};

export const icon = (name, size = 24) => {
  const svg = icons[name] || icons.pages;
  // Match the width *attribute* only — every icon carries a stroke-width too.
  return /\swidth="/.test(svg) ? svg : svg.replace('<svg ', `<svg width="${size}" height="${size}" `);
};

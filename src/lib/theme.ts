export type Theme = 'dark' | 'light';

const KEY = 'gadgethub_theme';

export function getStoredTheme(): Theme {
  return localStorage.getItem(KEY) === 'light' ? 'light' : 'dark';
}

/** Set the theme on <html data-theme> and persist it. */
export function applyTheme(theme: Theme, persist = true) {
  document.documentElement.dataset.theme = theme;
  if (persist) localStorage.setItem(KEY, theme);
}

/** Resolve the boot theme: ?theme= override (not persisted) → stored → dark. */
export function initTheme() {
  const forced = new URLSearchParams(window.location.search).get('theme');
  if (forced === 'light' || forced === 'dark') {
    applyTheme(forced, false);
  } else {
    applyTheme(getStoredTheme(), false);
  }
}

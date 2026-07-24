import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Search, ChevronDown, Sparkles, Menu, X, Sun, Moon } from 'lucide-react';
import { Logo } from '../ui';
import { applyTheme, type Theme } from '../../lib/theme';

const NAV_LINKS = [
  { to: '/ai-advisor', label: 'AI Advisor', isNew: true },
  { to: '/reviews', label: 'Reviews' },
  { to: '/compare', label: 'Compare' },
  { to: '/sellers', label: 'Sellers' },
  { to: '/news', label: 'News' },
  { to: '/community', label: 'Community' },
];

const HUB_MENU = [
  { to: '/knowledge-hub', label: 'Knowledge Hub Home' },
  { to: '/knowledge-hub#buying-guides', label: 'Buying Guides' },
  { to: '/knowledge-hub#scam-protection', label: 'Scam Protection' },
  { to: '/knowledge-hub#comparison-guides', label: 'Comparison Guides' },
  { to: '/knowledge-hub#explainers', label: 'Gadget Explainers' },
  { to: '/glossary', label: 'Glossary' },
];

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hubOpen, setHubOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState<Theme>(
    () => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'),
  );
  const navigate = useNavigate();

  const isMobileNav = () => window.matchMedia('(max-width: 1020px)').matches;
  const closeMenus = () => { setMobileOpen(false); setHubOpen(false); };

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
  };

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    closeMenus();
    navigate(`/search?q=${encodeURIComponent(query || 'MacBook Air M3')}`);
  };

  return (
    <header className="nav">
      <div className="container nav__inner">
        <Logo />

        <nav className={`nav__links${mobileOpen ? ' nav__links--open' : ''}`}>
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `nav__link${isActive ? ' nav__link--active' : ''}`}
              onClick={closeMenus}
            >
              {l.label}
              {l.isNew && <span className="badge badge--new">NEW</span>}
            </NavLink>
          ))}
          <div className={`nav__dropdown${hubOpen ? ' nav__dropdown--open' : ''}`}>
            <NavLink
              to="/knowledge-hub"
              className={({ isActive }) => `nav__link${isActive ? ' nav__link--active' : ''}`}
              aria-expanded={hubOpen}
              onClick={(e) => {
                // On mobile, tapping expands the submenu instead of navigating.
                // On desktop the submenu opens on hover, so navigate as normal.
                if (isMobileNav()) {
                  e.preventDefault();
                  setHubOpen((v) => !v);
                } else {
                  closeMenus();
                }
              }}
            >
              Knowledge Hub <ChevronDown size={13} className="nav__chev" />
            </NavLink>
            <div className="nav__menu">
              {HUB_MENU.map((m) => (
                <Link key={m.label} to={m.to} onClick={closeMenus}>{m.label}</Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="nav__actions">
          <button
            className="nav__icon-btn"
            aria-label="Search GadgetHub"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <Search size={17} />
          </button>
          <button
            className="nav__icon-btn"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <Link to="/signin" className="btn btn--outline btn--sm nav__signin">Sign in</Link>
          <Link to="/ai-advisor" className="btn btn--primary btn--sm nav__ask">
            <Sparkles size={14} /> Ask GadgetHub AI
          </Link>
          <button
            className="nav__icon-btn nav__burger"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => { setMobileOpen((v) => !v); setHubOpen(false); }}
          >
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="nav__search">
          <form className="container nav__search-inner" onSubmit={submitSearch}>
            <Search size={16} className="muted-2" />
            <input
              autoFocus
              className="nav__search-input"
              placeholder="Search gadgets, sellers, reviews, guides…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn--primary btn--sm" type="submit">Search</button>
          </form>
        </div>
      )}
    </header>
  );
}

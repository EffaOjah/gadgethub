import { Link } from 'react-router-dom';
import { Music2, Heart, ShieldCheck, Lock, CreditCard } from 'lucide-react';
import { Logo } from '../ui';

/* Brand icons (lucide no longer ships brand logos) */
const Facebook = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.2-1.5 1.5-1.5h1.4V4.9c-.3 0-1.1-.1-2.1-.1-2.1 0-3.6 1.3-3.6 3.7V11H8.3v3h2.4v7h2.8z" />
  </svg>
);
const XTwitter = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.8 3h3l-6.6 7.6L22 21h-6.1l-4.8-6.3L5.6 21h-3l7.1-8.1L2 3h6.3l4.3 5.7L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z" />
  </svg>
);
const Instagram = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const Youtube = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M23 12s0-3.3-.4-4.9c-.2-.9-.9-1.6-1.8-1.8C19.2 4.9 12 4.9 12 4.9s-7.2 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 8.7 1 12 1 12s0 3.3.4 4.9c.2.9.9 1.6 1.8 1.8 1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4c-.9-.2 1.6-.9 1.8-1.8.4-1.6.4-4.9.4-4.9zM9.8 15.3V8.7l6 3.3-6 3.3z" />
  </svg>
);

const COLUMNS = [
  {
    title: 'Platform',
    links: [
      { label: 'AI Advisor', to: '/ai-advisor' },
      { label: 'Reviews', to: '/reviews' },
      { label: 'Compare', to: '/compare' },
      { label: 'Sellers', to: '/sellers' },
      { label: 'News', to: '/news' },
      { label: 'Community', to: '/community' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Knowledge Hub', to: '/knowledge-hub' },
      { label: 'Buying Guides', to: '/knowledge-hub#buying-guides' },
      { label: 'How It Works', to: '/how-it-works' },
      { label: 'Glossary', to: '/glossary' },
      { label: 'Help Center', to: '/help' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Our Mission', to: '/mission' },
      { label: 'Careers', to: '/careers' },
      { label: 'Contact Us', to: '/contact' },
      { label: 'Press', to: '/press' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Use', to: '/terms' },
      { label: 'Cookie Policy', to: '/cookies' },
      { label: 'Refund Policy', to: '/refunds' },
      { label: 'Sitemap', to: '/sitemap' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__main">
          <div className="footer__brand">
            <Logo />
            <p>
              Helping people make smarter gadget decisions with AI, real reviews
              and trusted sellers.
            </p>
            <div className="footer__social">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={15} /></a>
              <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X (Twitter)"><XTwitter size={15} /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={15} /></a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok"><Music2 size={15} /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube size={15} /></a>
            </div>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}><Link to={l.to}>{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer__trust">
          <span className="footer__trust-label">Trusted by thousands across Nigeria</span>
          <div className="footer__press">
            <span>Techpoint</span><span>Pulse</span><span>nairaland</span><span>techcabal</span>
          </div>
          <div className="footer__secure">
            <span><Lock size={13} /> Secure &amp; Encrypted</span>
            <span><ShieldCheck size={13} /> PCI DSS Compliant</span>
            <span><CreditCard size={13} /> 100% Secure Payments</span>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© 2025 GadgetHub Nigeria. All rights reserved.</span>
          <span className="flex items-center gap-6">
            Made with <Heart size={12} fill="#ef4444" color="#ef4444" /> for smarter gadget decisions.
          </span>
        </div>
      </div>
    </footer>
  );
}

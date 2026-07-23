import { useId } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { Product, TickerItem } from '../types';
import {
  Star, MessageCircle, GitCompareArrows, Store, Users, AlertTriangle, BookOpen,
} from 'lucide-react';

/* ── Logo ─────────────────────────────────────────────────── */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="logo" aria-label="GadgetHub Nigeria — Home">
      <span className="logo__mark" aria-hidden>
        <svg viewBox="0 0 40 40" width="34" height="34">
          <path
            d="M31 8.5A15 15 0 1 0 31 31.5"
            fill="none" stroke="#2f6bff" strokeWidth="7" strokeLinecap="round"
          />
          <path d="M17.5 13v14M26.5 13v14M17.5 20h9" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
        </svg>
      </span>
      {!compact && (
        <span className="logo__text">
          <span className="logo__name">Gadget<b>Hub</b></span>
          <span className="logo__country">Nigeria</span>
        </span>
      )}
    </Link>
  );
}

/* ── Stars ────────────────────────────────────────────────── */
export function Stars({
  rating, count, showValue = true, size = 13,
}: { rating: number; count?: number; showValue?: boolean; size?: number }) {
  const full = Math.round(rating);
  return (
    <span className="stars">
      <span className="stars__icons" aria-label={`${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={size}
            fill={i <= full ? 'currentColor' : 'none'}
            strokeWidth={1.5}
            style={i > full ? { opacity: 0.3 } : undefined}
          />
        ))}
      </span>
      {showValue && <span className="stars__value">{rating.toFixed(1)}</span>}
      {count !== undefined && <span className="stars__count">({count} reviews)</span>}
    </span>
  );
}

/* ── Confidence ring ──────────────────────────────────────── */
export function ConfidenceRing({
  value, size = 120, stroke = 9, label = 'High Confidence', color = 'var(--green)',
}: { value: number; size?: number; stroke?: number; label?: string; color?: string }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <span className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--ring-track, #101c38)" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)}
        />
      </svg>
      <span className="ring__val" style={{ fontSize: size / 4.4 }}>
        {value}%
        {label && <small>{label}</small>}
      </span>
    </span>
  );
}

/* Small circular confidence badge used on product art */
export function ConfBadge({ value }: { value: number }) {
  return <span className="conf-pill">{value}%</span>;
}

/* ── Avatar ───────────────────────────────────────────────── */
const AVATAR_GRADS = [
  'linear-gradient(135deg,#2f6bff,#7c3aed)',
  'linear-gradient(135deg,#0ea5e9,#22c55e)',
  'linear-gradient(135deg,#f59e0b,#ef4444)',
  'linear-gradient(135deg,#a855f7,#ec4899)',
  'linear-gradient(135deg,#14b8a6,#2563eb)',
  'linear-gradient(135deg,#f43f5e,#a855f7)',
];
export function Avatar({ name, size }: { name: string; size?: 'sm' | 'lg' | 'xl' }) {
  const initials = name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
  const hash = [...name].reduce((a, ch) => a + ch.charCodeAt(0), 0);
  return (
    <span
      className={`avatar${size ? ` avatar--${size}` : ''}`}
      style={{ background: AVATAR_GRADS[hash % AVATAR_GRADS.length] }}
    >
      {initials}
    </span>
  );
}

/* ── Device art (SVG product illustrations) ───────────────── */
function DeviceSvg({ kind, gradId }: { kind: Product['deviceKind']; gradId: string }) {
  const screen = `url(#${gradId})`;
  switch (kind) {
    case 'laptop':
      return (
        <svg viewBox="0 0 200 120">
          <rect x="35" y="10" width="130" height="84" rx="6" fill="#0b0f1a" stroke="#39496b" strokeWidth="2" />
          <rect x="41" y="16" width="118" height="72" rx="3" fill={screen} />
          <path d="M20 96h160l8 12a4 4 0 0 1-4 5H16a4 4 0 0 1-4-5z" fill="#141b2c" stroke="#39496b" strokeWidth="1.5" />
          <rect x="86" y="97" width="28" height="4" rx="2" fill="#2a3a55" />
        </svg>
      );
    case 'phone':
      return (
        <svg viewBox="0 0 200 120">
          <rect x="72" y="6" width="56" height="108" rx="12" fill="#0b0f1a" stroke="#39496b" strokeWidth="2" />
          <rect x="77" y="11" width="46" height="98" rx="8" fill={screen} />
          <circle cx="100" cy="17" r="2.4" fill="#0b0f1a" />
        </svg>
      );
    case 'watch':
      return (
        <svg viewBox="0 0 200 120">
          <rect x="82" y="2" width="36" height="26" rx="8" fill="#1b2436" />
          <rect x="82" y="92" width="36" height="26" rx="8" fill="#1b2436" />
          <rect x="70" y="24" width="60" height="72" rx="16" fill="#0b0f1a" stroke="#39496b" strokeWidth="2.5" />
          <rect x="76" y="30" width="48" height="60" rx="11" fill={screen} />
          <rect x="131" y="44" width="5" height="14" rx="2.5" fill="#39496b" />
        </svg>
      );
    case 'headphones':
      return (
        <svg viewBox="0 0 200 120">
          <path d="M55 78V60a45 45 0 0 1 90 0v18" fill="none" stroke="#39496b" strokeWidth="7" strokeLinecap="round" />
          <rect x="42" y="66" width="28" height="42" rx="10" fill={screen} stroke="#39496b" strokeWidth="2" />
          <rect x="130" y="66" width="28" height="42" rx="10" fill={screen} stroke="#39496b" strokeWidth="2" />
        </svg>
      );
    case 'earbuds':
      return (
        <svg viewBox="0 0 200 120">
          <rect x="58" y="38" width="84" height="60" rx="16" fill="#101828" stroke="#39496b" strokeWidth="2" />
          <path d="M84 30a10 10 0 0 1 20 0v22a10 10 0 0 1-20 0z" fill={screen} />
          <path d="M112 36a10 10 0 0 1 20 0v22a10 10 0 0 1-20 0z" fill={screen} />
          <rect x="88" y="64" width="24" height="4" rx="2" fill="#39496b" />
        </svg>
      );
    case 'camera':
      return (
        <svg viewBox="0 0 200 120">
          <rect x="40" y="30" width="120" height="70" rx="10" fill="#101828" stroke="#39496b" strokeWidth="2" />
          <circle cx="100" cy="65" r="26" fill={screen} stroke="#39496b" strokeWidth="3" />
          <circle cx="100" cy="65" r="13" fill="#0b0f1a" />
          <rect x="72" y="20" width="30" height="14" rx="4" fill="#1b2436" />
          <circle cx="146" cy="44" r="4" fill="#f59e0b" />
        </svg>
      );
  }
}

const TONE_STOPS: Record<Product['imageTone'], [string, string, string]> = {
  blue: ['#7dd3fc', '#2f6bff', '#0b1e63'],
  purple: ['#e879f9', '#7c3aed', '#1e1060'],
  dark: ['#64748b', '#1e293b', '#020617'],
  gold: ['#fde68a', '#d97706', '#4a1d06'],
  silver: ['#f8fafc', '#94a3b8', '#1e293b'],
  green: ['#86efac', '#16a34a', '#052e16'],
  red: ['#fda4af', '#dc2626', '#450a0a'],
};

export function DeviceArt({
  kind, tone, ratio, children,
}: {
  kind: Product['deviceKind'];
  tone: Product['imageTone'];
  ratio?: 'tall' | 'wide';
  children?: ReactNode;
}) {
  const gradId = useId().replace(/:/g, '');
  const [c1, c2, c3] = TONE_STOPS[tone];
  return (
    <div className={`device-art art-${tone}${ratio ? ` device-art--${ratio}` : ''}`}>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={c1} />
            <stop offset="55%" stopColor={c2} />
            <stop offset="100%" stopColor={c3} />
          </linearGradient>
        </defs>
      </svg>
      <DeviceSvg kind={kind} gradId={gradId} />
      {children}
    </div>
  );
}

/* ── Robot mascot ─────────────────────────────────────────── */
export function Robot({ size = 96 }: { size?: number }) {
  return (
    <svg className="robot" width={size} height={size} viewBox="0 0 120 120" aria-hidden>
      <defs>
        <linearGradient id="robot-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
      </defs>
      <line x1="60" y1="10" x2="60" y2="20" stroke="#94a3b8" strokeWidth="3" />
      <circle cx="60" cy="8" r="4" fill="#2f6bff">
        <animate attributeName="opacity" values="1;.4;1" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <rect x="24" y="20" width="72" height="52" rx="24" fill="url(#robot-body)" />
      <rect x="34" y="32" width="52" height="28" rx="14" fill="#0b1226" />
      <circle cx="50" cy="46" r="5.5" fill="#4dc3ff">
        <animate attributeName="opacity" values="1;.5;1" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="70" cy="46" r="5.5" fill="#4dc3ff">
        <animate attributeName="opacity" values="1;.5;1" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <rect x="14" y="36" width="8" height="18" rx="4" fill="#cbd5e1" />
      <rect x="98" y="36" width="8" height="18" rx="4" fill="#cbd5e1" />
      <rect x="34" y="76" width="52" height="34" rx="16" fill="url(#robot-body)" />
      <circle cx="60" cy="92" r="8" fill="#0b1226" />
      <circle cx="60" cy="92" r="3.6" fill="#2f6bff" />
    </svg>
  );
}

/* ── Ticker icon map ──────────────────────────────────────── */
export function TickerIcon({ icon }: { icon: TickerItem['icon'] }) {
  const map = {
    review: <Star size={13} />,
    question: <MessageCircle size={13} />,
    compare: <GitCompareArrows size={13} />,
    seller: <Store size={13} />,
    users: <Users size={13} />,
    alert: <AlertTriangle size={13} />,
    guide: <BookOpen size={13} />,
  } as const;
  return map[icon];
}

/* ── Icon tile helper ─────────────────────────────────────── */
export function IconTile({
  tone, size = 38, children, style,
}: { tone: string; size?: number; children: ReactNode; style?: CSSProperties }) {
  return (
    <span className={`icon-tile tone-${tone}`} style={{ width: size, height: size, ...style }}>
      {children}
    </span>
  );
}

/* ── Attribute dots (1-10 → 5 dots) ───────────────────────── */
export function Dots({ score }: { score: number }) {
  const on = Math.round(score / 2);
  return (
    <span className="dots">
      {[1, 2, 3, 4, 5].map((i) => <i key={i} className={i <= on ? 'on' : ''} />)}
    </span>
  );
}

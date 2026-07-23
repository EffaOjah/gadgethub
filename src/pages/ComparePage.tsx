import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Sparkles, GitCompareArrows, CheckCircle2, ArrowRight } from 'lucide-react';
import PageCta from '../components/layout/PageCta';
import { ConfBadge, DeviceArt, Stars } from '../components/ui';
import { products, productBySlug } from '../data/products';
import { formatNaira, formatRange } from '../lib/api';

const ATTRS: { label: string; get: (aScore: number, bScore: number) => [string, string] }[] = [];

const SCORES: Record<string, { performance: number; battery: number; display: number; portability: number; price: number }> = {
  'macbook-air-m3': { performance: 9.2, battery: 9.5, display: 8.8, portability: 9.4, price: 8.2 },
  'dell-xps-13': { performance: 8.3, battery: 8.1, display: 9.4, portability: 8.9, price: 8.7 },
  'macbook-pro-m3': { performance: 9.8, battery: 9.3, display: 9.6, portability: 8.2, price: 6.8 },
  'asus-tuf-f15': { performance: 9.0, battery: 6.4, display: 8.6, portability: 6.8, price: 8.8 },
  'hp-pavilion-15': { performance: 7.4, battery: 7.0, display: 7.6, portability: 7.8, price: 9.2 },
  'lenovo-thinkpad-x1': { performance: 8.6, battery: 8.4, display: 8.4, portability: 9.3, price: 7.4 },
  'iphone-16-pro-max': { performance: 9.7, battery: 8.8, display: 9.5, portability: 8.4, price: 6.9 },
  'samsung-galaxy-s24-ultra': { performance: 9.4, battery: 8.2, display: 9.6, portability: 8.0, price: 7.6 },
};

const defaultScores = { performance: 8.0, battery: 7.8, display: 8.0, portability: 8.0, price: 8.0 };

const POPULAR_PAIRS: [string, string][] = [
  ['macbook-air-m3', 'dell-xps-13'],
  ['macbook-air-m3', 'macbook-pro-m3'],
  ['iphone-16-pro-max', 'samsung-galaxy-s24-ultra'],
  ['asus-tuf-f15', 'hp-pavilion-15'],
  ['lenovo-thinkpad-x1', 'hp-spectre-x360'],
];

export default function ComparePage() {
  void ATTRS;
  const [params] = useSearchParams();
  const [slugA, setSlugA] = useState(params.get('a') ?? 'macbook-air-m3');
  const [slugB, setSlugB] = useState(params.get('b') ?? 'dell-xps-13');

  const a = productBySlug(slugA) ?? products[2];
  const b = productBySlug(slugB) ?? products[6];
  const sa = SCORES[a.slug] ?? defaultScores;
  const sb = SCORES[b.slug] ?? defaultScores;

  const rows: [string, string | number, string | number, 0 | 1 | -1][] = [
    ['Confidence Score', `${a.confidence}%`, `${b.confidence}%`, a.confidence >= b.confidence ? 0 : 1],
    ['Owner Rating', `★ ${a.rating} (${a.reviewCount})`, `★ ${b.rating} (${b.reviewCount})`, a.rating >= b.rating ? 0 : 1],
    ['Price Range', formatRange(a.priceMin, a.priceMax), formatRange(b.priceMin, b.priceMax), a.priceMin <= b.priceMin ? 0 : 1],
    ['Best Value Estimate', a.bestValue ? formatNaira(a.bestValue) : '—', b.bestValue ? formatNaira(b.bestValue) : '—', -1],
    ['Performance', sa.performance, sb.performance, sa.performance >= sb.performance ? 0 : 1],
    ['Battery Life', sa.battery, sb.battery, sa.battery >= sb.battery ? 0 : 1],
    ['Display', sa.display, sb.display, sa.display >= sb.display ? 0 : 1],
    ['Portability', sa.portability, sb.portability, sa.portability >= sb.portability ? 0 : 1],
    ['Price Value', sa.price, sb.price, sa.price >= sb.price ? 0 : 1],
    ['Best For', a.bestFor, b.bestFor, -1],
    ['Top Concern', a.topConcern, b.topConcern, -1],
    ['Verified Sellers', a.sellerCount, b.sellerCount, a.sellerCount >= b.sellerCount ? 0 : 1],
    ['Warranty Range', a.warranty, b.warranty, -1],
    ['Price Signal', a.priceSignal, b.priceSignal, -1],
  ];

  const winner = a.confidence >= b.confidence ? a : b;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Gadget Comparison Intelligence</span>
          <h1>Compare Gadgets <span className="accent-green">Side by Side.</span></h1>
          <p className="lede">
            See the real differences between gadgets — confidence scores, owner reviews,
            price value, battery life and seller availability, all in one view.
          </p>

          <div className="search-panel mt-20" style={{ maxWidth: 760 }}>
            <h3>Choose two gadgets to compare</h3>
            <div className="row items-center">
              <div className="select-wrap" style={{ flex: 1 }}>
                <select className="select" value={a.slug} onChange={(e) => setSlugA(e.target.value)}>
                  {products.map((p) => <option key={p.id} value={p.slug}>{p.name}</option>)}
                </select>
              </div>
              <span className="vs-badge">VS</span>
              <div className="select-wrap" style={{ flex: 1 }}>
                <select className="select" value={b.slug} onChange={(e) => setSlugB(e.target.value)}>
                  {products.map((p) => <option key={p.id} value={p.slug}>{p.name}</option>)}
                </select>
              </div>
              <button className="btn btn--primary"><GitCompareArrows size={15} /> Start Comparison</button>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split-main">
          <div className="card" style={{ overflowX: 'auto' }}>
            <div className="vs-row mb-20" style={{ maxWidth: 640, margin: '0 auto 20px' }}>
              {[a, b].map((p, i) => (
                <div key={p.id} style={{ display: 'contents' }}>
                  {i === 1 && <span className="vs-badge">VS</span>}
                  <div className="vs-item">
                    <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden' }}>
                      <DeviceArt kind={p.deviceKind} tone={p.imageTone} />
                      <span style={{ position: 'absolute', top: 6, right: 6 }}><ConfBadge value={p.confidence} /></span>
                    </div>
                    <b style={{ fontSize: '0.95rem' }}>{p.name}</b>
                    <div className="mt-4"><Stars rating={p.rating} size={11} /></div>
                  </div>
                </div>
              ))}
            </div>

            <table className="compare-table">
              <thead>
                <tr>
                  <th>Attribute</th>
                  <th>{a.name}</th>
                  <th>{b.name}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([label, va, vb, win]) => (
                  <tr key={label}>
                    <td>{label}</td>
                    <td className={win === 0 ? 'win' : ''}>{va}{win === 0 && ' ✓'}</td>
                    <td className={win === 1 ? 'win' : ''}>{vb}{win === 1 && ' ✓'}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="callout callout--green mt-20 flex gap-10 items-center">
              <CheckCircle2 size={17} className="green" style={{ flexShrink: 0 }} />
              <span>
                <b className="green">AI Verdict:</b> {winner.name} wins overall with {winner.confidence}% confidence —
                best for {winner.audience?.toLowerCase()}. {winner === a ? b.name : a.name} remains a strong choice if{' '}
                {(winner === a ? b : a).strength?.toLowerCase()} matters more to you.
              </span>
            </div>
            <div className="flex gap-8 mt-16 wrap">
              <Link to={`/product/${a.slug}`} className="btn btn--outline">View {a.name}</Link>
              <Link to={`/product/${b.slug}`} className="btn btn--outline">View {b.name}</Link>
              <Link to={`/ai-advisor?q=${encodeURIComponent(`${a.name} vs ${b.name} — which should I buy?`)}`} className="btn btn--primary">
                <Sparkles size={14} /> Ask AI Which to Buy
              </Link>
            </div>
          </div>

          <aside className="side-stack">
            <div className="card">
              <h3 className="small bold mb-12">Popular Comparisons</h3>
              <div className="flex-col gap-8">
                {POPULAR_PAIRS.map(([pa, pb]) => {
                  const ppa = productBySlug(pa); const ppb = productBySlug(pb);
                  if (!ppa || !ppb) return null;
                  return (
                    <button
                      key={`${pa}${pb}`} className="data-row" style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', borderBottom: '1px solid var(--border)' }}
                      onClick={() => { setSlugA(pa); setSlugB(pb); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    >
                      <span className="tag">{ppa.name}</span>
                      <span className="vs-badge" style={{ width: 22, height: 22, fontSize: '0.52rem' }}>VS</span>
                      <span className="tag">{ppb.name}</span>
                      <ArrowRight size={13} className="muted-2" style={{ marginLeft: 'auto' }} />
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="ai-panel">
              <h3 style={{ fontSize: '0.9rem' }}>How comparisons work</h3>
              <ul className="check-list mt-12" style={{ gap: 8 }}>
                <li><CheckCircle2 size={13} /> Confidence scores from verified reviews</li>
                <li><CheckCircle2 size={13} /> Real owner sentiment analysis</li>
                <li><CheckCircle2 size={13} /> Live Nigerian price ranges</li>
                <li><CheckCircle2 size={13} /> Seller availability &amp; warranty checks</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <PageCta
        title="Still Deciding Between Gadgets?"
        subtitle="Ask GadgetHub AI to weigh your exact needs, budget and priorities before you buy."
        footItems={['Side-by-side comparisons', 'Real owner reviews', 'Verified seller checks', 'Built for Nigerian buyers']}
      />
    </>
  );
}

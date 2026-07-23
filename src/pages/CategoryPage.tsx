import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Search, Sparkles, Bot, BadgeCheck, Star, TrendingUp, AlertTriangle,
  ArrowRight, LayoutGrid, List, GitCompareArrows, CheckCircle2,
} from 'lucide-react';
import LiveTicker from '../components/layout/LiveTicker';
import PageCta from '../components/layout/PageCta';
import ProductCard from '../components/ProductCard';
import { Avatar, ConfBadge, DeviceArt, Robot, Stars, IconTile } from '../components/ui';
import { laptops, products } from '../data/products';
import { sellers } from '../data/sellers';
import { guides } from '../data/guides';
import { formatRange } from '../lib/api';

const FILTERS = [
  { label: 'Budget', options: ['Any Budget', 'Under ₦500k', '₦500k – ₦1M', '₦1M – ₦2M', 'Over ₦2M'] },
  { label: 'Brand', options: ['All Brands', 'Apple', 'Dell', 'HP', 'Lenovo', 'ASUS', 'Acer'] },
  { label: 'Purpose', options: ['Any Purpose', 'Students', 'Business', 'Gaming', 'Creators', 'Everyday use'] },
  { label: 'Condition', options: ['Any Condition', 'Brand New', 'Open Box', 'UK Used'] },
  { label: 'Confidence Score', options: ['All Scores', '90%+', '85%+', '80%+'] },
  { label: 'Owner Rating', options: ['All Ratings', '4.5+', '4.0+', '3.5+'] },
  { label: 'Seller Availability', options: ['Any Availability', 'In stock', '5+ sellers'] },
  { label: 'RAM', options: ['Any RAM', '8GB', '16GB', '32GB'] },
  { label: 'Storage', options: ['Any Storage', '256GB SSD', '512GB SSD', '1TB SSD'] },
  { label: 'Price Signal', options: ['Any Signal', 'Stable', 'Good value', 'High demand'] },
];

const CHIP_QUERIES = [
  'Best laptop for students under ₦800k', 'Best laptop for video editing', 'MacBook Air M3 vs Dell XPS 13',
  'Gaming laptop under ₦1.5M', 'Best business laptop in Nigeria', 'Best UK used laptop to buy',
  'Laptop with strong battery life',
];

const COMPLAINTS = [
  { title: 'Weak battery life', sub: 'Check battery health and real reviews.' },
  { title: 'Overheating', sub: 'Check cooling, fans, and complaints.' },
  { title: 'Limited ports', sub: 'Check if you need USB-A, HDMI, SD, hub.' },
  { title: 'Low storage', sub: 'Choose 512GB SSD if you can afford it.' },
  { title: 'Expensive repairs', sub: 'Check repair availability & warranty.' },
  { title: 'Fake specs or wrong model', sub: 'Confirm exact model number before payment.' },
];

const PICK_TONES: Record<string, string> = {
  'Best Overall': 'green', 'Best Value': 'blue', 'Best Budget': 'amber',
  'Best Gaming': 'red', 'Best Premium': 'purple', 'Best for Portability': 'cyan',
};

export default function CategoryPage() {
  const { slug = 'laptops' } = useParams();
  const navigate = useNavigate();
  const [compareCount] = useState(0);
  const label = slug.charAt(0).toUpperCase() + slug.slice(1);

  const catalog = slug === 'laptops' ? laptops : products.filter((p) => p.category === slug);
  const items = catalog.length ? catalog : laptops;
  const picks = items.filter((p) => p.pickLabel).concat(items.filter((p) => !p.pickLabel)).slice(0, 6);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="container page-hero__grid">
          <div>
            <span className="eyebrow">Gadget Category Intelligence</span>
            <h1>Best {label} in Nigeria.</h1>
            <p className="lede">
              Browse top-rated {slug}, compare confidence scores, check price ranges,
              read owner feedback, and find trusted sellers before you buy.
            </p>

            <div className="search-panel mt-20">
              <h3>Find the right laptop for your needs</h3>
              <div className="search-input-wrap mb-12">
                <Search size={16} />
                <input className="input" placeholder="Search MacBook, Dell, HP, Lenovo, ASUS, student laptop, gaming laptop…" />
              </div>
              <div className="row mb-12">
                {['Budget', 'Purpose', 'Condition'].map((f) => (
                  <div className="field" style={{ flex: 1, minWidth: 150 }} key={f}>
                    <label>{f}</label>
                    <div className="select-wrap">
                      <select className="select"><option>Any {f}</option></select>
                    </div>
                  </div>
                ))}
              </div>
              <div className="row">
                <button className="btn btn--primary" style={{ flex: 1 }}><Search size={15} /> Find {label}</button>
                <Link to="/ai-advisor" className="btn btn--outline" style={{ flex: 1 }}><Sparkles size={15} /> Ask GadgetHub AI</Link>
              </div>
              <div className="flex wrap gap-8 mt-12">
                {CHIP_QUERIES.map((c) => (
                  <button key={c} className="chip" onClick={() => navigate(`/search?q=${encodeURIComponent(c)}`)}>{c}</button>
                ))}
              </div>
            </div>

            <div className="feature-strip mt-20">
              <div className="feature-strip__item">
                <IconTile tone="blue" size={38}><Bot size={17} /></IconTile>
                <div><b>AI-Powered Picks</b><span>Smart recommendations</span></div>
              </div>
              <div className="feature-strip__item">
                <IconTile tone="green" size={38}><Star size={17} /></IconTile>
                <div><b>Owner Reviews Included</b><span>Real buyer experiences</span></div>
              </div>
              <div className="feature-strip__item">
                <IconTile tone="purple" size={38}><BadgeCheck size={17} /></IconTile>
                <div><b>Verified Seller Availability</b><span>Trusted sellers only</span></div>
              </div>
              <div className="feature-strip__item">
                <IconTile tone="amber" size={38}><TrendingUp size={17} /></IconTile>
                <div><b>Price Watch Signals</b><span>Track market changes</span></div>
              </div>
            </div>
          </div>

          {/* AI Category Assistant */}
          <div className="ai-panel">
            <div className="flex items-center justify-between">
              <h3>AI Category Assistant</h3>
              <Robot size={68} />
            </div>
            <button className="ai-chip mt-8" style={{ width: 'auto' }}>Best laptop for students under ₦800k</button>
            <p className="small text-soft mt-12" style={{ lineHeight: 1.65 }}>
              For students, focus on battery life, SSD storage, at least 8GB RAM,
              lightweight design, warranty, and trusted seller availability. If your
              budget allows, 16GB RAM gives better long-term value.
            </p>
            <b className="small mt-16" style={{ display: 'block' }}>Top Picks for You</b>
            <div className="data-rows">
              {[
                { label: 'Best Overall', p: items[0] },
                { label: 'Best Value', p: products.find((x) => x.slug === 'dell-xps-13')! },
                { label: 'Best Budget', p: products.find((x) => x.slug === 'hp-pavilion-15')! },
                { label: 'Best Gaming', p: products.find((x) => x.slug === 'asus-tuf-f15')! },
              ].map((row) => (
                <Link to={`/product/${row.p.slug}`} className="data-row" key={row.label}>
                  <span style={{ width: 40, borderRadius: 6, overflow: 'hidden', flexShrink: 0 }}>
                    <DeviceArt kind={row.p.deviceKind} tone={row.p.imageTone} />
                  </span>
                  <div>
                    <span className="muted-2 tiny">{row.label}</span>
                    <b className="small" style={{ display: 'block' }}>{row.p.name}</b>
                  </div>
                </Link>
              ))}
            </div>
            <div className="grid grid-2 mt-12" style={{ gap: 10 }}>
              <div>
                <span className="muted tiny">Category confidence</span>
                <div className="flex items-center gap-8"><b className="green" style={{ fontSize: '1.2rem' }}>91%</b><span className="badge badge--green">High</span></div>
              </div>
              <div>
                <span className="muted tiny">Verified laptop sellers</span>
                <div className="flex items-center gap-8"><b style={{ fontSize: '1.2rem' }}>24</b><span className="badge badge--blue">Active</span></div>
              </div>
              <div>
                <span className="muted tiny">Owner reviews analyzed</span>
                <div className="flex items-center gap-8"><b style={{ fontSize: '1.2rem' }}>1,842</b><span className="badge badge--purple">This month</span></div>
              </div>
              <div>
                <span className="muted tiny">Price watch active</span>
                <div className="flex items-center gap-8"><b style={{ fontSize: '1.2rem' }}>18</b><span className="badge badge--amber">Products</span></div>
              </div>
            </div>
            <Link to="/ai-advisor?q=Choose%20the%20best%20laptop%20for%20me" className="btn btn--primary btn--block mt-16">
              <Sparkles size={14} /> Ask AI to Choose for Me
            </Link>
          </div>
        </div>
      </section>

      <LiveTicker
        label="Live Laptop Activity"
        feed="laptops"
        countText={{ value: '42', text: 'users browsing laptops now' }}
      />

      {/* ── TOP PICKS ────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-head section-head--title">
            <div>
              <h2>Top {label} Picks</h2>
              <p className="sub">Fast recommendations based on confidence score, owner reviews, price value, and seller availability.</p>
            </div>
            <Link to="#all" className="view-all">View all picks <ArrowRight size={13} /></Link>
          </div>
          <div className="grid grid-6" style={{ gap: 12 }}>
            {picks.map((p) => (
              <div className="card card--hover" key={p.id} style={{ padding: 12 }}>
                <span className={`badge badge--${PICK_TONES[p.pickLabel ?? ''] ?? 'blue'}`}>
                  {p.pickLabel ?? 'Recommended'}
                </span>
                <div className="mt-8" style={{ borderRadius: 10, overflow: 'hidden', position: 'relative' }}>
                  <DeviceArt kind={p.deviceKind} tone={p.imageTone} />
                  <span style={{ position: 'absolute', bottom: 6, right: 6 }}><ConfBadge value={p.confidence} /></span>
                </div>
                <b className="small mt-8" style={{ display: 'block' }}>{p.name}</b>
                <Stars rating={p.rating} count={p.reviewCount} size={10} />
                <p className="small bold mt-4">{formatRange(p.priceMin, p.priceMax)}</p>
                <p className="tiny muted-2">{p.audience}</p>
                <p className="tiny muted-2">{p.sellerCount} sellers</p>
                <div className="flex gap-4 mt-8" style={{ flexWrap: 'wrap' }}>
                  <Link to={`/ai-advisor?q=${encodeURIComponent(p.name)}`} className="btn btn--sm btn--outline-blue" style={{ flex: 1, padding: '5px 6px', fontSize: '0.66rem' }}>Ask AI</Link>
                  <Link to={`/compare?a=${p.slug}`} className="btn btn--sm btn--outline" style={{ flex: 1, padding: '5px 6px', fontSize: '0.66rem' }}>Compare</Link>
                  <Link to={`/product/${p.slug}`} className="btn btn--sm btn--outline" style={{ flex: 1.2, padding: '5px 6px', fontSize: '0.66rem' }}>View Details</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILTERS + GRID ───────────────────────────────────── */}
      <section className="section" id="all" style={{ background: 'var(--bg-raise)' }}>
        <div className="container filters-layout">
          <aside className="filters-panel">
            <h3>Filter {label} <button>Reset all</button></h3>
            {FILTERS.map((f) => (
              <div className="field" key={f.label}>
                <label>{f.label}</label>
                <div className="select-wrap">
                  <select className="select" style={{ padding: '9px 12px', fontSize: '0.8rem' }}>
                    {f.options.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
            ))}
            <button className="btn btn--primary btn--block">Apply Filters</button>
            <button className="btn btn--outline btn--block btn--sm">Reset Filters</button>
          </aside>

          <div>
            <div className="result-toolbar">
              <span>Showing <b className="text-soft">24 {slug}</b> for Nigerian buyers</span>
              <div className="flex items-center gap-10">
                <span>Sort by</span>
                <div className="select-wrap">
                  <select className="select" style={{ padding: '8px 34px 8px 12px', fontSize: '0.78rem' }}>
                    <option>Recommended</option>
                    <option>Highest Confidence</option>
                    <option>Lowest Price</option>
                    <option>Highest Rated</option>
                  </select>
                </div>
                <button className="nav__icon-btn" aria-label="Grid view"><LayoutGrid size={15} /></button>
                <button className="nav__icon-btn" aria-label="List view"><List size={15} /></button>
                <button className="btn btn--outline btn--sm"><GitCompareArrows size={13} /> Compare ({compareCount})</button>
              </div>
            </div>

            <div className="grid grid-4" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              {items.slice(0, 8).map((p) => (
                <ProductCard key={p.id} product={p} variant="grid" />
              ))}
            </div>

            <div className="card mt-20 flex items-center justify-between wrap gap-12" style={{ padding: 16 }}>
              <span className="small muted">Compare selected {slug} and find the best option for you.</span>
              <Link to="/compare" className="btn btn--primary"><GitCompareArrows size={15} /> Compare Selected ({compareCount})</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4-COL INFO BAND ──────────────────────────────────── */}
      <section className="section">
        <div className="container grid grid-4">
          <div className="ai-panel" style={{ padding: 16 }}>
            <div className="flex items-center gap-10">
              <Robot size={44} />
              <h3 style={{ fontSize: '0.9rem' }}>Not Sure Which Laptop to Choose?</h3>
            </div>
            <p className="tiny muted mt-8">Tell GadgetHub AI your budget, purpose, preferred brand, and what matters most…</p>
            <div className="flex-col gap-6 mt-12">
              {["I'm a student with ₦800k budget", 'I need a laptop for video editing', 'I want strong battery life', 'Business laptop for travel', 'Safe UK used laptop'].map((c) => (
                <button key={c} className="ai-chip" style={{ fontSize: '0.7rem', padding: '7px 10px' }} onClick={() => navigate(`/ai-advisor?q=${encodeURIComponent(c)}`)}>{c}</button>
              ))}
            </div>
            <Link to="/ai-advisor" className="btn btn--primary btn--block btn--sm mt-12">Get AI Recommendation</Link>
            <p className="tiny muted-2 mt-8">AI considers price, reviews, confidence, sellers, warranty &amp; purpose.</p>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <h3 className="small bold mb-8">Laptop Price Watch in Nigeria</h3>
            <p className="tiny muted mb-8">Track price signals before buying.</p>
            <div className="data-rows">
              {items.slice(0, 5).map((p) => (
                <div className="data-row" key={p.id} style={{ fontSize: '0.72rem' }}>
                  <b style={{ flex: 1 }}>{p.name}</b>
                  <span className="muted">{formatRange(p.priceMin, p.priceMax)}</span>
                  <span className={`badge badge--${p.priceSignal === 'Stable' ? 'green' : p.priceSignal === 'High demand' ? 'red' : p.priceSignal === 'Good value' ? 'green' : 'amber'}`}>{p.priceSignal}</span>
                </div>
              ))}
            </div>
            <Link to="/knowledge-hub/guides/how-to-choose-the-right-laptop-in-nigeria" className="view-all tiny mt-8" style={{ display: 'inline-flex' }}>Read Buying Guide <ArrowRight size={12} /></Link>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <h3 className="small bold mb-8">Common Laptop Complaints From Buyers</h3>
            <div className="flex-col gap-8">
              {COMPLAINTS.map((c) => (
                <div className="flex gap-8" key={c.title}>
                  <AlertTriangle size={14} className="amber" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <b className="tiny" style={{ display: 'block' }}>{c.title}</b>
                    <span className="tiny muted-2">{c.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <div className="flex items-center justify-between mb-8">
              <h3 className="small bold">Trusted Laptop Sellers</h3>
              <Link to="/sellers" className="view-all tiny">View all sellers</Link>
            </div>
            <div className="flex-col gap-8">
              {sellers.slice(0, 5).map((s) => (
                <Link to="/sellers" className="seller-row" key={s.id} style={{ padding: 8 }}>
                  <span className="seller-row__logo" style={{ width: 34, height: 34, fontSize: '0.68rem' }}>{s.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
                  <div style={{ flex: 1 }}>
                    <b style={{ fontSize: '0.74rem' }}>{s.name}</b>
                    <span className="sub">★ {s.rating} · {s.warranty}</span>
                  </div>
                  <span className="badge badge--green">{s.trustScore}%</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SAYING / LEARN / COMPARISONS ─────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container grid grid-3">
          <div className="card">
            <h3 className="small bold mb-8">What Laptop Buyers Are Saying</h3>
            <span className="badge badge--green mb-8">✦ AI Summary</span>
            <p className="tiny muted" style={{ lineHeight: 1.6 }}>
              Buyers praise battery life, SSD speed, portability, and keyboard comfort.
              Common complaints are weak battery on some laptops, overheating in gaming
              laptops, limited ports, and unclear warranty terms.
            </p>
            <div className="flex-col gap-10 mt-12">
              {[
                { who: 'Amaka from Lagos', product: 'MacBook Air M3', rating: 5.0, body: 'The battery lasts all day and it is perfect for my business work and travel.', helpful: 76 },
                { who: 'Sarah from Ibadan', product: 'HP Pavilion 15', rating: 4.4, body: 'Good for school work and online classes. Battery is fair, but SSD makes it fast enough.', helpful: 41 },
                { who: 'Blessing from Enugu', product: 'ASUS TUF F15', rating: 4.3, body: 'Gaming performance is great, but battery life is not strong. Keep the charger nearby.', helpful: 36 },
              ].map((r) => (
                <div className="flex gap-10" key={r.who}>
                  <Avatar name={r.who} size="sm" />
                  <div>
                    <b className="tiny">{r.who}</b> <span className="tiny muted-2">· {r.product}</span>
                    <Stars rating={r.rating} size={10} />
                    <p className="tiny muted mt-4" style={{ lineHeight: 1.5 }}>{r.body}</p>
                    <span className="tiny muted-2">👍 Helpful {r.helpful}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/reviews" className="view-all tiny mt-12" style={{ display: 'inline-flex' }}>Read Laptop Reviews <ArrowRight size={12} /></Link>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-12">
              <h3 className="small bold">Learn Before Buying a Laptop</h3>
              <Link to="/knowledge-hub" className="view-all tiny">View all guides</Link>
            </div>
            <div className="grid grid-2" style={{ gap: 10 }}>
              {guides.slice(0, 4).map((g) => (
                <Link to={`/knowledge-hub/guides/${g.slug}`} className="card card--hover guide-card" key={g.id}>
                  <DeviceArt kind={g.deviceKind} tone={g.imageTone} />
                  <div className="guide-card__body" style={{ padding: 10 }}>
                    <b className="tiny" style={{ lineHeight: 1.4 }}>{g.title}</b>
                    <span className="tiny muted-2">{g.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-12">
              <h3 className="small bold">Popular Laptop Comparisons</h3>
              <Link to="/compare" className="view-all tiny">View all comparisons</Link>
            </div>
            <div className="flex-col gap-8">
              {[
                ['MacBook Air M3', 'Dell XPS 13'],
                ['MacBook Air M3', 'MacBook Pro M3'],
                ['ASUS TUF F15', 'Lenovo Legion'],
                ['HP Pavilion 15', 'Acer Aspire 5'],
                ['Dell XPS 13', 'HP Spectre x360'],
              ].map(([a, b]) => (
                <Link to="/compare" className="data-row" key={`${a}${b}`} style={{ borderRadius: 8 }}>
                  <span className="tag">{a}</span>
                  <span className="vs-badge" style={{ width: 24, height: 24, fontSize: '0.56rem' }}>VS</span>
                  <span className="tag">{b}</span>
                  <ArrowRight size={13} className="muted-2" style={{ marginLeft: 'auto' }} />
                </Link>
              ))}
            </div>
            <div className="callout callout--green mt-12" style={{ padding: '10px 12px', fontSize: '0.7rem' }}>
              <CheckCircle2 size={12} className="green" style={{ display: 'inline' }} /> Comparisons include confidence scores, owner reviews, price value and seller availability.
            </div>
          </div>
        </div>
      </section>

      <PageCta
        title="Still Choosing the Right Laptop?"
        subtitle="Ask GadgetHub AI, compare laptop options, read real reviews, or find trusted sellers before you pay."
        secondaryLabel="Compare Laptops"
        footItems={['AI-powered recommendations', 'Real owner reviews', 'Verified seller checks', 'Built for Nigerian buyers']}
      />
    </>
  );
}

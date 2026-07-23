import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Search, Sparkles, Bot, Star, Store, CheckCircle2, ArrowRight,
  MapPin, BookOpen, GitCompareArrows, Bookmark, Eye,
} from 'lucide-react';
import LiveTicker from '../components/layout/LiveTicker';
import PageCta from '../components/layout/PageCta';
import { Avatar, ConfBadge, DeviceArt, Robot, Stars, IconTile } from '../components/ui';
import { products } from '../data/products';
import { sellers } from '../data/sellers';
import { discussions } from '../data/community';
import { guides } from '../data/guides';
import { newsArticles } from '../data/news';
import { searchTicker } from '../data/stats';
import { formatNaira, formatRange } from '../lib/api';

const RESULT_TABS = ['All Results', 'Products', 'Sellers', 'Reviews', 'Comparisons', 'Community', 'Knowledge Hub', 'News'];

const AI_QUESTIONS = [
  'Is MacBook Air M3 worth it?',
  'Should I buy 8GB or 16GB RAM?',
  'Where can I buy it safely in Lagos?',
  'Is MacBook Air M3 better than Dell XPS 13?',
  'Should I buy brand new or UK used?',
  'What are the common complaints?',
];

const RELATED = [
  'MacBook Air M3 price', 'MacBook Air M3 reviews', 'MacBook Air M3 vs Dell XPS 13',
  'MacBook Air M3 16GB', 'MacBook Air M3 UK used', 'MacBook Air M3 sellers in Lagos',
  'MacBook Air M3 for students', 'MacBook Air M3 battery life',
];

export default function SearchResultsPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const query = params.get('q') || 'MacBook Air M3';
  const [input, setInput] = useState(query);
  const [activeTab, setActiveTab] = useState('All Results');

  const matches = useMemo(() => {
    const q = query.toLowerCase();
    const hit = products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.categoryLabel.toLowerCase().includes(q),
    );
    return hit.length ? hit : products;
  }, [query]);

  const best = matches[0];
  const related = useMemo(
    () => [best, ...products.filter((p) => p.id !== best.id && p.category === best.category)].slice(0, 4),
    [best],
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(input)}`);
  };

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="container page-hero__grid">
          <div>
            <span className="eyebrow">Gadget Search Intelligence</span>
            <h1>Search Results for <span className="accent-blue">{query}</span>.</h1>
            <p className="lede">
              Find matching products, trusted sellers, owner reviews, comparisons,
              buying guides, community answers, and price updates in one smart search.
            </p>

            <form className="search-panel mt-20" onSubmit={submit}>
              <h3>Search GadgetHub</h3>
              <div className="search-input-wrap mb-12">
                <Search size={16} />
                <input className="input" value={input} onChange={(e) => setInput(e.target.value)} />
              </div>
              <div className="tabs mb-12">
                {RESULT_TABS.map((t) => (
                  <button
                    key={t} type="button"
                    className={`tab${activeTab === t ? ' tab--pill-active' : ''}`}
                    onClick={() => setActiveTab(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="row">
                <div className="select-wrap" style={{ minWidth: 160 }}>
                  <select className="select" defaultValue="ng" aria-label="Location">
                    <option value="ng">🇳🇬 Nigeria</option>
                    <option value="lagos">Lagos</option>
                    <option value="abuja">Abuja</option>
                  </select>
                </div>
                <button className="btn btn--primary" type="submit"><Search size={15} /> Search</button>
                <Link to={`/ai-advisor?q=${encodeURIComponent(query)}`} className="btn btn--outline">
                  <Sparkles size={15} /> Ask GadgetHub AI
                </Link>
              </div>
              <p className="small mt-12">
                Showing <b className="blue">48 results</b> for “{query}”
              </p>
              <div className="flex wrap gap-8 mt-12">
                {[`${query} price in Nigeria`, `${query} reviews`, `${query} vs Dell XPS 13`, `${query} trusted sellers`,
                  `Is ${query} good for students?`, `${query} 8GB vs 16GB RAM`, `${query} UK used price`, `${query} buying guide`].map((c) => (
                  <button key={c} type="button" className="chip" onClick={() => { setInput(c); navigate(`/search?q=${encodeURIComponent(c)}`); }}>
                    {c}
                  </button>
                ))}
              </div>
            </form>

            <div className="feature-strip mt-20">
              <div className="feature-strip__item">
                <IconTile tone="green" size={38}><Bot size={17} /></IconTile>
                <div><b>AI Search Summary</b><span>Smart overview</span></div>
              </div>
              <div className="feature-strip__item">
                <IconTile tone="blue" size={38}><Store size={17} /></IconTile>
                <div><b>Products and Sellers</b><span>Verified matches</span></div>
              </div>
              <div className="feature-strip__item">
                <IconTile tone="purple" size={38}><Star size={17} /></IconTile>
                <div><b>Reviews and Community</b><span>Real owner insights</span></div>
              </div>
              <div className="feature-strip__item">
                <IconTile tone="amber" size={38}><BookOpen size={17} /></IconTile>
                <div><b>Guides and News</b><span>Expert and updates</span></div>
              </div>
            </div>
          </div>

          {/* AI Search Summary */}
          <div className="ai-panel">
            <div className="flex items-center gap-8 mb-12">
              <IconTile tone="green" size={30}><Bot size={15} /></IconTile>
              <h3>GadgetHub AI Search Summary</h3>
            </div>
            <p className="small muted">Query: <b className="text-soft">{query}</b></p>
            <p className="small text-soft mt-8" style={{ lineHeight: 1.65 }}>{best.description}</p>
            <div className="flex gap-14 mt-16 wrap items-center">
              <span style={{ width: 130, flexShrink: 0, borderRadius: 10, overflow: 'hidden' }}>
                <DeviceArt kind={best.deviceKind} tone={best.imageTone} />
              </span>
              <div className="data-rows" style={{ flex: 1, minWidth: 200 }}>
                <div className="data-row"><span className="muted">Confidence Score</span><b className="green" style={{ marginLeft: 'auto' }}>{best.confidence}%</b></div>
                <div className="data-row"><span className="muted">Owner Rating</span><b style={{ marginLeft: 'auto' }}>★ {best.rating}/5</b></div>
                <div className="data-row"><span className="muted">Verified Reviews</span><b className="green" style={{ marginLeft: 'auto' }}>{best.reviewCount}</b></div>
                <div className="data-row"><span className="muted">Trusted Sellers</span><b className="green" style={{ marginLeft: 'auto' }}>{best.sellerCount} found</b></div>
                <div className="data-row"><span className="muted">Price Range</span><b style={{ marginLeft: 'auto' }}>{formatRange(best.priceMin, best.priceMax)}</b></div>
              </div>
            </div>
            <ul className="check-list mt-16" style={{ gap: 7 }}>
              <li><CheckCircle2 size={13} /> Best for {best.audience?.toLowerCase()}</li>
              <li><CheckCircle2 size={13} /> {best.strength}</li>
              <li><CheckCircle2 size={13} /> {best.complaint} are the main complaint</li>
              <li><CheckCircle2 size={13} /> Compare with alternatives before buying</li>
              <li><CheckCircle2 size={13} /> Check storage and RAM before payment</li>
            </ul>
            <div className="flex gap-8 mt-16 wrap">
              <Link to={`/ai-advisor?q=${encodeURIComponent(query)}`} className="btn btn--primary" style={{ flex: 1.4 }}>
                <Sparkles size={14} /> Ask AI About This Search
              </Link>
              <Link to={`/product/${best.slug}`} className="btn btn--outline" style={{ flex: 1 }}>View Best Result</Link>
            </div>
          </div>
        </div>
      </section>

      <LiveTicker
        label="Live Search Activity"
        items={searchTicker}
        countText={{ value: '42', text: 'users searching gadgets now' }}
      />

      {/* ── MAIN SPLIT ───────────────────────────────────────── */}
      <section className="section">
        <div className="container split-main">
          <div className="flex-col gap-20">
            {/* Best match */}
            <div className="card card--green">
              <span className="badge badge--solid-green mb-12" style={{ display: 'inline-flex' }}>👑 Best Match</span>
              <div className="flex gap-20 wrap">
                <div style={{ width: 260, flexShrink: 0, borderRadius: 12, overflow: 'hidden' }}>
                  <DeviceArt kind={best.deviceKind} tone={best.imageTone} ratio="tall" />
                </div>
                <div style={{ flex: 1, minWidth: 240 }}>
                  <div className="flex items-center justify-between wrap gap-10">
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{best.name}</h2>
                    <ConfBadge value={best.confidence} />
                  </div>
                  <div className="flex gap-6 mt-8">
                    <span className="tag">{best.categoryLabel}</span>
                    <span className="tag">{best.brand}</span>
                  </div>
                  <div className="flex items-center gap-12 mt-12 wrap">
                    <Stars rating={best.rating} count={best.reviewCount} />
                    <span className="small muted">{best.sellerCount} trusted sellers</span>
                  </div>
                  <div className="flex items-center gap-10 mt-12">
                    <b style={{ fontSize: '1.2rem' }}>{formatRange(best.priceMin, best.priceMax)}</b>
                    <span className="badge badge--green">{best.priceSignal}</span>
                  </div>
                  <p className="small muted mt-8">Best for: {best.audience}</p>
                  <div className="flex gap-8 mt-16 wrap">
                    <Link to={`/product/${best.slug}`} className="btn btn--primary">View Product</Link>
                    <Link to="/sellers" className="btn btn--outline-green">📍 Find Sellers</Link>
                    <Link to={`/compare?a=${best.slug}`} className="btn btn--outline">Compare</Link>
                  </div>
                </div>
                <div className="card card--flat" style={{ width: 220, flexShrink: 0, padding: 14 }}>
                  <b className="small">Top strength</b>
                  <p className="tiny muted mt-4">{best.strength}</p>
                  <b className="small mt-12" style={{ display: 'block' }}>Main complaint</b>
                  <p className="tiny muted mt-4">{best.complaint}</p>
                  <div className="callout callout--green mt-12" style={{ padding: '10px 12px', fontSize: '0.68rem' }}>
                    <b className="green">AI Note</b><br />
                    GadgetHub AI recommends checking RAM and storage before buying. Choose 16GB RAM if you multitask heavily.
                  </div>
                </div>
              </div>
            </div>

            {/* Products matching */}
            <div>
              <div className="section-head section-head--title">
                <h2>Products Matching {query}</h2>
                <Link to="/category/laptops" className="view-all">View all products <ArrowRight size={13} /></Link>
              </div>
              <div className="grid grid-4">
                {related.map((p) => (
                  <div className="card card--hover" key={p.id} style={{ padding: 12 }}>
                    <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden' }}>
                      <DeviceArt kind={p.deviceKind} tone={p.imageTone} />
                      <span style={{ position: 'absolute', top: 6, left: 6 }}><ConfBadge value={p.confidence} /></span>
                    </div>
                    <b className="small mt-8" style={{ display: 'block' }}>{p.name}</b>
                    <Stars rating={p.rating} size={11} />
                    <p className="small bold mt-4">{formatRange(p.priceMin, p.priceMax)}</p>
                    <p className="tiny muted-2">{p.sellerCount} sellers</p>
                    <div className="flex gap-6 mt-8">
                      <Link to={`/ai-advisor?q=${encodeURIComponent(p.name)}`} className="btn btn--sm btn--outline-blue" style={{ flex: 1 }}>Ask AI</Link>
                      <Link to={`/compare?a=${p.slug}`} className="btn btn--sm btn--outline" style={{ flex: 1 }}>Compare</Link>
                      <Link to={`/product/${p.slug}`} className="btn btn--sm btn--outline" style={{ flex: 1 }}>View</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Owner reviews matching (sellers) */}
            <div>
              <div className="section-head section-head--title">
                <h2>Owner Reviews Matching {query}</h2>
                <Link to="/reviews" className="view-all">View all reviews <ArrowRight size={13} /></Link>
              </div>
              <div className="grid grid-4">
                {sellers.slice(0, 3).map((s) => (
                  <div className="card" key={s.id} style={{ padding: 14 }}>
                    <div className="flex items-center gap-10">
                      <Avatar name={s.name} />
                      <div>
                        <b className="small">{s.name}</b>
                        <p className="tiny muted-2">{s.area}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8 mt-10">
                      <Stars rating={s.rating} size={11} />
                      <span className="badge badge--green">{s.trustScore}%</span>
                    </div>
                    <p className="tiny green mt-8">{s.openStatus}</p>
                    <p className="tiny muted mt-4">Stock: <b className="green">{s.stock}</b></p>
                    <p className="tiny muted">Price: <b className="text-soft">{s.price ? formatNaira(s.price) : '—'}</b></p>
                    <p className="tiny muted">Warranty: <b className="text-soft">{s.warranty}</b></p>
                    <Link to="/sellers" className="btn btn--sm btn--outline-blue btn--block mt-10">View Store</Link>
                  </div>
                ))}
                <div className="map-tile" style={{ minHeight: 240 }}>
                  <span className="map-tile__road" style={{ left: '10%', top: '34%', width: '76%', height: 4, transform: 'rotate(-7deg)' }} />
                  <span className="map-tile__road" style={{ left: '52%', top: '10%', width: 4, height: '74%', transform: 'rotate(10deg)' }} />
                  <MapPin className="map-pin" style={{ left: '38%', top: '32%' }} size={22} />
                  <MapPin className="map-pin" style={{ left: '62%', top: '58%' }} size={22} />
                  <span className="map-label" style={{ left: '20%', top: '18%' }}>Ikeja</span>
                  <span className="map-label" style={{ right: '14%', top: '44%' }}>Yaba</span>
                  <span className="map-label" style={{ left: '30%', bottom: '16%' }}>Lagos Island</span>
                  <span className="map-label" style={{ right: '8%', bottom: '8%' }}>Lekki</span>
                </div>
              </div>
            </div>

            {/* Popular comparisons */}
            <div>
              <div className="section-head section-head--title">
                <h2>Popular Comparisons</h2>
                <Link to="/compare" className="view-all">View all comparisons <ArrowRight size={13} /></Link>
              </div>
              <div className="grid grid-4">
                <div className="card" style={{ padding: 14 }}>
                  <div className="vs-row">
                    <div className="vs-item">
                      <DeviceArt kind="laptop" tone="blue" />
                      <b className="tiny">MacBook Air M3</b>
                      <span className="conf-pill mt-4" style={{ width: 34, height: 34, fontSize: '0.62rem' }}>93%</span>
                    </div>
                    <span className="vs-badge" style={{ width: 32, height: 32, fontSize: '0.62rem' }}>VS</span>
                    <div className="vs-item">
                      <DeviceArt kind="laptop" tone="purple" />
                      <b className="tiny">Dell XPS 13</b>
                      <span className="conf-pill mt-4" style={{ width: 34, height: 34, fontSize: '0.62rem' }}>89%</span>
                    </div>
                  </div>
                  <div className="flex justify-between mt-10 tiny muted">
                    <span>₦1.4M – ₦1.8M</span>
                    <span>₦950k – ₦1.25M</span>
                  </div>
                  <Link to="/compare" className="btn btn--sm btn--primary btn--block mt-10">Full Comparison</Link>
                </div>
                {[
                  { who: 'Amaka from Lagos', rating: 5.0, title: 'Battery life is the biggest win', body: 'The battery easily lasts a full day, and it is perfect for business work, meetings, writing, and travel.', helpful: 78 },
                  { who: 'Tunde from Abuja', rating: 4.7, title: 'Smooth performance but limited ports', body: 'The screen is beautiful and performance is smooth. My only issue is the limited ports.', helpful: 54 },
                  { who: 'Chioma from PH', rating: 4.5, title: 'Great for writing and light editing', body: 'It is fast, silent, and premium. I use it for writing, Canva, browsing, and light editing.', helpful: 47 },
                ].map((r) => (
                  <div className="card" key={r.who} style={{ padding: 14 }}>
                    <div className="flex items-center gap-8">
                      <Avatar name={r.who} size="sm" />
                      <div>
                        <b className="tiny">{r.who}</b>
                        <p className="tiny green">Verified Owner</p>
                      </div>
                    </div>
                    <Stars rating={r.rating} size={11} />
                    <b className="small mt-8" style={{ display: 'block' }}>{r.title}</b>
                    <p className="tiny muted mt-4" style={{ lineHeight: 1.55 }}>{r.body}</p>
                    <div className="flex items-center justify-between mt-10 tiny muted">
                      <span>👍 Helpful {r.helpful}</span>
                      <Link to="/reviews" className="view-all tiny">Read Review</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community / Guides / News triple */}
            <div className="grid grid-3">
              <div className="card">
                <h3 className="small bold mb-12">💬 Community Questions About {query}</h3>
                <div className="data-rows">
                  {discussions.slice(1, 4).map((d) => (
                    <div className="data-row" key={d.id}>
                      <Avatar name={d.author} size="sm" />
                      <div style={{ flex: 1 }}>
                        <Link to="/community" className="text-soft bold tiny" style={{ display: 'block' }}>{d.title}</Link>
                        <span className="muted-2 tiny">{d.answers} answers · {d.helpful} helpful · {d.views} views</span>
                        <div className="mt-4"><span className="badge badge--blue">{d.badges[0]}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card">
                <div className="flex items-center justify-between mb-12">
                  <h3 className="small bold">📖 Guides &amp; Articles</h3>
                  <Link to="/knowledge-hub" className="view-all tiny">View all guides</Link>
                </div>
                <div className="data-rows">
                  {guides.slice(0, 4).map((g) => (
                    <div className="data-row" key={g.id}>
                      <span style={{ width: 42, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                        <DeviceArt kind={g.deviceKind} tone={g.imageTone} />
                      </span>
                      <div style={{ flex: 1 }}>
                        <Link to={`/knowledge-hub/guides/${g.slug}`} className="text-soft bold tiny" style={{ display: 'block' }}>{g.title}</Link>
                        <span className="muted-2 tiny">{g.category} · {g.readTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card">
                <h3 className="small bold mb-12">📰 Latest News About {query}</h3>
                <div className="data-rows">
                  {newsArticles.slice(0, 4).map((n) => (
                    <div className="data-row" key={n.id}>
                      <div style={{ flex: 1 }}>
                        <Link to="/news" className="text-soft bold tiny" style={{ display: 'block' }}>{n.title}</Link>
                        <span className={`badge badge--${n.badgeTone} mt-4`}>{n.badge}</span>
                        <span className="muted-2 tiny" style={{ marginLeft: 8 }}>{n.timeAgo}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── SIDEBAR ─────────────────────────────────────── */}
          <div className="side-stack">
            <div className="ai-panel">
              <div className="flex items-center justify-between">
                <h3>🤖 Ask AI About This Search</h3>
                <Robot size={54} />
              </div>
              <input className="input mt-12" placeholder={`Ask about ${query}, price, sellers, reviews…`} />
              <div className="flex-col gap-8 mt-12">
                {AI_QUESTIONS.map((q) => (
                  <button key={q} className="ai-chip" onClick={() => navigate(`/ai-advisor?q=${encodeURIComponent(q)}`)}>
                    {q}
                  </button>
                ))}
              </div>
              <Link to={`/ai-advisor?q=${encodeURIComponent(query)}`} className="btn btn--primary btn--block mt-12">
                <Sparkles size={14} /> Ask AI
              </Link>
            </div>

            <div className="card">
              <h3 className="small bold mb-12">📈 {best.name} Price Watch</h3>
              <div className="data-rows">
                <div className="data-row"><span className="muted">Current range</span><b style={{ marginLeft: 'auto' }}>{formatRange(best.priceMin, best.priceMax)}</b></div>
                <div className="data-row"><span className="muted">Best value estimate</span><b style={{ marginLeft: 'auto' }}>{best.bestValue ? formatNaira(best.bestValue) : '—'}</b></div>
                <div className="data-row"><span className="muted">Signal</span><span className="badge badge--green" style={{ marginLeft: 'auto' }}>{best.priceSignal}</span></div>
                <div className="data-row"><span className="muted">Verified sellers</span><b style={{ marginLeft: 'auto' }}>{best.sellerCount}</b></div>
                <div className="data-row"><span className="muted">Warranty range</span><b style={{ marginLeft: 'auto' }}>{best.warranty}</b></div>
              </div>
              <Link to={`/product/${best.slug}`} className="btn btn--outline btn--block btn--sm mt-12">View Price Details</Link>
            </div>

            <div className="card">
              <h3 className="small bold mb-12">🔍 Related Searches</h3>
              <div className="flex-col gap-6">
                {RELATED.map((r) => (
                  <Link key={r} to={`/search?q=${encodeURIComponent(r)}`} className="flex items-center gap-8 muted small" style={{ padding: '5px 0' }}>
                    <Search size={12} /> {r}
                  </Link>
                ))}
              </div>
              <Link to="/search" className="btn btn--outline btn--block btn--sm mt-12">See More Related Searches</Link>
            </div>

            <div className="card">
              <h3 className="small bold mb-12">⚡ Quick Actions</h3>
              <div className="flex-col gap-8">
                <Link to={`/ai-advisor?q=${encodeURIComponent(query)}`} className="btn btn--outline btn--sm" style={{ justifyContent: 'flex-start' }}><Sparkles size={13} className="blue" /> Ask GadgetHub AI</Link>
                <Link to={`/compare?a=${best.slug}`} className="btn btn--outline btn--sm" style={{ justifyContent: 'flex-start' }}><GitCompareArrows size={13} className="amber" /> Compare {best.name}</Link>
                <Link to="/sellers" className="btn btn--outline btn--sm" style={{ justifyContent: 'flex-start' }}><Store size={13} className="green" /> Find Trusted Sellers</Link>
                <Link to="/reviews" className="btn btn--outline btn--sm" style={{ justifyContent: 'flex-start' }}><Eye size={13} className="purple" /> Read Owner Reviews</Link>
                <button className="btn btn--outline btn--sm" style={{ justifyContent: 'flex-start' }}><Bookmark size={13} className="cyan" /> Save Search</button>
              </div>
            </div>

            <div className="ai-panel">
              <div className="flex items-center justify-between">
                <h3>💡 Search Tip</h3>
                <Robot size={48} />
              </div>
              <p className="small muted mt-12" style={{ lineHeight: 1.7 }}>
                Use natural language like:<br />
                <i>“best laptop for students under ₦800k”</i><br />
                <i>“trusted iPhone sellers in Ikeja”</i><br />
                <i>“fake AirPods how to check”</i><br />
                GadgetHub AI understands!
              </p>
            </div>
          </div>
        </div>
      </section>

      <PageCta
        title="Still Searching for the Right Gadget?"
        subtitle="Ask GadgetHub AI, compare products, read real reviews, or find trusted sellers before you buy."
        footItems={['AI search summary', 'Real owner reviews', 'Verified seller checks', 'Built for Nigerian buyers']}
      />
    </>
  );
}

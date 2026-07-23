import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, Sparkles, Newspaper, TrendingUp, AlertTriangle, Bot, Store,
  Smartphone, ShieldAlert, Lock, ArrowRight, BadgeCheck,
} from 'lucide-react';
import LiveTicker from '../components/layout/LiveTicker';
import { DeviceArt, Robot, IconTile } from '../components/ui';
import { newsArticles, scamAlerts } from '../data/news';
import { products } from '../data/products';
import { formatNaira, formatRange } from '../lib/api';
import { getNewsFeedPage } from '../services';
import type { NewsArticle } from '../types';

const POPULAR = [
  'iPhone 16 Pro Max price in Nigeria', 'Samsung S24 Ultra update', 'MacBook Air M3 price watch',
  'Fake AirPods alert', 'Gaming laptop deals', 'Verified seller stock updates',
  'Best phones trending now', 'Exchange rate impact',
];

const FEED_TABS = ['All News', 'Gadget Launches', 'Price Watch', 'Scam Alerts', 'Seller Updates', 'Buying Trends'];

const INSIGHTS = [
  { icon: Newspaper, tone: 'blue', label: 'Top story today', value: 'MacBook Air M3 price watch' },
  { icon: Smartphone, tone: 'purple', label: 'Most searched gadget', value: 'iPhone 16 Pro Max' },
  { icon: AlertTriangle, tone: 'red', label: 'Fastest rising topic', value: 'Fake AirPods alerts' },
  { icon: TrendingUp, tone: 'cyan', label: 'Most active category', value: 'Phones' },
  { icon: Store, tone: 'green', label: 'Top seller update', value: 'MacBook stock in Lagos' },
  { icon: ShieldAlert, tone: 'amber', label: 'Buyer warning', value: 'Avoid unrealistic online prices' },
];

const AI_CHIPS = [
  'What gadget prices changed today?', 'What phones are trending in Nigeria?',
  'Any scam alerts this week?', 'Which sellers updated MacBook stock?',
  'Should I buy now or wait?', 'What gadget news affects students?',
];

const PRICE_WATCH_IDS = ['p3', 'p1', 'p2', 'p4', 'p13', 'p6'];

export default function NewsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All News');
  const featured = newsArticles[0];
  const subFeatures = newsArticles.slice(1, 4);
  const priceWatch = PRICE_WATCH_IDS.map((id) => products.find((p) => p.id === id)!);

  // Paged news feed — GET /api/news/feed?page=&pageSize= via the services layer
  const [feed, setFeed] = useState<NewsArticle[]>([]);
  const [feedPage, setFeedPage] = useState(1);
  const [hasMoreNews, setHasMoreNews] = useState(false);
  const [loadingNews, setLoadingNews] = useState(false);

  useEffect(() => {
    let active = true;
    getNewsFeedPage(1).then((p) => {
      if (!active) return;
      setFeed(p.items);
      setHasMoreNews(p.hasMore);
    });
    return () => { active = false; };
  }, []);

  const loadMoreNews = async () => {
    setLoadingNews(true);
    const p = await getNewsFeedPage(feedPage + 1);
    setFeed((prev) => [...prev, ...p.items]);
    setFeedPage(p.page);
    setHasMoreNews(p.hasMore);
    setLoadingNews(false);
  };

  const visibleFeed =
    activeTab === 'All News'
      ? feed
      : feed.filter((n) => n.badge.toLowerCase().includes(activeTab.toLowerCase().replace(/s$/, '').replace('gadget launche', 'launch')));

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="container page-hero__grid">
          <div>
            <span className="eyebrow">Gadget News Intelligence</span>
            <h1>Stay Updated Before <span className="accent-green">You Buy.</span></h1>
            <p className="lede">
              Follow gadget launches, Nigerian price changes, seller stock updates,
              scam alerts, and buyer-focused tech news summarized by GadgetHub AI.
            </p>

            <div className="search-panel mt-20">
              <h3>What gadget news are you looking for?</h3>
              <div className="search-input-wrap mb-12">
                <Search size={16} />
                <input className="input" placeholder="Search iPhone news, Samsung updates, MacBook prices, scam alerts, seller stock…" />
              </div>
              <div className="row mb-12">
                <div className="field" style={{ flex: 1 }}>
                  <label>Category</label>
                  <div className="select-wrap"><select className="select"><option>Latest News</option><option>Price Watch</option><option>Scam Alerts</option></select></div>
                </div>
                <div className="field" style={{ flex: 1 }}>
                  <label>Location</label>
                  <div className="select-wrap"><select className="select"><option>Nigeria</option><option>Lagos</option><option>Abuja</option></select></div>
                </div>
              </div>
              <div className="row">
                <button className="btn btn--primary" style={{ flex: 1 }}><Search size={15} /> Search News</button>
                <Link to="/ai-advisor" className="btn btn--outline" style={{ flex: 1 }}><Sparkles size={15} /> Ask GadgetHub AI</Link>
              </div>
              <p className="tiny muted-2 mt-12">Popular searches</p>
              <div className="flex wrap gap-8 mt-8">
                {POPULAR.map((c) => (
                  <button key={c} className="chip" onClick={() => navigate(`/search?q=${encodeURIComponent(c)}`)}>{c}</button>
                ))}
              </div>
            </div>

            <div className="feature-strip mt-20">
              <div className="feature-strip__item">
                <IconTile tone="green" size={38}><Newspaper size={17} /></IconTile>
                <div><b>Buyer-Focused News</b><span>Only what matters to buyers</span></div>
              </div>
              <div className="feature-strip__item">
                <IconTile tone="blue" size={38}><TrendingUp size={17} /></IconTile>
                <div><b>Price Watch Updates</b><span>Track prices across sellers</span></div>
              </div>
              <div className="feature-strip__item">
                <IconTile tone="amber" size={38}><AlertTriangle size={17} /></IconTile>
                <div><b>Scam Alerts</b><span>Avoid costly mistakes</span></div>
              </div>
              <div className="feature-strip__item">
                <IconTile tone="purple" size={38}><Bot size={17} /></IconTile>
                <div><b>AI News Summaries</b><span>Simple updates, fast</span></div>
              </div>
            </div>
          </div>

          {/* AI News Briefing */}
          <div className="ai-panel">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="flex items-center gap-8">AI News Briefing <span className="reco-card__live"><span className="ticker__dot" /> Live</span></h3>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: 8 }}>This Week in Nigerian Gadgets</h2>
              </div>
              <Robot size={84} />
            </div>
            <p className="small muted mt-12" style={{ lineHeight: 1.65 }}>
              GadgetHub AI has detected rising interest in iPhone 16 Pro Max, MacBook Air M3,
              Samsung S24 Ultra, AirPods Pro 2, and gaming laptops. Buyers are comparing prices
              more carefully due to exchange-rate movement and stock differences across verified sellers.
            </p>
            <div className="grid grid-2 mt-16" style={{ gap: 10 }}>
              {[
                { icon: Smartphone, tone: 'blue', label: 'Trending gadget', value: 'iPhone 16 Pro Max' },
                { icon: TrendingUp, tone: 'green', label: 'Price watch', value: 'MacBook Air M3' },
                { icon: AlertTriangle, tone: 'amber', label: 'Scam alert', value: 'Fake AirPods listings' },
                { icon: Store, tone: 'purple', label: 'Seller update', value: 'TechWorld Store added MacBook stock' },
                { icon: Lock, tone: 'cyan', label: 'Most discussed', value: 'UK used iPhones' },
              ].map((t) => (
                <div className="stat-row" key={t.label} style={{ padding: '10px 12px' }}>
                  <IconTile tone={t.tone} size={32}><t.icon size={15} /></IconTile>
                  <div><span className="tiny muted-2" style={{ display: 'block' }}>{t.label}</span><b style={{ fontSize: '0.78rem' }}>{t.value}</b></div>
                </div>
              ))}
            </div>
            <div className="callout callout--green mt-12 flex items-center gap-10" style={{ padding: '10px 14px', fontSize: '0.76rem' }}>
              <TrendingUp size={15} className="green" /> 42% more users checked verified sellers this week.
            </div>
            <div className="flex gap-8 mt-12 wrap">
              <button className="btn btn--primary" style={{ flex: 1 }}>Read Full Briefing</button>
              <Link to="/ai-advisor?q=What%20gadget%20news%20matters%20today" className="btn btn--outline" style={{ flex: 1 }}>
                <Sparkles size={14} /> Ask AI About Today's News
              </Link>
            </div>
          </div>
        </div>
      </section>

      <LiveTicker
        label="Live Gadget News Activity"
        feed="news"
        countText={{ value: '42', text: 'users reading gadget news now' }}
      />

      {/* ── MAIN SPLIT ───────────────────────────────────────── */}
      <section className="section">
        <div className="container split-main">
          <div>
            <div className="section-head section-head--title">
              <div>
                <h2>Latest Gadget News</h2>
                <p className="sub">Fresh updates on launches, prices, stock, scams, and buying decisions.</p>
              </div>
            </div>

            {/* Featured story */}
            <div className="card card--glow" style={{ overflow: 'hidden', padding: 0 }}>
              <div className="grid grid-2" style={{ gap: 0, alignItems: 'stretch' }}>
                <div style={{ padding: 22 }}>
                  <span className={`badge badge--${featured.badgeTone}`}>{featured.badge}</span>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginTop: 12, lineHeight: 1.3 }}>{featured.title}</h3>
                  <p className="small muted mt-12" style={{ lineHeight: 1.65 }}>{featured.excerpt}</p>
                  <div className="news-row__meta mt-16">
                    <span>🕐 {featured.timeAgo}</span>
                    <span>📖 {featured.readTime}</span>
                    {featured.aiSummary && <span>✦ AI summary available</span>}
                  </div>
                  <button className="btn btn--primary btn--sm mt-16">Read Story</button>
                </div>
                <DeviceArt kind={featured.deviceKind} tone={featured.imageTone} ratio="tall" />
              </div>
            </div>

            {/* Sub features */}
            <div className="grid grid-3 mt-16">
              {subFeatures.map((n) => (
                <div className="card card--hover guide-card" key={n.id}>
                  <div style={{ position: 'relative' }}>
                    <DeviceArt kind={n.deviceKind} tone={n.imageTone} />
                    <span className={`badge badge--${n.badgeTone}`} style={{ position: 'absolute', top: 8, left: 8 }}>{n.badge}</span>
                  </div>
                  <div className="guide-card__body">
                    <h3><Link to="/news">{n.title}</Link></h3>
                    <div className="guide-card__meta"><span>{n.readTime}</span></div>
                  </div>
                </div>
              ))}
            </div>

            {/* News feed */}
            <div className="section-head section-head--title mt-24">
              <h2>News Feed</h2>
              <Link to="/news" className="view-all">View all news <ArrowRight size={13} /></Link>
            </div>
            <div className="tabs mb-12">
              {FEED_TABS.map((t) => (
                <button key={t} className={`tab${activeTab === t ? ' tab--pill-active' : ''}`} onClick={() => setActiveTab(t)}>{t}</button>
              ))}
            </div>
            <div className="card" style={{ paddingTop: 4, paddingBottom: 4 }}>
              {(visibleFeed.length ? visibleFeed : feed).map((n) => (
                <div className="news-row" key={n.id}>
                  <span className="news-row__art"><DeviceArt kind={n.deviceKind} tone={n.imageTone} /></span>
                  <div style={{ flex: 1 }}>
                    <div className="flex items-center justify-between gap-10 wrap">
                      <h3><Link to="/news">{n.title}</Link></h3>
                      <span className={`badge badge--${n.badgeTone}`} style={{ flexShrink: 0 }}>{n.badge}</span>
                    </div>
                    <p>{n.excerpt}</p>
                    <div className="news-row__meta">
                      <span>🕐 {n.timeAgo}</span>
                      <span>📖 {n.readTime}</span>
                      {n.aiSummary && <span className="purple">✦ AI summary</span>}
                      <Link to="/news" className="view-all tiny" style={{ marginLeft: 'auto' }}>Read More →</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="center mt-16">
              {hasMoreNews ? (
                <button className="btn btn--primary" onClick={loadMoreNews} disabled={loadingNews}>
                  {loadingNews ? 'Loading…' : 'Load More News'}
                </button>
              ) : (
                feed.length > 0 && <span className="tiny muted-2">All news loaded</span>
              )}
            </div>
          </div>

          {/* ── SIDEBAR ─────────────────────────────────────── */}
          <aside className="side-stack">
            <div className="card">
              <h3 className="small bold mb-12">AI News Insights</h3>
              <div className="flex-col gap-10">
                {INSIGHTS.map((ins) => (
                  <div className="flex items-center gap-10" key={ins.label}>
                    <IconTile tone={ins.tone} size={32}><ins.icon size={15} /></IconTile>
                    <div>
                      <span className="tiny muted-2" style={{ display: 'block' }}>{ins.label}</span>
                      <b className="small">{ins.value}</b>
                    </div>
                  </div>
                ))}
              </div>
              <input className="input mt-16" placeholder="Ask AI about gadget news…" />
              <div className="flex-col gap-6 mt-10">
                {AI_CHIPS.map((c) => (
                  <button key={c} className="ai-chip" style={{ fontSize: '0.7rem' }} onClick={() => navigate(`/ai-advisor?q=${encodeURIComponent(c)}`)}>{c}</button>
                ))}
              </div>
              <Link to="/ai-advisor" className="btn btn--primary btn--block btn--sm mt-12"><Sparkles size={13} /> Ask AI</Link>
            </div>

            <div className="card">
              <div className="flex items-center justify-between mb-12">
                <h3 className="small bold">Gadget Price Watch</h3>
                <Link to="/category/laptops" className="view-all tiny">View full price watch</Link>
              </div>
              <div className="flex-col">
                {priceWatch.map((p) => (
                  <div className="price-watch-row" key={p.id}>
                    <span className="price-watch-row__art"><DeviceArt kind={p.deviceKind} tone={p.imageTone} /></span>
                    <div style={{ flex: 1 }}>
                      <b>{p.name}</b>
                      <span className="sub">{formatRange(p.priceMin, p.priceMax)}</span>
                      <span className="sub">Best value: {p.bestValue ? formatNaira(p.bestValue) : '—'} · {p.sellerCount} sellers</span>
                    </div>
                    <span className={`badge badge--${['Stable', 'Good value'].includes(p.priceSignal) ? 'green' : ['High risk', 'High demand'].includes(p.priceSignal) ? 'red' : 'amber'}`}>
                      {p.priceSignal}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between mb-12">
                <h3 className="small bold">Scam Alerts &amp; Buyer Warnings</h3>
                <Link to="/knowledge-hub#scam-protection" className="view-all tiny">View all alerts</Link>
              </div>
              <div className="flex-col gap-8">
                {scamAlerts.map((a) => (
                  <div className={`scam-row${a.severity === 'danger' ? ' scam-row--danger' : ''}`} key={a.id}>
                    <IconTile tone={a.severity === 'danger' ? 'red' : 'amber'} size={30}>
                      {a.severity === 'danger' ? <AlertTriangle size={14} /> : <ShieldAlert size={14} />}
                    </IconTile>
                    <div>
                      <b>{a.title}</b>
                      <span>{a.body}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card card--green">
              <h3 className="small bold flex items-center gap-8"><BadgeCheck size={15} className="green" /> Verified Seller Updates</h3>
              <p className="tiny muted mt-8" style={{ lineHeight: 1.6 }}>
                Sellers on GadgetHub are verified for store location, warranty behavior, and buyer
                feedback. Always confirm stock and price before payment.
              </p>
              <Link to="/sellers" className="btn btn--outline-green btn--block btn--sm mt-12">Browse Verified Sellers</Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

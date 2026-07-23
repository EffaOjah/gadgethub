import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, Sparkles, BadgeCheck, Camera, AlertTriangle, ThumbsUp, MessageCircle,
  ArrowRight, Battery, Monitor, Feather, Headphones as HeadphonesIcon, Zap,
  Smartphone, Laptop, Gamepad2, Watch, CheckCircle2, PlayCircle, Upload, Star,
} from 'lucide-react';
import LiveTicker from '../components/layout/LiveTicker';
import PageCta from '../components/layout/PageCta';
import { Avatar, DeviceArt, Robot, Stars, IconTile } from '../components/ui';
import { products, productBySlug } from '../data/products';
import { sellers } from '../data/sellers';
import { getReviewsPage } from '../services';
import type { Review } from '../types';

const QUICK_SEARCHES = [
  'MacBook Air M3 reviews', 'iPhone 16 Pro Max reviews', 'Samsung S24 Ultra camera',
  'Best laptop reviews in Nigeria', 'AirPods Pro battery complaints', 'Gaming laptop under ₦1.5M',
];

const FILTER_CATS = ['All Categories', 'Phones', 'Laptops', 'Audio', 'Smartwatches', 'Gaming', 'Accessories', 'Cameras'];
const REVIEW_TYPES = ['Verified owner only', 'With photos', 'With complaints', 'With seller mentioned', 'With warranty experience'];

const PRAISES = [
  { icon: Battery, title: 'Battery life', sub: 'Mentioned positively in 42% of laptop reviews' },
  { icon: Camera, title: 'Camera quality', sub: 'Mentioned positively in 38% of phone reviews' },
  { icon: Monitor, title: 'Display quality', sub: 'Mentioned positively in 35% of all reviews' },
  { icon: Feather, title: 'Portability', sub: 'Mentioned positively in 31% of laptop reviews' },
  { icon: HeadphonesIcon, title: 'Noise cancellation', sub: 'Mentioned positively in 44% of audio reviews' },
  { icon: Zap, title: 'Performance', sub: 'Mentioned positively in 41% of all reviews' },
];

const CITY_REVIEWS = [
  { city: 'Lagos', sub: 'Most reviewed: iPhone, MacBook, AirPods', count: '1,243 reviews' },
  { city: 'Abuja', sub: 'Most reviewed: Gaming laptops, Samsung', count: '835 reviews' },
  { city: 'Port Harcourt', sub: 'Most reviewed: Samsung, cameras, phones', count: '623 reviews' },
  { city: 'Ibadan', sub: 'Most reviewed: Student laptops, budget phones', count: '418 reviews' },
  { city: 'Enugu', sub: 'Most reviewed: Gaming laptops, audio', count: '395 reviews' },
];

const BUYER_MEDIA = [
  'How to spot fake AirPods before buying', 'How to read phone camera reviews',
  'What to read about long-term battery life', 'What laptop reviews reveal about warranty',
  'Why owner complaints matter before buying',
];

const FAQS = [
  'Are GadgetHub reviews verified?',
  'How does GadgetHub know a review is from a real owner?',
  'Can sellers remove bad reviews?',
  'How are helpful reviews ranked?',
  'Can I upload photos with my review?',
  'Can I review a UK used gadget?',
  'How does GadgetHub summarize reviews with AI?',
  'Why do some products have fewer reviews?',
];

export default function ReviewsPage() {
  const navigate = useNavigate();
  const macbook = productBySlug('macbook-air-m3')!;

  // Paged reviews — GET /api/reviews?page=&pageSize= via the services layer
  const [loadedReviews, setLoadedReviews] = useState<Review[]>([]);
  const [reviewsPage, setReviewsPage] = useState(1);
  const [hasMoreReviews, setHasMoreReviews] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(false);

  useEffect(() => {
    let active = true;
    getReviewsPage(1).then((p) => {
      if (!active) return;
      setLoadedReviews(p.items);
      setHasMoreReviews(p.hasMore);
    });
    return () => { active = false; };
  }, []);

  const loadMoreReviews = async () => {
    setLoadingReviews(true);
    const p = await getReviewsPage(reviewsPage + 1);
    setLoadedReviews((prev) => [...prev, ...p.items]);
    setReviewsPage(p.page);
    setHasMoreReviews(p.hasMore);
    setLoadingReviews(false);
  };

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="container page-hero__grid">
          <div>
            <span className="eyebrow">Verified Owner Reviews</span>
            <h1>Read Real Gadget Reviews <span className="accent-green">Before You Buy.</span></h1>
            <p className="lede">
              Honest feedback from verified gadget owners across Nigeria.
              Real experiences. Real photos. Real help.
            </p>

            <div className="search-panel mt-20">
              <h3>What gadget reviews are you looking for?</h3>
              <div className="search-input-wrap mb-12">
                <Search size={16} />
                <input className="input" placeholder="Search iPhone, MacBook, Samsung, AirPods, gaming laptop…" />
              </div>
              <div className="row mb-12">
                {[
                  { label: 'Category', options: FILTER_CATS },
                  { label: 'Location', options: ['All Locations', 'Lagos', 'Abuja', 'Port Harcourt', 'Ibadan'] },
                  { label: 'Condition', options: ['Any Condition', 'Brand New', 'UK Used', 'Open Box'] },
                  { label: 'Rating', options: ['All Ratings', '5 stars', '4 stars & up', '3 stars & up'] },
                ].map((f) => (
                  <div className="field" style={{ flex: 1, minWidth: 130 }} key={f.label}>
                    <label>{f.label}</label>
                    <div className="select-wrap">
                      <select className="select" style={{ padding: '9px 12px', fontSize: '0.8rem' }}>
                        {f.options.map((o) => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn btn--primary btn--block"><Search size={15} /> Find Reviews</button>
              <p className="tiny muted-2 mt-12">Quick searches</p>
              <div className="flex wrap gap-8 mt-8">
                {QUICK_SEARCHES.map((c) => (
                  <button key={c} className="chip" onClick={() => navigate(`/search?q=${encodeURIComponent(c)}`)}>{c} →</button>
                ))}
              </div>
            </div>

            <div className="feature-strip mt-20">
              <div className="feature-strip__item">
                <IconTile tone="green" size={38}><BadgeCheck size={17} /></IconTile>
                <div><b>Verified Owner Reviews</b><span>Real buyers only</span></div>
              </div>
              <div className="feature-strip__item">
                <IconTile tone="blue" size={38}><Camera size={17} /></IconTile>
                <div><b>Buyer Photos Included</b><span>See real-world images</span></div>
              </div>
              <div className="feature-strip__item">
                <IconTile tone="amber" size={38}><AlertTriangle size={17} /></IconTile>
                <div><b>Common Complaints Tracked</b><span>Know issues before buying</span></div>
              </div>
            </div>
          </div>

          {/* AI Review Summary Preview */}
          <div className="ai-panel">
            <h3>AI Review Summary Preview</h3>
            <div className="flex items-center gap-14 mt-12">
              <span style={{ width: 84, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
                <DeviceArt kind="laptop" tone="blue" />
              </span>
              <div>
                <b style={{ fontSize: '1.15rem' }}>{macbook.name}</b>
                <div className="flex gap-16 mt-8 wrap">
                  <span><b>★ {macbook.rating}/5</b><span className="tiny muted-2" style={{ display: 'block' }}>Average Owner Rating</span></span>
                  <span><b className="amber">🏅 {macbook.reviewCount}</b><span className="tiny muted-2" style={{ display: 'block' }}>Verified Reviews</span></span>
                  <span><b className="green">😊 {macbook.confidence}%</b><span className="tiny muted-2" style={{ display: 'block' }}>Buyer Confidence</span></span>
                </div>
              </div>
            </div>
            <div className="grid grid-2 mt-16" style={{ gap: 12 }}>
              <div>
                <b className="tiny green">Most praised</b>
                <ul className="check-list mt-6" style={{ gap: 5 }}>
                  <li style={{ fontSize: '0.72rem' }}><CheckCircle2 size={11} /> Battery life, portability</li>
                  <li style={{ fontSize: '0.72rem' }}><CheckCircle2 size={11} /> Silent performance</li>
                </ul>
              </div>
              <div>
                <b className="tiny red">Most complained about</b>
                <ul className="check-list mt-6" style={{ gap: 5 }}>
                  <li style={{ fontSize: '0.72rem' }}><AlertTriangle size={11} color="#f87171" /> Limited ports</li>
                  <li style={{ fontSize: '0.72rem' }}><AlertTriangle size={11} color="#f87171" /> Price, base storage</li>
                </ul>
              </div>
            </div>
            <p className="small muted mt-12" style={{ lineHeight: 1.65 }}>
              Most verified owners praise the MacBook Air M3 for long battery life, lightweight
              design, quiet performance, and smooth daily use. The main complaints are limited
              ports, high price, and storage limitations on the base model.
            </p>
            <p className="tiny muted-2 mt-12">Review sentiment</p>
            <div className="sentiment mt-6">
              <i className="sentiment__pos" style={{ width: '78%' }} />
              <i className="sentiment__neu" style={{ width: '16%' }} />
              <i className="sentiment__neg" style={{ width: '6%' }} />
            </div>
            <div className="flex justify-between tiny muted-2 mt-4">
              <span className="green">Positive 78%</span><span className="amber">Neutral 16%</span><span className="red">Negative 6%</span>
            </div>
            <div className="flex gap-8 mt-16">
              <button className="btn btn--primary" style={{ flex: 1 }}>Read Reviews</button>
              <Link to="/ai-advisor?q=Summarize%20MacBook%20Air%20M3%20reviews" className="btn btn--outline" style={{ flex: 1 }}>
                <Sparkles size={14} /> Ask AI About Reviews
              </Link>
            </div>
          </div>
        </div>
      </section>

      <LiveTicker
        label="Live Review Activity"
        feed="reviews"
        countText={{ value: '42', text: 'users reading reviews now' }}
      />

      {/* ── FILTERS + REVIEWS + INSIGHTS ─────────────────────── */}
      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '210px 1fr 300px', gap: 20, alignItems: 'start' }}>
          {/* Filters */}
          <aside className="filters-panel">
            <h3>Filters <button>Clear all</button></h3>
            <div>
              <label className="tiny muted-2 bold">PRODUCT CATEGORY</label>
              <div className="flex-col gap-4 mt-8">
                {FILTER_CATS.map((c, i) => (
                  <button key={c} className={`chip${i === 0 ? ' chip--active' : ''}`} style={{ justifyContent: 'flex-start', borderRadius: 8 }}>{c}</button>
                ))}
              </div>
            </div>
            <div className="field">
              <label>Brand</label>
              <div className="select-wrap"><select className="select" style={{ padding: '9px 12px', fontSize: '0.8rem' }}><option>All Brands</option><option>Apple</option><option>Samsung</option><option>Dell</option><option>HP</option></select></div>
            </div>
            <div className="field">
              <label>Location</label>
              <div className="select-wrap"><select className="select" style={{ padding: '9px 12px', fontSize: '0.8rem' }}><option>All Locations</option><option>Lagos</option><option>Abuja</option></select></div>
            </div>
            <div className="field">
              <label>Rating</label>
              <div className="select-wrap"><select className="select" style={{ padding: '9px 12px', fontSize: '0.8rem' }}><option>All ratings</option><option>5 stars</option><option>4 stars & up</option><option>3 stars & up</option></select></div>
            </div>
            <div>
              <label className="tiny muted-2 bold">REVIEW TYPE</label>
              <div className="flex-col gap-6 mt-8">
                {REVIEW_TYPES.map((t, i) => (
                  <label key={t} className="flex items-center gap-8 tiny muted" style={{ cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked={i === 0} /> {t}
                  </label>
                ))}
              </div>
            </div>
            <div className="field">
              <label>Sort by</label>
              <div className="select-wrap"><select className="select" style={{ padding: '9px 12px', fontSize: '0.8rem' }}><option>Most Helpful</option><option>Newest First</option><option>Highest Rated</option><option>Lowest Rated</option></select></div>
            </div>
            <button className="btn btn--outline btn--block btn--sm">Reset Filters</button>
          </aside>

          {/* Review list */}
          <div className="card">
            <div className="section-head" style={{ marginBottom: 8 }}>
              <div>
                <h2 style={{ fontSize: '1rem', textTransform: 'none' }}>Latest Honest Reviews</h2>
                <p className="sub">Real buyers. Real experiences. Verified feedback from gadget owners.</p>
              </div>
            </div>
            {loadedReviews.map((r) => {
              const p = products.find((x) => x.id === r.productId)!;
              return (
                <div className="discussion-row" key={r.id}>
                  <div style={{ flexShrink: 0 }}>
                    <Avatar name={r.author} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="flex items-center gap-8 wrap">
                      <b className="small">{r.author}</b>
                      <span className="tiny muted-2">{r.location}</span>
                      <span className="badge badge--green"><BadgeCheck size={10} /> Verified Owner</span>
                      <span style={{ marginLeft: 'auto' }} className="flex items-center gap-8">
                        <Stars rating={r.rating} size={11} />
                        <span className="tiny muted-2">{r.timeAgo}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-10 mt-8">
                      <span style={{ width: 44, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                        <DeviceArt kind={p.deviceKind} tone={p.imageTone} />
                      </span>
                      <div>
                        <b className="small">{r.productName}</b>
                        <span className="tiny muted-2" style={{ display: 'block' }}>{r.condition} · {r.sellerName}</span>
                      </div>
                    </div>
                    <b className="small mt-8" style={{ display: 'block' }}>{r.title}</b>
                    <p className="tiny muted mt-4" style={{ lineHeight: 1.6 }}>{r.body}</p>
                    <div className="review-card__ld mt-8">
                      <div>
                        <b className="tiny green">Liked</b>
                        <span className="tiny muted">{r.liked.join(', ')}</span>
                      </div>
                      <div>
                        <b className="tiny red">Disliked</b>
                        <span className="tiny muted">{r.disliked.join(', ')}</span>
                      </div>
                    </div>
                    <div className="review-card__photos mt-8">
                      {Array.from({ length: r.photoCount }).map((_, i) => (
                        <span className="review-card__photo" key={i}>
                          <DeviceArt kind={p.deviceKind} tone={(['blue', 'gold', 'silver', 'purple', 'dark'] as const)[i % 5]} />
                        </span>
                      ))}
                    </div>
                    <div className="review-card__foot mt-8">
                      <button><ThumbsUp size={12} /> Helpful {r.helpfulCount}</button>
                      <button><MessageCircle size={12} /> Comments {r.commentCount}</button>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="center mt-16">
              {hasMoreReviews ? (
                <button className="btn btn--outline" onClick={loadMoreReviews} disabled={loadingReviews}>
                  {loadingReviews ? 'Loading…' : 'Load More Reviews'}
                </button>
              ) : (
                loadedReviews.length > 0 && <span className="tiny muted-2">All reviews loaded</span>
              )}
            </div>
          </div>

          {/* AI Review Insights */}
          <aside className="side-stack">
            <div className="card">
              <h3 className="small bold mb-12">AI Review Insights</h3>
              <div className="flex-col gap-10">
                {[
                  { tone: 'blue', l: 'Top reviewed gadget this week', v: 'MacBook Air M3', icon: Laptop },
                  { tone: 'green', l: 'Best owner sentiment', v: 'Sony WH-1000XM5', icon: HeadphonesIcon },
                  { tone: 'cyan', l: 'Most praised feature', v: 'Battery life', icon: Battery },
                  { tone: 'red', l: 'Most common complaint', v: 'High price', icon: AlertTriangle },
                  { tone: 'purple', l: 'Most discussed category', v: 'Phones', icon: Smartphone },
                ].map((r) => (
                  <div className="flex items-center gap-10" key={r.l}>
                    <IconTile tone={r.tone} size={32}><r.icon size={15} /></IconTile>
                    <div>
                      <span className="tiny muted-2" style={{ display: 'block' }}>{r.l}</span>
                      <b className="small">{r.v}</b>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="ai-panel">
              <input className="input" placeholder="Ask AI to summarize reviews…" />
              <div className="flex-col gap-6 mt-10">
                {['Which phone has the best reviews?', 'What are MacBook Air M3 complaints?',
                  'Which gadget has the fewest issues?', 'Are UK used iPhones safe?',
                  'Which seller has the best buyer feedback?'].map((q) => (
                  <button key={q} className="ai-chip" style={{ fontSize: '0.7rem' }} onClick={() => navigate(`/ai-advisor?q=${encodeURIComponent(q)}`)}>› {q}</button>
                ))}
              </div>
              <Link to="/ai-advisor" className="btn btn--primary btn--block btn--sm mt-12"><Sparkles size={13} /> Ask AI</Link>
            </div>
          </aside>
        </div>
      </section>

      {/* ── AI SUMMARY BAND ──────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="card card--glow flex items-center gap-20 wrap">
            <span style={{ width: 130, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
              <DeviceArt kind="laptop" tone="blue" />
            </span>
            <div style={{ minWidth: 200 }}>
              <h3 className="small bold">Review Summary by GadgetHub AI</h3>
              <div className="flex gap-20 mt-12 wrap">
                <span><b style={{ fontSize: '1.3rem' }}>4.6/5</b><span className="tiny muted-2" style={{ display: 'block' }}>Average Rating</span></span>
                <span><b style={{ fontSize: '1.3rem' }}>189</b><span className="tiny muted-2" style={{ display: 'block' }}>Verified Reviews</span></span>
                <span><b className="green" style={{ fontSize: '1.3rem' }}>93%</b><span className="tiny muted-2" style={{ display: 'block' }}>Buyer Confidence</span></span>
              </div>
            </div>
            <div className="flex gap-10">
              {[['78%', 'Positive', 'green'], ['16%', 'Neutral', 'amber'], ['6%', 'Negative', 'red']].map(([v, l, tone]) => (
                <span key={l} className="conf-pill" style={{ width: 52, height: 52, borderColor: `var(--${tone})`, color: `var(--${tone === 'green' ? 'green-bright' : tone})`, flexDirection: 'column', display: 'inline-flex' }}>
                  {v}<small style={{ fontSize: '0.5rem' }}>{l}</small>
                </span>
              ))}
            </div>
            <div style={{ flex: 1, minWidth: 260 }}>
              <p className="tiny muted" style={{ lineHeight: 1.6 }}>
                Most MacBook Air M3 owners praise battery life, portability, premium build quality,
                silent performance, and smooth everyday use. The most common complaints are limited
                ports, higher price, and small base storage for buyers who store many files.
              </p>
              <button className="btn btn--primary btn--sm mt-12">View Full MacBook Air M3 Reviews</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── TOP REVIEWED + PRAISES ───────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container grid grid-2">
          <div className="card">
            <div className="flex items-center justify-between mb-12">
              <h3 className="small bold">Top Reviewed Gadgets</h3>
              <Link to="/category/laptops" className="view-all tiny">View all reviews</Link>
            </div>
            <div className="grid grid-3" style={{ gap: 10 }}>
              {products.slice(0, 6).map((p) => (
                <Link to={`/product/${p.slug}`} className="card card--flat card--hover center" key={p.id} style={{ padding: 10 }}>
                  <div style={{ borderRadius: 8, overflow: 'hidden' }}>
                    <DeviceArt kind={p.deviceKind} tone={p.imageTone} />
                  </div>
                  <b className="tiny mt-8" style={{ display: 'block' }}>{p.name}</b>
                  <span className="tiny muted-2">★ {p.rating} · {p.reviewCount} reviews</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-12">
              <h3 className="small bold">What Buyers Praise Most</h3>
              <span className="view-all tiny">View all insights</span>
            </div>
            <div className="grid grid-3" style={{ gap: 10 }}>
              {PRAISES.map((pr) => (
                <div className="card card--flat center" key={pr.title} style={{ padding: 12 }}>
                  <IconTile tone="green" size={36} style={{ margin: '0 auto' }}><pr.icon size={16} /></IconTile>
                  <b className="tiny mt-8" style={{ display: 'block' }}>{pr.title}</b>
                  <span className="tiny muted-2" style={{ lineHeight: 1.4 }}>{pr.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPLAINTS + SELLER MENTIONS ─────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container grid grid-2">
          <div className="card">
            <div className="flex items-center justify-between mb-12">
              <h3 className="small bold">Common Complaints</h3>
              <span className="view-all tiny">Track before you buy</span>
            </div>
            <div className="grid grid-4" style={{ gap: 8, gridTemplateColumns: 'repeat(4, 1fr)' }}>
              {(['dark', 'silver', 'blue', 'purple', 'gold', 'red', 'green', 'dark'] as const).map((tone, i) => (
                <div key={i} style={{ position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
                  <DeviceArt kind={(['phone', 'earbuds', 'laptop', 'watch'] as const)[i % 4]} tone={tone} />
                  <PlayCircle size={22} style={{ position: 'absolute', inset: 0, margin: 'auto', color: '#fff', opacity: 0.85 }} />
                </div>
              ))}
            </div>
            <div className="callout callout--amber mt-12" style={{ padding: '10px 12px', fontSize: '0.7rem' }}>
              <AlertTriangle size={12} className="amber" style={{ display: 'inline' }} /> Top tracked complaints: weak battery
              (some laptops), limited ports, fake accessories, price increases, and heavy gaming laptop weight.
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-12">
              <h3 className="small bold">Reviews That Mention Sellers</h3>
              <Link to="/sellers" className="view-all tiny">View all seller reviews</Link>
            </div>
            <div className="flex-col gap-8">
              {sellers.slice(0, 4).map((s) => (
                <Link to="/sellers" className="seller-row" key={s.id}>
                  <span className="seller-row__logo">{s.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
                  <div style={{ flex: 1 }}>
                    <b>{s.name}</b>
                    <span className="sub">{s.reviewCount} reviews mention this seller</span>
                  </div>
                  <span className="badge badge--green">{s.trustScore}% positive</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BROWSE + CITIES + MEDIA ──────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container grid grid-3">
          <div className="card">
            <h3 className="small bold mb-12">Browse Reviews by Category</h3>
            <div className="grid grid-2" style={{ gap: 10 }}>
              {[
                { icon: Smartphone, name: 'Phone Reviews', count: '2,845 reviews', tone: 'blue' },
                { icon: HeadphonesIcon, name: 'Audio Reviews', count: '1,432 reviews', tone: 'green' },
                { icon: Laptop, name: 'Laptop Reviews', count: '1,983 reviews', tone: 'purple' },
                { icon: Gamepad2, name: 'Gaming Reviews', count: '890 reviews', tone: 'red' },
                { icon: Watch, name: 'Smartwatch Reviews', count: '654 reviews', tone: 'cyan' },
                { icon: Camera, name: 'Camera Reviews', count: '512 reviews', tone: 'amber' },
              ].map((c) => (
                <div className="card card--flat card--hover center" key={c.name} style={{ padding: 12 }}>
                  <IconTile tone={c.tone} size={36} style={{ margin: '0 auto' }}><c.icon size={16} /></IconTile>
                  <b className="tiny mt-8" style={{ display: 'block' }}>{c.name}</b>
                  <span className="tiny muted-2">{c.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-12">
              <h3 className="small bold">Reviews From Buyers Across Nigeria</h3>
              <span className="view-all tiny">View all locations</span>
            </div>
            <div className="flex-col gap-8">
              {CITY_REVIEWS.map((c) => (
                <div className="data-row" key={c.city}>
                  <div style={{ flex: 1 }}>
                    <b className="small">{c.city}</b>
                    <span className="tiny muted-2" style={{ display: 'block' }}>{c.sub}</span>
                  </div>
                  <span className="badge badge--blue">{c.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-12">
              <h3 className="small bold">Buyer Photos &amp; Video Reviews</h3>
              <span className="view-all tiny">View all media</span>
            </div>
            <div className="flex-col gap-8">
              {BUYER_MEDIA.map((m, i) => (
                <div className="flex items-center gap-10" key={m}>
                  <span style={{ width: 48, borderRadius: 8, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                    <DeviceArt kind={(['earbuds', 'phone', 'watch', 'laptop', 'headphones'] as const)[i]} tone={(['silver', 'gold', 'dark', 'blue', 'purple'] as const)[i]} />
                  </span>
                  <div>
                    <b className="tiny">{m}</b>
                    <span className="tiny muted-2" style={{ display: 'block' }}>Real buyer media · with photos</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WRITE REVIEW + ASK AI + FAQ ──────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container grid grid-3">
          <div className="card">
            <h3 className="small bold">Bought a Gadget? Share Your Experience.</h3>
            <p className="tiny muted mt-4">Help other Nigerian buyers make safer and smarter gadget decisions.</p>
            <div className="grid grid-2 mt-12" style={{ gap: 8 }}>
              <div className="field">
                <label>Product name</label>
                <input className="input" placeholder="e.g. MacBook Air M3" style={{ padding: '9px 12px', fontSize: '0.8rem' }} />
              </div>
              <div className="field">
                <label>Where you bought it</label>
                <div className="select-wrap"><select className="select" style={{ padding: '9px 12px', fontSize: '0.8rem' }}><option>Select seller</option>{sellers.map((s) => <option key={s.id}>{s.name}</option>)}</select></div>
              </div>
              <div className="field">
                <label>Condition</label>
                <div className="select-wrap"><select className="select" style={{ padding: '9px 12px', fontSize: '0.8rem' }}><option>Select condition</option><option>Brand New</option><option>UK Used</option><option>Open Box</option></select></div>
              </div>
              <div className="field">
                <label>Your rating</label>
                <div className="flex items-center gap-4" style={{ padding: '8px 0' }}>
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={17} color="#fbbf24" fill={i <= 4 ? '#fbbf24' : 'none'} style={{ cursor: 'pointer' }} />)}
                </div>
              </div>
            </div>
            <div className="grid grid-2 mt-8" style={{ gap: 8 }}>
              <div className="field">
                <label>What did you like?</label>
                <textarea className="textarea" rows={2} placeholder="Battery, speed, camera…" style={{ fontSize: '0.8rem' }} />
              </div>
              <div className="field">
                <label>What should buyers watch out for?</label>
                <textarea className="textarea" rows={2} placeholder="Ports, heat, price…" style={{ fontSize: '0.8rem' }} />
              </div>
            </div>
            <div className="flex gap-8 mt-12">
              <button className="btn btn--outline btn--sm" style={{ flex: 1 }}><Upload size={13} /> Add photos or videos</button>
              <div className="select-wrap" style={{ flex: 1 }}>
                <select className="select" style={{ padding: '8px 12px', fontSize: '0.78rem' }}><option>Select your location</option><option>Lagos</option><option>Abuja</option></select>
              </div>
            </div>
            <button className="btn btn--primary btn--block mt-12">Write a Review</button>
            <p className="tiny muted-2 mt-8 center">Reviews may be checked for authenticity before appearing publicly.</p>
          </div>

          <div className="ai-panel">
            <div className="flex items-center gap-10">
              <Robot size={48} />
              <h3 style={{ fontSize: '0.95rem' }}>Ask GadgetHub AI About Reviews</h3>
            </div>
            <input className="input mt-12" placeholder="Ask about product reviews, complaints, ratings, or buyer experiences…" />
            <div className="flex-col gap-6 mt-10">
              {['What are people saying about MacBook Air M3?', 'What complaints do iPhone owners mention most?',
                'Are UK used laptops getting good reviews?', 'Which gadget has the fewest complaints?',
                'Which seller has the best buyer reviews?'].map((q) => (
                <button key={q} className="ai-chip" style={{ fontSize: '0.7rem' }} onClick={() => navigate(`/ai-advisor?q=${encodeURIComponent(q)}`)}>{q}</button>
              ))}
            </div>
            <Link to="/ai-advisor" className="btn btn--primary btn--block btn--sm mt-12"><Sparkles size={13} /> Ask AI</Link>
            <p className="tiny muted-2 mt-8 center">AI insights based on verified owner reviews and real buyer feedback.</p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-12">
              <h3 className="small bold">Frequently Asked Questions</h3>
              <span className="view-all tiny">View all FAQs</span>
            </div>
            <div className="flex-col">
              {FAQS.map((f) => (
                <div className="flex items-center justify-between small muted" key={f} style={{ padding: '9px 0', borderBottom: '1px solid var(--border)' }}>
                  {f} <ArrowRight size={12} style={{ flexShrink: 0 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PageCta
        title="Know What Real Owners Think Before You Buy."
        subtitle="Read verified reviews, compare complaints, ask GadgetHub AI, and make a safer gadget decision."
        footItems={['Verified owner feedback', 'Buyer photos included', 'Common complaints tracked', 'Built for Nigerian gadget buyers']}
      />
    </>
  );
}

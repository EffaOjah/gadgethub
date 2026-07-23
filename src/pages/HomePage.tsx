import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles, Mic, Bot, BadgeCheck, Store, MessageCircle, Star,
  GraduationCap, Clapperboard, Gamepad2, Briefcase, Camera, Plane, Baby,
  Wallet, ArrowRight, MapPin, ThumbsUp, CheckCircle2, ChevronRight,
  TrendingUp, ShieldCheck, History, HeartHandshake,
} from 'lucide-react';
import LiveTicker from '../components/layout/LiveTicker';
import ProductCard from '../components/ProductCard';
import { Avatar, ConfidenceRing, DeviceArt, Robot, Stars, IconTile } from '../components/ui';
import { trendingProducts, productBySlug } from '../data/products';
import { sellers } from '../data/sellers';
import { featuredReview } from '../data/reviews';
import { discussions } from '../data/community';
import { guides } from '../data/guides';
import { platformStats, homeTicker } from '../data/stats';
import { subscribeNewsletter } from '../services';
import { formatNumber } from '../lib/format';

const TRY_CHIPS = ['Best laptop for architecture', 'iPhone vs Samsung', 'Gaming laptop under ₦800k', 'Earbuds with best battery'];

const PURPOSES = [
  { icon: GraduationCap, label: 'For Students', sub: 'Study smarter' },
  { icon: Clapperboard, label: 'For Creators', sub: 'Make amazing content' },
  { icon: Gamepad2, label: 'For Gamers', sub: 'Play without limits' },
  { icon: Briefcase, label: 'For Business', sub: 'Work more efficiently' },
  { icon: Camera, label: 'For Photography', sub: 'Capture like a pro' },
  { icon: Plane, label: 'For Travel', sub: 'Light. Smart. Ready.' },
  { icon: Baby, label: 'For Kids', sub: 'Safe & fun tech' },
  { icon: Wallet, label: 'Budget Buyers', sub: 'Get the best value' },
];

const TABS = ['All', 'Phones', 'Laptops', 'Smartwatches', 'Audio', 'Cameras'];

const ENGINE_STEPS = [
  { num: '1', title: 'Reviews', sub: 'We analyze reviews from verified owners.' },
  { num: '2', title: 'Sentiment', sub: 'We understand owner sentiment and feedback.' },
  { num: '3', title: 'Performance', sub: 'We check real-world performance data.' },
  { num: '4', title: 'Price History', sub: 'We check price trends and market value.' },
  { num: '5', title: 'Seller Trust', sub: 'We verify seller reliability and after-sales support.' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [askInput, setAskInput] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const macbook = productBySlug('macbook-air-m3')!;
  const dell = productBySlug('dell-xps-13')!;

  const filteredTrending =
    activeTab === 'All'
      ? trendingProducts
      : trendingProducts.filter((p) =>
          p.categoryLabel.toLowerCase().includes(activeTab.toLowerCase().replace(/s$/, '')) ||
          p.category === activeTab.toLowerCase());

  const submitAsk = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/ai-advisor?q=${encodeURIComponent(askInput || 'What gadget should I buy?')}`);
  };

  const submitNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    await subscribeNewsletter(email);
    setSubscribed(true);
  };

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="home-hero">
        <div className="container home-hero__grid">
          <div>
            <span className="eyebrow">AI-Powered. People-Driven. Always Honest.</span>
            <h1>
              Stop Guessing.<br />
              Start <span className="g">Buying Right.</span>
            </h1>
            <p className="lede">
              Ask AI. Compare real reviews. Check trusted sellers. Buy the right
              gadget the first time.
            </p>

            <form className="ask-box" onSubmit={submitAsk}>
              <div className="ask-box__row">
                <input
                  className="input"
                  placeholder="What gadget are you thinking about?"
                  value={askInput}
                  onChange={(e) => setAskInput(e.target.value)}
                />
                <button type="button" className="nav__icon-btn" aria-label="Voice search"><Mic size={16} /></button>
                <button className="btn btn--primary" type="submit"><Sparkles size={15} /> Ask AI</button>
              </div>
              <div className="ask-box__try">
                <span>Try:</span>
                {TRY_CHIPS.map((c) => (
                  <button
                    key={c} type="button" className="chip"
                    onClick={() => navigate(`/ai-advisor?q=${encodeURIComponent(c)}`)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </form>

            <div className="home-hero__features">
              <div className="home-hero__feature">
                <IconTile tone="blue" size={36}><Bot size={17} /></IconTile>
                <div><b>AI-Powered Recommendations</b><span>Smart. Fast. Unbiased.</span></div>
              </div>
              <div className="home-hero__feature">
                <IconTile tone="green" size={36}><BadgeCheck size={17} /></IconTile>
                <div><b>Real Owner Reviews</b><span>From verified users</span></div>
              </div>
              <div className="home-hero__feature">
                <IconTile tone="purple" size={36}><ShieldCheck size={17} /></IconTile>
                <div><b>Trusted Seller Network</b><span>Vetted. Reliable. Local.</span></div>
              </div>
            </div>
          </div>

          {/* AI Recommendation card */}
          <div className="reco-card">
            <div className="reco-card__head">
              <span className="left"><Bot size={15} className="blue" /> AI RECOMMENDATION</span>
              <span className="reco-card__live"><span className="ticker__dot" /> Live</span>
            </div>
            <span><span className="badge badge--solid-green">Top Pick</span></span>
            <DeviceArt kind="laptop" tone="blue" />
            <h3>{macbook.name} (2024)</h3>
            <p className="reco-card__sub">Best Overall Laptop</p>
            <div className="reco-card__metrics">
              <div className="reco-card__metric">
                <b className="green">{macbook.confidence}%</b>
                <span>Confidence Score<br />High Confidence</span>
              </div>
              <div className="reco-card__metric">
                <b>{macbook.rating}<span className="muted-2" style={{ fontSize: '0.8rem' }}>/5</span> <Star size={13} fill="#fbbf24" color="#fbbf24" style={{ display: 'inline' }} /></b>
                <span>Owner Sentiment<br />({macbook.reviewCount} reviews)</span>
              </div>
              <div className="reco-card__why">
                <b>Why it's recommended</b>
                <ul className="check-list" style={{ gap: 5 }}>
                  {macbook.highlights!.map((h) => (
                    <li key={h} style={{ fontSize: '0.68rem' }}><CheckCircle2 size={11} /> {h}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="reco-card__actions">
              <Link to={`/compare?a=${macbook.slug}`} className="btn btn--sm btn--outline">Compare</Link>
              <Link to="/reviews" className="btn btn--sm btn--outline">Read Reviews</Link>
              <Link to={`/product/${macbook.slug}`} className="btn btn--sm btn--primary">See All Options</Link>
            </div>
          </div>

          {/* Right stats column */}
          <div className="home-hero__stats">
            <div className="stat-row">
              <IconTile tone="blue" size={38}><Sparkles size={17} /></IconTile>
              <div><b>{formatNumber(platformStats.aiQuestionsToday)}</b><span>AI questions answered today</span></div>
            </div>
            <div className="stat-row">
              <IconTile tone="amber" size={38}><Star size={17} /></IconTile>
              <div><b>{formatNumber(platformStats.ownerReviews)}</b><span>Real owner reviews</span></div>
            </div>
            <div className="stat-row">
              <IconTile tone="purple" size={38}><MessageCircle size={17} /></IconTile>
              <div><b>{formatNumber(platformStats.activeDiscussions)}</b><span>Active discussions</span></div>
            </div>
            <div className="stat-row">
              <IconTile tone="green" size={38}><Store size={17} /></IconTile>
              <div><b>{platformStats.verifiedSellers}</b><span>Verified sellers</span></div>
            </div>
            <div className="online-card">
              <span className="avatar-stack">
                {['Ada O', 'Tunde K', 'Chioma N', 'David E'].map((n) => <Avatar key={n} name={n} size="sm" />)}
              </span>
              <span><b className="green">{platformStats.onlineNow}</b> People online now</span>
              <span className="ticker__dot" style={{ marginLeft: 'auto' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVE TICKER ──────────────────────────────────────── */}
      <LiveTicker
        label="Live Now"
        items={homeTicker.slice(0, 4)}
        countText={{ value: '42', text: 'users online asking questions right now' }}
      />

      {/* ── EXPLORE BY PURPOSE ───────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="center mb-20">
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '0.05em' }}>EXPLORE BY PURPOSE</h2>
            <p className="muted small mt-8">Find the right gadget for your world, not just the specs.</p>
          </div>
          <div className="purpose-grid">
            {PURPOSES.map((p) => (
              <Link key={p.label} to={`/search?q=${encodeURIComponent(p.label)}`} className="purpose-card">
                <IconTile tone="blue" size={40} style={{ margin: '0 auto' }}><p.icon size={19} /></IconTile>
                <b>{p.label}</b>
                <span>{p.sub}</span>
              </Link>
            ))}
          </div>
          <div className="center mt-16">
            <Link to="/search" className="view-all">View all <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>

      {/* ── TRENDING GADGETS ─────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg-raise)' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Trending Gadgets</h2>
              <p className="sub">Top picks based on real research, reviews and our AI confidence score.</p>
            </div>
            <div className="tabs">
              {TABS.map((t) => (
                <button key={t} className={`tab${activeTab === t ? ' tab--active' : ''}`} onClick={() => setActiveTab(t)}>
                  {t}
                </button>
              ))}
              <Link to="/category/laptops" className="tab">More ▾</Link>
            </div>
          </div>
          <div className="trending-grid">
            {filteredTrending.map((p) => (
              <ProductCard key={p.id} product={p} showRank />
            ))}
          </div>
          <div className="center mt-24">
            <Link to="/category/laptops" className="btn btn--outline-blue">View all trending gadgets <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      {/* ── COMPARE / CONFIDENCE / REVIEWS ───────────────────── */}
      <section className="section">
        <div className="container grid grid-3">
          {/* Compare gadgets */}
          <div className="card">
            <div className="section-head" style={{ marginBottom: 12 }}>
              <h2 style={{ fontSize: '0.95rem' }}>Compare Gadgets</h2>
              <Link to="/compare" className="view-all">View all</Link>
            </div>
            <p className="muted small mb-16">See the real differences side by side.</p>
            <div className="vs-row">
              <div className="vs-item">
                <DeviceArt kind="laptop" tone="blue" />
                <b>{macbook.name}</b>
              </div>
              <span className="vs-badge">VS</span>
              <div className="vs-item">
                <DeviceArt kind="laptop" tone="purple" />
                <b>{dell.name}</b>
              </div>
            </div>
            <div className="mt-16">
              {[
                { label: 'Performance', a: 9.2, b: 8.3 },
                { label: 'Battery Life', a: 9.5, b: 8.1 },
                { label: 'Display', a: 8.8, b: 9.4 },
                { label: 'Portability', a: 9.4, b: 8.9 },
                { label: 'Price', a: 8.2, b: 8.7 },
              ].map((row) => (
                <div className="attr-row" key={row.label}>
                  <b>{row.label}</b>
                  <span className="flex items-center gap-10">
                    <span className="green bold">{row.a}</span>
                    <span className="muted-2">{row.b}</span>
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-8 mt-16">
              <Link to="/compare" className="btn btn--primary btn--sm" style={{ flex: 1 }}>Start Comparison</Link>
              <Link to="/compare" className="btn btn--outline btn--sm" style={{ flex: 1 }}>Popular comparisons →</Link>
            </div>
          </div>

          {/* Confidence score */}
          <div className="card card--glow">
            <h2 style={{ fontSize: '0.95rem', fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Confidence Score™
            </h2>
            <p className="muted small mt-8 mb-16">Our AI-powered score shows how much you can trust a gadget.</p>
            <div className="flex items-center gap-20 wrap">
              <ConfidenceRing value={93} size={130} />
              <ul className="check-list" style={{ flex: 1, minWidth: 170 }}>
                <li><CheckCircle2 size={14} /> Excellent performance</li>
                <li><CheckCircle2 size={14} /> Strong owner satisfaction</li>
                <li><CheckCircle2 size={14} /> Reliable after long-term use</li>
                <li><CheckCircle2 size={14} /> Good repair &amp; parts availability</li>
              </ul>
            </div>
            <Link to="/how-it-works" className="view-all mt-16" style={{ display: 'inline-flex' }}>
              How we calculate this score <ArrowRight size={13} />
            </Link>
          </div>

          {/* Latest honest reviews */}
          <div className="card">
            <div className="section-head" style={{ marginBottom: 12 }}>
              <h2 style={{ fontSize: '0.95rem' }}>Latest Honest Reviews</h2>
              <Link to="/reviews" className="view-all">View all</Link>
            </div>
            <p className="muted small mb-16">Real people. Real experiences. Real opinions.</p>
            <div className="review-card">
              <div className="review-card__head">
                <Avatar name={featuredReview.author} />
                <div className="review-card__who">
                  <b>
                    {featuredReview.author}
                    <span className="badge badge--green">Verified Owner</span>
                  </b>
                  <span>{featuredReview.productName} · {featuredReview.timeAgo}</span>
                </div>
                <span style={{ marginLeft: 'auto' }}><Stars rating={featuredReview.rating} size={11} /></span>
              </div>
              <p className="review-card__body">“{featuredReview.body}”</p>
              <div className="review-card__photos">
                {(['gold', 'blue', 'silver', 'purple'] as const).map((tone, i) => (
                  <span className="review-card__photo" key={i}>
                    <DeviceArt kind="phone" tone={tone} />
                  </span>
                ))}
                <span className="review-card__photo" style={{ display: 'grid', placeItems: 'center', background: 'var(--card-3)', fontSize: '0.7rem', color: 'var(--muted)' }}>+6</span>
              </div>
              <div className="review-card__foot">
                <button><ThumbsUp size={13} /> Helpful ({featuredReview.helpfulCount})</button>
                <Link to="/reviews" className="view-all">{featuredReview.commentCount} comments</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMUNITY / SELLERS / KNOWLEDGE HUB ──────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container grid grid-3">
          {/* Community pulse */}
          <div className="card">
            <div className="section-head" style={{ marginBottom: 12 }}>
              <h2 style={{ fontSize: '0.95rem' }}>Community Pulse</h2>
              <Link to="/community" className="view-all">View all</Link>
            </div>
            <p className="muted small mb-12">Real questions. Real people. Real answers.</p>
            <div className="data-rows">
              {discussions.slice(0, 4).map((d) => (
                <div className="data-row" key={d.id}>
                  <Avatar name={d.author} size="sm" />
                  <div style={{ flex: 1 }}>
                    <Link to="/community" className="text-soft bold" style={{ fontSize: '0.78rem', display: 'block' }}>
                      {d.title}
                    </Link>
                    <span className="muted-2 tiny">
                      {d.tags[0]} · {d.answers} replies · {d.views} views
                    </span>
                  </div>
                  <span className="muted-2 tiny">{d.timeAgo}</span>
                </div>
              ))}
            </div>
            <Link to="/community" className="btn btn--primary btn--block btn--sm mt-16">Ask a Question</Link>
          </div>

          {/* Trusted sellers near you */}
          <div className="card">
            <div className="section-head" style={{ marginBottom: 12 }}>
              <h2 style={{ fontSize: '0.95rem' }}>Trusted Sellers Near You</h2>
              <Link to="/sellers" className="view-all">View all</Link>
            </div>
            <p className="muted small mb-12">Verified sellers. Real stores. Better peace of mind.</p>
            <div className="flex gap-12" style={{ alignItems: 'stretch' }}>
              <div className="map-tile" style={{ flex: 1 }}>
                <span className="map-tile__road" style={{ left: '12%', top: '30%', width: '70%', height: 4, transform: 'rotate(-9deg)' }} />
                <span className="map-tile__road" style={{ left: '46%', top: '8%', width: 4, height: '78%', transform: 'rotate(14deg)' }} />
                <span className="map-tile__road" style={{ left: '8%', top: '64%', width: '82%', height: 3, transform: 'rotate(5deg)' }} />
                <MapPin className="map-pin" style={{ left: '30%', top: '38%' }} size={24} />
                <MapPin className="map-pin" style={{ left: '58%', top: '56%' }} size={24} />
                <MapPin className="map-pin map-pin--red" style={{ left: '44%', top: '76%' }} size={24} />
                <span className="map-label" style={{ left: '10%', bottom: 10 }}>Lagos</span>
              </div>
              <div className="flex-col gap-8" style={{ flex: 1.2 }}>
                {sellers.slice(0, 3).map((s) => (
                  <Link to="/sellers" className="seller-row" key={s.id} style={{ padding: 9 }}>
                    <span className="seller-row__logo">{s.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
                    <div style={{ flex: 1 }}>
                      <b>{s.name}</b>
                      <span className="sub">{s.area} · ★ {s.rating} ({s.reviewCount})</span>
                      <span className="sub green">{s.verified ? 'Verified Seller' : ''} · {s.openStatus}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/sellers" className="btn btn--primary btn--block btn--sm mt-16">View more sellers on map</Link>
          </div>

          {/* Knowledge hub */}
          <div className="card">
            <div className="section-head" style={{ marginBottom: 12 }}>
              <h2 style={{ fontSize: '0.95rem' }}>Knowledge Hub</h2>
              <Link to="/knowledge-hub" className="view-all">View all</Link>
            </div>
            <p className="muted small mb-12">Learn before you buy.</p>
            <div className="data-rows">
              {[
                { g: guides[0], label: 'Buying Guide' },
                { g: guides[4], label: 'Comparison' },
                { g: guides[5], label: 'Safety Guide' },
                { g: guides[1], label: 'Explainer Guide' },
              ].map(({ g, label }) => (
                <div className="data-row" key={g.id}>
                  <span style={{ width: 44, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                    <DeviceArt kind={g.deviceKind} tone={g.imageTone} />
                  </span>
                  <div style={{ flex: 1 }}>
                    <Link to={`/knowledge-hub/guides/${g.slug}`} className="text-soft bold" style={{ fontSize: '0.78rem', display: 'block' }}>
                      {g.title}
                    </Link>
                    <span className="muted-2 tiny">{label}</span>
                  </div>
                  <ChevronRight size={14} className="muted-2" />
                </div>
              ))}
            </div>
            <Link to="/knowledge-hub" className="btn btn--primary btn--block btn--sm mt-16">Explore all guides →</Link>
          </div>
        </div>
      </section>

      {/* ── AI DECISION ENGINE ───────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg-raise)' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <h2>The GadgetHub AI Decision Engine</h2>
              <p className="sub">Our AI analyzes thousands of data points to give you recommendations you can trust.</p>
            </div>
          </div>
          <div className="engine-flow">
            {ENGINE_STEPS.map((s, i) => (
              <div key={s.num} style={{ display: 'contents' }}>
                <div className="engine-step">
                  <span className="engine-step__num">{s.num}</span>
                  <IconTile tone={['amber', 'purple', 'blue', 'cyan', 'green'][i]} size={30} style={{ float: 'right' }}>
                    {[<Star size={14} key="s" />, <HeartHandshake size={14} key="h" />, <TrendingUp size={14} key="t" />, <History size={14} key="hi" />, <ShieldCheck size={14} key="sh" />][i]}
                  </IconTile>
                  <b>{s.title}</b>
                  <span>{s.sub}</span>
                </div>
                <ChevronRight className="engine-arrow" size={16} />
              </div>
            ))}
            <div className="engine-result">
              <IconTile tone="blue" size={44}><CheckCircle2 size={22} /></IconTile>
              <div>
                <b style={{ fontSize: '0.8rem', display: 'block' }}>AI RECOMMENDATION</b>
                <span className="muted tiny">You get the best recommendation.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER CTA ───────────────────────────────────── */}
      <section className="newsletter">
        <div className="container newsletter__grid">
          <div>
            <h2>
              Your Smartest<br />
              <span className="g green">Gadget Decision</span><br />
              Starts with <span className="b">GadgetHub.</span>
            </h2>
            <p className="muted small mt-12">AI insights. Real reviews. Trusted sellers. All in one place.</p>
            <div className="store-badges">
              <a href="#" className="store-badge" onClick={(e) => e.preventDefault()}>
                <Robot size={22} />
                <span><small>GET IT ON</small><b>Google Play</b></span>
              </a>
              <a href="#" className="store-badge" onClick={(e) => e.preventDefault()}>
                <Robot size={22} />
                <span><small>Download on the</small><b>App Store</b></span>
              </a>
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Stay ahead. Buy smarter.</h3>
            <p className="muted small mt-4">Get weekly guides, reviews and best deals.</p>
            {subscribed ? (
              <div className="callout callout--green mt-16 flex items-center gap-10">
                <CheckCircle2 size={18} className="green" /> You're in! Welcome to 25,000+ smart gadget buyers.
              </div>
            ) : (
              <form className="newsletter__form" onSubmit={submitNewsletter}>
                <input
                  className="input" type="email" required
                  placeholder="Enter your email address"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />
                <button className="btn btn--green" type="submit">Subscribe Free</button>
              </form>
            )}
            <div className="flex items-center gap-10 mt-12 muted tiny">
              <span className="avatar-stack">
                {['Ngozi A', 'Sam O', 'Bola T', 'Kachi E'].map((n) => <Avatar key={n} name={n} size="sm" />)}
              </span>
              ⚡ Join 25,000+ smart gadget buyers
            </div>
            <ul className="check-list mt-16" style={{ gap: 7 }}>
              <li><CheckCircle2 size={13} /> No spam. Ever.</li>
              <li><CheckCircle2 size={13} /> Helpful, not promotional</li>
              <li><CheckCircle2 size={13} /> Unsubscribe anytime</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

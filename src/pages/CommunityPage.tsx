import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles, MessageCircle, ShieldCheck, Award, ThumbsUp,
  Smartphone, Laptop, Headphones, Gamepad2, Watch, Camera, Store, Wrench,
  AlertTriangle, BookOpen, CheckCircle2, Flame, Search, Bot,
} from 'lucide-react';
import LiveTicker from '../components/layout/LiveTicker';
import { Avatar, DeviceArt, IconTile } from '../components/ui';
import { contributors, communityCategories } from '../data/community';
import { getDiscussionsPage } from '../services';
import type { Discussion } from '../types';

const POPULAR_QUESTIONS = [
  'Best phone for video editing under ₦900k?', 'Is UK used iPhone safe?', 'MacBook Air M3 or Dell XPS 13?',
  'Where can I repair MacBook in Lagos?', 'Best gaming laptop under ₦1.5M?', 'How do I avoid fake AirPods?',
  'Which seller is trusted in Ikeja?',
];

const FILTER_CATEGORIES = ['All Discussions', 'Phones', 'Laptops', 'Audio', 'Gaming', 'Smartwatches', 'Cameras', 'Sellers', 'Repairs', 'Scams', 'Buying Advice'];
const FILTER_STATUS = ['All', 'Answered', 'Unanswered', 'AI Summarized', 'Verified Owner Replies'];
const SORTS = ['Most Helpful', 'Newest First', 'Most Answered', 'Trending Now', 'Most Viewed', 'Needs Answers'];

const CAT_TILE_ICONS: Record<string, React.ElementType> = {
  Phones: Smartphone, Laptops: Laptop, Audio: Headphones, Gaming: Gamepad2,
  Smartwatches: Watch, Cameras: Camera, Sellers: Store, Repairs: Wrench,
  Scams: AlertTriangle, 'Buying Advice': BookOpen,
};

const TRENDING_QUESTIONS = [
  ['Is iPhone 16 Pro Max worth the price in Nigeria?', '42 answers · 1.8k views'],
  ['Best Android phone under ₦700k?', '31 answers · 960 views'],
  ['MacBook Air M3 vs MacBook Pro M3?', '24 answers · 758 views'],
  ['Best laptop for architecture students?', '19 answers · 640 views'],
  ['Where can I buy original AirPods in Lagos?', '28 answers · 1.1k views'],
  ['Is Samsung S24 Ultra too big for daily use?', '17 answers · 520 views'],
  ['Best smartwatch for fitness under ₦150k?', '14 answers · 431 views'],
  ['How do I avoid fake chargers?', '22 answers · 812 views'],
];

const AI_SUMMARIES = [
  { title: 'UK Used iPhones', kind: 'phone' as const, tone: 'blue' as const, sub: 'Safe if battery health, Face ID, serial number, parts history and seller trust are checked.', advice: ['Check battery health', 'Confirm Face ID', 'Avoid locked devices', 'Buy from verified sellers'] },
  { title: 'Student Laptops Under ₦800k', kind: 'laptop' as const, tone: 'purple' as const, sub: 'Prioritize battery life, keyboard, RAM, SSD and warranty over design and brand.', advice: ['At least 8GB RAM', 'SSD storage', 'Good battery', 'Reliable seller'] },
  { title: 'Fake AirPods & Accessories', kind: 'earbuds' as const, tone: 'silver' as const, sub: 'Check serial, sound, noise cancelation, packaging and price before paying.', advice: ['Avoid unrealistic prices', 'Test before paying', 'Check reviews', 'Compare packaging'] },
];

const SAFETY = [
  { icon: ShieldCheck, title: 'Verified owner badges', sub: 'Answers from people with confirmed experience.' },
  { icon: ThumbsUp, title: 'Helpful answer ranking', sub: 'Most useful answers rise based on community votes.' },
  { icon: Bot, title: 'AI discussion summaries', sub: 'AI summarizes long discussions for faster understanding.' },
  { icon: AlertTriangle, title: 'Scam warning labels', sub: 'Suspicious topics or sellers are marked for caution.' },
  { icon: Store, title: 'Seller mention tracking', sub: 'Seller mentions link to verified seller profiles.' },
];

export default function CommunityPage() {
  const navigate = useNavigate();

  // Paged discussions — GET /api/community/discussions?page=&pageSize=
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [discussionsPage, setDiscussionsPage] = useState(1);
  const [hasMoreDiscussions, setHasMoreDiscussions] = useState(false);
  const [loadingDiscussions, setLoadingDiscussions] = useState(false);

  useEffect(() => {
    let active = true;
    getDiscussionsPage(1).then((p) => {
      if (!active) return;
      setDiscussions(p.items);
      setHasMoreDiscussions(p.hasMore);
    });
    return () => { active = false; };
  }, []);

  const loadMoreDiscussions = async () => {
    setLoadingDiscussions(true);
    const p = await getDiscussionsPage(discussionsPage + 1);
    setDiscussions((prev) => [...prev, ...p.items]);
    setDiscussionsPage(p.page);
    setHasMoreDiscussions(p.hasMore);
    setLoadingDiscussions(false);
  };

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="container page-hero__grid">
          <div>
            <span className="eyebrow">Gadget Community</span>
            <h1>Ask Real Gadget Questions <span className="accent-green">Before You Buy.</span></h1>
            <p className="lede">
              Join conversations with Nigerian gadget buyers, verified owners, sellers
              and GadgetHub AI. Ask anything and get honest answers.
            </p>

            <div className="search-panel mt-20">
              <h3>What do you want to ask?</h3>
              <div className="search-input-wrap mb-12">
                <Search size={16} />
                <input className="input" placeholder="Ask about a phone, laptop, seller, price, repair, or buying decision…" />
              </div>
              <div className="row mb-12">
                <div className="field" style={{ flex: 1 }}>
                  <label>Category</label>
                  <div className="select-wrap"><select className="select"><option>All Categories</option>{FILTER_CATEGORIES.slice(1).map((c) => <option key={c}>{c}</option>)}</select></div>
                </div>
                <div className="field" style={{ flex: 1 }}>
                  <label>Location</label>
                  <div className="select-wrap"><select className="select"><option>All Locations</option><option>Lagos</option><option>Abuja</option><option>Port Harcourt</option><option>Ibadan</option></select></div>
                </div>
              </div>
              <div className="row">
                <button className="btn btn--primary" style={{ flex: 1 }}><MessageCircle size={15} /> Ask the Community</button>
                <Link to="/ai-advisor" className="btn btn--outline" style={{ flex: 1 }}><Sparkles size={15} /> Ask GadgetHub AI First</Link>
              </div>
              <p className="tiny muted-2 mt-12">Popular questions</p>
              <div className="flex wrap gap-8 mt-8">
                {POPULAR_QUESTIONS.map((c) => (
                  <button key={c} className="chip" onClick={() => navigate(`/ai-advisor?q=${encodeURIComponent(c)}`)}>{c}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Community pulse */}
          <div className="ai-panel">
            <div className="flex items-center justify-between">
              <h3>Community Pulse</h3>
              <span className="reco-card__live"><span className="ticker__dot" /> Live now</span>
            </div>
            <div className="grid grid-4 mt-16" style={{ gap: 10 }}>
              {[
                { icon: MessageCircle, tone: 'blue', v: '1,842', l: 'Active discussions today' },
                { icon: CheckCircle2, tone: 'green', v: '368', l: 'Questions answered today' },
                { icon: ShieldCheck, tone: 'purple', v: '912', l: 'Verified owner replies' },
                { icon: Award, tone: 'amber', v: '245', l: 'Helpful answers marked' },
              ].map((s) => (
                <div className="center" key={s.l}>
                  <IconTile tone={s.tone} size={44} style={{ margin: '0 auto', borderRadius: '50%' }}><s.icon size={19} /></IconTile>
                  <b style={{ display: 'block', fontSize: '1.1rem', marginTop: 8 }}>{s.v}</b>
                  <span className="tiny muted-2">{s.l}</span>
                </div>
              ))}
            </div>
            <div className="card card--flat mt-16" style={{ padding: 14 }}>
              <span className="flex items-center gap-8 tiny amber bold"><Flame size={13} /> Trending now</span>
              <b className="small mt-8" style={{ display: 'block' }}>Is the iPhone 16 Pro Max worth it over Samsung S24 Ultra?</b>
              <div className="flex items-center gap-10 mt-8">
                <span className="avatar-stack">
                  {['Ada U', 'Tunde B', 'Ken O'].map((n) => <Avatar key={n} name={n} size="sm" />)}
                </span>
                <span className="tiny muted-2">17 answers · 92% helpful</span>
              </div>
              <p className="tiny muted-2 mt-12">AI Summary Preview</p>
              <p className="tiny muted mt-4" style={{ lineHeight: 1.6 }}>
                Most buyers prefer iPhone for video quality and resale value, while Samsung wins
                for zoom camera, display and multitasking. The better choice depends on your
                camera style, budget and Android or iOS preference.
              </p>
              <div className="flex gap-6 mt-8 wrap">
                <span className="badge badge--green">✦ AI Summary</span>
                <span className="badge badge--blue">✦ Verified Owner Replies</span>
              </div>
              <button className="btn btn--primary btn--block btn--sm mt-12">View Discussion →</button>
            </div>
          </div>
        </div>
      </section>

      <LiveTicker
        label="Live Community Activity"
        feed="community"
        countText={{ value: '42', text: 'users discussing now' }}
      />

      {/* ── DISCUSSIONS + SIDEBARS ───────────────────────────── */}
      <section className="section">
        <div className="container dash-3">
          {/* Filters */}
          <aside className="filters-panel">
            <h3>Filters <button>Clear all</button></h3>
            <div>
              <label className="tiny muted-2 bold">CATEGORIES</label>
              <div className="flex-col gap-4 mt-8">
                {FILTER_CATEGORIES.map((c, i) => (
                  <button key={c} className={`chip${i === 0 ? ' chip--active' : ''}`} style={{ justifyContent: 'flex-start', borderRadius: 8 }}>{c}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="tiny muted-2 bold">STATUS</label>
              <div className="flex-col gap-4 mt-8">
                {FILTER_STATUS.map((c, i) => (
                  <button key={c} className={`chip${i === 0 ? ' chip--active' : ''}`} style={{ justifyContent: 'flex-start', borderRadius: 8 }}>{c}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="tiny muted-2 bold">SORT BY</label>
              <div className="flex-col gap-4 mt-8">
                {SORTS.map((c, i) => (
                  <button key={c} className={`chip${i === 0 ? ' chip--active' : ''}`} style={{ justifyContent: 'flex-start', borderRadius: 8 }}>{c}</button>
                ))}
              </div>
            </div>
          </aside>

          {/* Discussion list */}
          <div className="card">
            <div className="section-head" style={{ marginBottom: 8 }}>
              <div>
                <h2 style={{ fontSize: '1rem', textTransform: 'none' }}>Community Discussions</h2>
                <p className="sub">Real questions from Nigerian gadget buyers, owners and tech shoppers.</p>
              </div>
              <Link to="/community" className="view-all tiny">View all discussions</Link>
            </div>
            {discussions.map((d) => (
              <div className="discussion-row" key={d.id}>
                <Avatar name={d.author} />
                <div style={{ flex: 1 }}>
                  <span className="tiny muted-2">{d.author} · {d.location}</span>
                  <h3><Link to="/community">{d.title}</Link></h3>
                  <div className="discussion-row__tags">
                    {d.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                  </div>
                  <div className="discussion-row__badges">
                    {d.badges.map((b) => (
                      <span key={b} className={`badge badge--${b.includes('Scam') || b.includes('Warning') ? 'red' : b.includes('AI') ? 'purple' : b.includes('Safety') ? 'amber' : 'green'}`}>✦ {b}</span>
                    ))}
                  </div>
                </div>
                <div className="discussion-row__stats">
                  <span><b>{d.answers}</b> answers</span>
                  <span><b>{d.helpful}</b> helpful</span>
                  <span><b>{d.views}</b> views</span>
                  <span>{d.timeAgo}</span>
                  <Link to="/community" className="btn btn--outline-blue btn--sm mt-4">View Discussion →</Link>
                </div>
              </div>
            ))}
            <div className="center mt-16">
              {hasMoreDiscussions ? (
                <button className="btn btn--outline" onClick={loadMoreDiscussions} disabled={loadingDiscussions}>
                  {loadingDiscussions ? 'Loading…' : 'Load More Discussions'}
                </button>
              ) : (
                discussions.length > 0 && <span className="tiny muted-2">All discussions loaded</span>
              )}
            </div>
          </div>

          {/* Insights sidebar */}
          <aside className="side-stack">
            <div className="card">
              <h3 className="small bold mb-12">Community Insights</h3>
              <div className="flex-col gap-10">
                {[
                  { tone: 'blue', l: 'Top Discussion Today', v: 'Is UK used iPhone safe?', icon: MessageCircle },
                  { tone: 'purple', l: 'Most Active Category', v: 'Phones', icon: Smartphone },
                  { tone: 'cyan', l: 'Most Asked Topic', v: 'Battery life', icon: Flame },
                  { tone: 'amber', l: 'Most Common Warning', v: 'Fake accessories', icon: AlertTriangle },
                  { tone: 'green', l: 'Top Contributor Today', v: 'Amaka from Lagos', icon: Award },
                  { tone: 'red', l: 'Most Discussed Location', v: 'Ikeja, Lagos', icon: Store },
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
              <h3 style={{ fontSize: '0.9rem' }}>Ask AI about community</h3>
              <input className="input mt-12" placeholder="Ask AI to summarize discussions…" />
              <div className="flex-col gap-6 mt-10">
                {['What are people saying about UK used iPhones?', 'Which phone is most recommended under ₦900k?',
                  'What scams are trending now?', 'Which laptop do students recommend?',
                  'What sellers are people talking about in Lagos?'].map((q) => (
                  <button key={q} className="ai-chip" style={{ fontSize: '0.7rem' }} onClick={() => navigate(`/ai-advisor?q=${encodeURIComponent(q)}`)}>{q}</button>
                ))}
              </div>
              <Link to="/ai-advisor" className="btn btn--primary btn--block btn--sm mt-12"><Sparkles size={13} /> Ask AI</Link>
            </div>
          </aside>
        </div>
      </section>

      {/* ── FEATURED / TRENDING / CATEGORIES ─────────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container grid grid-3">
          <div className="card card--glow">
            <div className="flex items-center justify-between mb-12">
              <h3 className="small bold">Featured Discussion</h3>
              <span className="badge badge--purple">✦ AI Summary Available</span>
            </div>
            <div style={{ borderRadius: 10, overflow: 'hidden' }}>
              <DeviceArt kind="phone" tone="gold" />
            </div>
            <b className="mt-12" style={{ display: 'block' }}>iPhone 16 Pro Max vs Samsung S24 Ultra. Which one should I buy?</b>
            <span className="tiny muted-2">Asked by Tunde from Abuja · 18h ago</span>
            <div className="flex gap-12 tiny muted mt-8">
              <span>💬 42 answers</span><span>👁 1.8k views</span><span>👍 312 helpful</span>
            </div>
            <p className="tiny muted mt-8" style={{ lineHeight: 1.6 }}>
              <b className="purple">AI Summary:</b> Choose iPhone if you care more about video
              quality, resale value and stability. Choose Samsung if you want better zoom,
              display, multitasking and Android flexibility.
            </p>
            <button className="btn btn--primary btn--block btn--sm mt-12">Read Full Discussion →</button>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-12">
              <h3 className="small bold">Trending Questions</h3>
              <span className="view-all tiny">View all trending</span>
            </div>
            <div className="flex-col gap-8">
              {TRENDING_QUESTIONS.map(([q, meta], i) => (
                <div className="flex gap-10" key={q} style={{ padding: '4px 0' }}>
                  <span className="engine-step__num" style={{ marginBottom: 0 }}>{i + 1}</span>
                  <div>
                    <b className="tiny" style={{ lineHeight: 1.4 }}>{q}</b>
                    <span className="tiny muted-2" style={{ display: 'block' }}>{meta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-12">
              <h3 className="small bold">Browse by Category</h3>
              <span className="view-all tiny">View all categories</span>
            </div>
            <div className="grid grid-2" style={{ gap: 10 }}>
              {communityCategories.map((c) => {
                const Icon = CAT_TILE_ICONS[c.name] ?? MessageCircle;
                return (
                  <div className="card card--flat card--hover center" key={c.name} style={{ padding: 14 }}>
                    <IconTile tone={c.tone} size={38} style={{ margin: '0 auto' }}><Icon size={16} /></IconTile>
                    <b className="tiny mt-8" style={{ display: 'block' }}>{c.name}</b>
                    <span className="tiny muted-2">{c.count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── AI SUMMARIES + CONTRIBUTORS ──────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split-2">
          <div className="card">
            <div className="flex items-center justify-between mb-12">
              <h3 className="small bold">GadgetHub AI Community Summaries</h3>
              <span className="view-all tiny">View all summaries</span>
            </div>
            <div className="grid grid-3" style={{ gap: 12 }}>
              {AI_SUMMARIES.map((s) => (
                <div className="card card--flat" key={s.title} style={{ padding: 12 }}>
                  <div style={{ borderRadius: 8, overflow: 'hidden' }}>
                    <DeviceArt kind={s.kind} tone={s.tone} />
                  </div>
                  <b className="small mt-8" style={{ display: 'block' }}>{s.title}</b>
                  <p className="tiny muted-2 mt-4" style={{ lineHeight: 1.5 }}>{s.sub}</p>
                  <p className="tiny muted-2 bold mt-8">Common advice</p>
                  <ul className="check-list mt-4" style={{ gap: 4 }}>
                    {s.advice.map((a) => <li key={a} style={{ fontSize: '0.66rem' }}><CheckCircle2 size={10} /> {a}</li>)}
                  </ul>
                  <button className="view-all tiny mt-8" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>View Discussions →</button>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-12">
              <h3 className="small bold">Top Contributors</h3>
              <span className="view-all tiny">View all contributors</span>
            </div>
            <div className="grid grid-5" style={{ gap: 10 }}>
              {contributors.map((c) => (
                <div className="contributor-card" key={c.id}>
                  <Avatar name={c.name} size="lg" />
                  <b>{c.name}</b>
                  <span className="loc">{c.location}</span>
                  <span className={`badge badge--${c.badge === 'Scam Watch' ? 'red' : c.badge === 'Budget Expert' ? 'amber' : 'green'}`} style={{ fontSize: '0.54rem' }}>✦ {c.badge}</span>
                  <span className="answers"><b>{c.helpfulAnswers}</b> <span className="tiny muted-2">helpful answers</span></span>
                  <span className="topics">Top: {c.topics}</span>
                  <button className="btn btn--primary btn--sm btn--block">Follow</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA BAND ──────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container grid grid-3">
          <div className="card">
            <h3 className="small bold">Ask the GadgetHub Community</h3>
            <p className="tiny muted mt-8">Get help from real owners, buyers and GadgetHub AI.</p>
            <div className="flex gap-8 mt-16">
              <button className="btn btn--primary btn--sm" style={{ flex: 1 }}>Ask a Question</button>
              <Link to="/ai-advisor" className="btn btn--outline btn--sm" style={{ flex: 1 }}><Sparkles size={13} /> Ask AI First</Link>
            </div>
          </div>
          <div className="ai-panel">
            <h3 style={{ fontSize: '0.9rem' }}>Ask GadgetHub AI About Community</h3>
            <input className="input mt-12" placeholder="Ask about discussions, advice, scams, sellers or products…" />
            <div className="flex-col gap-6 mt-10">
              {['What are people saying about iPhone 16 Pro Max?', 'Which phone is most recommended under ₦900k?',
                'What scams are trending in the community?', 'Which laptop is best for students?',
                'What sellers are people discussing in Lagos?'].map((q) => (
                <button key={q} className="ai-chip" style={{ fontSize: '0.68rem' }} onClick={() => navigate(`/ai-advisor?q=${encodeURIComponent(q)}`)}>{q}</button>
              ))}
            </div>
            <Link to="/ai-advisor" className="btn btn--primary btn--block btn--sm mt-12"><Sparkles size={13} /> Ask AI</Link>
          </div>
          <div className="card">
            <h3 className="small bold mb-12">Community Safety &amp; Trust</h3>
            <div className="flex-col gap-10">
              {SAFETY.map((s) => (
                <div className="flex gap-10" key={s.title}>
                  <IconTile tone="green" size={32}><s.icon size={15} /></IconTile>
                  <div>
                    <b className="tiny" style={{ display: 'block' }}>{s.title}</b>
                    <span className="tiny muted-2" style={{ lineHeight: 1.45 }}>{s.sub}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="callout callout--amber mt-12" style={{ padding: '8px 12px', fontSize: '0.66rem' }}>
              ⚠ Always verify warranty, condition and seller identity before paying.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import { Link, useNavigate } from 'react-router-dom';
import {
  Search, Sparkles, BookOpen, ShieldCheck, GitCompareArrows, Lightbulb,
  Store, Wrench, Wallet, BookMarked, AlertTriangle, ArrowRight, CheckCircle2,
  Smartphone, Headphones, Zap, UserX, Ban, GraduationCap, Clapperboard,
  Gamepad2, Briefcase, Baby, Plane, Hammer,
} from 'lucide-react';
import LiveTicker from '../components/layout/LiveTicker';
import { DeviceArt, Robot, IconTile } from '../components/ui';
import { guides, latestFromHub, hubCategories } from '../data/guides';
import { learningTicker } from '../data/stats';

const POPULAR_TOPICS = [
  'How much RAM do I need?', 'How to spot fake AirPods', 'Best laptop for students',
  'MacBook vs Windows laptops', 'How to check iPhone battery health', 'Brand new vs UK used',
  'How to avoid gadget scams', 'What to check before payment',
];

const CAT_ICONS: Record<string, React.ElementType> = {
  guide: BookOpen, shield: ShieldCheck, compare: GitCompareArrows, book: Lightbulb,
  store: Store, wrench: Wrench, wallet: Wallet, glossary: BookMarked,
};

const SCAM_TILES = [
  { icon: Smartphone, title: 'Fake iPhones', sub: 'Check IMEI, Face ID, True Tone, carrier lock, serial number, and parts history.' },
  { icon: Headphones, title: 'Fake AirPods', sub: 'Test noise cancelation, pairing behavior, serial behavior, sound quality, packaging, and trust.' },
  { icon: Zap, title: 'Fake Chargers', sub: 'Avoid low-quality chargers that cause charging problems, heat up, or create battery problems.' },
  { icon: UserX, title: 'Suspicious Sellers', sub: 'Check store location, reviews, warranty, restock, response behavior, and seller verification.' },
  { icon: Ban, title: 'Unrealistic Prices', sub: 'If the price is far below normal market range, treat it as a warning sign.' },
];

const PURPOSES = [
  { icon: GraduationCap, label: 'For Students', sub: 'Laptops, phones, tablets, budget buying, battery, school work' },
  { icon: Clapperboard, label: 'For Creators', sub: 'Camera phones, mics, lighting, storage, RAM' },
  { icon: Gamepad2, label: 'For Gamers', sub: 'Gaming laptops, cooling, graphics, refresh rate, controllers' },
  { icon: Briefcase, label: 'For Business Users', sub: 'Portable laptops, battery life, security, webcam, productivity' },
  { icon: Baby, label: 'For Parents', sub: 'Kids tablets, safe gadgets, study tools, budget devices' },
  { icon: Wallet, label: 'For Budget Buyers', sub: 'A seller or manufacturer priorities as a period' },
  { icon: Plane, label: 'For Travelers', sub: 'Battery life, portability, connectivity, power banks, smart devices' },
  { icon: Hammer, label: 'For Repairs', sub: 'Battery replacement, screen repair, laptop battery, trusted repair checks' },
];

const BUYER_QUESTIONS = [
  { q: 'Is UK used iPhone safe?', sub: 'Short answer and key things to check before buying.' },
  { q: 'What laptop is good for students?', sub: 'Best specs and features students should look for.' },
  { q: 'How much RAM do I need?', sub: 'Simple guide for everyday users and creators.' },
  { q: 'How do I check MacBook battery cycle count?', sub: 'Important quality check for used laptops.' },
  { q: 'Should I buy brand new or open box?', sub: 'Pros, cons, and when each option makes sense.' },
  { q: 'What should I ask a seller before payment?', sub: 'Important questions to stay safe.' },
  { q: 'How do I know if AirPods are fake?', sub: 'Check these signs before you pay.' },
  { q: 'Which phone camera is best for content creation?', sub: 'Top picks and features that matter.' },
];

const TOPICS = [
  ['iPhone', 342], ['Samsung', 296], ['MacBook', 314], ['Dell', 118], ['ASUS', 132], ['Sony', 148],
  ['Gaming laptops', 203], ['Battery', 214], ['Storage', 186], ['Battery health', 176], ['UK used', 214], ['Warranty', 134],
  ['Fake gadgets', 208], ['Seller safety', 139], ['Computer Village', 122], ['Phone repairs', 158], ['Laptop repairs', 212],
  ['Budget gadgets', 211], ['Student laptops', 189], ['Creator gadgets', 145],
];

const EDITOR_PICKS = [
  { title: "The complete Nigerian buyer's checklist before paying for any gadget", sub: 'Why it matters: Helps you avoid costly mistakes and buy with confidence.' },
  { title: 'How to know if a gadget price is too good to be true', sub: 'Why it matters: Unrealistic prices are the biggest scam red flag.' },
  { title: 'Best gadgets to buy brand new and which ones are safe UK used', sub: 'Why it matters: Save money without risking your safety.' },
  { title: 'How to compare seller warranty before buying', sub: 'Why it matters: Warranty can save you money and stress.' },
];

const FAQS = [
  'Is GadgetHub Knowledge Hub for beginners?',
  'Can GadgetHub AI explain gadget terms?',
  'Are the buying guides Nigeria market focused?',
  'Can I trust these guides before buying gadgets?',
];

export default function KnowledgeHubPage() {
  const navigate = useNavigate();
  const featured = guides[0];
  const ukGuide = guides.find((g) => g.slug === 'buying-a-uk-used-iphone-safely')!;

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="container page-hero__grid">
          <div>
            <span className="eyebrow">Gadget Knowledge Hub</span>
            <h1>Learn Before <span className="accent-green">You Buy.</span></h1>
            <p className="lede">
              Read simple buying guides, scam protection tips, gadget explainers,
              comparison guides, and AI-powered advice built for Nigerian gadget buyers.
            </p>

            <div className="search-panel mt-20">
              <h3>What do you want to learn?</h3>
              <div className="search-input-wrap mb-12">
                <Search size={16} />
                <input className="input" placeholder="Search buying guides, gadget terms, scams, specs, reviews, prices…" />
              </div>
              <div className="row mb-12">
                <div className="field" style={{ flex: 1 }}>
                  <label>Guide category</label>
                  <div className="select-wrap"><select className="select"><option>All Categories</option>{hubCategories.map((c) => <option key={c.name}>{c.name}</option>)}</select></div>
                </div>
                <div className="field" style={{ flex: 1 }}>
                  <label>Audience</label>
                  <div className="select-wrap"><select className="select"><option>All Audiences</option><option>Students</option><option>Creators</option><option>Business</option></select></div>
                </div>
              </div>
              <div className="row">
                <button className="btn btn--primary" style={{ flex: 1 }}><Search size={15} /> Search Guides</button>
                <Link to="/ai-advisor" className="btn btn--outline" style={{ flex: 1 }}><Sparkles size={15} /> Ask GadgetHub AI</Link>
              </div>
              <p className="tiny muted-2 mt-12">Popular topics</p>
              <div className="flex wrap gap-8 mt-8">
                {POPULAR_TOPICS.map((c) => (
                  <button key={c} className="chip" onClick={() => navigate(`/ai-advisor?q=${encodeURIComponent(c)}`)}>{c}</button>
                ))}
              </div>
            </div>

            <div className="feature-strip mt-20">
              <div className="feature-strip__item">
                <IconTile tone="green" size={38}><BookOpen size={17} /></IconTile>
                <div><b>Simple Buying Guides</b><span>Easy to understand</span></div>
              </div>
              <div className="feature-strip__item">
                <IconTile tone="amber" size={38}><ShieldCheck size={17} /></IconTile>
                <div><b>Scam Protection Tips</b><span>Stay safe, avoid losses</span></div>
              </div>
              <div className="feature-strip__item">
                <IconTile tone="blue" size={38}><Sparkles size={17} /></IconTile>
                <div><b>AI Explanations</b><span>Get simple answers</span></div>
              </div>
              <div className="feature-strip__item">
                <IconTile tone="purple" size={38}><CheckCircle2 size={17} /></IconTile>
                <div><b>Built for Nigerian Buyers</b><span>Local prices &amp; reality</span></div>
              </div>
            </div>
          </div>

          {/* AI Learning Assistant */}
          <div className="ai-panel">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-8">AI Learning Assistant <span className="reco-card__live"><span className="ticker__dot" /> Live</span></h3>
              <Robot size={72} />
            </div>
            <p className="tiny muted mt-8">Prompt example:</p>
            <button className="ai-chip mt-6" style={{ width: 'auto' }}>Explain RAM like I'm a beginner.*</button>
            <p className="tiny muted mt-12">AI answer preview:</p>
            <p className="small text-soft mt-6" style={{ lineHeight: 1.65 }}>
              RAM helps your gadget run apps smoothly. For basic browsing, school work,
              and office tasks, 8GB can work. For video editing, heavy multitasking,
              design, and future use, 16GB is safer.
            </p>
            <div className="flex wrap gap-6 mt-12">
              <span className="badge badge--green">✦ Simple explanation</span>
              <span className="badge badge--blue">✦ Buying advice</span>
              <span className="badge badge--purple">✦ Nigerian price context</span>
              <span className="badge badge--amber">✦ Beginner friendly</span>
            </div>
            <p className="tiny muted mt-12">Try these questions:</p>
            <div className="flex-col gap-6 mt-8">
              {['Is 8GB RAM enough?', 'What is battery health?', 'How do I avoid fake iPhones?', 'Should I buy UK used or brand new?'].map((q) => (
                <button key={q} className="ai-chip" onClick={() => navigate(`/ai-advisor?q=${encodeURIComponent(q)}`)}>› {q}</button>
              ))}
            </div>
            <Link to="/ai-advisor" className="btn btn--primary btn--block mt-16"><Sparkles size={14} /> Ask GadgetHub AI</Link>
          </div>
        </div>
      </section>

      <LiveTicker
        label="Live Learning Activity"
        items={learningTicker}
        countText={{ value: '42', text: 'users learning before buying now' }}
      />

      {/* ── EXPLORE CATEGORIES ───────────────────────────────── */}
      <section className="section" id="buying-guides">
        <div className="container">
          <div className="section-head section-head--title">
            <div>
              <h2>Explore Knowledge Hub</h2>
              <p className="sub">Guides, explainers, comparisons, and safety tips for smarter gadget decisions.</p>
            </div>
          </div>
          <div className="grid grid-4">
            {hubCategories.map((c) => {
              const Icon = CAT_ICONS[c.icon];
              const target = c.name === 'Glossary' ? '/glossary' : `/knowledge-hub#${c.name.toLowerCase().replace(/ /g, '-')}`;
              return (
                <Link to={target} className="card card--hover hub-cat-card" key={c.name}>
                  <IconTile tone={c.tone} size={40}><Icon size={18} /></IconTile>
                  <h3>{c.name}</h3>
                  <p>{c.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="tiny muted-2">{c.count}</span>
                    <span className="explore">Explore <ArrowRight size={12} /></span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── AI GUIDE SUMMARY + FEATURED ──────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }} id="scam-protection">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
          <div className="ai-panel">
            <div className="flex items-center gap-8">
              <h3>GadgetHub AI Guide Summary</h3>
              <span className="badge badge--green">✦ AI Summary</span>
            </div>
            <div className="flex gap-16 mt-16 wrap">
              <span style={{ width: 130, flexShrink: 0, borderRadius: 10, overflow: 'hidden' }}>
                <DeviceArt kind="phone" tone="blue" ratio="tall" />
              </span>
              <div style={{ flex: 1, minWidth: 240 }}>
                <b style={{ fontSize: '1.05rem' }}>Buying a UK Used iPhone Safely</b>
                <p className="small muted mt-8" style={{ lineHeight: 1.65 }}>{ukGuide.excerpt}</p>
                <p className="tiny muted-2 mt-12">Quick checklist:</p>
                <div className="flex wrap gap-6 mt-8">
                  {['Battery health', 'Face ID', 'Carrier history', 'True Tone', 'Warranty', 'Parts history', 'Seller verification'].map((c) => (
                    <span key={c} className="badge badge--green">✓ {c}</span>
                  ))}
                </div>
                <Link to={`/knowledge-hub/guides/${ukGuide.slug}`} className="btn btn--primary btn--sm mt-16">Read Full UK Used iPhone Guide</Link>
              </div>
            </div>
          </div>

          <div className="card">
            <span className="badge badge--green mb-8">Featured Guide</span>
            <div style={{ borderRadius: 10, overflow: 'hidden' }}>
              <DeviceArt kind={featured.deviceKind} tone={featured.imageTone} />
            </div>
            <b className="mt-12" style={{ display: 'block', fontSize: '1rem' }}>{featured.title}</b>
            <div className="flex gap-12 tiny muted-2 mt-8">
              <span>📖 {featured.readTime}</span><span>✦ Updated recently</span><span className="purple">✦ AI summary available</span>
            </div>
            <p className="tiny muted mt-8" style={{ lineHeight: 1.6 }}>
              Buying a laptop in Nigeria is not only about specs. You should check battery life,
              warranty, seller trust, RAM, storage, repair availability, and what you actually
              need the laptop for.
            </p>
            <div className="flex gap-8 mt-12">
              <Link to={`/knowledge-hub/guides/${featured.slug}`} className="btn btn--primary btn--sm" style={{ flex: 1 }}>Read Guide</Link>
              <Link to={`/ai-advisor?q=${encodeURIComponent(featured.title)}`} className="btn btn--outline btn--sm" style={{ flex: 1 }}>Ask AI About This Guide</Link>
            </div>
            <p className="tiny muted-2 mt-12">More featured guides</p>
            <div className="data-rows">
              {guides.slice(1, 4).map((g) => (
                <Link to={`/knowledge-hub/guides/${g.slug}`} className="data-row" key={g.id}>
                  <span style={{ width: 40, borderRadius: 6, overflow: 'hidden', flexShrink: 0 }}>
                    <DeviceArt kind={g.deviceKind} tone={g.imageTone} />
                  </span>
                  <div style={{ flex: 1 }}>
                    <b className="tiny">{g.title}</b>
                    <span className="tiny muted-2" style={{ display: 'block' }}>{g.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRENDING GUIDES ──────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg-raise)' }} id="comparison-guides">
        <div className="container">
          <div className="section-head section-head--title">
            <h2>Trending Buying Guides</h2>
            <Link to="/knowledge-hub" className="view-all">View all guides <ArrowRight size={13} /></Link>
          </div>
          <div className="grid grid-6" style={{ gap: 12 }}>
            {[guides[6], guides[7], guides[8], guides[9], guides[1], guides[10]].map((g) => (
              <Link to={`/knowledge-hub/guides/${g.slug}`} className="card card--hover guide-card" key={g.id}>
                <div style={{ position: 'relative' }}>
                  <DeviceArt kind={g.deviceKind} tone={g.imageTone} />
                  {g.badge && <span className={`badge badge--${g.badge.includes('Scam') || g.badge.includes('Safety') ? 'amber' : g.badge.includes('Comparison') ? 'purple' : 'green'}`} style={{ position: 'absolute', top: 6, left: 6, fontSize: '0.56rem' }}>{g.badge}</span>}
                </div>
                <div className="guide-card__body" style={{ padding: 10 }}>
                  <b className="tiny" style={{ lineHeight: 1.4 }}>{g.title}</b>
                  <p className="tiny muted-2" style={{ lineHeight: 1.45 }}>{g.excerpt.slice(0, 70)}…</p>
                  <div className="guide-card__meta">
                    <span>{g.readTime}</span>
                    <span className="blue">Read Guide</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCAM PROTECTION HUB ──────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="card" style={{ borderColor: 'var(--border-amber)' }}>
            <div className="flex items-center gap-10 mb-8">
              <IconTile tone="amber" size={38}><ShieldCheck size={17} /></IconTile>
              <div>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Scam Protection Hub</h2>
                <p className="tiny muted">Learn how to avoid fake gadgets, unsafe sellers, cloned accessories, and costly mistakes.</p>
              </div>
              <button className="btn btn--outline btn--sm" style={{ marginLeft: 'auto' }}>Explore Scam Protection Guides</button>
            </div>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
              {SCAM_TILES.map((t) => (
                <div className="card card--flat center" key={t.title} style={{ padding: 14 }}>
                  <IconTile tone="amber" size={40} style={{ margin: '0 auto' }}><t.icon size={18} /></IconTile>
                  <b className="small mt-8" style={{ display: 'block' }}>{t.title}</b>
                  <p className="tiny muted-2 mt-4" style={{ lineHeight: 1.5 }}>{t.sub}</p>
                </div>
              ))}
            </div>
            <div className="callout callout--amber mt-16 flex gap-10 items-center" style={{ fontSize: '0.76rem' }}>
              <AlertTriangle size={15} className="amber" style={{ flexShrink: 0 }} />
              GadgetHub guides help buyers reduce risk, but buyers should still confirm product condition, warranty, receipt, and seller trust before payment.
            </div>
          </div>
        </div>
      </section>

      {/* ── GUIDES BY PURPOSE ────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }} id="explainers">
        <div className="container">
          <div className="section-head section-head--title">
            <h2>Find Guides by Purpose</h2>
            <Link to="/knowledge-hub" className="view-all">View all</Link>
          </div>
          <div className="grid grid-4">
            {PURPOSES.map((p) => (
              <Link to={`/search?q=${encodeURIComponent(p.label)}`} className="card card--hover flex gap-12 items-center" key={p.label} style={{ padding: 14 }}>
                <IconTile tone={['blue', 'purple', 'cyan', 'green', 'amber', 'blue', 'purple', 'red'][PURPOSES.indexOf(p)]} size={38}><p.icon size={17} /></IconTile>
                <div>
                  <b className="small">{p.label}</b>
                  <p className="tiny muted-2" style={{ lineHeight: 1.45 }}>{p.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── LATEST FROM HUB ──────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head section-head--title">
            <h2>Latest From Knowledge Hub</h2>
            <Link to="/knowledge-hub" className="view-all">View all</Link>
          </div>
          <div className="grid grid-4">
            {latestFromHub.map((g) => (
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
      </section>

      {/* ── ASK AI + BUYER QUESTIONS ─────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container grid grid-2">
          <div className="ai-panel">
            <div className="flex items-center gap-10">
              <Robot size={60} />
              <h3>Ask GadgetHub AI to Explain Anything</h3>
            </div>
            <input className="input mt-12" placeholder="Ask about specs, scams, buying guides, sellers, repairs, or gadget choices…" />
            <div className="grid grid-2 mt-12" style={{ gap: 6 }}>
              {["Explain RAM like I'm a beginner", 'What should I check before buying used iPhone?',
                'Is 8GB RAM enough for video editing?', 'How do I avoid fake AirPods?',
                'What is the best laptop for students?', 'What does battery health mean?',
                'How do I know if a seller is safe?'].map((q) => (
                <button key={q} className="ai-chip" style={{ fontSize: '0.68rem' }} onClick={() => navigate(`/ai-advisor?q=${encodeURIComponent(q)}`)}>› {q}</button>
              ))}
            </div>
            <Link to="/ai-advisor" className="btn btn--primary btn--block mt-12"><Sparkles size={14} /> Ask AI</Link>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-12">
              <h3 className="small bold">Questions Buyers Ask Before Buying</h3>
              <Link to="/community" className="view-all tiny">View all answers</Link>
            </div>
            <div className="grid grid-2" style={{ gap: 10 }}>
              {BUYER_QUESTIONS.map((b) => (
                <Link to={`/ai-advisor?q=${encodeURIComponent(b.q)}`} className="card card--flat card--hover" key={b.q} style={{ padding: 12 }}>
                  <b className="tiny">❓ {b.q}</b>
                  <p className="tiny muted-2 mt-4" style={{ lineHeight: 1.45 }}>{b.sub}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TOPICS / PICKS / CTA ─────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container grid grid-3">
          <div className="card">
            <div className="flex items-center justify-between mb-12">
              <h3 className="small bold">Browse Topics</h3>
              <span className="view-all tiny">View all topics</span>
            </div>
            <div className="flex wrap gap-6">
              {TOPICS.map(([t, n]) => (
                <Link to={`/search?q=${encodeURIComponent(String(t))}`} className="chip" key={String(t)}>
                  {t} <span className="muted-2">{n}</span>
                </Link>
              ))}
            </div>
            <hr className="divider" />
            <h3 className="small bold mb-8">Frequently Asked Questions</h3>
            <div className="flex-col gap-8">
              {FAQS.map((f) => (
                <div className="flex items-center justify-between small muted" key={f} style={{ padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                  {f} <ArrowRight size={12} />
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-12">
              <h3 className="small bold">Editor's Picks</h3>
              <span className="view-all tiny">View all picks</span>
            </div>
            <div className="flex-col gap-12">
              {EDITOR_PICKS.map((e, i) => (
                <div className="flex gap-10" key={e.title}>
                  <span style={{ width: 52, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                    <DeviceArt kind={(['laptop', 'phone', 'earbuds', 'watch'] as const)[i]} tone={(['blue', 'gold', 'silver', 'green'] as const)[i]} />
                  </span>
                  <div>
                    <b className="tiny" style={{ lineHeight: 1.4 }}>{e.title}</b>
                    <p className="tiny muted-2 mt-4">{e.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ai-panel">
            <h3 style={{ fontSize: '1.2rem' }}>Learn First. Buy Smarter.</h3>
            <p className="small muted mt-8" style={{ lineHeight: 1.6 }}>
              Read guides, understand gadget terms, avoid scams, and ask GadgetHub AI
              before spending your money.
            </p>
            <div className="flex gap-8 mt-16 wrap">
              <Link to="/knowledge-hub#buying-guides" className="btn btn--primary btn--sm">Explore Buying Guides</Link>
              <Link to="/ai-advisor" className="btn btn--outline btn--sm"><Sparkles size={13} /> Ask GadgetHub AI</Link>
              <button className="btn btn--outline btn--sm">Browse Scam Protection</button>
            </div>
            <div className="grid grid-2 mt-20" style={{ gap: 10 }}>
              {[
                { icon: BookOpen, t: 'Simple explanations', s: 'Easy to understand', tone: 'blue' },
                { icon: ShieldCheck, t: 'Scam alerts included', s: 'Stay safe always', tone: 'green' },
                { icon: Sparkles, t: 'AI learning support', s: 'Ask anything', tone: 'purple' },
                { icon: CheckCircle2, t: 'Built for Nigerian buyers', s: 'Local prices & reality', tone: 'amber' },
              ].map((f) => (
                <div className="flex items-center gap-8" key={f.t}>
                  <IconTile tone={f.tone} size={32}><f.icon size={15} /></IconTile>
                  <div><b className="tiny" style={{ display: 'block' }}>{f.t}</b><span className="tiny muted-2">{f.s}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

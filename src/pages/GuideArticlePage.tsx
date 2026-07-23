import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Sparkles, GitCompareArrows, Store, Bookmark, Share2, BadgeCheck, Clock,
  GraduationCap, Briefcase, Clapperboard, Gamepad2, User, CheckCircle2,
  AlertTriangle, Zap, Download, ArrowRight, Battery, ShieldCheck, Receipt,
  MonitorCheck, Users, RotateCcw, MessageCircle, Link2, Send,
} from 'lucide-react';
import PageCta from '../components/layout/PageCta';
import { Avatar, DeviceArt, Dots, Robot, Stars, IconTile } from '../components/ui';
import { guideBySlug } from '../data/guides';
import { sellers } from '../data/sellers';
import { laptops } from '../data/products';
import { formatRange } from '../lib/api';

const TOC = [
  'Quick answer', 'What to consider before buying', 'Best laptop specs by purpose',
  'RAM and storage explained', 'Battery life and portability', 'Brand new vs UK used',
  'Warranty and seller trust', 'Common mistakes to avoid', 'Buyer checklist',
  'Recommended laptops', 'FAQ',
];

const PERSONAS = [
  { icon: GraduationCap, title: 'For Students', sub: 'Focus on battery life, portability, keyboard comfort, SSD storage, and budget.' },
  { icon: Briefcase, title: 'For Business Users', sub: 'Focus on lightweight design, battery life, webcam quality, reliability, and warranty.' },
  { icon: Clapperboard, title: 'For Creators', sub: 'Focus on RAM, processor, display quality, storage, graphics support, and screen color.' },
  { icon: Gamepad2, title: 'For Gamers', sub: 'Focus on graphics card, cooling, refresh rate, RAM, storage, and power.' },
  { icon: User, title: 'For Everyday Users', sub: 'Focus on smooth browsing, streaming, office work, battery, and price value.' },
];

const CHECKLIST = [
  'Confirm exact model number', 'Check RAM and storage', 'Confirm SSD, not HDD',
  'Test keyboard and trackpad', 'Check battery health', 'Test charger and charging port',
  'Check display for lines or dead pixels', 'Test webcam, speaker, and mic',
];

const TRUST_BADGES = [
  { icon: Store, label: 'Physical store confirmed' },
  { icon: ShieldCheck, label: 'Warranty clearly explained' },
  { icon: Receipt, label: 'Receipt available' },
  { icon: MonitorCheck, label: 'Testing allowed before payment' },
  { icon: Users, label: 'Buyer reviews available' },
  { icon: RotateCcw, label: 'Return policy explained' },
  { icon: MessageCircle, label: 'Seller response history checked' },
];

export default function GuideArticlePage() {
  const { slug = 'how-to-choose-the-right-laptop-in-nigeria' } = useParams();
  const navigate = useNavigate();
  const guide = guideBySlug(slug) ?? guideBySlug('how-to-choose-the-right-laptop-in-nigeria')!;

  return (
    <>
      {/* ── ARTICLE HERO ─────────────────────────────────────── */}
      <section className="article-hero">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link> › <Link to="/knowledge-hub">Knowledge Hub</Link> ›{' '}
            <Link to="/knowledge-hub#buying-guides">Buying Guides</Link> › <span className="text-soft">{guide.title}</span>
          </nav>

          <div className="page-hero__grid">
            <div>
              <span className="badge badge--blue">{(guide.category || 'Buying Guide').toUpperCase()}</span>
              <h1 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', fontWeight: 800, marginTop: 14 }}>{guide.title}</h1>
              <p className="lede mt-12">{guide.excerpt}</p>

              <div className="article-meta">
                <span className="flex items-center gap-8">
                  <IconTile tone="blue" size={34}><Sparkles size={15} /></IconTile>
                  <b className="text-soft">By GadgetHub Editorial Team</b>
                  <span className="badge badge--green"><BadgeCheck size={11} /> Verified</span>
                </span>
              </div>
              <div className="article-meta">
                <span>✦ Updated today</span>
                <span><Clock size={12} style={{ display: 'inline' }} /> {guide.readTime}</span>
                <span>▲ Beginner friendly</span>
                <span>✦ AI summary available</span>
                <span>🇳🇬 Nigerian buyer focused</span>
              </div>
              <div className="flex wrap gap-6 mt-12">
                {['Buying Guide', 'Laptop Advice', 'Seller Safety', 'Budget Friendly', 'AI Explained'].map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>

              <div className="flex wrap gap-8 mt-20">
                <Link to={`/ai-advisor?q=${encodeURIComponent(`Explain: ${guide.title}`)}`} className="btn btn--primary btn--sm">
                  <Sparkles size={13} /> Ask AI About This Article
                </Link>
                <Link to="/compare" className="btn btn--outline btn--sm"><GitCompareArrows size={13} /> Compare Laptops</Link>
                <Link to="/sellers" className="btn btn--outline-green btn--sm"><Store size={13} /> Find Trusted Sellers</Link>
                <button className="btn btn--outline btn--sm"><Bookmark size={13} /> Save Article</button>
                <button className="btn btn--outline btn--sm"><Share2 size={13} /> Share Article</button>
              </div>
            </div>

            <div>
              <div style={{ borderRadius: 16, overflow: 'hidden', position: 'relative' }}>
                <DeviceArt kind={guide.deviceKind} tone={guide.imageTone} ratio="tall" />
                <div style={{ position: 'absolute', right: 10, top: 10, display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
                  <span className="badge badge--blue">Laptop Buying Guide</span>
                  <span className="badge badge--green">Updated Recently</span>
                  <span className="badge badge--purple">AI Summary Available</span>
                </div>
              </div>

              <div className="ai-panel mt-16">
                <div className="flex items-center gap-8">
                  <IconTile tone="blue" size={30}><Sparkles size={14} /></IconTile>
                  <h3 style={{ fontSize: '0.92rem' }}>GadgetHub AI Summary</h3>
                </div>
                <p className="small text-soft mt-8" style={{ lineHeight: 1.65 }}>
                  To choose the right laptop in Nigeria, start with your purpose, then match
                  it with the right RAM, storage, processor, battery life, display, warranty,
                  and repair availability. Students may need a reliable budget laptop, creators
                  need stronger RAM and storage, business users need portability and battery
                  life, while gamers need graphics power and cooling.
                </p>
                <b className="small mt-12" style={{ display: 'block' }}>Key takeaways</b>
                <div className="grid grid-2 mt-8" style={{ gap: 6 }}>
                  {['Know your purpose before checking specs', '16GB RAM for heavy multitasking',
                    'Choose at least 8GB RAM for basic use', 'Check warranty and seller trust',
                    'SSD storage is faster and more reliable', 'Compare prices across verified sellers'].map((k) => (
                    <span key={k} className="flex gap-6 tiny text-soft"><CheckCircle2 size={12} className="green" style={{ flexShrink: 0, marginTop: 1 }} /> {k}</span>
                  ))}
                </div>
                <Link to={`/ai-advisor?q=${encodeURIComponent(`Explain this guide: ${guide.title}`)}`} className="btn btn--primary btn--block btn--sm mt-12">
                  <Sparkles size={13} /> Ask AI to explain this guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STICKY MINI BAR ──────────────────────────────────── */}
      <div className="ticker">
        <div className="ticker__inner" style={{ justifyContent: 'space-between' }}>
          <span className="flex items-center gap-10 small">
            <span style={{ width: 34, borderRadius: 6, overflow: 'hidden', flexShrink: 0 }}>
              <DeviceArt kind="laptop" tone="blue" />
            </span>
            <b>{guide.title}</b>
            <span className="muted-2 tiny">{guide.readTime} · ✦ AI Summary</span>
          </span>
          <span className="flex gap-8">
            <Link to="/ai-advisor" className="btn btn--outline btn--sm"><Sparkles size={12} /> Ask AI</Link>
            <Link to="/compare" className="btn btn--outline btn--sm">Compare Laptops</Link>
            <Link to="/sellers" className="btn btn--outline btn--sm">Find Sellers</Link>
          </span>
        </div>
      </div>

      {/* ── BODY + SIDEBAR ───────────────────────────────────── */}
      <section className="section">
        <div className="container split-main">
          <article className="article-body flex-col gap-20">
            {/* Quick answer */}
            <div id="quick-answer">
              <h2><Zap size={20} className="amber" /> Quick Answer</h2>
              <p className="mt-12">
                The best laptop for you depends on what you want to do with it. A student may
                need battery life, portability, and good value. A creator may need stronger RAM,
                storage, and display quality. A gamer needs graphics power and cooling. A business
                user may need lightweight design, long battery, and warranty support.
              </p>
              <div className="callout callout--green mt-16">
                For most Nigerian buyers, a good laptop should have at least <b className="green">8GB RAM</b>,{' '}
                <b className="red">SSD</b> storage, reliable battery life, clear warranty, and seller
                verification. For video editing, design, coding, or heavy multitasking,{' '}
                <b className="green">16GB RAM</b> is a better choice.
                <div className="mt-12">
                  <Link to="/ai-advisor?q=What%20laptop%20fits%20my%20budget" className="btn btn--outline-blue btn--sm">
                    <Sparkles size={12} /> Ask GadgetHub AI what laptop fits your budget
                  </Link>
                </div>
              </div>
            </div>

            {/* 1. Purpose */}
            <div id="purpose">
              <h2><span className="step-num">1</span> Start With What You Need The Laptop For</h2>
              <div className="persona-grid mt-16">
                {PERSONAS.map((p) => (
                  <div className="persona-card" key={p.title}>
                    <IconTile tone="blue" size={38} style={{ margin: '0 auto' }}><p.icon size={17} /></IconTile>
                    <b>{p.title}</b>
                    <span>{p.sub}</span>
                  </div>
                ))}
              </div>
              <div className="callout callout--green mt-16" style={{ fontSize: '0.8rem' }}>
                <b className="green">Helpful Tip:</b> Don't buy based on specs alone. Buy based on what you will use the laptop for every day.
              </div>
            </div>

            {/* 2. RAM / Storage / Processor */}
            <div id="specs">
              <h2><span className="step-num">2</span> RAM, Storage, and Processor Explained Simply</h2>
              <div className="spec-cols mt-16">
                <div className="card">
                  <b>RAM</b>
                  <p className="small muted mt-8">Helps your laptop run apps smoothly and switch between tasks.</p>
                  <p className="tiny muted-2 mt-8">Recommended:</p>
                  <ul className="check-list mt-8" style={{ gap: 7 }}>
                    <li><CheckCircle2 size={13} /> 8GB for basic use</li>
                    <li><CheckCircle2 size={13} /> 16GB for creators, students who multitask, and longer future use</li>
                    <li><CheckCircle2 size={13} /> 32GB for heavy editing, advanced design, and demanding work</li>
                  </ul>
                </div>
                <div className="card">
                  <b>Storage</b>
                  <p className="small muted mt-8">Where your files, apps, videos, and photos live.</p>
                  <p className="tiny muted-2 mt-8">Recommended:</p>
                  <ul className="check-list mt-8" style={{ gap: 7 }}>
                    <li><CheckCircle2 size={13} /> 256GB SSD for light use</li>
                    <li><CheckCircle2 size={13} /> 512GB SSD for most buyers</li>
                    <li><CheckCircle2 size={13} /> 1TB SSD for creators, editors, and heavy file storage</li>
                  </ul>
                </div>
                <div className="card">
                  <b>Processor</b>
                  <p className="small muted mt-8">The brain of the laptop. It affects speed, power use, and performance.</p>
                  <p className="tiny muted-2 mt-8">Recommended:</p>
                  <ul className="check-list mt-8" style={{ gap: 7 }}>
                    <li><CheckCircle2 size={13} /> Intel Core i5 or Ryzen 5 for everyday use</li>
                    <li><CheckCircle2 size={13} /> Intel Core i7 or Ryzen 7 for heavier work</li>
                    <li><CheckCircle2 size={13} /> Apple M-series chips for battery life and smooth performance</li>
                  </ul>
                </div>
              </div>
              <div className="callout callout--amber mt-16" style={{ fontSize: '0.82rem' }}>
                <AlertTriangle size={14} className="amber" style={{ display: 'inline' }} /> Avoid very cheap laptops with weak
                processors, <b className="red">low RAM</b>, or <b className="red">slow HDD storage</b> unless your needs are extremely basic.
              </div>
            </div>

            {/* 3. Battery */}
            <div id="battery">
              <h2><span className="step-num">3</span> Battery Life Matters More Than Many Buyers Think</h2>
              <p className="mt-12">
                In Nigeria, battery life can make a big difference because of movement, school,
                work, travel, and power availability. A laptop with strong battery life gives you
                more freedom and less stress.
              </p>
              <div className="grid grid-2 mt-16">
                <div className="card card--green">
                  <b className="flex items-center gap-8"><Battery size={16} className="green" /> Battery Checklist</b>
                  <ul className="check-list mt-12" style={{ gap: 8 }}>
                    <li><CheckCircle2 size={13} /> At least 6 hours for basic use</li>
                    <li><CheckCircle2 size={13} /> 8 to 12 hours for students and business users</li>
                    <li><CheckCircle2 size={13} /> Strong charger availability</li>
                    <li><CheckCircle2 size={13} /> Battery health check for UK used laptops</li>
                    <li><CheckCircle2 size={13} /> Avoid swollen or weak batteries</li>
                  </ul>
                </div>
                <div className="card">
                  <b>Popular Battery Comparison</b>
                  <div className="data-rows mt-8">
                    {[
                      { name: 'MacBook Air M3', note: 'Strong battery and portability', score: 10 },
                      { name: 'Dell XPS 13', note: 'Good portability with Windows flexibility', score: 8 },
                      { name: 'ASUS TUF F15', note: 'Better gaming power but weaker battery', score: 6 },
                    ].map((row) => (
                      <div className="data-row" key={row.name}>
                        <div style={{ flex: 1 }}>
                          <b>{row.name}</b>
                          <p className="tiny muted-2">{row.note}</p>
                        </div>
                        <Dots score={row.score} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Condition */}
            <div id="condition">
              <h2><span className="step-num">4</span> Brand New, Open Box, or UK Used. Which Should You Buy?</h2>
              <div className="spec-cols mt-16">
                <div className="card">
                  <IconTile tone="green" size={38}><BadgeCheck size={17} /></IconTile>
                  <b className="mt-8" style={{ display: 'block' }}>Brand New</b>
                  <p className="small muted mt-8">Best for buyers who want full warranty, fresh battery, lower risk, and sealed condition.</p>
                  <span className="badge badge--green mt-12">✦ Lowest risk</span>
                </div>
                <div className="card">
                  <IconTile tone="blue" size={38}><Store size={17} /></IconTile>
                  <b className="mt-8" style={{ display: 'block' }}>Open Box</b>
                  <p className="small muted mt-8">Good for buyers who want lower price but still want near-new condition. Check warranty and return policy.</p>
                  <span className="badge badge--blue mt-12">✦ Good value</span>
                </div>
                <div className="card">
                  <IconTile tone="amber" size={38}><AlertTriangle size={17} /></IconTile>
                  <b className="mt-8" style={{ display: 'block' }}>UK Used</b>
                  <p className="small muted mt-8">Can save money, but check battery health, keyboard, ports, display, charger, serial number, and seller trust carefully.</p>
                  <span className="badge badge--amber mt-12">⚠ Higher risk</span>
                </div>
              </div>
              <div className="callout callout--red mt-16" style={{ fontSize: '0.82rem' }}>
                <AlertTriangle size={14} className="red" style={{ display: 'inline' }} /> UK used can be a{' '}
                <b className="green">good deal, but don't buy blindly.</b> Test the device, confirm{' '}
                <b>warranty</b>, and buy from a <b className="green">verified seller</b>.
              </div>
            </div>

            {/* 5. Warranty */}
            <div id="warranty">
              <h2><span className="step-num">5</span> Warranty and Seller Trust Are Part of the Laptop's Value</h2>
              <p className="mt-12">
                A cheap laptop from an unsafe seller can become expensive if it has hidden faults.
                A slightly higher price from a trusted seller with warranty can be safer.
              </p>
              <div className="trust-badge-row mt-16">
                {TRUST_BADGES.map((t) => (
                  <div className="trust-badge" key={t.label}>
                    <t.icon size={17} />
                    <div>{t.label}</div>
                  </div>
                ))}
              </div>
              <Link to="/sellers" className="btn btn--outline-green btn--sm mt-16">Find Trusted Laptop Sellers →</Link>
            </div>
          </article>

          {/* ── SIDEBAR ─────────────────────────────────────── */}
          <aside className="side-stack">
            <div className="card">
              <div className="flex items-center justify-between">
                <h3 className="small bold">In This Guide</h3>
                <span className="tiny blue">Reading progress: 36%</span>
              </div>
              <div className="progress-track"><i style={{ width: '36%' }} /></div>
              <div className="toc mt-12">
                {TOC.map((t, i) => (
                  <a key={t} href={`#${['quick-answer', 'purpose', 'purpose', 'specs', 'battery', 'condition', 'warranty', 'condition', 'warranty', 'quick-answer', 'quick-answer'][i]}`}>
                    <i>{i + 1}</i> {t}
                  </a>
                ))}
              </div>
            </div>

            <div className="ai-panel">
              <div className="flex items-center justify-between">
                <h3>💬 Ask GadgetHub AI</h3>
                <Robot size={52} />
              </div>
              <p className="tiny muted mt-8">I can help you understand this guide better. Ask me anything about laptops.</p>
              <div className="flex-col gap-6 mt-12">
                {['What laptop is best for students?', 'Is 8GB RAM enough for school work?', 'Should I buy brand new or UK used?', 'Which laptop is best for video editing?'].map((q) => (
                  <button key={q} className="ai-chip" onClick={() => navigate(`/ai-advisor?q=${encodeURIComponent(q)}`)}>{q}</button>
                ))}
              </div>
              <Link to="/ai-advisor" className="btn btn--primary btn--block btn--sm mt-12"><Sparkles size={13} /> Ask AI Now</Link>
            </div>

            <div className="card card--green">
              <h3 className="small bold flex items-center gap-8">
                <CheckCircle2 size={15} className="green" /> Buyer Checklist Before Payment
              </h3>
              <ul className="check-list mt-12" style={{ gap: 8 }}>
                {CHECKLIST.map((c) => <li key={c}><CheckCircle2 size={13} /> {c}</li>)}
              </ul>
              <p className="tiny muted-2 mt-8">+ 6 more important checks</p>
              <button className="btn btn--outline-green btn--block btn--sm mt-12"><Download size={13} /> Download Checklist</button>
              <Link to="/ai-advisor?q=What%20should%20I%20check%20before%20buying%20a%20laptop" className="btn btn--outline btn--block btn--sm mt-8">
                <Sparkles size={13} /> Ask AI What to Check
              </Link>
            </div>

            <div className="card">
              <h3 className="small bold mb-12">📄 Article Details</h3>
              <div className="data-rows small">
                <div className="data-row"><span className="muted">Category:</span><b style={{ marginLeft: 'auto' }}>Buying Guide</b></div>
                <div className="data-row"><span className="muted">Topic:</span><b style={{ marginLeft: 'auto' }}>Laptop Buying Advice</b></div>
                <div className="data-row"><span className="muted">Audience:</span><b style={{ marginLeft: 'auto', textAlign: 'right', fontSize: '0.7rem' }}>Students, Creators, Business Users, Gamers</b></div>
                <div className="data-row"><span className="muted">Last Updated:</span><b style={{ marginLeft: 'auto' }}>Today</b></div>
                <div className="data-row"><span className="muted">Reading Time:</span><b style={{ marginLeft: 'auto' }}>8 min</b></div>
                <div className="data-row"><span className="muted">Helpful Rating:</span><b className="green" style={{ marginLeft: 'auto' }}>94% (12,840 readers)</b></div>
                <div className="data-row"><span className="muted">Questions Answered:</span><b style={{ marginLeft: 'auto' }}>368</b></div>
              </div>
              <p className="tiny muted-2 mt-12">Share this guide:</p>
              <div className="flex gap-8 mt-8">
                {[Link2, Send, Share2, MessageCircle].map((Icon, i) => (
                  <button key={i} className="nav__icon-btn" aria-label="Share"><Icon size={14} /></button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ── BOTTOM BANDS ─────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container grid grid-3">
          <div className="card">
            <h3 className="small bold mb-12">Recommended Laptops to Compare</h3>
            <div className="flex-col gap-10">
              {sellers.slice(0, 3).map((s, i) => (
                <div className="seller-row" key={s.id}>
                  <span style={{ width: 44, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                    <DeviceArt kind="laptop" tone={(['blue', 'purple', 'dark'] as const)[i]} />
                  </span>
                  <div style={{ flex: 1 }}>
                    <b>{s.name}</b>
                    <span className="sub">{s.area}</span>
                    <span className="sub">Stock: {s.specialty}</span>
                  </div>
                  <div className="flex-col gap-4" style={{ alignItems: 'flex-end' }}>
                    <span className="badge badge--green">Trust {s.trustScore}%</span>
                    <Link to="/sellers" className="btn btn--sm btn--outline">View Store</Link>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/sellers" className="view-all tiny mt-12" style={{ display: 'inline-flex' }}>
              Find More Trusted Sellers <ArrowRight size={12} />
            </Link>
          </div>

          <div className="card">
            <h3 className="small bold mb-12">What Laptop Buyers Are Saying</h3>
            <div className="flex-col gap-12">
              {[
                { who: 'Amaka from Lagos', product: 'MacBook Air M3', rating: 5.0, body: 'The battery lasts all day and it is perfect for my business work and travel.', helpful: 76 },
                { who: 'Sarah from Ibadan', product: 'HP Pavilion 15', rating: 4.4, body: 'Good for school work and online classes. Battery is fair, but SSD makes it fast enough.', helpful: 41 },
                { who: 'Blessing from Enugu', product: 'ASUS TUF F15', rating: 4.3, body: 'Gaming performance is great, but battery life is weak. Keep the charger nearby.', helpful: 36 },
              ].map((r) => (
                <div className="flex gap-10" key={r.who}>
                  <Avatar name={r.who} size="sm" />
                  <div>
                    <b className="tiny">{r.who}</b> <span className="badge badge--green" style={{ fontSize: '0.56rem' }}>Verified Owner</span>
                    <div><span className="tiny muted-2">{r.product}</span> <Stars rating={r.rating} size={10} showValue={false} /></div>
                    <p className="tiny muted mt-4" style={{ lineHeight: 1.55 }}>{r.body}</p>
                    <span className="tiny muted-2">👍 Helpful ({r.helpful})</span>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/reviews" className="view-all tiny mt-12" style={{ display: 'inline-flex' }}>Read Laptop Reviews <ArrowRight size={12} /></Link>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-12">
              <h3 className="small bold">📈 Laptop Price Watch in Nigeria</h3>
              <Link to="/news" className="view-all tiny">View full price watch</Link>
            </div>
            <div className="flex-col">
              {laptops.slice(0, 4).map((p) => (
                <div className="price-watch-row" key={p.id}>
                  <span className="price-watch-row__art"><DeviceArt kind={p.deviceKind} tone={p.imageTone} /></span>
                  <div style={{ flex: 1 }}>
                    <b>{p.name}</b>
                    <span className="sub">{formatRange(p.priceMin, p.priceMax)} · {p.sellerCount} sellers</span>
                  </div>
                  <span className={`badge badge--${p.priceSignal === 'Stable' ? 'green' : p.priceSignal === 'High demand' ? 'red' : 'amber'}`}>{p.priceSignal}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PageCta
        title="Still Choosing the Right Laptop?"
        subtitle="Ask GadgetHub AI, compare laptops, read real reviews, or find trusted sellers before you buy."
        secondaryLabel="Compare Laptops"
        footItems={['AI guidance included', 'Real owner reviews', 'Verified seller checks', 'Built for Nigerian buyers']}
      />
    </>
  );
}

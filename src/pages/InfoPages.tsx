import { Link } from 'react-router-dom';
import { Sparkles, Star, ShieldCheck, TrendingUp, History, HeartHandshake, CheckCircle2, Search } from 'lucide-react';
import { Robot, IconTile } from '../components/ui';
import { glossaryTerms } from '../data/guides';
import PageCta from '../components/layout/PageCta';

/* ── Generic static page template ─────────────────────────── */
function StaticPage({ title, updated, children }: { title: string; updated?: string; children: React.ReactNode }) {
  return (
    <section className="section">
      <div className="container static-page">
        <h1>{title}</h1>
        {updated && <p className="updated">Last updated: {updated}</p>}
        {children}
      </div>
    </section>
  );
}

/* ── Company pages ────────────────────────────────────────── */
export function AboutPage() {
  return (
    <StaticPage title="About GadgetHub">
      <p>
        GadgetHub is Nigeria's most trusted gadget comparison, review and community platform.
        We help people make smarter gadget decisions with AI insights, real owner reviews,
        and a verified network of trusted sellers.
      </p>
      <h2>What we do</h2>
      <ul>
        <li><b>AI Advisor</b> — smart, fast, unbiased gadget recommendations built on real data.</li>
        <li><b>Verified Owner Reviews</b> — honest feedback from real Nigerian gadget owners.</li>
        <li><b>Trusted Seller Network</b> — vetted stores with tracked warranty behaviour.</li>
        <li><b>Knowledge Hub</b> — buying guides, scam protection tips and gadget explainers.</li>
        <li><b>Community</b> — real questions and honest answers from buyers like you.</li>
      </ul>
      <h2>Why Nigeria</h2>
      <p>
        Buying gadgets in Nigeria comes with unique challenges: fluctuating prices, fake
        products, unverified sellers and unclear warranties. GadgetHub was built to solve
        exactly these problems — with local price tracking in Naira, seller verification,
        and buyer-focused guidance.
      </p>
      <p className="mt-16">
        <Link to="/mission" className="blue bold">Read our mission →</Link>
      </p>
    </StaticPage>
  );
}

export function MissionPage() {
  return (
    <StaticPage title="Our Mission">
      <p>
        <b>Stop guessing. Start buying right.</b> Our mission is to make every gadget
        purchase in Nigeria a confident one.
      </p>
      <h2>We believe</h2>
      <ul>
        <li>Every buyer deserves honest information before spending their money.</li>
        <li>Real owner experiences beat marketing claims.</li>
        <li>AI should make buying decisions simpler, not more confusing.</li>
        <li>Trusted local sellers deserve to be found — and rewarded for honesty.</li>
        <li>Scam protection is a right, not a premium feature.</li>
      </ul>
      <h2>Our promise</h2>
      <p>
        AI-powered. People-driven. Always honest. We never let sellers pay to remove
        genuine reviews, and our AI recommendations are never sponsored.
      </p>
    </StaticPage>
  );
}

export function CareersPage() {
  return (
    <StaticPage title="Careers at GadgetHub">
      <p>
        We're building the future of smart gadget buying in Africa — and we're looking for
        people who care about honest technology.
      </p>
      <h2>Open roles</h2>
      <ul>
        <li>Frontend Engineer (React / TypeScript) — Lagos or Remote</li>
        <li>Backend Engineer (Node.js) — Lagos or Remote</li>
        <li>AI / ML Engineer — Remote</li>
        <li>Community Manager — Lagos</li>
        <li>Seller Verification Specialist — Lagos, Abuja</li>
      </ul>
      <p className="mt-16">
        Interested? Send your CV and a short note to{' '}
        <a className="blue bold" href="mailto:careers@gadgethub.ng">careers@gadgethub.ng</a>.
      </p>
    </StaticPage>
  );
}

export function ContactPage() {
  return (
    <StaticPage title="Contact Us">
      <p>We'd love to hear from you. Reach the right team directly:</p>
      <h2>General &amp; support</h2>
      <ul>
        <li>Support: <a className="blue" href="mailto:support@gadgethub.ng">support@gadgethub.ng</a></li>
        <li>Help Center: <Link className="blue" to="/help">gadgethub.ng/help</Link></li>
      </ul>
      <h2>Sellers</h2>
      <ul>
        <li>Seller verification: <a className="blue" href="mailto:sellers@gadgethub.ng">sellers@gadgethub.ng</a></li>
      </ul>
      <h2>Press &amp; partnerships</h2>
      <ul>
        <li>Press: <a className="blue" href="mailto:press@gadgethub.ng">press@gadgethub.ng</a></li>
        <li>Partnerships: <a className="blue" href="mailto:partners@gadgethub.ng">partners@gadgethub.ng</a></li>
      </ul>
      <h2>Office</h2>
      <p>GadgetHub Nigeria — Lagos, Nigeria.</p>
    </StaticPage>
  );
}

export function PressPage() {
  return (
    <StaticPage title="Press">
      <p>
        GadgetHub has been featured by Techpoint, Pulse, Nairaland and TechCabal.
        For interviews, data insights on the Nigerian gadget market, or brand assets,
        contact <a className="blue bold" href="mailto:press@gadgethub.ng">press@gadgethub.ng</a>.
      </p>
      <h2>Fast facts</h2>
      <ul>
        <li>21,540+ real owner reviews</li>
        <li>368 verified sellers across Nigeria</li>
        <li>25,000+ newsletter subscribers</li>
        <li>4,800+ AI questions answered daily</li>
      </ul>
    </StaticPage>
  );
}

/* ── Legal pages ──────────────────────────────────────────── */
export function PrivacyPage() {
  return (
    <StaticPage title="Privacy Policy" updated="January 2025">
      <p>
        This Privacy Policy explains how GadgetHub Nigeria ("we", "us") collects, uses and
        protects your information when you use our platform.
      </p>
      <h2>1. Information we collect</h2>
      <ul>
        <li>Account information: name, email address, and sign-in credentials.</li>
        <li>Content you create: reviews, questions, answers and saved searches.</li>
        <li>Usage data: pages visited, searches made and device information.</li>
      </ul>
      <h2>2. How we use it</h2>
      <ul>
        <li>To provide AI recommendations, reviews and community features.</li>
        <li>To verify reviews and protect buyers from fake content.</li>
        <li>To send helpful, non-promotional updates you subscribe to.</li>
      </ul>
      <h2>3. What we never do</h2>
      <ul>
        <li>We never sell your personal data.</li>
        <li>We never let sellers pay to see your private information.</li>
      </ul>
      <h2>4. Contact</h2>
      <p>Questions? Email <a className="blue" href="mailto:privacy@gadgethub.ng">privacy@gadgethub.ng</a>.</p>
    </StaticPage>
  );
}

export function TermsPage() {
  return (
    <StaticPage title="Terms of Use" updated="January 2025">
      <p>By using GadgetHub you agree to these terms.</p>
      <h2>1. The platform</h2>
      <p>
        GadgetHub provides gadget information, AI guidance, reviews and seller listings for
        research purposes. We are not a party to transactions between buyers and sellers.
      </p>
      <h2>2. Reviews and community</h2>
      <ul>
        <li>Only post honest reviews about products you actually own or used.</li>
        <li>No spam, impersonation, or paid/fake reviews.</li>
        <li>We may verify, moderate or remove content that breaks these rules.</li>
      </ul>
      <h2>3. AI guidance</h2>
      <p>
        GadgetHub AI provides guidance, not guarantees. Always confirm condition, warranty
        and seller verification before payment.
      </p>
      <h2>4. Liability</h2>
      <p>
        GadgetHub is not liable for losses arising from transactions with sellers. Verified
        status reflects our checks at the time of review and is not a guarantee.
      </p>
    </StaticPage>
  );
}

export function CookiesPage() {
  return (
    <StaticPage title="Cookie Policy" updated="January 2025">
      <p>We use cookies to keep GadgetHub working well for you.</p>
      <h2>Essential cookies</h2>
      <p>Sign-in sessions, security and core functionality. Always on.</p>
      <h2>Preference cookies</h2>
      <p>Remembering your location, saved gadgets and display preferences.</p>
      <h2>Analytics cookies</h2>
      <p>Understanding which guides and features help buyers most. Anonymised.</p>
      <h2>Managing cookies</h2>
      <p>You can clear or block cookies in your browser settings at any time.</p>
    </StaticPage>
  );
}

export function RefundsPage() {
  return (
    <StaticPage title="Refund Policy" updated="January 2025">
      <p>
        GadgetHub itself does not sell gadgets — purchases happen directly with sellers.
        This policy explains how refunds work across the network.
      </p>
      <h2>Verified seller expectations</h2>
      <ul>
        <li>Clear warranty terms provided in writing before payment.</li>
        <li>Documented return windows for faulty items.</li>
        <li>Receipts issued for every purchase.</li>
      </ul>
      <h2>If something goes wrong</h2>
      <ul>
        <li>Contact the seller first with your receipt and warranty terms.</li>
        <li>If unresolved, report the seller via <Link className="blue" to="/help">our Help Center</Link>.</li>
        <li>Sellers who fail refund obligations lose verified status.</li>
      </ul>
    </StaticPage>
  );
}

export function SitemapPage() {
  const GROUPS: [string, [string, string][]][] = [
    ['Platform', [['Home', '/'], ['AI Advisor', '/ai-advisor'], ['Reviews', '/reviews'], ['Compare', '/compare'], ['Sellers', '/sellers'], ['News', '/news'], ['Community', '/community'], ['Search', '/search']]],
    ['Categories', [['Laptops', '/category/laptops'], ['Phones', '/category/phones'], ['Audio', '/category/audio'], ['Smartwatches', '/category/smartwatches']]],
    ['Resources', [['Knowledge Hub', '/knowledge-hub'], ['How It Works', '/how-it-works'], ['Glossary', '/glossary'], ['Help Center', '/help']]],
    ['Company', [['About Us', '/about'], ['Our Mission', '/mission'], ['Careers', '/careers'], ['Contact Us', '/contact'], ['Press', '/press']]],
    ['Legal', [['Privacy Policy', '/privacy'], ['Terms of Use', '/terms'], ['Cookie Policy', '/cookies'], ['Refund Policy', '/refunds']]],
  ];
  return (
    <StaticPage title="Sitemap">
      <div className="grid grid-3 mt-20">
        {GROUPS.map(([group, links]) => (
          <div className="card" key={group}>
            <h2 style={{ marginTop: 0 }}>{group}</h2>
            <ul style={{ paddingLeft: 18 }}>
              {links.map(([label, to]) => (
                <li key={to}><Link className="blue" to={to}>{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </StaticPage>
  );
}

export function HelpPage() {
  const TOPICS = [
    ['Buying safely', 'How to check sellers, warranties and receipts before paying.'],
    ['Using the AI Advisor', 'How to ask questions and understand confidence scores.'],
    ['Writing reviews', 'How verification works and what makes a helpful review.'],
    ['Seller verification', 'How stores get verified and how to report a seller.'],
    ['Account & privacy', 'Managing your account, data and notifications.'],
    ['Reporting scams', 'What to do if you spot a fake product or unsafe seller.'],
  ];
  return (
    <StaticPage title="Help Center">
      <p>Find answers fast, or ask GadgetHub AI directly.</p>
      <div className="search-input-wrap mt-16 mb-16">
        <Search size={16} />
        <input className="input" placeholder="Search help topics…" />
      </div>
      <div className="grid grid-2">
        {TOPICS.map(([t, s]) => (
          <div className="card card--hover" key={t}>
            <b>{t}</b>
            <p className="small muted mt-8">{s}</p>
          </div>
        ))}
      </div>
      <p className="mt-24">
        Still stuck? Email <a className="blue bold" href="mailto:support@gadgethub.ng">support@gadgethub.ng</a>{' '}
        or <Link className="blue bold" to="/ai-advisor">ask GadgetHub AI</Link>.
      </p>
    </StaticPage>
  );
}

/* ── How It Works ─────────────────────────────────────────── */
export function HowItWorksPage() {
  const STEPS = [
    { icon: Star, title: 'Reviews', sub: 'We analyze reviews from verified owners — real people who actually bought the gadget.' },
    { icon: HeartHandshake, title: 'Sentiment', sub: 'We understand owner sentiment and feedback across thousands of data points.' },
    { icon: TrendingUp, title: 'Performance', sub: 'We check real-world performance data, not just spec sheets.' },
    { icon: History, title: 'Price History', sub: 'We track Nigerian price trends and market value across verified sellers.' },
    { icon: ShieldCheck, title: 'Seller Trust', sub: 'We verify seller reliability, store locations and after-sales support.' },
  ];
  return (
    <>
      <section className="page-hero">
        <div className="container center">
          <Robot size={90} />
          <span className="eyebrow" style={{ display: 'block', marginTop: 12 }}>The GadgetHub AI Decision Engine</span>
          <h1>How We Calculate the <span className="accent-green">Confidence Score™</span></h1>
          <p className="lede" style={{ margin: '12px auto 0' }}>
            Our AI analyzes thousands of data points to give you recommendations you can trust.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="flex-col gap-14">
            {STEPS.map((s, i) => (
              <div className="card flex gap-16 items-center" key={s.title}>
                <span className="engine-step__num" style={{ width: 34, height: 34, fontSize: '0.9rem', marginBottom: 0 }}>{i + 1}</span>
                <IconTile tone={['amber', 'purple', 'blue', 'cyan', 'green'][i]} size={44}><s.icon size={20} /></IconTile>
                <div>
                  <b style={{ fontSize: '1rem' }}>{s.title}</b>
                  <p className="small muted mt-4">{s.sub}</p>
                </div>
              </div>
            ))}
            <div className="card card--glow flex gap-16 items-center">
              <IconTile tone="green" size={44}><CheckCircle2 size={20} /></IconTile>
              <div>
                <b style={{ fontSize: '1rem' }}>The result: a single Confidence Score</b>
                <p className="small muted mt-4">
                  A 93% score means owners are consistently happy, the price is fair, and trusted
                  sellers stock it — so you can buy the right gadget the first time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PageCta
        title="Ready to Stop Guessing?"
        subtitle="Ask GadgetHub AI about any gadget and get a recommendation backed by real data."
        footItems={['AI insights', 'Real reviews', 'Trusted sellers', 'All in one place']}
      />
    </>
  );
}

/* ── Glossary ─────────────────────────────────────────────── */
export function GlossaryPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Knowledge Hub · Glossary</span>
          <h1>Gadget Terms, <span className="accent-green">Explained Simply.</span></h1>
          <p className="lede">Understand common gadget words in simple language — 106 terms and growing.</p>
          <div className="search-input-wrap mt-20" style={{ maxWidth: 480 }}>
            <Search size={16} />
            <input className="input" placeholder="Search a term — RAM, IMEI, battery health…" />
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container grid grid-3">
          {glossaryTerms.map((t) => (
            <div className="card card--hover" key={t.term}>
              <b className="blue">{t.term}</b>
              <p className="small muted mt-8" style={{ lineHeight: 1.65 }}>{t.definition}</p>
            </div>
          ))}
        </div>
        <div className="container center mt-24">
          <Link to="/ai-advisor?q=Explain%20a%20gadget%20term%20for%20me" className="btn btn--primary">
            <Sparkles size={15} /> Ask AI to Explain Any Term
          </Link>
        </div>
      </section>
    </>
  );
}

/* ── 404 ──────────────────────────────────────────────────── */
export function NotFoundPage() {
  return (
    <div className="notfound">
      <div>
        <Robot size={110} />
        <h1>404</h1>
        <p className="muted mt-8">This page wandered off to Computer Village and never came back.</p>
        <div className="flex gap-10 mt-20" style={{ justifyContent: 'center' }}>
          <Link to="/" className="btn btn--primary">Back to Home</Link>
          <Link to="/ai-advisor" className="btn btn--outline"><Sparkles size={14} /> Ask GadgetHub AI</Link>
        </div>
      </div>
    </div>
  );
}

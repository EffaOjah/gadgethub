import { Link, useNavigate } from 'react-router-dom';
import {
  Search, Sparkles, BadgeCheck, MapPin, ShieldCheck, Store, Star,
  CheckCircle2, AlertTriangle, Clock,
} from 'lucide-react';
import PageCta from '../components/layout/PageCta';
import { Avatar, IconTile, Stars } from '../components/ui';
import { sellers } from '../data/sellers';
import { formatNaira } from '../lib/api';

const VERIFY_STEPS = [
  { icon: Store, title: 'Physical store confirmed', sub: 'We verify real store locations before listing.' },
  { icon: ShieldCheck, title: 'Warranty behavior checked', sub: 'Sellers must honour clear warranty terms.' },
  { icon: Star, title: 'Buyer reviews tracked', sub: 'Continuous feedback from verified buyers.' },
  { icon: BadgeCheck, title: 'Identity verified', sub: 'Business registration and identity checks.' },
];

export default function SellersPage() {
  const navigate = useNavigate();

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__grid">
          <div>
            <span className="eyebrow">Trusted Seller Network</span>
            <h1>Buy From Sellers You Can <span className="accent-green">Actually Trust.</span></h1>
            <p className="lede">
              Every seller on GadgetHub is verified for store location, warranty behavior,
              and real buyer feedback. Vetted. Reliable. Local.
            </p>

            <div className="search-panel mt-20">
              <h3>Find a trusted seller near you</h3>
              <div className="search-input-wrap mb-12">
                <Search size={16} />
                <input className="input" placeholder="Search sellers, stores, areas — e.g. Ikeja, MacBook seller, Computer Village…" />
              </div>
              <div className="row mb-12">
                <div className="field" style={{ flex: 1 }}>
                  <label>Location</label>
                  <div className="select-wrap"><select className="select"><option>All Locations</option><option>Lagos</option><option>Abuja</option><option>Port Harcourt</option></select></div>
                </div>
                <div className="field" style={{ flex: 1 }}>
                  <label>Specialty</label>
                  <div className="select-wrap"><select className="select"><option>All Gadgets</option><option>Phones</option><option>Laptops</option><option>Audio</option></select></div>
                </div>
                <div className="field" style={{ flex: 1 }}>
                  <label>Trust Score</label>
                  <div className="select-wrap"><select className="select"><option>Any Score</option><option>95%+</option><option>90%+</option></select></div>
                </div>
              </div>
              <div className="row">
                <button className="btn btn--primary" style={{ flex: 1 }}><Search size={15} /> Find Sellers</button>
                <Link to="/ai-advisor?q=Which%20seller%20should%20I%20trust%3F" className="btn btn--outline" style={{ flex: 1 }}>
                  <Sparkles size={15} /> Ask GadgetHub AI
                </Link>
              </div>
            </div>

            <div className="feature-strip mt-20">
              {VERIFY_STEPS.map((v) => (
                <div className="feature-strip__item" key={v.title}>
                  <IconTile tone="green" size={38}><v.icon size={17} /></IconTile>
                  <div><b>{v.title}</b><span>{v.sub}</span></div>
                </div>
              ))}
            </div>
          </div>

          {/* Map card */}
          <div className="card card--glow" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="flex items-center justify-between mb-12">
              <h3 className="small bold">Sellers Near You</h3>
              <span className="reco-card__live"><span className="ticker__dot" /> 368 verified</span>
            </div>
            <div className="map-tile" style={{ flex: 1, minHeight: 300 }}>
              <span className="map-tile__road" style={{ left: '8%', top: '28%', width: '80%', height: 5, transform: 'rotate(-8deg)' }} />
              <span className="map-tile__road" style={{ left: '44%', top: '6%', width: 5, height: '84%', transform: 'rotate(12deg)' }} />
              <span className="map-tile__road" style={{ left: '6%', top: '66%', width: '86%', height: 4, transform: 'rotate(4deg)' }} />
              <MapPin className="map-pin" style={{ left: '26%', top: '30%' }} size={26} />
              <MapPin className="map-pin" style={{ left: '52%', top: '48%' }} size={26} />
              <MapPin className="map-pin" style={{ left: '68%', top: '26%' }} size={26} />
              <MapPin className="map-pin map-pin--red" style={{ left: '40%', top: '72%' }} size={26} />
              <span className="map-label" style={{ left: '12%', top: '14%' }}>Ikeja</span>
              <span className="map-label" style={{ right: '12%', top: '40%' }}>Yaba</span>
              <span className="map-label" style={{ left: '30%', bottom: '12%' }}>Victoria Island</span>
              <span className="map-label" style={{ right: '8%', bottom: '6%' }}>Lekki</span>
            </div>
            <button className="btn btn--primary btn--block mt-12">View more sellers on map</button>
          </div>
        </div>
      </section>

      {/* Seller cards */}
      <section className="section">
        <div className="container">
          <div className="section-head section-head--title">
            <div>
              <h2>Verified Sellers</h2>
              <p className="sub">Real stores with tracked warranty behaviour and buyer feedback.</p>
            </div>
            <div className="select-wrap">
              <select className="select" style={{ padding: '8px 34px 8px 12px', fontSize: '0.78rem' }}>
                <option>Highest Trust Score</option>
                <option>Most Reviews</option>
                <option>Nearest First</option>
              </select>
            </div>
          </div>
          <div className="grid grid-3">
            {sellers.map((s) => (
              <div className="card card--hover" key={s.id}>
                <div className="flex items-center gap-12">
                  <span className="seller-row__logo" style={{ width: 52, height: 52, fontSize: '1rem' }}>
                    {s.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                  </span>
                  <div style={{ flex: 1 }}>
                    <b className="flex items-center gap-6">{s.name} {s.verified && <BadgeCheck size={14} className="green" />}</b>
                    <span className="tiny muted-2 flex items-center gap-4"><MapPin size={11} /> {s.area}</span>
                  </div>
                  <span className="conf-pill" style={{ width: 44, height: 44 }}>{s.trustScore}%</span>
                </div>
                <div className="flex items-center gap-10 mt-12">
                  <Stars rating={s.rating} count={s.reviewCount} size={12} />
                </div>
                <div className="data-rows mt-8">
                  <div className="data-row"><Clock size={13} className="muted-2" /><span className="muted">Status</span><b className="green" style={{ marginLeft: 'auto' }}>{s.openStatus}</b></div>
                  <div className="data-row"><Store size={13} className="muted-2" /><span className="muted">Specialty</span><b style={{ marginLeft: 'auto', fontSize: '0.7rem', textAlign: 'right' }}>{s.specialty}</b></div>
                  <div className="data-row"><ShieldCheck size={13} className="muted-2" /><span className="muted">Warranty</span><b style={{ marginLeft: 'auto' }}>{s.warranty}</b></div>
                  <div className="data-row"><Star size={13} className="muted-2" /><span className="muted">MacBook Air M3</span><b style={{ marginLeft: 'auto' }}>{s.price ? formatNaira(s.price) : '—'}</b></div>
                </div>
                <div className="flex gap-8 mt-12">
                  <button className="btn btn--primary btn--sm" style={{ flex: 1 }}>View Store</button>
                  <button
                    className="btn btn--outline btn--sm" style={{ flex: 1 }}
                    onClick={() => navigate(`/ai-advisor?q=${encodeURIComponent(`Is ${s.name} a trusted seller?`)}`)}
                  >
                    <Sparkles size={12} /> Ask AI
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How verification works + warnings */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container grid grid-2">
          <div className="card card--green">
            <h3 className="small bold flex items-center gap-8"><BadgeCheck size={16} className="green" /> How Seller Verification Works</h3>
            <div className="flex-col gap-12 mt-16">
              {VERIFY_STEPS.map((v, i) => (
                <div className="flex gap-12" key={v.title}>
                  <span className="engine-step__num" style={{ marginBottom: 0 }}>{i + 1}</span>
                  <div>
                    <b className="small" style={{ display: 'block' }}>{v.title}</b>
                    <span className="tiny muted">{v.sub}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="callout callout--green mt-16" style={{ fontSize: '0.76rem' }}>
              <CheckCircle2 size={13} className="green" style={{ display: 'inline' }} /> Verified status is reviewed
              continuously — sellers who fail warranty or feedback checks lose their badge.
            </div>
          </div>
          <div className="card" style={{ borderColor: 'var(--border-amber)' }}>
            <h3 className="small bold flex items-center gap-8"><AlertTriangle size={16} className="amber" /> Before You Pay Any Seller</h3>
            <ul className="check-list mt-16" style={{ gap: 10 }}>
              <li><CheckCircle2 size={14} /> Confirm exact model number and condition</li>
              <li><CheckCircle2 size={14} /> Test the device before payment where possible</li>
              <li><CheckCircle2 size={14} /> Collect a receipt with warranty terms written</li>
              <li><CheckCircle2 size={14} /> Avoid full prepayment to unknown sellers</li>
              <li><CheckCircle2 size={14} /> Check the seller's reviews on GadgetHub first</li>
              <li><CheckCircle2 size={14} /> Be careful with prices far below market range</li>
            </ul>
            <div className="flex gap-10 mt-16 items-center">
              <Avatar name="GadgetHub Team" size="sm" />
              <span className="tiny muted">Tip from the GadgetHub Trust &amp; Safety team</span>
            </div>
          </div>
        </div>
      </section>

      <PageCta
        title="Want to Sell on GadgetHub?"
        subtitle="Join the trusted seller network. Get verified, reach thousands of serious Nigerian buyers, and grow with honest reviews."
        primaryLabel="Ask About Verification"
        secondaryLabel="Compare Gadgets"
        footItems={['Verified store checks', 'Warranty tracking', 'Real buyer reviews', 'Local Nigerian network']}
      />
    </>
  );
}

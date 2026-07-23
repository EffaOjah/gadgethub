import { Link, useParams } from 'react-router-dom';
import {
  Sparkles, GitCompareArrows, Store, Heart, CheckCircle2, BadgeCheck,
  AlertTriangle, ThumbsUp, MessageCircle, ArrowRight, MapPin,
} from 'lucide-react';
import PageCta from '../components/layout/PageCta';
import { Avatar, ConfidenceRing, DeviceArt, Stars } from '../components/ui';
import { productBySlug, products } from '../data/products';
import { sellers } from '../data/sellers';
import { reviews } from '../data/reviews';
import { formatNaira, formatRange } from '../lib/api';

export default function ProductDetailPage() {
  const { slug = 'macbook-air-m3' } = useParams();
  const product = productBySlug(slug) ?? productBySlug('macbook-air-m3')!;
  const productReviews = reviews.filter((r) => r.productId === product.id);
  const alternatives = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link> › <Link to={`/category/${product.category}`}>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</Link> ›{' '}
            <span className="text-soft">{product.name}</span>
          </nav>

          <div className="pd-hero">
            <div>
              <div style={{ borderRadius: 16, overflow: 'hidden', position: 'relative' }}>
                <DeviceArt kind={product.deviceKind} tone={product.imageTone} ratio="tall" />
                {product.pickLabel && (
                  <span className="badge badge--solid-green" style={{ position: 'absolute', top: 12, left: 12 }}>{product.pickLabel}</span>
                )}
                <button className="nav__icon-btn" style={{ position: 'absolute', top: 12, right: 12 }} aria-label="Save">
                  <Heart size={16} />
                </button>
              </div>
              <div className="grid mt-12" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                {(['blue', 'silver', 'dark', 'purple'] as const).map((tone) => (
                  <div key={tone} style={{ borderRadius: 10, overflow: 'hidden', cursor: 'pointer' }}>
                    <DeviceArt kind={product.deviceKind} tone={tone} />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex gap-6 items-center wrap">
                <span className="tag">{product.categoryLabel}</span>
                <span className="tag">{product.brand}</span>
                <span className="badge badge--green"><BadgeCheck size={11} /> {product.sellerCount} verified sellers</span>
              </div>
              <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, marginTop: 12 }}>{product.name}</h1>
              <div className="flex items-center gap-14 mt-8 wrap">
                <Stars rating={product.rating} count={product.reviewCount} />
                <span className={`badge badge--${['Stable', 'Good value'].includes(product.priceSignal) ? 'green' : ['High demand', 'High risk'].includes(product.priceSignal) ? 'red' : 'amber'}`}>
                  {product.priceSignal}
                </span>
              </div>
              <div className="flex items-center gap-14 mt-16 wrap">
                <b style={{ fontSize: '1.6rem' }}>{formatRange(product.priceMin, product.priceMax)}</b>
                {product.bestValue && <span className="small muted">Best value estimate: <b className="green">{formatNaira(product.bestValue)}</b></span>}
              </div>
              <p className="small muted mt-12" style={{ lineHeight: 1.7 }}>{product.description}</p>

              <div className="flex items-center gap-16 mt-16 wrap">
                <ConfidenceRing value={product.confidence} size={104} />
                <ul className="check-list" style={{ flex: 1, minWidth: 200 }}>
                  {product.highlights?.map((h) => <li key={h}><CheckCircle2 size={14} /> {h}</li>)}
                </ul>
              </div>

              <div className="pd-metrics mt-16">
                <div className="pd-metric"><b className="green">{product.confidence}%</b><span>Confidence Score</span></div>
                <div className="pd-metric"><b>★ {product.rating}/5</b><span>{product.reviewCount} owner reviews</span></div>
                <div className="pd-metric"><b>{product.sellerCount}</b><span>Verified sellers</span></div>
                <div className="pd-metric"><b>{product.warranty}</b><span>Warranty range</span></div>
              </div>

              <div className="flex gap-10 mt-20 wrap">
                <Link to={`/ai-advisor?q=${encodeURIComponent(`Should I buy the ${product.name}?`)}`} className="btn btn--primary">
                  <Sparkles size={15} /> Ask AI About This Gadget
                </Link>
                <Link to={`/compare?a=${product.slug}`} className="btn btn--outline"><GitCompareArrows size={15} /> Compare</Link>
                <Link to="/sellers" className="btn btn--outline-green"><Store size={15} /> Find Sellers</Link>
              </div>

              <div className="callout callout--amber mt-16 flex gap-10" style={{ fontSize: '0.76rem' }}>
                <AlertTriangle size={14} className="amber" style={{ flexShrink: 0, marginTop: 2 }} />
                <span><b>Top concern from owners:</b> {product.topConcern}. Confirm exact specs, warranty and seller verification before payment.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strength / complaint + sellers */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container grid grid-3">
          <div className="card">
            <h3 className="small bold mb-12">What Owners Say</h3>
            <div className="card card--flat" style={{ padding: 12 }}>
              <b className="tiny green">Top strength</b>
              <p className="small text-soft mt-4">{product.strength}</p>
            </div>
            <div className="card card--flat mt-8" style={{ padding: 12 }}>
              <b className="tiny red">Main complaint</b>
              <p className="small text-soft mt-4">{product.complaint}</p>
            </div>
            <div className="mt-12">
              <p className="tiny muted-2">Review sentiment</p>
              <div className="sentiment mt-6">
                <i className="sentiment__pos" style={{ width: '76%' }} />
                <i className="sentiment__neu" style={{ width: '17%' }} />
                <i className="sentiment__neg" style={{ width: '7%' }} />
              </div>
              <div className="flex justify-between tiny muted-2 mt-4">
                <span className="green">Positive 76%</span><span className="amber">Neutral 17%</span><span className="red">Negative 7%</span>
              </div>
            </div>
            <Link to="/reviews" className="btn btn--outline btn--block btn--sm mt-16">Read All {product.reviewCount} Reviews</Link>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-12">
              <h3 className="small bold">Where to Buy</h3>
              <Link to="/sellers" className="view-all tiny">View all sellers</Link>
            </div>
            <div className="flex-col gap-8">
              {sellers.slice(0, 4).map((s) => (
                <div className="seller-row" key={s.id}>
                  <span className="seller-row__logo">{s.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
                  <div style={{ flex: 1 }}>
                    <b className="flex items-center gap-4">{s.name} {s.verified && <BadgeCheck size={12} className="green" />}</b>
                    <span className="sub flex items-center gap-4"><MapPin size={10} /> {s.area} · ★ {s.rating}</span>
                    <span className="sub green">{s.openStatus}</span>
                  </div>
                  <div className="flex-col" style={{ alignItems: 'flex-end', gap: 4 }}>
                    <b className="small">{s.price ? formatNaira(s.price) : '—'}</b>
                    <span className="tiny muted-2">{s.warranty}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="callout callout--green mt-12" style={{ padding: '9px 12px', fontSize: '0.68rem' }}>
              <CheckCircle2 size={11} className="green" style={{ display: 'inline' }} /> Prices tracked across verified sellers. Always confirm before visiting.
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-12">
              <h3 className="small bold">Owner Reviews</h3>
              <Link to="/reviews" className="view-all tiny">View all</Link>
            </div>
            {(productReviews.length ? productReviews : reviews.slice(0, 2)).map((r) => (
              <div className="flex gap-10 mb-16" key={r.id}>
                <Avatar name={r.author} size="sm" />
                <div>
                  <b className="tiny">{r.author}, {r.location}</b>{' '}
                  <span className="badge badge--green" style={{ fontSize: '0.54rem' }}>Verified Owner</span>
                  <div><Stars rating={r.rating} size={10} /></div>
                  <b className="tiny mt-4" style={{ display: 'block' }}>{r.title}</b>
                  <p className="tiny muted mt-4" style={{ lineHeight: 1.55 }}>{r.body}</p>
                  <div className="flex gap-12 tiny muted-2 mt-6">
                    <span><ThumbsUp size={11} style={{ display: 'inline' }} /> {r.helpfulCount}</span>
                    <span><MessageCircle size={11} style={{ display: 'inline' }} /> {r.commentCount}</span>
                    <span>{r.timeAgo}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alternatives */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head section-head--title">
            <h2>Alternatives to Consider</h2>
            <Link to={`/category/${product.category}`} className="view-all">View all {product.category} <ArrowRight size={13} /></Link>
          </div>
          <div className="grid grid-4">
            {alternatives.map((p) => (
              <Link to={`/product/${p.slug}`} className="card card--hover" key={p.id} style={{ padding: 12 }}>
                <div style={{ borderRadius: 10, overflow: 'hidden' }}>
                  <DeviceArt kind={p.deviceKind} tone={p.imageTone} />
                </div>
                <b className="small mt-8" style={{ display: 'block' }}>{p.name}</b>
                <Stars rating={p.rating} size={11} />
                <p className="small bold mt-4">{formatRange(p.priceMin, p.priceMax)}</p>
                <p className="tiny muted-2">{p.audience}</p>
                <span className="badge badge--green mt-8">{p.confidence}% confidence</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PageCta
        title={`Thinking About the ${product.name}?`}
        subtitle="Ask GadgetHub AI to check it against your budget and needs, compare alternatives, and find a trusted seller."
        footItems={['AI recommendation engine', 'Real owner reviews', 'Verified seller checks', 'Price watch signals']}
      />
    </>
  );
}

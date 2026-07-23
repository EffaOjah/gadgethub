import { Link, useNavigate } from 'react-router-dom';
import { Heart, Sparkles } from 'lucide-react';
import type { Product } from '../types';
import { DeviceArt, Stars, ConfBadge } from './ui';
import { formatRange } from '../lib/api';

export default function ProductCard({
  product, showRank = false, variant = 'trending',
}: {
  product: Product;
  showRank?: boolean;
  variant?: 'trending' | 'grid';
}) {
  const navigate = useNavigate();
  const isTopPick = product.pickLabel === 'Best Overall';

  return (
    <article className={`product-card${isTopPick && showRank ? ' product-card--top' : ''}`}>
      <div className="product-card__top">
        {showRank && product.rank ? (
          <span className="product-card__rank">{product.rank}</span>
        ) : (
          <span />
        )}
        {isTopPick && showRank && <span className="badge badge--solid-green">TOP PICK</span>}
        <button className="product-card__fav" aria-label={`Save ${product.name}`}>
          <Heart size={15} />
        </button>
      </div>

      <Link to={`/product/${product.slug}`} className="product-card__art">
        <DeviceArt kind={product.deviceKind} tone={product.imageTone}>
          {variant === 'grid' && (
            <span style={{ position: 'absolute', top: 8, right: 8 }}>
              <ConfBadge value={product.confidence} />
            </span>
          )}
        </DeviceArt>
      </Link>

      <Link to={`/product/${product.slug}`}>
        <h3>{product.name}</h3>
      </Link>
      <div className="product-card__cat">{product.categoryLabel}</div>

      {variant === 'trending' && (
        <div className="product-card__conf">{product.confidence}% Confidence</div>
      )}
      <Stars rating={product.rating} count={product.reviewCount} />

      <div className="product-card__meta">
        {variant === 'grid' ? (
          <>
            <span className="bold text-soft">{formatRange(product.priceMin, product.priceMax)}</span>
            <span>{product.audience}</span>
            <span>Strength: <b>{product.strength}</b></span>
            <span>Complaint: <b>{product.complaint}</b></span>
          </>
        ) : (
          <>
            <span>Best for: <b>{product.bestFor}</b></span>
            <span>Top concern: <b>{product.topConcern}</b></span>
          </>
        )}
      </div>

      <div className="product-card__actions">
        <button
          className="btn btn--sm btn--outline-blue"
          onClick={() => navigate(`/ai-advisor?q=${encodeURIComponent(`Tell me about ${product.name}`)}`)}
        >
          <Sparkles size={12} /> Ask AI
        </button>
        <button
          className="btn btn--sm btn--outline"
          onClick={() => navigate(`/compare?a=${product.slug}`)}
        >
          Compare
        </button>
      </div>
    </article>
  );
}

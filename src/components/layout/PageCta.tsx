import { Link } from 'react-router-dom';
import { Sparkles, GitCompareArrows, Store, CheckCircle2 } from 'lucide-react';
import { Robot } from '../ui';

/**
 * Bottom-of-page CTA band with the GadgetHub robot — used across pages
 * ("Still Searching for the Right Gadget?", "Still Choosing the Right Laptop?", …)
 */
export default function PageCta({
  title, subtitle, footItems, primaryLabel = 'Ask GadgetHub AI',
  secondaryLabel = 'Compare Gadgets', secondaryTo = '/compare',
  tertiaryLabel = 'Find Trusted Sellers', tertiaryTo = '/sellers',
}: {
  title: string;
  subtitle: string;
  footItems: string[];
  primaryLabel?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  tertiaryLabel?: string;
  tertiaryTo?: string;
}) {
  return (
    <section className="section">
      <div className="container">
        <div className="cta-band">
          <Robot size={104} />
          <div style={{ flex: 1, minWidth: 240 }}>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>
          <div className="cta-band__actions">
            <Link to="/ai-advisor" className="btn btn--primary"><Sparkles size={15} /> {primaryLabel}</Link>
            <Link to={secondaryTo} className="btn btn--outline"><GitCompareArrows size={15} /> {secondaryLabel}</Link>
            <Link to={tertiaryTo} className="btn btn--outline-green"><Store size={15} /> {tertiaryLabel}</Link>
          </div>
          <div className="cta-band__foot">
            {footItems.map((f) => (
              <span key={f}><CheckCircle2 size={14} /> {f}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

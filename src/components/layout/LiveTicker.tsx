import type { TickerItem } from '../../types';
import { Avatar, TickerIcon, IconTile } from '../ui';
import { TrendingUp } from 'lucide-react';

export default function LiveTicker({
  label, items, countText,
}: {
  label: string;
  items: TickerItem[];
  countText: { value: string; text: string };
}) {
  return (
    <div className="ticker">
      <div className="ticker__inner">
        <span className="ticker__label">
          <span className="ticker__dot" /> {label}
        </span>
        <div className="ticker__items">
          {items.map((item) => (
            <span className="ticker__item" key={item.id}>
              {item.icon === 'users' || item.icon === 'alert' || item.icon === 'seller' ? (
                <IconTile tone={item.icon === 'alert' ? 'amber' : item.icon === 'seller' ? 'green' : 'blue'} size={26}>
                  <TickerIcon icon={item.icon} />
                </IconTile>
              ) : (
                <Avatar name={item.primary} size="sm" />
              )}
              <span>
                <b>{item.primary}</b> <span>{item.secondary}</span>
              </span>
              {item.timeAgo && <time>{item.timeAgo}</time>}
            </span>
          ))}
        </div>
        <span className="ticker__count">
          <b>{countText.value}</b> {countText.text} <TrendingUp size={14} className="green" />
        </span>
      </div>
    </div>
  );
}

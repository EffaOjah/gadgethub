import { useEffect, useState } from 'react';
import type { TickerFeed, TickerItem } from '../../types';
import { getTickerFeed } from '../../services';
import { Avatar, TickerIcon, IconTile } from '../ui';
import { TrendingUp } from 'lucide-react';

/**
 * Live activity ticker. Fetches its feed through the services layer
 * (GET /api/activity/:feed once the backend lands) and cycles the items
 * every few seconds so the strip actually feels live.
 */
export default function LiveTicker({
  label, feed, countText,
}: {
  label: string;
  feed: TickerFeed;
  countText: { value: string; text: string };
}) {
  const [pool, setPool] = useState<TickerItem[]>([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let active = true;
    getTickerFeed(feed).then((items) => { if (active) setPool(items); });
    return () => { active = false; };
  }, [feed]);

  useEffect(() => {
    if (pool.length < 2) return;
    const id = setInterval(() => setOffset((o) => (o + 1) % pool.length), 4000);
    return () => clearInterval(id);
  }, [pool.length]);

  const items = pool.length ? [...pool.slice(offset), ...pool.slice(0, offset)] : [];

  return (
    <div className="ticker">
      <div className="ticker__inner">
        <span className="ticker__label">
          <span className="ticker__dot" /> {label}
        </span>
        <div className="ticker__items ticker__items--animate" key={offset}>
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

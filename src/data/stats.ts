import type { PlatformStats, TickerItem } from '../types';

export const platformStats: PlatformStats = {
  aiQuestionsToday: 4892,
  ownerReviews: 21540,
  activeDiscussions: 1842,
  verifiedSellers: 368,
  onlineNow: '+1.2K',
};

export const homeTicker: TickerItem[] = [
  { id: 't1', icon: 'review', primary: 'David from Lagos', secondary: 'reviewed Infinix Zero 40', timeAgo: '2m ago' },
  { id: 't2', icon: 'question', primary: 'Sarah asked', secondary: 'Is iPhone 16 worth upgrading?', timeAgo: '5m ago' },
  { id: 't3', icon: 'compare', primary: 'Ada compared', secondary: 'MacBook Air vs Dell XPS', timeAgo: '7m ago' },
  { id: 't4', icon: 'seller', primary: 'New verified seller', secondary: 'TechWorld Store, Abuja', timeAgo: '12m ago' },
  { id: 't5', icon: 'users', primary: '42 users online', secondary: 'Asking questions right now' },
];

export const searchTicker: TickerItem[] = [
  { id: 'st1', icon: 'question', primary: 'Amaka searched', secondary: 'MacBook Air M3', timeAgo: '2m ago' },
  { id: 'st2', icon: 'compare', primary: 'Tunde compared', secondary: 'Air M3 vs XPS 13 specs', timeAgo: '6m ago' },
  { id: 'st3', icon: 'question', primary: 'David asked AI', secondary: 'about 8GB RAM', timeAgo: '8m ago' },
  { id: 'st4', icon: 'guide', primary: 'Sarah viewed', secondary: 'laptop buying guide', timeAgo: '10m ago' },
];

export const laptopTicker: TickerItem[] = [
  { id: 'lt1', icon: 'compare', primary: 'Amaka compared', secondary: 'MacBook Air M3 vs Dell XPS 13', timeAgo: '2m ago' },
  { id: 'lt2', icon: 'seller', primary: 'Tunde checked', secondary: 'ASUS TUF F15 sellers', timeAgo: '3m ago' },
  { id: 'lt3', icon: 'review', primary: 'Obinna asked', secondary: 'about laptop RAM', timeAgo: '5m ago' },
  { id: 'lt4', icon: 'question', primary: 'David asked AI', secondary: 'about laptop RAM', timeAgo: '5m ago' },
  { id: 'lt5', icon: 'guide', primary: 'Sarah saved', secondary: 'student laptop guide', timeAgo: '6m ago' },
];

export const newsTicker: TickerItem[] = [
  { id: 'nt1', icon: 'alert', primary: 'New iPhone', secondary: 'price update added', timeAgo: '2m ago' },
  { id: 'nt2', icon: 'compare', primary: 'Samsung S24 Ultra', secondary: 'comparison trending', timeAgo: '5m ago' },
  { id: 'nt3', icon: 'seller', primary: 'TechWorld Store', secondary: 'updated MacBook stock', timeAgo: '11m ago' },
  { id: 'nt4', icon: 'alert', primary: 'Fake AirPods warning', secondary: 'viewed by buyers', timeAgo: '18m ago' },
  { id: 'nt5', icon: 'users', primary: 'Gaming laptop', secondary: 'demand rising', timeAgo: '25m ago' },
];

export const learningTicker: TickerItem[] = [
  { id: 'kt1', icon: 'guide', primary: 'Amaka read', secondary: 'How to spot fake AirPods', timeAgo: '3m ago' },
  { id: 'kt2', icon: 'question', primary: 'Tunde asked AI', secondary: 'about MacBook RAM', timeAgo: '6m ago' },
  { id: 'kt3', icon: 'compare', primary: 'Chioma saved', secondary: 'Best phones for creators', timeAgo: '11m ago' },
  { id: 'kt4', icon: 'guide', primary: 'David read', secondary: 'UK used iPhone buying checklist', timeAgo: '14m ago' },
  { id: 'kt5', icon: 'compare', primary: 'Sarah compared', secondary: 'student laptops', timeAgo: '18m ago' },
];

export const communityTicker: TickerItem[] = [
  { id: 'ct1', icon: 'question', primary: 'Amaka asked', secondary: 'MacBook Air M3', timeAgo: '2m ago' },
  { id: 'ct2', icon: 'compare', primary: 'Tunde answered', secondary: 'iPhone vs Samsung', timeAgo: '3m ago' },
  { id: 'ct3', icon: 'review', primary: 'Chioma shared', secondary: 'S24 Ultra camera feedback', timeAgo: '5m ago' },
  { id: 'ct4', icon: 'alert', primary: 'David warned about', secondary: 'fake AirPods', timeAgo: '6h ago' },
  { id: 'ct5', icon: 'seller', primary: 'Sarah asked', secondary: 'laptop sellers in Ibadan', timeAgo: '8m ago' },
];

export const reviewsTicker: TickerItem[] = [
  { id: 'rt1', icon: 'review', primary: 'Amaka reviewed', secondary: 'MacBook Air M3', timeAgo: '5 min ago' },
  { id: 'rt2', icon: 'review', primary: 'Tunde rated', secondary: 'iPhone 16 Pro Max', timeAgo: '8 min ago' },
  { id: 'rt3', icon: 'review', primary: 'Chioma uploaded photos', secondary: 'Samsung S24 Ultra', timeAgo: '11 min ago' },
  { id: 'rt4', icon: 'question', primary: 'David found', secondary: 'AirPods Pro 2 helpful', timeAgo: '15 min ago' },
];

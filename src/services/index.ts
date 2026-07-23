/**
 * GadgetHub data services — the single integration point for the backend.
 *
 * Every page reads data through these functions. They currently resolve
 * local mock data so the frontend is fully browsable without a backend.
 *
 * BACKEND INTEGRATION: replace each function body with the `api.*` call
 * shown in its doc comment (endpoints documented in API_INTEGRATION.md).
 * The UI will keep working unchanged as long as response shapes match
 * the types in src/types.
 */
import { products, productBySlug, trendingProducts, laptops } from '../data/products';
import { sellers } from '../data/sellers';
import { reviews, featuredReview } from '../data/reviews';
import { discussions, contributors } from '../data/community';
import { newsArticles, scamAlerts } from '../data/news';
import { guides, latestFromHub, glossaryTerms, guideBySlug } from '../data/guides';
import { platformStats } from '../data/stats';
import type { Product, Review, Discussion, NewsArticle, Guide, Seller } from '../types';

/** GET /api/products?sort=trending */
export async function getTrendingProducts(): Promise<Product[]> {
  return trendingProducts;
}

/** GET /api/products */
export async function getProducts(): Promise<Product[]> {
  return products;
}

/** GET /api/products?category=laptops */
export async function getLaptops(): Promise<Product[]> {
  return laptops;
}

/** GET /api/products/:slug */
export async function getProduct(slug: string): Promise<Product | undefined> {
  return productBySlug(slug);
}

/** GET /api/search?q=... */
export async function searchProducts(query: string): Promise<Product[]> {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q),
  );
}

/** GET /api/sellers */
export async function getSellers(): Promise<Seller[]> {
  return sellers;
}

/** GET /api/reviews */
export async function getReviews(): Promise<Review[]> {
  return reviews;
}

/** GET /api/reviews/featured */
export async function getFeaturedReview() {
  return featuredReview;
}

/** GET /api/community/discussions */
export async function getDiscussions(): Promise<Discussion[]> {
  return discussions;
}

/** GET /api/community/contributors */
export async function getContributors() {
  return contributors;
}

/** GET /api/news */
export async function getNews(): Promise<NewsArticle[]> {
  return newsArticles;
}

/** GET /api/news/scam-alerts */
export async function getScamAlerts() {
  return scamAlerts;
}

/** GET /api/guides */
export async function getGuides(): Promise<Guide[]> {
  return guides;
}

/** GET /api/guides/latest */
export async function getLatestGuides(): Promise<Guide[]> {
  return latestFromHub;
}

/** GET /api/guides/:slug */
export async function getGuide(slug: string): Promise<Guide | undefined> {
  return guideBySlug(slug);
}

/** GET /api/glossary */
export async function getGlossary() {
  return glossaryTerms;
}

/** GET /api/stats */
export async function getPlatformStats() {
  return platformStats;
}

/**
 * POST /api/ai/ask  { question: string }
 * The backend should stream or return the AI answer. This mock returns
 * a canned response so the Ask-AI experience is demo-able.
 */
export async function askAi(question: string): Promise<string> {
  await new Promise((r) => setTimeout(r, 900));
  return `Here is what GadgetHub AI found for “${question}”: Based on verified owner reviews, seller availability and current Nigerian price ranges, the MacBook Air M3 (93% confidence, ₦1.4M – ₦1.8M) is the strongest overall pick for students and business users, while the ASUS TUF F15 (88% confidence) leads for gaming under ₦1.5M. Always confirm warranty and seller verification before payment.`;
}

/**
 * POST /api/newsletter/subscribe { email }
 */
export async function subscribeNewsletter(email: string): Promise<{ ok: boolean }> {
  console.info('[mock] newsletter subscribe:', email);
  await new Promise((r) => setTimeout(r, 600));
  return { ok: true };
}

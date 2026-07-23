# GadgetHub — Backend Integration Guide

The frontend is **fully browsable on mock data** today. Integration was designed to be
a drop-in swap: every page reads data through the service layer, never directly from
mock files.

```
UI pages  ──►  src/services/index.ts  ──►  src/data/* (mock, today)
                        │
                        └──►  src/lib/api.ts  ──►  YOUR API (tomorrow)
```

## How to integrate

1. Set the API base URL in `.env`:
   ```
   VITE_API_URL=http://localhost:5000
   ```
2. Open `src/services/index.ts`. Each function has its target endpoint in a doc
   comment. Replace the mock return with the `api.*` call, e.g.:
   ```ts
   /** GET /api/products?sort=trending */
   export async function getTrendingProducts(): Promise<Product[]> {
     return api.get<Product[]>('/api/products?sort=trending');
   }
   ```
3. Match the response shapes to the types in `src/types/index.ts` — the UI needs no
   further changes.

`src/lib/api.ts` already handles: base URL, JSON headers, `Authorization: Bearer <token>`
(stored under `localStorage.gadgethub_token`), and error normalisation (`ApiError`).

## Expected endpoints

| Service function        | Endpoint                                        | Returns                |
| ----------------------- | ----------------------------------------------- | ---------------------- |
| `getProducts`           | `GET /api/products`                             | `Product[]`            |
| `getTrendingProducts`   | `GET /api/products?sort=trending`               | `Product[]`            |
| `getLaptops`            | `GET /api/products?category=laptops`            | `Product[]`            |
| `getProduct`            | `GET /api/products/:slug`                       | `Product`              |
| `searchProducts`        | `GET /api/search?q=`                            | `Product[]`            |
| `getSellers`            | `GET /api/sellers`                              | `Seller[]`             |
| `getReviews`            | `GET /api/reviews`                              | `Review[]`             |
| `getReviewsPage`        | `GET /api/reviews?page=&pageSize=`              | `Paged<Review>`        |
| `getFeaturedReview`     | `GET /api/reviews/featured`                     | featured review        |
| `getDiscussions`        | `GET /api/community/discussions`                | `Discussion[]`         |
| `getDiscussionsPage`    | `GET /api/community/discussions?page=&pageSize=`| `Paged<Discussion>`    |
| `getContributors`       | `GET /api/community/contributors`               | `Contributor[]`        |
| `getNews`               | `GET /api/news`                                 | `NewsArticle[]`        |
| `getNewsFeedPage`       | `GET /api/news/feed?page=&pageSize=`            | `Paged<NewsArticle>`   |
| `getScamAlerts`         | `GET /api/news/scam-alerts`                     | `ScamAlert[]`          |
| `getTickerFeed`         | `GET /api/activity/:feed`                       | `TickerItem[]`         |
| `getGuides`             | `GET /api/guides`                               | `Guide[]`              |
| `getGuide`              | `GET /api/guides/:slug`                         | `Guide`                |
| `getGlossary`           | `GET /api/glossary`                             | `GlossaryTerm[]`       |
| `getPlatformStats`      | `GET /api/stats`                                | `PlatformStats`        |
| `askAi`                 | `POST /api/ai/ask { question }`                 | `{ answer: string }`   |
| `askAiStream`           | `POST /api/ai/ask { question }` (streamed)      | chunked text / SSE     |
| `subscribeNewsletter`   | `POST /api/newsletter/subscribe`                | `{ ok: boolean }`      |

## Pagination contract

Paged endpoints return `Paged<T>` (see `src/types/index.ts`):

```json
{ "items": [...], "page": 1, "pageSize": 4, "total": 12, "hasMore": true }
```

The "Load More" buttons on Reviews, News, and Community are already wired to
this contract — implement the query params and the UI needs no changes.

## Streaming AI answers

The AI Advisor chat renders answers progressively through `askAiStream(question,
onUpdate)`. Today it simulates streaming from mock data; the exact fetch-reader
swap is written in its doc comment in `src/services/index.ts`. Any of these
backend styles works:

- **Chunked text** (simplest): `POST /api/ai/ask` responding with
  `Transfer-Encoding: chunked` plain text.
- **SSE**: `Content-Type: text/event-stream` with token deltas.

Keep `askAi` as the non-streaming fallback for the same endpoint.

## Live activity tickers

Every page's ticker fetches `getTickerFeed('<feed>')` where feed is one of
`home | search | laptops | news | learning | community | reviews`
(`GET /api/activity/:feed` → `TickerItem[]`). The frontend cycles the items
automatically — the backend just returns the latest ~5–10 activity events per
feed. Polling or a realtime channel can be added inside `getTickerFeed` later
without touching any page.

## Auth (to implement)

- `POST /api/auth/login { email, password }` → `{ token, user }`
- `POST /api/auth/register { name, email, password }` → `{ token, user }`
- `POST /api/auth/google { credential }` → `{ token, user }`
  - Frontend Google button lives in `src/pages/SignInPage.tsx`; the client ID comes
    from `VITE_GOOGLE_CLIENT_ID` (see `.env.example`).
- Store the returned token with `setAuthToken(token)` from `src/lib/api.ts` — every
  subsequent request sends it automatically.

## Money format

All amounts are integers in **Naira**. The UI formats them (`₦1.4M`, `₦950k`) via
`formatNaira` / `formatRange` in `src/lib/api.ts` — return raw numbers, not strings.


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

| Service function        | Endpoint                              | Returns                |
| ----------------------- | ------------------------------------- | ---------------------- |
| `getProducts`           | `GET /api/products`                   | `Product[]`            |
| `getTrendingProducts`   | `GET /api/products?sort=trending`     | `Product[]`            |
| `getLaptops`            | `GET /api/products?category=laptops`  | `Product[]`            |
| `getProduct`            | `GET /api/products/:slug`             | `Product`              |
| `searchProducts`        | `GET /api/search?q=`                  | `Product[]`            |
| `getSellers`            | `GET /api/sellers`                    | `Seller[]`             |
| `getReviews`            | `GET /api/reviews`                    | `Review[]`             |
| `getFeaturedReview`     | `GET /api/reviews/featured`           | featured review        |
| `getDiscussions`        | `GET /api/community/discussions`      | `Discussion[]`         |
| `getContributors`       | `GET /api/community/contributors`     | `Contributor[]`        |
| `getNews`               | `GET /api/news`                       | `NewsArticle[]`        |
| `getScamAlerts`         | `GET /api/news/scam-alerts`           | `ScamAlert[]`          |
| `getGuides`             | `GET /api/guides`                     | `Guide[]`              |
| `getGuide`              | `GET /api/guides/:slug`               | `Guide`                |
| `getGlossary`           | `GET /api/glossary`                   | `GlossaryTerm[]`       |
| `getPlatformStats`      | `GET /api/stats`                      | `PlatformStats`        |
| `askAi`                 | `POST /api/ai/ask { question }`       | `{ answer: string }`   |
| `subscribeNewsletter`   | `POST /api/newsletter/subscribe`      | `{ ok: boolean }`      |

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

## Nice-to-haves the UI is ready for

- Live ticker feeds (`TickerItem[]`) per page — currently static mock.
- Streaming AI answers (swap `askAi` for an SSE/fetch-stream implementation).
- Pagination on reviews/news/discussions ("Load More" buttons are wired as no-ops).

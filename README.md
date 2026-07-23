# GadgetHub Nigeria — Frontend

> **Stop Guessing. Start Buying Right.** — AI-powered gadget comparison, verified owner
> reviews, and a trusted seller network built for Nigerian buyers.

React 19 + TypeScript + Vite SPA implementing the full GadgetHub UI design system
(dark navy / electric blue / honest green, Outfit typeface).

## Quick start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build
npm run preview   # serve the production build
```

## Pages

**From the UI designs**

| Route | Page |
| --- | --- |
| `/` | Home — hero, AI recommendation, trending gadgets, decision engine |
| `/search?q=` | Gadget Search Intelligence |
| `/category/:slug` | Category Intelligence (e.g. Best Laptops in Nigeria) |
| `/knowledge-hub` | Knowledge Hub — Learn Before You Buy |
| `/knowledge-hub/guides/:slug` | Guide article (e.g. How to Choose the Right Laptop) |
| `/news` | Gadget News Intelligence |
| `/community` | Gadget Community |
| `/reviews` | Verified Owner Reviews |

**Platform pages** — `/ai-advisor` (AI chat), `/compare`, `/sellers`, `/product/:slug`, `/signin`

**Resources / company / legal** — `/how-it-works`, `/glossary`, `/help`, `/about`,
`/mission`, `/careers`, `/contact`, `/press`, `/privacy`, `/terms`, `/cookies`,
`/refunds`, `/sitemap`

## Project structure

```
src/
├── components/
│   ├── layout/        # Navbar, Footer, LiveTicker, PageCta, Layout
│   ├── ui.tsx         # Logo, Stars, ConfidenceRing, Avatar, DeviceArt, Robot…
│   └── ProductCard.tsx
├── pages/             # One file per page (+ InfoPages.tsx for static pages)
├── data/              # Mock data matching the designs (products, sellers, …)
├── services/          # ⭐ Backend integration point — see API_INTEGRATION.md
├── lib/               # api client, formatters
├── types/             # Shared domain types (frontend/backend contract)
├── styles/pages.css   # Nav + page-specific styles
└── index.css          # Design tokens + component classes
```

## Backend integration

The backend is developed separately. The frontend runs entirely on mock data until
it's ready — then integration is a function-by-function swap inside
`src/services/index.ts`. **Read [API_INTEGRATION.md](API_INTEGRATION.md).**

```bash
cp .env.example .env   # set VITE_API_URL and VITE_GOOGLE_CLIENT_ID
```

## Deployment

`vercel.json` contains the SPA rewrite (all routes → `index.html`). Deploy with
`vercel` or any static host serving `dist/`.

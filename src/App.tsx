import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import CategoryPage from './pages/CategoryPage';
import GuideArticlePage from './pages/GuideArticlePage';
import NewsPage from './pages/NewsPage';
import KnowledgeHubPage from './pages/KnowledgeHubPage';
import CommunityPage from './pages/CommunityPage';
import ReviewsPage from './pages/ReviewsPage';
import AiAdvisorPage from './pages/AiAdvisorPage';
import ComparePage from './pages/ComparePage';
import SellersPage from './pages/SellersPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SignInPage from './pages/SignInPage';
import {
  AboutPage, MissionPage, CareersPage, ContactPage, PressPage,
  PrivacyPage, TermsPage, CookiesPage, RefundsPage, SitemapPage,
  HelpPage, HowItWorksPage, GlossaryPage, NotFoundPage,
} from './pages/InfoPages';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Core pages (from UI designs) */}
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/knowledge-hub" element={<KnowledgeHubPage />} />
          <Route path="/knowledge-hub/guides/:slug" element={<GuideArticlePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />

          {/* Platform pages (linked in nav/designs) */}
          <Route path="/ai-advisor" element={<AiAdvisorPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/sellers" element={<SellersPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/signin" element={<SignInPage />} />

          {/* Resources */}
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="/help" element={<HelpPage />} />

          {/* Company */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/mission" element={<MissionPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/press" element={<PressPage />} />

          {/* Legal */}
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/refunds" element={<RefundsPage />} />
          <Route path="/sitemap" element={<SitemapPage />} />

          {/* Convenience redirects */}
          <Route path="/laptops" element={<Navigate to="/category/laptops" replace />} />
          <Route path="/deals" element={<Navigate to="/news" replace />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

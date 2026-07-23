import React, { Suspense, lazy } from 'react';
import { AppProvider, useApp } from './context/AppContext';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';

// React.lazy Dynamic Route Imports for Performance Code-Splitting
const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const CatalogPage = lazy(() => import('./pages/CatalogPage').then(module => ({ default: module.CatalogPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then(module => ({ default: module.ProductDetailPage })));
const CartCheckoutPage = lazy(() => import('./pages/CartCheckoutPage').then(module => ({ default: module.CartCheckoutPage })));
const WishlistPage = lazy(() => import('./pages/WishlistPage').then(module => ({ default: module.WishlistPage })));
const AuthPage = lazy(() => import('./pages/AuthPage').then(module => ({ default: module.AuthPage })));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage').then(module => ({ default: module.ForgotPasswordPage })));
const OrderTrackingPage = lazy(() => import('./pages/OrderTrackingPage').then(module => ({ default: module.OrderTrackingPage })));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage').then(module => ({ default: module.AdminDashboardPage || module.default })));
const UserDashboardPage = lazy(() => import('./pages/UserDashboardPage').then(module => ({ default: module.UserDashboardPage })));

// Additional Pages
const FaqPage = lazy(() => import('./pages/FaqPage').then(module => ({ default: module.FaqPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(module => ({ default: module.TermsPage })));
const BlogsPage = lazy(() => import('./pages/BlogsPage').then(module => ({ default: module.BlogsPage })));
const AboutUsPage = lazy(() => import('./pages/AboutUsPage').then(module => ({ default: module.AboutUsPage })));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage').then(module => ({ default: module.CategoriesPage })));

// Styles Import
import './styles/variables.css';
import './styles/components.css';
import './styles/animations.css';

// Sleek Glassmorphic Page Loader for React.Suspense
const PageLoader = () => (
  <div style={{
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    width: '100%',
    padding: '3rem 1rem'
  }}>
    <div style={{
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      border: '4px solid var(--border-light)',
      borderTopColor: 'hsl(var(--hue-primary), 85%, 50%)',
      animation: 'spin 0.8s linear infinite'
    }} />
    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
      Loading SWITCHES...
    </span>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Page rendering error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '3rem 1.5rem', textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            Admin Panel Workspace
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '440px' }}>
            {this.state.error?.message || 'An unexpected rendering issue occurred.'}
          </p>
          <button onClick={() => window.location.reload()} className="btn btn-primary">
            Reload Admin Panel
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const MainContent = () => {
  const { currentPage, toast } = useApp();
  const [showTopBanner, setShowTopBanner] = React.useState(true);

  const isAdminView = currentPage === 'admin';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingBottom: isAdminView ? 0 : 'calc(var(--mobile-nav-height) + 1rem)' }}>

      {/* Top Promotional Popup Banner — above everything */}
      {showTopBanner && !isAdminView && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 99999,
          background: 'linear-gradient(90deg, #ba0c2f 0%, #7a071c 100%)',
          color: '#fff',
          padding: '0.5rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          fontSize: '0.8rem',
          fontWeight: 700,
          textAlign: 'center',
          boxShadow: '0 2px 12px rgba(186,12,47,0.4)'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            🔥 <strong>LIMITED TIME:</strong> Use code
            <span style={{ background: 'rgba(255,255,255,0.22)', padding: '0.1rem 0.55rem', borderRadius: '4px', letterSpacing: '0.5px', fontFamily: 'monospace', fontSize: '0.85rem' }}>
              SWITCHES20
            </span>
            for <strong>20% OFF</strong> your entire order!
          </span>
          <button
            onClick={() => setShowTopBanner(false)}
            style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.8)', cursor: 'pointer', fontSize: '1rem', lineHeight: 1, padding: '0.25rem' }}
            aria-label="Close banner"
          >
            ✕
          </button>
        </div>
      )}
      
      {/* Toast Alert Banner */}
      {toast && (
        <div 
          className="animate-fade-in"
          style={{
            position: 'fixed',
            bottom: '5rem',
            right: '1.5rem',
            zIndex: 3000,
            background: 'var(--bg-glass-heavy)',
            border: '1px solid var(--border-active)',
            padding: '0.75rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            fontWeight: 700,
            fontSize: '0.875rem',
            color: 'var(--text-main)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <span>{toast.text}</span>
        </div>
      )}

      <Suspense fallback={<PageLoader />}>
        {isAdminView ? (
          /* Standalone Dedicated Full-Screen Admin Workspace */
          <div style={{ flex: 1, minHeight: '100vh', width: '100%' }}>
            <ErrorBoundary>
              <AdminDashboardPage />
            </ErrorBoundary>
          </div>
        ) : (
          <>
            {/* Public Sticky Navbar */}
            <Navbar />

            {/* Main Public View Container */}
            <main className="app-container" style={{ flex: 1 }}>
              {currentPage === 'home' && <HomePage />}
              {currentPage === 'catalog' && <CatalogPage />}
              {currentPage === 'product-detail' && <ProductDetailPage />}
              {currentPage === 'cart' && <CartCheckoutPage />}
              {currentPage === 'wishlist' && <WishlistPage />}
              {currentPage === 'auth' && <AuthPage />}
              {currentPage === 'forgot-password' && <ForgotPasswordPage />}
              {currentPage === 'orders' && <OrderTrackingPage />}
              {currentPage === 'user-dashboard' && <UserDashboardPage />}
              
              {/* Content pages */}
              {currentPage === 'about' && <AboutUsPage />}
              {currentPage === 'faq' && <FaqPage />}
              {currentPage === 'terms' && <TermsPage />}
              {currentPage === 'blogs' && <BlogsPage />}
              {currentPage === 'categories' && <CategoriesPage />}
            </main>

            {/* Public Footer */}
            <Footer />

            {/* Mobile Sticky Navigation Bar */}
            <MobileNav />
          </>
        )}
      </Suspense>

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

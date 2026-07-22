import React from 'react';
import { AppProvider, useApp } from './context/AppContext';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';

// Public Pages
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartCheckoutPage } from './pages/CartCheckoutPage';
import { WishlistPage } from './pages/WishlistPage';
import { AuthPage } from './pages/AuthPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { UserDashboardPage } from './pages/UserDashboardPage';

// Additional Pages
import { FaqPage } from './pages/FaqPage';
import { TermsPage } from './pages/TermsPage';
import { BlogsPage } from './pages/BlogsPage';
import { AboutUsPage } from './pages/AboutUsPage';

// Styles Import
import './styles/variables.css';
import './styles/components.css';
import './styles/animations.css';

const MainContent = () => {
  const { currentPage, toast } = useApp();

  const isAdminView = currentPage === 'admin';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingBottom: isAdminView ? 0 : 'calc(var(--mobile-nav-height) + 1rem)' }}>
      
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

      {isAdminView ? (
        /* Standalone Dedicated Full-Screen Admin Workspace */
        <div style={{ flex: 1, minHeight: '100vh', width: '100%' }}>
          <AdminDashboardPage />
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
            {currentPage === 'orders' && <OrderTrackingPage />}
            {currentPage === 'user-dashboard' && <UserDashboardPage />}
            
            {/* Content pages */}
            {currentPage === 'about' && <AboutUsPage />}
            {currentPage === 'faq' && <FaqPage />}
            {currentPage === 'terms' && <TermsPage />}
            {currentPage === 'blogs' && <BlogsPage />}
          </main>

          {/* Public Footer */}
          <Footer />

          {/* Mobile Sticky Navigation Bar */}
          <MobileNav />
        </>
      )}

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

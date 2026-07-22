import React from 'react';
import { useApp } from '../../context/AppContext';

export const Footer = () => {
  const { currentPage } = useApp();

  // Show footer ONLY on the Home Page
  if (currentPage !== 'home') {
    return null;
  }

  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-light)',
      padding: '2.5rem 0 2rem',
      marginTop: '3.5rem',
      color: 'var(--text-muted)'
    }}>
      <div className="app-container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem'
      }}>
        
        {/* Brand Info with Official Logo */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
            <img src="/logo.png" alt="SWITCHES Logo" style={{ height: '2.5rem', width: 'auto' }} />
            <div>
              <h3 style={{ color: 'var(--text-main)', fontSize: '1.25rem', fontWeight: 900, lineHeight: 1 }}>
                SWITCHES<span style={{ color: 'hsl(var(--hue-primary), 85%, 50%)' }}>.</span>
              </h3>
              <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '1px' }}>SINCE 2026</span>
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
            Next-generation retail platform engineered for speed, 60 FPS fluidity, and high-converting retail experiences.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Product Categories
          </h4>
          <ul style={{ listStyle: 'none', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            <li>Audio & Pro Wearables</li>
            <li>Tech & Ergonomics</li>
            <li>Apparel & Activewear</li>
            <li>Smart Home Ambient Lighting</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 style={{ color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Customer Care
          </h4>
          <ul style={{ listStyle: 'none', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            <li>Real-Time Order Tracking</li>
            <li>Shipping & Express Delivery</li>
            <li>Terms & Conditions</li>
            <li>Privacy & SLA Compliance</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 style={{ color: 'var(--text-main)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            SWITCHES VIP Club
          </h4>
          <p style={{ fontSize: '0.85rem', marginBottom: '0.75rem' }}>
            Subscribe for exclusive product drops and VIP discount codes.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              style={{
                flex: 1,
                padding: '0.5rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-light)',
                background: 'var(--bg-card)',
                color: 'var(--text-main)',
                fontSize: '0.85rem'
              }}
            />
            <button className="btn btn-primary" style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}>Join</button>
          </div>
        </div>

      </div>

      <div className="app-container" style={{
        marginTop: '2rem',
        paddingTop: '1.25rem',
        borderTop: '1px solid var(--border-light)',
        textAlign: 'center',
        fontSize: '0.8rem'
      }}>
        © 2026 SWITCHES Inc. All rights reserved. Premium Retail Platform.
      </div>
    </footer>
  );
};

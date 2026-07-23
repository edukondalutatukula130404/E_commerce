import React from 'react';
import { Shield, FileText, Lock, Scale, CheckCircle2 } from 'lucide-react';

export const TermsPage = () => {
  return (
    <div className="animate-fade-in" style={{ paddingTop: '1rem', paddingBottom: '4rem', maxWidth: '880px', margin: '0 auto' }}>
      
      {/* Page Header */}
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <div style={{
          width: '3rem',
          height: '3rem',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(0, 206, 201, 0.15)',
          color: 'hsl(var(--hue-accent), 90%, 45%)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '0.75rem'
        }}>
          <Scale size={28} />
        </div>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: '0.5rem' }}>
          Terms & Conditions
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
          Effective Date: July 21, 2026 — Version 2.4
        </p>
      </div>

      {/* Terms Content Container */}
      <div className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem', lineHeight: 1.7 }}>
        
        {/* Intro section */}
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={20} color="hsl(var(--hue-primary), 90%, 65%)" /> 1. Overview & Agreement
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Welcome to SWITCHES E-Commerce Platform ("SWITCHES", "we", "us", or "our"). By accessing or making a purchase on our website or mobile web application, you agree to be bound by these Terms & Conditions. Please read them carefully before placing an order.
          </p>
        </div>

        {/* Section 2 */}
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={20} color="hsl(var(--hue-primary), 90%, 65%)" /> 2. Ordering, Pricing & Stock Availability
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '0.75rem' }}>
            All prices displayed on SWITCHES are listed in US Dollars ($ USD) unless configured otherwise. We reserve the right to modify prices, discount promos, or availability without prior notice.
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', paddingLeft: '1rem' }}>
            <li>• Orders are subject to stock availability and validation of payment credentials.</li>
            <li>• We reserve the right to decline or cancel any order flagged for potential fraud.</li>
            <li>• Promotional coupon codes (e.g. SWITCHES10, SWITCHES20) are single-use per customer session.</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Lock size={20} color="hsl(var(--hue-primary), 90%, 65%)" /> 3. Privacy & Data Security
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Your privacy is paramount. We utilize 256-bit SSL encryption for all transaction data and local application storage. We do not sell or rent personal user telemetry to third-party advertising brokers.
          </p>
        </div>

        {/* Section 4 */}
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Shield size={20} color="hsl(var(--hue-primary), 90%, 65%)" /> 4. Warranty & Limitation of Liability
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            All hardware devices sold on SWITCHES include our 2-Year Hardware Warranty against defects. SWITCHES's total liability for any claim shall not exceed the price paid for the specific item purchased.
          </p>
        </div>

        {/* Contact box */}
        <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.25rem' }}>Have Legal or Compliance Questions?</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Contact our legal compliance team at <strong style={{ color: 'var(--text-main)' }}>legal@switches.io</strong>
          </p>
        </div>

      </div>

    </div>
  );
};

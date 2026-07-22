import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Zap, Truck, Award, Cpu, Sparkles } from 'lucide-react';

export const AboutUsPage = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="animate-fade-in" style={{ paddingTop: '1.5rem', paddingBottom: '4rem', maxWidth: '900px', margin: '0 auto' }}>
      
      {/* Header Banner */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="badge badge-primary" style={{ marginBottom: '0.75rem', fontSize: '0.75rem' }}>
          OUR HERITAGE & MISSION
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.1 }}>
          About <span style={{ color: '#ba0c2f' }}>SWITCHES</span>
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
          Next-generation retail platform engineered for speed, 60 FPS fluidity, and high-performance consumer hardware.
        </p>
      </div>

      {/* Brand Story Section */}
      <div className="card" style={{ padding: '2rem', marginBottom: '2.5rem', background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%)' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-main)' }}>
          Precision Engineering Since 2026
        </h2>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1rem' }}>
          SWITCHES was founded with a singular focus: to strip away retail friction and deliver premium-grade hardware engineered down to the sub-millimeter level. From low-latency ANC wireless audio to hot-swappable mechanical keyboards, every item in our catalog undergoes rigorous 100-point testing.
        </p>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
          Our platform combines instant sub-second page rendering with real-time WebSocket logistics tracking, ensuring an unmatched shopping experience from product discovery to unboxing.
        </p>
      </div>

      {/* Core Pillars Grid */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.25rem', textAlign: 'center' }}>
          Our Core Pillars
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem'
        }}>
          {[
            { icon: Zap, title: "Sub-Second Fluidity", desc: "Engineered for 60 FPS interactions with zero load latency." },
            { icon: ShieldCheck, title: "2-Year Hardware Coverage", desc: "Comprehensive replacement guarantee on all physical gear." },
            { icon: Truck, title: "Express Worldwide Shipping", desc: "Real-time WebSocket tracking with dispatch under 24 hours." },
            { icon: Cpu, title: "Craftsmanship & Ergonomics", desc: "Premium tactile materials built for long-term daily workflows." }
          ].map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(186, 12, 47, 0.12)',
                  color: 'hsl(var(--hue-primary), 85%, 50%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={20} />
                </div>
                <h3 style={{ fontSize: '0.98rem', fontWeight: 800 }}>{pillar.title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{pillar.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      <div className="card" style={{ padding: '2rem', textAlign: 'center', background: 'var(--bg-secondary)' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Ready to Upgrade Your Setup?</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          Discover our curated collection of high-performance tech hardware and activewear.
        </p>
        <button onClick={() => setCurrentPage('catalog')} className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}>
          Explore Products Catalog
        </button>
      </div>

    </div>
  );
};

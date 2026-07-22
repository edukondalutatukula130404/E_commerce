import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowRight, User, X, Tag } from 'lucide-react';

export const BlogsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeBlog, setActiveBlog] = useState(null);

  const blogs = [
    {
      id: "b1",
      title: "The Architecture of Sub-Second E-Commerce: How We Built AURA",
      category: "Tech",
      readTime: "5 min read",
      date: "July 20, 2026",
      author: "Alex Mercer",
      authorRole: "Lead Architect",
      summary: "Exploring modern CSS hardware acceleration, Vite concurrent HMR, and optimistic state synchronization for 60 FPS mobile shopping.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      content: `In the modern digital landscape, millisecond delays convert directly to lost revenue. When building AURA, our engineering goal was simple: achieve zero-friction UI rendering across any viewport size from a 320px mobile phone to a 4K desktop display.

### 1. Hardware-Accelerated CSS Transitions
By relying exclusively on CSS \`transform3d\` and \`opacity\` properties, we ensure the GPU handles all card elevations, spring physics drawer slide-overs, and active button scaling without causing main-thread layout reflows.

### 2. Debounced Fuzzy Client Search
Search responsiveness is critical for mobile shoppers on the go. Our custom debouncer allows instant query filtering under 10ms delay.

### 3. Glassmorphism Aesthetics
Utilizing HSL CSS custom properties and \`backdrop-filter: blur(14px)\`, AURA delivers futuristic glass surfaces with a clean light aesthetic.`
    },
    {
      id: "b2",
      title: "Next-Gen ANC & Studio Audio: High-Fidelity Wearables Guide",
      category: "Guides",
      readTime: "4 min read",
      date: "July 18, 2026",
      author: "Elena Rostova",
      authorRole: "Audio Specialist",
      summary: "A breakdown of hybrid Active Noise Cancellation, spatial 3D audio, and 40-hour titanium drivers in modern wireless headphones.",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      content: `Audio technology has evolved rapidly over the past two years. Hybrid Active Noise Cancellation (ANC) now combines external feed-forward microphones with internal feedback sensors to cancel low-frequency ambient sounds up to -42dB.

### Why Titanium Drivers Matter
Titanium drivers offer extreme stiffness-to-weight ratios, eliminating harmonic distortion at high volume outputs while delivering deep, punchy bass response.`
    },
    {
      id: "b3",
      title: "Designing Smart Homes: Ambient Lighting & Color Science",
      category: "Smart Home",
      readTime: "6 min read",
      date: "July 15, 2026",
      author: "Maya Lin",
      authorRole: "Interior UX Designer",
      summary: "How reactive sound-synced RGBIC lighting bars enhance focus, circadian rhythms, and gaming setups.",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
      content: `Lighting dictates atmospheric mood and productivity. With modern RGBIC gradient light bars, every LED chip can be individually controlled to project dynamic color gradients synced with real-time sound audio.`
    },
    {
      id: "b4",
      title: "Ergonomic Mechanical Keyboards: Tactile Gasket Mounts Explained",
      category: "Tech",
      readTime: "7 min read",
      date: "July 10, 2026",
      author: "Alex Mercer",
      authorRole: "Hardware Engineer",
      summary: "Why gasket mounting, PBT keycaps, and hot-swappable switches define the ultimate typing experience.",
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
      content: `Traditional keyboards place switches directly onto a rigid metal plate. Gasket mounting introduces silicone or poron dampeners between the plate and chassis, creating a cushioned, acoustic typing pop.`
    }
  ];

  const categories = ['All', 'Tech', 'Guides', 'Smart Home'];

  const filteredBlogs = selectedCategory === 'All' 
    ? blogs 
    : blogs.filter(b => b.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="animate-fade-in" style={{ paddingTop: '1rem', paddingBottom: '4rem' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{
          width: '3rem',
          height: '3rem',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(108, 92, 231, 0.15)',
          color: 'hsl(var(--hue-primary), 90%, 65%)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '0.75rem'
        }}>
          <BookOpen size={28} />
        </div>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: '0.5rem' }}>
          AURA Insights & Engineering Blog
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
          Articles on modern hardware, UI performance, smart home automation, and product design.
        </p>
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className="btn"
            style={{
              padding: '0.45rem 1.25rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: selectedCategory === cat ? 700 : 500,
              background: selectedCategory === cat ? 'var(--grad-primary)' : 'var(--bg-secondary)',
              color: selectedCategory === cat ? '#fff' : 'var(--text-main)',
              border: '1px solid var(--border-light)'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Articles Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {filteredBlogs.map((blog) => (
          <div key={blog.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', width: '100%', paddingTop: '55%', background: 'var(--bg-secondary)', overflow: 'hidden' }}>
              <img
                src={blog.image}
                alt={blog.title}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span className="badge badge-accent" style={{ position: 'absolute', top: '12px', left: '12px' }}>
                {blog.category}
              </span>
            </div>

            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={14} /> {blog.date}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={14} /> {blog.readTime}
                  </span>
                </div>
                <h3 
                  onClick={() => setActiveBlog(blog)}
                  style={{ fontSize: '1.15rem', fontWeight: 800, cursor: 'pointer', marginBottom: '0.5rem', lineHeight: 1.35 }}
                >
                  {blog.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {blog.summary}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  By {blog.author}
                </span>
                <button 
                  onClick={() => setActiveBlog(blog)} 
                  className="btn btn-secondary"
                  style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
                >
                  Read Article <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Article Reading Modal */}
      {activeBlog && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 3000,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div className="card animate-fade-in" style={{
            width: '100%',
            maxWidth: '720px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '2rem',
            background: 'var(--bg-card)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="badge badge-primary">{activeBlog.category}</span>
              <button onClick={() => setActiveBlog(null)} className="btn btn-icon">
                <X size={18} />
              </button>
            </div>

            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, lineHeight: 1.3 }}>{activeBlog.title}</h1>
            
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <span>By <strong>{activeBlog.author}</strong> ({activeBlog.authorRole})</span>
              <span>• {activeBlog.date}</span>
              <span>• {activeBlog.readTime}</span>
            </div>

            <img
              src={activeBlog.image}
              alt={activeBlog.title}
              style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
            />

            <div style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-main)', whiteSpace: 'pre-line' }}>
              {activeBlog.content}
            </div>

            <button onClick={() => setActiveBlog(null)} className="btn btn-secondary" style={{ marginTop: '1rem', alignSelf: 'flex-start' }}>
              Close Article
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

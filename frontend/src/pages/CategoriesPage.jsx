import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Cpu, Shirt, Home as HomeIcon, Briefcase, Sparkles, 
  Phone, Eye, Gamepad, Layers, ArrowLeft, ChevronDown, ChevronUp, Tag, ArrowRight 
} from 'lucide-react';

export const CategoriesPage = () => {
  const { 
    categoriesList, 
    products, 
    setSelectedCategory, 
    setSelectedSubCategory, 
    setCurrentPage 
  } = useApp();

  const [expandedCatId, setExpandedCatId] = useState(null);

  // Icon Map matching category icon names
  const getIcon = (iconName, color) => {
    const props = { size: 24, style: { color: color || 'var(--text-main)' } };
    switch (iconName?.toLowerCase()) {
      case 'cpu': return <Cpu {...props} />;
      case 'shirt': return <Shirt {...props} />;
      case 'homeicon': return <HomeIcon {...props} />;
      case 'briefcase': return <Briefcase {...props} />;
      case 'phone': return <Phone {...props} />;
      case 'eye': return <Eye {...props} />;
      case 'gamepad': return <Gamepad {...props} />;
      default: return <Layers {...props} />;
    }
  };

  const handleCategoryClick = (catId) => {
    setExpandedCatId(expandedCatId === catId ? null : catId);
  };

  const handleSubCategorySelect = (catName, subCatName) => {
    setSelectedCategory(catName);
    setSelectedSubCategory(subCatName);
    setCurrentPage('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewAllCategory = (catName) => {
    setSelectedCategory(catName);
    setSelectedSubCategory('All');
    setCurrentPage('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="animate-fade-in" style={{ paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
      
      {/* Back Button / Breadcrumb */}
      <div>
        <button 
          onClick={() => setCurrentPage('home')} 
          className="btn btn-secondary" 
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', padding: '0.35rem 0.75rem' }}
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Header section */}
      <div>
        <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '0.35rem' }}>
          Explore Categories
        </h1>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
          Click any category card below to view its sub-categories and filter products.
        </p>
      </div>

      {/* Categories Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.25rem',
        width: '100%',
        marginBottom: '2rem'
      }}>
        {/* All Products Card */}
        <div 
          className="card"
          style={{
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            cursor: 'pointer',
            minHeight: '160px',
            border: '1px solid var(--border-light)',
            background: 'linear-gradient(135deg, rgba(186, 12, 47, 0.05) 0%, rgba(0, 0, 0, 0) 100%)',
            transition: 'all 0.25s ease'
          }}
          onClick={() => handleViewAllCategory('All')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ 
              width: '46px', 
              height: '46px', 
              borderRadius: 'var(--radius-md)', 
              background: 'rgba(186, 12, 47, 0.12)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <Sparkles size={24} color="#BA0C2F" />
            </div>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#BA0C2F', background: 'rgba(186, 12, 47, 0.1)', padding: '0.2rem 0.55rem', borderRadius: 'var(--radius-full)' }}>
              ALL PRODUCTS
            </span>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.25rem' }}>Browse Everything</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              Show all {products.length} products <ArrowRight size={12} />
            </p>
          </div>
        </div>

        {/* Dynamic Categories Cards */}
        {categoriesList.map((cat) => {
          const isExpanded = expandedCatId === cat.id;
          const catProducts = products.filter(p => p.category?.toLowerCase() === cat.name?.toLowerCase());
          const productCount = catProducts.length;

          return (
            <div 
              key={cat.id}
              className="card"
              style={{
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                border: isExpanded ? '2px solid var(--border-active)' : '1px solid var(--border-light)',
                background: isExpanded ? 'var(--bg-glass-light)' : 'var(--bg-card)',
                boxShadow: isExpanded ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                transition: 'all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
                minHeight: '160px',
                height: 'fit-content'
              }}
              onClick={() => handleCategoryClick(cat.id)}
            >
              {/* Card Top section */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ 
                  width: '46px', 
                  height: '46px', 
                  borderRadius: 'var(--radius-md)', 
                  background: `${cat.color}15`, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  {getIcon(cat.icon, cat.color)}
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ 
                    fontSize: '0.7rem', 
                    fontWeight: 700, 
                    color: cat.color || 'var(--text-main)', 
                    background: `${cat.color || '#ba0c2f'}10`, 
                    padding: '0.25rem 0.6rem', 
                    borderRadius: 'var(--radius-full)' 
                  }}>
                    {productCount} {productCount === 1 ? 'Product' : 'Products'}
                  </span>
                  {isExpanded ? <ChevronUp size={16} color="var(--text-muted)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
                </div>
              </div>

              {/* Card Label */}
              <div style={{ marginTop: '1.5rem', width: '100%' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.15rem' }}>{cat.name}</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'lowercase' }}>
                  /{cat.slug || cat.name.toLowerCase()}
                </p>
              </div>

              {/* Subcategories list - Collapsible */}
              {isExpanded && (
                <div 
                  style={{ 
                    marginTop: '1.25rem', 
                    paddingTop: '1rem', 
                    borderTop: '1px solid var(--border-light)',
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '0.5rem',
                    width: '100%',
                    animation: 'fadeIn 0.25s ease-out forwards'
                  }}
                  onClick={(e) => e.stopPropagation()} // Stop bubbling so clicking subcategory doesn't close card
                >
                  <label style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Sub-Categories
                  </label>
                  
                  {cat.subCategories && cat.subCategories.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {cat.subCategories.map((sub) => {
                        const subCount = catProducts.filter(p => p.subCategory?.toLowerCase() === sub.toLowerCase()).length;
                        return (
                          <button
                            key={sub}
                            onClick={() => handleSubCategorySelect(cat.name, sub)}
                            className="btn btn-secondary"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '0.45rem 0.75rem',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              borderRadius: 'var(--radius-sm)',
                              textAlign: 'left',
                              minHeight: '34px',
                              width: '100%'
                            }}
                          >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                              <Tag size={12} color="var(--text-muted)" />
                              <span>{sub}</span>
                            </span>
                            <span style={{ fontSize: '0.72rem', opacity: 0.7 }}>
                              ({subCount})
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                      No sub-categories defined
                    </p>
                  )}

                  {/* View All Category Products Action */}
                  <button
                    onClick={() => handleViewAllCategory(cat.name)}
                    className="btn btn-primary"
                    style={{ 
                      marginTop: '0.4rem', 
                      fontSize: '0.8rem', 
                      padding: '0.45rem', 
                      fontWeight: 700,
                      width: '100%',
                      minHeight: '34px'
                    }}
                  >
                    View All {cat.name} Products
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

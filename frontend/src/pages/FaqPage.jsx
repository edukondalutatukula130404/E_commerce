import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search, Truck, ShieldCheck, CreditCard, RefreshCw } from 'lucide-react';

export const FaqPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      category: "Shipping & Delivery",
      icon: Truck,
      question: "How fast is SWITCHES express shipping?",
      answer: "We offer sub-second order processing and same-day dispatch for orders placed before 2 PM. Express delivery typically arrives within 1 to 3 business days nationwide. All orders over ₹1,500 qualify for free express shipping."
    },
    {
      category: "Shipping & Delivery",
      icon: Truck,
      question: "Can I track my order status in real time?",
      answer: "Yes! Every order comes with an interactive live status tracker. Visit the 'Order Tracking' page to follow your shipment from Processing -> Shipped -> Delivered in real time."
    },
    {
      category: "Returns & Refunds",
      icon: RefreshCw,
      question: "What is SWITCHES's return policy?",
      answer: "We offer a 30-day no-questions-asked money-back guarantee. If you are not 100% satisfied with your item, submit a return request for a free return shipping label and instant refund processing."
    },
    {
      category: "Warranty & Quality",
      icon: ShieldCheck,
      question: "Do SWITCHES products come with a warranty?",
      answer: "All hardware, audio, smartwatch, and ambient lighting products come standard with our 2-Year Comprehensive Hardware Replacement Warranty covering any manufacturing or performance defects."
    },
    {
      category: "Payment Methods",
      icon: CreditCard,
      question: "What payment methods do you accept?",
      answer: "We support major Credit/Debit Cards (Visa, MasterCard, Amex), instant UPI & Mobile Payments, and Cash on Delivery (COD) for selected regional postcodes."
    },
    {
      category: "Promo Codes",
      icon: HelpCircle,
      question: "How do I apply a discount promo code?",
      answer: "You can enter your promo code in the checkout drawer or cart summary page. Try using code 'SWITCHES10' for 10% off or 'SWITCHES20' for VIP discount."
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in" style={{ paddingTop: '1rem', paddingBottom: '4rem', maxWidth: '840px', margin: '0 auto' }}>
      
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
          <HelpCircle size={28} />
        </div>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: '0.5rem' }}>
          Frequently Asked Questions
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
          Got questions? We're here to help you get the most out of your SWITCHES experience.
        </p>
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative', marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Search questions or keywords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '0.85rem 1rem 0.85rem 2.75rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            background: 'var(--bg-card)',
            color: 'var(--text-main)',
            fontSize: '0.95rem',
            boxShadow: 'var(--shadow-sm)'
          }}
        />
        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
      </div>

      {/* Accordion FAQ Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          const Icon = faq.icon;
          return (
            <div 
              key={idx} 
              className="card"
              style={{
                border: isOpen ? '1px solid var(--border-active)' : '1px solid var(--border-light)',
                transition: 'all 0.25s ease'
              }}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                style={{
                  width: '100%',
                  padding: '1.25rem 1.5rem',
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'left',
                  cursor: 'pointer',
                  color: 'var(--text-main)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <Icon size={20} color="hsl(var(--hue-primary), 90%, 65%)" />
                  <span style={{ fontSize: '1.05rem', fontWeight: 700 }}>{faq.question}</span>
                </div>
                <ChevronDown 
                  size={20} 
                  style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.3s ease',
                    color: 'var(--text-muted)'
                  }} 
                />
              </button>

              {isOpen && (
                <div style={{
                  padding: '0 1.5rem 1.25rem 3.6rem',
                  fontSize: '0.95rem',
                  lineHeight: 1.65,
                  color: 'var(--text-muted)',
                  borderTop: '1px solid var(--border-light)',
                  paddingTop: '1rem'
                }}>
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

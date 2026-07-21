import React from 'react';
import { useApp } from '../context/AppContext';
import { Package, Clock, CheckCircle2, Truck, AlertCircle } from 'lucide-react';

export const OrderTrackingPage = () => {
  const { orders, setCurrentPage } = useApp();

  const getStepStatusIndex = (status) => {
    if (status === 'processing') return 0;
    if (status === 'shipped') return 1;
    if (status === 'delivered') return 2;
    return 0;
  };

  return (
    <div className="animate-fade-in" style={{ paddingTop: '1rem', paddingBottom: '4rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Order History & Live Status</h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Track real-time shipment status and order timeline
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <Package size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>No Orders Found</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            You haven't placed any orders yet. Explore our catalog to get started.
          </p>
          <button onClick={() => setCurrentPage('catalog')} className="btn btn-primary">
            Browse Products
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {orders.map((order) => {
            const currentStep = getStepStatusIndex(order.status);
            const steps = [
              { label: 'Processing', icon: Clock },
              { label: 'Shipped', icon: Truck },
              { label: 'Delivered', icon: CheckCircle2 }
            ];

            return (
              <div key={order.id} className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{order.id}</h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'hsl(var(--hue-primary), 90%, 65%)' }}>
                      ${order.totalAmount}
                    </span>
                    <span className="badge badge-accent" style={{ display: 'block', marginTop: '0.2rem', fontSize: '0.7rem' }}>
                      {order.paymentMethod.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Items Summary */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0.85rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                  {order.items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                      <span>{item.quantity}x <strong>{item.name}</strong> ({item.selectedColor || 'Default'})</span>
                      <span style={{ fontWeight: 700 }}>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Live Status Step Timeline */}
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-muted)' }}>
                    Shipment Timeline:
                  </h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                    {steps.map((step, idx) => {
                      const Icon = step.icon;
                      const isDone = idx <= currentStep;
                      return (
                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, position: 'relative', zIndex: 2 }}>
                          <div style={{
                            width: '2.5rem',
                            height: '2.5rem',
                            borderRadius: 'var(--radius-full)',
                            background: isDone ? 'var(--grad-primary)' : 'var(--bg-secondary)',
                            color: isDone ? '#fff' : 'var(--text-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px solid var(--border-light)',
                            marginBottom: '0.4rem'
                          }}>
                            <Icon size={16} />
                          </div>
                          <span style={{ fontSize: '0.75rem', fontWeight: isDone ? 700 : 500, color: isDone ? 'var(--text-main)' : 'var(--text-muted)' }}>
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

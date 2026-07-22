// API Client for AURA E-Commerce Backend

const API_BASE = '/api';

export const api = {
  // Products
  getProducts: async (params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/products?${query}`);
      if (!res.ok) throw new Error('Failed to fetch products');
      return await res.json();
    } catch (err) {
      console.warn('Backend offline, using fallback mock product data', err);
      return null;
    }
  },

  getProductById: async (id) => {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`);
      if (!res.ok) throw new Error('Product not found');
      return await res.json();
    } catch (err) {
      console.warn('Backend offline for getProductById', err);
      return null;
    }
  },

  // Auth
  login: async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Server unreachable' };
    }
  },

  register: async (name, email, password) => {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Server unreachable' };
    }
  },

  // Product CRUD
  createProduct: async (productData) => {
    try {
      const res = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Server unreachable' };
    }
  },

  updateProduct: async (id, productData) => {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Server unreachable' };
    }
  },

  deleteProduct: async (id) => {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: 'DELETE'
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Server unreachable' };
    }
  },

  // Orders
  getOrders: async () => {
    try {
      const res = await fetch(`${API_BASE}/orders`);
      if (!res.ok) throw new Error('Failed to fetch orders');
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  createOrder: async (orderData) => {
    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Server unreachable' };
    }
  },

  updateOrderStatus: async (id, status) => {
    try {
      const res = await fetch(`${API_BASE}/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Server unreachable' };
    }
  },

  deleteOrder: async (id) => {
    try {
      const res = await fetch(`${API_BASE}/orders/${id}`, {
        method: 'DELETE'
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Server unreachable' };
    }
  },

  // Vendors
  getVendors: async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/vendors`);
      if (!res.ok) throw new Error('Failed to fetch vendors');
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  createVendor: async (vendorData) => {
    try {
      const res = await fetch(`${API_BASE}/admin/vendors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vendorData)
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Server unreachable' };
    }
  },

  disburseVendorPayout: async (id) => {
    try {
      const res = await fetch(`${API_BASE}/admin/vendors/${id}/payout`, {
        method: 'POST'
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Server unreachable' };
    }
  },

  deleteVendor: async (id) => {
    try {
      const res = await fetch(`${API_BASE}/admin/vendors/${id}`, {
        method: 'DELETE'
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Server unreachable' };
    }
  },

  // Categories
  getCategories: async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/categories`);
      if (!res.ok) throw new Error('Failed to fetch categories');
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  createCategory: async (categoryData) => {
    try {
      const res = await fetch(`${API_BASE}/admin/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData)
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Server unreachable' };
    }
  },

  updateCategory: async (id, categoryData) => {
    try {
      const res = await fetch(`${API_BASE}/admin/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData)
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Server unreachable' };
    }
  },

  deleteCategory: async (id) => {
    try {
      const res = await fetch(`${API_BASE}/admin/categories/${id}`, {
        method: 'DELETE'
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Server unreachable' };
    }
  },

  // Payments
  getPayments: async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/payments`);
      if (!res.ok) throw new Error('Failed to fetch payments');
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  updatePaymentStatus: async (id, status) => {
    try {
      const res = await fetch(`${API_BASE}/admin/payments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Server unreachable' };
    }
  },

  // Banners
  getBanners: async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/banners`);
      if (!res.ok) throw new Error('Failed to fetch banners');
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  createBanner: async (bannerData) => {
    try {
      const res = await fetch(`${API_BASE}/admin/banners`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bannerData)
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Server unreachable' };
    }
  },

  updateBanner: async (id, bannerData) => {
    try {
      const res = await fetch(`${API_BASE}/admin/banners/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bannerData)
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Server unreachable' };
    }
  },

  deleteBanner: async (id) => {
    try {
      const res = await fetch(`${API_BASE}/admin/banners/${id}`, {
        method: 'DELETE'
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Server unreachable' };
    }
  },

  // Users
  getUsers: async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/users`);
      if (!res.ok) throw new Error('Failed to fetch users');
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  updateUserRole: async (id, role) => {
    try {
      const res = await fetch(`${API_BASE}/admin/users/${id}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role })
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Server unreachable' };
    }
  },

  deleteUser: async (id) => {
    try {
      const res = await fetch(`${API_BASE}/admin/users/${id}`, {
        method: 'DELETE'
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Server unreachable' };
    }
  },

  // Admin Metrics
  getAdminMetrics: async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/metrics`);
      if (!res.ok) throw new Error('Failed to fetch metrics');
      return await res.json();
    } catch (err) {
      return null;
    }
  }
};

const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  const hostname = window.location.hostname || 'localhost';
  return `http://${hostname}:5000/api`;
};

const API_BASE = getApiBaseUrl();

const getHeaders = () => {
  const token = localStorage.getItem('switches_auth_token') || localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const api = {
  // Products
  getProducts: async (params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/products?${query}`);
      if (!res.ok) throw new Error('Failed to fetch products');
      return await res.json();
    } catch (err) {
      console.warn('Backend offline, using fallback product data', err);
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
        headers: getHeaders(),
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('switches_auth_token', data.token);
      }
      return data;
    } catch (err) {
      return { success: false, message: 'Server unreachable' };
    }
  },

  register: async (name, email, password) => {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('switches_auth_token', data.token);
      }
      return data;
    } catch (err) {
      return { success: false, message: 'Server unreachable' };
    }
  },

  getCurrentUser: async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: getHeaders()
      });
      if (!res.ok) return null;
      return await res.json();
    } catch (err) {
      return null;
    }
  },

  forgotPassword: async (email) => {
    try {
      const res = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email })
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Server unreachable' };
    }
  },

  verifyOtp: async (email, otp) => {
    try {
      const res = await fetch(`${API_BASE}/auth/verify-otp`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email, otp })
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Server unreachable' };
    }
  },

  resetPassword: async (email, otp, newPassword) => {
    try {
      const res = await fetch(`${API_BASE}/auth/reset-password`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email, otp, newPassword })
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Server unreachable' };
    }
  },

  // Product CRUD (Admin Protected)
  createProduct: async (productData) => {
    try {
      const res = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: getHeaders(),
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
        headers: getHeaders(),
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
        method: 'DELETE',
        headers: getHeaders()
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Server unreachable' };
    }
  },

  // Orders
  getOrders: async () => {
    try {
      const res = await fetch(`${API_BASE}/orders`, {
        headers: getHeaders()
      });
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
        headers: getHeaders(),
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
        headers: getHeaders(),
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
        method: 'DELETE',
        headers: getHeaders()
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Server unreachable' };
    }
  },

  // Vendors
  getVendors: async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/vendors`, {
        headers: getHeaders()
      });
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
        headers: getHeaders(),
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
        method: 'POST',
        headers: getHeaders()
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Server unreachable' };
    }
  },

  deleteVendor: async (id) => {
    try {
      const res = await fetch(`${API_BASE}/admin/vendors/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
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
        headers: getHeaders(),
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
        headers: getHeaders(),
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
        method: 'DELETE',
        headers: getHeaders()
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Server unreachable' };
    }
  },

  uploadImage: async (base64Image) => {
    try {
      const backendUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';
      const res = await fetch(`${backendUrl}/api/admin/upload`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ image: base64Image })
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Server unreachable' };
    }
  },

  // Payments
  getPayments: async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/payments`, {
        headers: getHeaders()
      });
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
        headers: getHeaders(),
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
        headers: getHeaders(),
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
        headers: getHeaders(),
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
        method: 'DELETE',
        headers: getHeaders()
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Server unreachable' };
    }
  },

  // Users
  getUsers: async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/users`, {
        headers: getHeaders()
      });
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
        headers: getHeaders(),
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
        method: 'DELETE',
        headers: getHeaders()
      });
      return await res.json();
    } catch (err) {
      return { success: false, message: 'Server unreachable' };
    }
  },

  // Admin Metrics
  getAdminMetrics: async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/metrics`, {
        headers: getHeaders()
      });
      if (!res.ok) throw new Error('Failed to fetch metrics');
      return await res.json();
    } catch (err) {
      return null;
    }
  }
};

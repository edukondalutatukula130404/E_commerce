# Application Architecture & System Design
## Modular Architecture & Data Flow

---

### 1. High-Level Architecture Diagram

```
+-----------------------------------------------------------------------+
|                             USER INTERFACE                            |
|  +--------------------+  +--------------------+  +-----------------+  |
|  |  Desktop Navigation|  |  Mobile Bottom Nav |  | Theme Selector  |  |
|  +--------------------+  +--------------------+  +-----------------+  |
+-----------------------------------------------------------------------+
                                    |
+-----------------------------------------------------------------------+
|                           VIEW COMPONENTS                             |
|  +--------------+  +-----------------+  +--------------------------+  |
|  | CatalogView  |  | ProductDetail   |  | Cart & Checkout Drawer   |  |
|  +--------------+  +-----------------+  +--------------------------+  |
|  | WishlistView |  | UserOrderView   |  | AdminDashboardView       |  |
|  +--------------+  +-----------------+  +--------------------------+  |
+-----------------------------------------------------------------------+
                                    |
+-----------------------------------------------------------------------+
|                     APPLICATION STATE CONTROLLERS                     |
|  +-----------------------------------------------------------------+  |
|  | CartContext  | WishlistContext | AuthContext | FilterContext   |  |
|  +-----------------------------------------------------------------+  |
+-----------------------------------------------------------------------+
                                    |
+-----------------------------------------------------------------------+
|                      DATA & SERVICES PERSISTENCE                      |
|  +-----------------------+  +--------------------+  +--------------+  |
|  | LocalStorage Sync     |  | Mock API Engine    |  | IndexedDB    |  |
|  +-----------------------+  +--------------------+  +--------------+  |
+-----------------------------------------------------------------------+
```

---

### 2. Component Structure Hierarchy

```
src/
├── assets/             # Brand logos, fallback banners & icons
├── components/         # Reusable UI Primitives
│   ├── common/         # Buttons, Badges, Modals, Skeleton Loaders, Toasts
│   ├── layout/         # Header, Footer, MobileNav, LayoutContainer
│   ├── product/        # ProductCard, ProductGrid, ProductFilter, QuickViewModal
│   ├── cart/           # CartSlideOver, CartItemRow, CheckoutModal, OrderSummary
│   └── admin/          # AdminMetrics, ProductTable, OrderManager
├── context/            # React Context Providers & Custom Reducers
│   ├── AppContext.jsx  # Combined Master Context
│   ├── CartContext.jsx # Cart state, addition, deletion, discount math
│   └── ThemeContext.jsx# Dark/Light theme dynamic root class switcher
├── hooks/              # Custom React Hooks
│   ├── useProducts.js  # Product fetching, filtering, sorting logic
│   ├── useDebounce.js  # High-speed search input debouncer
│   └── useMediaQuery.js# Mobile vs Desktop viewport listener
├── data/               # Rich Mock E-Commerce Catalog Data
│   └── mockProducts.js # Curated inventory across multiple categories
├── styles/             # Global CSS & Design Tokens
│   ├── variables.css   # HSL Palette, Typography, Elevations, Radius
│   ├── components.css  # Shared class primitives (cards, buttons, glass)
│   └── animations.css  # Keyframe animations (fade-in, slide-up, shimmer)
├── App.jsx             # Main Application Routing & Screen Coordinator
└── main.jsx            # Application Entry Point
```

---

### 3. Data Flow & State Synchronization Pattern

1. **User Interaction**: User triggers an action (e.g., clicks "Add to Cart", filters by "Electronics", toggles dark mode).
2. **Context Dispatch**: The action triggers a reducer dispatch event (`ADD_TO_CART`, `SET_SEARCH_QUERY`, `TOGGLE_THEME`).
3. **Optimistic UI Update**: Reactive state immediately updates the DOM within `< 16ms` (1 frame).
4. **Persistent Sync**: Background sync listener serializes current state into `localStorage` asynchronously without blocking render main thread.
5. **Notification Feedback**: Instant toast banner alerts the user with micro-feedback.

# Design System & UI/UX Guidelines ("AURA" System)
## Aesthetics, Visual Identity, Breakpoints & Motion Design

---

### 1. Color Palette & Token System (HSL Based)

The design system uses HSL values to enable ultra-smooth color transitions, dark mode adaptivity, and glassmorphism.

```css
:root {
  /* Brand Core Colors */
  --hue-primary: 250; /* Deep Indigo / Electric Violet */
  --hue-accent: 190;  /* Cyber Cyan / Aqua Glow */
  --hue-success: 150; /* Emerald Emerald */
  --hue-danger: 350;  /* Crimson Red */

  /* Default Design System Palette (Dark) */
  --bg-primary: hsl(225, 25%, 8%);
  --bg-secondary: hsl(225, 20%, 12%);
  --bg-card: hsl(225, 20%, 14%);
  --bg-glass: rgba(18, 22, 36, 0.75);

  --text-main: hsl(220, 20%, 96%);
  --text-muted: hsl(220, 10%, 65%);
  --text-inverse: hsl(0, 0%, 100%);

  --border-light: hsl(225, 18%, 20%);
  --border-focus: hsl(var(--hue-primary), 90%, 60%);

  /* Accent Gradients */
  --grad-primary: linear-gradient(135deg, hsl(250, 85%, 62%), hsl(280, 80%, 55%));
  --grad-accent: linear-gradient(135deg, hsl(190, 90%, 50%), hsl(220, 85%, 58%));
  --grad-gold: linear-gradient(135deg, hsl(40, 95%, 55%), hsl(25, 90%, 50%));

  /* Elevation & Shadows */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 16px 40px rgba(0, 0, 0, 0.12);
  --shadow-glow: 0 0 20px rgba(108, 92, 231, 0.35);

  /* Border Radii */
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --radius-full: 9999px;
}
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.5);
  --shadow-lg: 0 16px 40px rgba(0, 0, 0, 0.6);
}
```

---

### 2. Mobile Responsive Breakpoints & Adaptive Layouts

| Device Class | Viewport Range | Layout Behavior | Navigation Pattern |
| :--- | :--- | :--- | :--- |
| **Mobile Compact** | 320px – 480px | 1-Column Cards, Full width buttons | Sticky Top Bar + Floating Bottom Nav Bar |
| **Mobile Large / Phablet** | 481px – 640px | 2-Column Responsive Grid | Sticky Top Bar + Bottom Bar |
| **Tablet** | 641px – 1024px | 2-3 Column Grid, Side Filter Drawer | Top Search Header + Bottom Nav |
| **Desktop / Laptop** | 1025px – 1440px | 4-Column Grid, Inline Sidebar Filters | Mega Header with Dropdowns |
| **Wide Desktop** | 1441px+ | 4-5 Column Container Max-Width 1400px | High-density grid with Floating Quick Cart |

---

### 3. Micro-Animations & Motion Physics

- **Button Hover / Active**: `transform: translateY(-2px) scale(1.01)` on hover; `transform: translateY(0) scale(0.97)` on click (`transition: transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)`).
- **Product Card Hover**: Subtle 3D lift (`transform: translateY(-6px)`), card border glow activation, and secondary image fade-in (`opacity: 1`).
- **Cart Badge Pulse**: Spring bounce keyframe (`keyframes bounce-subtle`) when item quantity increments.
- **Drawer Slide-Over**: Smooth spring cubic-bezier `transform: translateX(0)` with background backdrop blur (`backdrop-filter: blur(8px)`).

---

### 4. Typography Scale

- **Display Header**: `clamp(2.2rem, 5vw, 3.5rem)` (Weight 800, tracking tight)
- **Section Heading**: `clamp(1.5rem, 3vw, 2.2rem)` (Weight 700)
- **Subheading**: `1.125rem` (Weight 600)
- **Body Regular**: `0.95rem` (Line-height 1.6)
- **Caption / Meta**: `0.8rem` (Weight 500)

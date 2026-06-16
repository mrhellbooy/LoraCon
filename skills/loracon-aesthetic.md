# LoraCon Visual Identity & Aesthetic Guidelines (loracon-aesthetic)

This guide defines the design system and motion graphics for **LoraCon Portal** and super admin panels.

---

## 🎨 Color Palette
- **Primary Background**: `#030711` (Deep Space Blue/Black)
  - *Tailwind Equivalent*: Use arbitrary arbitrary values such as `bg-[#030711]`. Do not use generic tailwind slate or black unless with a high opacity overlay.
- **Accents**: 
  - **Neon Green**: `#22c55e` (`text-[#22c55e]`, `bg-[#22c55e]`) — Primary brand signature representing active nodes and secure connections.
  - **Sky Blue**: `#38bdf8` (`text-[#38bdf8]`, `bg-[#38bdf8]`) — Used for subsidiary services, e.g. the Firefox Extension and utility modules.
- **Borders**: Transparent white/10 (`border-white/10`) with standard rounded corners (`rounded-2xl` or `rounded-[3rem]` for larger components).

---

## ✍️ Typography & Text Layers
- **Technical Monospace**: Use monospace fonts (e.g. `font-mono`) for terminal blocks, API readouts, transaction digests, status counters, and labels to reinforce the **"Super Admin"** aesthetic.
- **Contrast Headers**: High-contrast, bold headlines paired with lower-intensity body text (e.g., `text-slate-400` or `text-slate-500`).

---

## 🌌 Components & Ornaments
- **Glow & Blur**: Utilize moderate outer glow and high-blur shadow backdrops (`shadow-[0_0_30px_rgba(34,197,94,0.15)]` or `backdrop-blur-xl`) for custom cards to construct the glowing cybernetic ambiance.
- **Logo Animated Rings**: Center branding around the dynamic SVG double-helix ring representing the cybernetic organism.

---

## 🎬 Motion & Transitions
Every route in the **AppRouter** is wrapped inside `AnimatedRoute` which applies custom Framer Motion curves:
```jsx
const pageTransitions = {
  initial: { opacity: 0, clipPath: 'inset(10% 0 10% 0)', filter: 'brightness(0.5) blur(10px)' },
  animate: { opacity: 1, clipPath: 'inset(0% 0 0% 0)', filter: 'brightness(1) blur(0px)' },
  exit: { opacity: 0, clipPath: 'inset(10% 0 10% 0)', filter: 'brightness(0.5) blur(10px)' }
};
```
These parameters ensure smooth, hardware-accelerated ingress and egress transitions as users navigate components.

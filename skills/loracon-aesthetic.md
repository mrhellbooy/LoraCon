# LoraCon Aesthetic Blueprint 🎨

## Core Visual Philosophy
"Organism-inspired Cybernetic". The UI should feel like a living, breathing entity that facilitates secure transits.

## Design tokens
- **Primary BG**: `#030711` (Deep Space Blue/Black)
- **Accent Green**: `#22c55e` (Neon/Signal Green) - Used for primary status and "living" elements.
- **Accent Blue**: `#38bdf8` (Sky Blue) - Used for network indicators and data flow.
- **Accent Gold**: `#f3ba2f` (Binance Gold) - Used for BSC-related financial modules.
- **Typography**: Sans-serif for UI, Monospace for technical readouts.

## Interaction Principles
- **Page Transitions**: Always use `AnimatePresence` and `motion.div` for route changes.
- **Entry Animations**: Subtle upward slide + fade-in (e.g., `y: 20 -> 0`).
- **Feedback**: Immediate visual response on button press (scale-95).
- **Glassmorphism**: Use `backdrop-blur-xl` and `bg-white/5` for modals and cards.

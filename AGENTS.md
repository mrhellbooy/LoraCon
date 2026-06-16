# AI Agent Instructions for LoraCon

## 🎨 Visual Identity & Style Rules
- **Color Palette**: Primary Background is `#030711` (Deep Space Blue/Black). Accent Color is Neon Green (`#22c55e`) or Sky Blue (`#38bdf8`) for specific labs branding.
- **Typography**: Clean, high-contrast sans-serif. Use monospace for status logs, API indicators, and technical readouts to reinforce the "Super Admin" aesthetic.
- **Aesthetic**: "Organism-inspired Cybernetic". Use glowing borders, subtle blurs, and Framer Motion for smooth, deliberate entry/exit animations. Avoid generic UI components; prefer custom-styled containers with border-white/10.

## 🛠️ Engineering Standards
- **Axios First**: Never use `fetch` directly for API calls. Add logic to `frontend/src/services/api.js`.
- **Responsive Polling**: Always use recursive `setTimeout` for polling tasks to ensure UI responsiveness.
- **Atomic Components**: Keep components small. If a UI element has a distinct visual style (like a "Lorapok" button), consider abstracting it or documenting its CSS classes.
- **Page Transitions**: All new top-level pages MUST be added to `AppRouter.jsx` wrapped in `AnimatedRoute`.

## 📦 Documentation Management
- Keep `PROJECT_CONTEXT.md` updated with technical architectural shifts.
- Update `INSTRUCTIONS.md` when deployment or backend handshake protocols change.
- **Project Skills**: Consult files in `/skills/` (`loracon-aesthetic.md`, `loracon-protocol.md`, `loracon-admin-terminal.md`) for platform-specific and aesthetic guidance.

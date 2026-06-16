---
name: "loracon-aesthetic"
description: "Guidelines for maintaining the 'Organism-inspired Cybernetic' visual identity of LoraCon."
---

# LoraCon Aesthetic & Design System

This skill defines the visual language for LoraCon across Android and Web platforms.

## Core Visual Principles

*   **Deep Space Canvas**: The primary background must always be **Obsidian Black** (`#030711` or `#050505`). Never use pure gray or white backgrounds.
*   **Cyber Emerald Accents**: Use **Neon Green** (`#22c55e`) for primary actions, success states, and status indicators.
*   **Glow & Radiance**: Apply subtle blurs and glowing borders (`border-white/10` or `CyberEmerald.copy(alpha = 0.2f)`) to create depth.
*   **Atomic Monospace**: Use monospace fonts (JetBrains Mono, Roboto Mono) for technical data, logs, and "System" messages to reinforce the Super Admin aesthetic.

## Component Styling

*   **Cards**: Should have rounded corners (>= 24dp/px), subtle borders (`1px solid white/0.1`), and a backdrop blur effect if possible.
*   **Buttons**: Use high-contrast pairings (Black text on Emerald background).
*   **Logo Interaction**: The LoraCon logo (Larva) should always have a "breathing" or "pulse" animation using Framer Motion (Web) or Infinite Transition (Android).

## Tone & Voice

*   **Cybernetic Sentience**: System responses should be calm, objective, and slightly technical. Use prefixes like `[SYSTEM]`, `[PROCESS]`, or `$` to denote CLI-style feedback.

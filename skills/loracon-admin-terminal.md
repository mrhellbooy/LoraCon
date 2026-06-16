---
name: "loracon-admin-terminal"
description: "Guidelines for implementing the LoraCon 'Super Admin' terminal experience."
---

# LoraCon Admin Terminal Experience

Rules for the interactive terminal and high-density dashboard.

## UX Principles

*   **Execute-First**: Features should feel like immediate commands being executed on a remote cluster.
*   **Visual Feedback**: Every user action should trigger a log entry or a status change in the terminal mockup.
*   **High Density**: Don't shy away from showing technical metrics (CPU, Load, Node Count). Users should feel empowered by information.

## Terminal Mockup Rules (Web)
- Use `framer-motion` for staggered log entries.
- Use a typing effect for "System" messages.
- Prompt symbols (`$`, `#`, `>>`) should be color-coded based on their role (Emerald for success, Amber for warning, Red for error).

## Interface Components (Web)
- `FloatingAI.jsx`: The sentient network companion.
- `NodeMap.jsx`: Visual representation of the decentralized mesh.

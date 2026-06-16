---
name: "loracon-desktop-clients"
description: "Roadmap and standards for Windows, macOS, and Linux native clients."
---

# LoraCon Desktop Infrastructure

## Technology Choice
- **Rust (Tauri)**: For a small binary footprint and memory safety.
- **Wry**: For native webview integration of the Lorapok UI.

## Platform Specifics
- **Windows**: `wintun` driver integration for high-performance routing.
- **macOS**: `NetworkExtension` framework (UTun) for system-level integration.
- **Linux**: Standard `iptables` and `nftables` orchestration.

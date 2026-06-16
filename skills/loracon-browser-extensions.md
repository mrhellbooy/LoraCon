---
name: "loracon-browser-extensions"
description: "Guidelines for developing LoraCon proxy extensions for Chrome/Firefox/Safari."
---

# LoraCon Browser Ecosystem

## Features
- One-click WebRTC leak protection.
- Per-tab proxying (Split Tunneling).
- Integrated ad and tracker blocking at the DNS level.

## Architecture
- Use `Manifest V3` for Chrome and Brave.
- Utilize `chrome.proxy` API for dynamic routing.
- Synchronize state with the LoraCon Desktop app via local WebSocket.

# LoraCon 🛡️

[![Platform](https://img.shields.io/badge/Platform-Android-green)]() [![Backend](https://img.shields.io/badge/Backend-Node.js-blue)]() [![License](https://img.shields.io/badge/License-MIT-purple)]()

**LoraCon** is a high-speed, secure, multi-routing VPN ecosystem developed by **Lorapok Labs**. Combining high-performance connectivity with our signature organism-inspired cybernetic aesthetics.

---

## 🌐 Community & Links
[✨ Website](https://loracon-labs.com) | [💻 GitHub](https://github.com/mrhellbooy/LoraCon) | [💬 Discord](https://discord.gg/loracon) | [🐦 X/Twitter](https://x.com/loraconlabs) | [📖 Docs](https://docs.loracon-labs.com)

---

## 🏗️ Technical Architecture

| Component | Stack/Role |
| :--- | :--- |
| **Android Client** | Kotlin, Jetpack Compose, WireGuard/OpenVPN |
| **Web Portal** | React, Vite, Axios, Tailwind CSS, Framer Motion |
| **Backend API** | Node.js, Express, Socket.io |
| **Service Layer** | Centralized Axios instance with recursive polling management |

---

## 🚀 Key Features

*   **Cybernetic Aesthetic**: Neon Green/Carbon Black theme inspired by black soldier fly larvae with Framer Motion page transitions.
*   **Multi-Chain Settlement**: Integrated Solana (Phantom) and Binance (BSC) payment flows for anonymous, decentralized subscription management.
*   **Performance First**: Low-latency routing & real-time connection optimization with recursive API health polling.
*   **Comprehensive Management**: Integrated admin portal for node load telemetry, analytics, and persistent API status monitoring.
*   **Firefox Integration**: Dedicated landing page modules for Firefox Add-on distribution and local installation guides.
*   **Market Ready**: Full SaaS-ready landing, auth, and dashboard flows.

---

## 🛠️ Development & Deployment

### Android
*   **Build**: `./gradlew assembleDebug`
*   **Testing**: Unit & Snapshot tests

### Web
1.  **Frontend**: `cd web_admin_panel/frontend && npm run dev`
2.  **Backend**: `cd web_admin_panel/backend && npm start`

### CD/CI
*   **Deploy**: GitHub Actions (`.github/workflows/deploy.yml`) on `main` push.
*   **Environment**: Secrets managed via GitHub Secrets (`VITE_API_BASE_URL`).

---
*Project maintained by [Lorapok Labs](https://lorapok-labs.com).*

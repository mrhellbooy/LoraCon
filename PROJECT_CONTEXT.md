# LoraCon - Full Project Context & Details
*Use this document as the master context when starting a new chat or handing off to another developer.*

## Overview
**LoraCon** is a high-speed, secure, multi-routing VPN application developed by **Lorapok Labs**. The overarching brand identity revolves around the "Cybernetic Black Soldier Fly Larva" — a friendly, plump system optimizer that silently consumes network latency bottlenecks and protects data in the background. Lorapok Labs specializes in "Products That Feel Alive," utilizing active, dynamic, and organism-inspired cyber-aesthetics (primarily neon green on deep carbon/black backgrounds with smooth Framer Motion animations).

---

## 1. Android Application (Primary Client)
The core offering of the ecosystem. It provides the tunneling service to the end user.
*   **Tech Stack:** Kotlin, Jetpack Compose, Coroutines/StateFlow.
*   **Core VPN Features:** 
    *   Native integration of **WireGuard** (WG) and **OpenVPN** (OVPN) protocols.
    *   Up to 300 Mbps bandwidth acceleration via dynamic multi-hop military-grade encryption routes.
*   **UI/UX:** 
    *   Features a main "Shield" tab with a biometric/cybernetic trigger button.
    *   Users can actively toggle between WireGuard and OpenVPN, triggering UI updates instantly via `VpnViewModel`.
    *   Multi-language support for global deployments.

## 2. Web Portal (Landing Page & Admin Dashboard)
A React application serving both as the main public entry point and the internal management dashboard.
*   **Tech Stack:** React, Vite, Tailwind CSS, Framer Motion, React Router (HashRouter).
*   **Landing Page (`LandingPage.jsx`):** 
    *   Professional SaaS aesthetic heavily inspired by top-tier dev tools (e.g., Render.com).
    *   Features high-intensity hero sections, staggered container animations, and highlights Core Capabilities (Zero-Knowledge Core, Neural Optimization, Distributed Interconnect, Dynamic Routing).
*   **Admin Control Plane (`AdminPanel.jsx`):**
    *   *Flow Control:* Adjusting infrastructure configuration variables.
    *   *Node Cluster:* Real-time visualization of server loads (Singapore, Tokyo, US-West).
    *   *Telemetry:* Live monitoring of active user sessions.
    *   *Billing/Finance:* Revenue versus Provider costs.
    *   *System Logs:* Real-time terminal output streaming.
*   **Role-Based Access (`LoginPage.jsx`):**
    *   **SUPERADMIN** (Password: `loracon-master-2026`): Boundless read/write access, deployment triggers, system logs, and user directory control.
    *   **USERADMIN** (Password: `loracon-admin-2026`): Read-only observability for network monitoring without destructive rights.

## 3. Architecture & CI/CD Deployment
*   **Backend Node.js Server:**
    *   Hosted on **Render** (URL: `https://loracon.onrender.com`).
    *   Serves as the secure master control node, handling API route resolutions and credentials.
*   **Frontend Web App Hosting:**
    *   Hosted on **GitHub Pages** (URL: `https://mrhellbooy.github.io/LoraCon/`).
    *   Built automatically using a GitHub Actions Workflow (`deploy-web-admin.yml`).
    *   The workflow triggers on pushes to the `main` branch, compiles the `web_admin_panel/frontend/dist` directory using Vite, and safely publishes it to the `gh-pages` branch.
*   **Environment Secret Injection:**
    *   The `VITE_API_BASE_URL` secret (pointing to the Render backend) is configured in GitHub Actions Secrets and injected seamlessly at build time, keeping the backend location secure and dynamic without exposing it in the raw repository.

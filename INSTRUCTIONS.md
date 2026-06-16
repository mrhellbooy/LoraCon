# Lorapok LoraCon Documentation & Deployment Guide

## 1. Project Orientation
This project ("LoraCon") consists of an Android client, a web-based Admin/Landing portal, and a Node.js backend.

> **CRITICAL:** Before performing any modifications, you MUST read `/PROJECT_CONTEXT.md` to understand the architecture, design principles, and tech stack of the LoraCon ecosystem.

## 2. Developer Guidelines

### API Communication
All backend communication MUST go through the centralized service layer in `web_admin_panel/frontend/src/services/api.js`.
- **Axios Instance**: Use the exported `api` instance for custom requests.
- **Service Modules**: Add new endpoints to modularized objects like `adminConfig` or `adminSessions`.
- **Environment**: Ensure `import.meta.env.VITE_API_BASE_URL` is configured for local development.

### Health Monitoring & Polling
The Super Admin panel implements a persistent health check.
- **Recursive Polling**: Polling is managed via recursive `setTimeout` to prevent request stacking during high latency.
- **Visual Feedback**: The `apiStatus` state in `AdminPanel.jsx` drives the header indicator (Online/Offline).

### UI & Animations
- **Transitions**: Every route in `AppRouter.jsx` is wrapped in `AnimatedRoute` (Framer Motion).
- **Icons**: Use `lucide-react` for all functional iconography.

## 3. Deployment Instructions

This project is deployed to GitHub Pages via GitHub Actions.

### Configure Environment
Your application requires the `VITE_API_BASE_URL` to connect to your backend service.

1.  Go to your GitHub repository: `https://github.com/mrhellbooy/LoraCon`
2.  Click on **Settings** -> **Secrets and variables** -> **Actions**.
3.  Click **New repository secret**.
4.  Set Name to: `VITE_API_BASE_URL`
5.  Set Secret to your backend API URL (e.g., `https://your-backend-service.onrender.com`).
6.  Click **Add secret**.

Whenever you push code to your `main` branch, the `deploy-web-admin.yml` workflow automatically builds and deploys to `https://mrhellbooy.github.io/LoraCon/`.

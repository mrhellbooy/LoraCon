# Lorapok LoraCon Documentation & Deployment Guide

## 1. Project Orientation
This project ("LoraCon") consists of an Android client, a web-based Admin/Landing portal, and a Node.js backend.

> **CRITICAL:** Before performing any modifications, you MUST read `/PROJECT_CONTEXT.md` to understand the architecture, design principles, and tech stack of the LoraCon ecosystem.

## 2. Deployment Instructions

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

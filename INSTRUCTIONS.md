# Lorapok LoraCon Deployment Instructions

Follow these steps to make your site live and functional on GitHub Pages with your backend.

## 1. Configure GitHub Actions Secrets
Your application requires the `VITE_API_BASE_URL` to connect to your backend service.

1.  Go to your GitHub repository: `https://github.com/mrhellbooy/LoraCon`
2.  Click on **Settings** in the tab bar.
3.  In the left sidebar, expand **Secrets and variables** and click **Actions**.
4.  Click **New repository secret**.
5.  Set Name to: `VITE_API_BASE_URL`
6.  Set Secret to your backend API URL (e.g., `https://your-backend-service.onrender.com`).
7.  Click **Add secret**.

## 2. GitHub Pages Configuration
Your GitHub Pages settings are already largely correct, but verify the following:

- **Source**: Must be set to **GitHub Actions**.
- **Enforce HTTPS**: Ensure this is checked.

Whenever you push code to your `main` branch, GitHub Actions will automatically:
1. Build the frontend (`npm run build`).
2. Inject the `VITE_API_BASE_URL` secret.
3. Deploy the site to your GitHub Pages URL: `https://mrhellbooy.github.io/LoraCon/`

## 3. How to Update Environment Variables
If you ever change your backend URL in the future:
1. Simply go back to **Settings -> Secrets and variables -> Actions** in your repository.
2. Edit the existing `VITE_API_BASE_URL` secret.
3. Once updated, push any minor change (or just re-trigger the workflow) to your `main` branch, and the site will rebuild with the new URL.

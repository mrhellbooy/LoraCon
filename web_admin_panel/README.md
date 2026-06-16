# LoraCon Master Web Admin Dashboard (React & Node.js Suite)

This directory contains a complete, production-grade, responsive Web Admin Panel and Node.js API Gateway developed specifically to control LoraCon VPN node parameters, fetch blockchain subscription settlements, and proxy requests safely to the **xAI Grok AI API** and **Google Gemini API**.

---

## 🏗️ System Architecture

```
                    ┌───────────────────────────────┐
                    │  React Admin Client           │
                    │  (Cyberpunk Tailwinds UI)     │
                    └───────────────┬───────────────┘
                                    │ HTTP / JSON
                                    ▼
                    ┌───────────────────────────────┐
                    │  Node.js Express Server       │
                    │  (REST API & API Keys Secure Vault) 
                    └──────┬────────┬────────┬──────┘
                           │        │        │
      HTTP/REST Sync       │        │        │ Proxy xAI completions
┌──────────────────────────▼┐      │        │┌──────────────────────────┐
│  LoraCon Android Client   │      │        ││ xAI Grok API             │
│ (Compose/Room Persistence)│      │        ││ (Bearer Handshakes)      │
└───────────────────────────┘      │        │└──────────────────────────┘
                                   │        │
             SOL / USDT validation │        │ Query Gemini Model Content
              ┌────────────────────▼┐      └▼─────────────────────────┐
              │ Solana Devnet JSON  │       │ Google Gemini API       │
              │ RCP Node Endpoint   │       │ (Secure REST Access)    │
              └─────────────────────┘       └─────────────────────────┘
```

---

## 🛠️ Folder Contents

1. **`backend/`**: Simple, high-speed Node.js + Express API server. Keeps your Gemini & Grok API keys safe from reverse-engineering on client binaries.
2. **`frontend/`**: Beautiful single-page React app styled with CSS grids, live gauges, SVG network scopes, and dynamic pricing dials. Fully mobile-friendly and optimized for standard touch targets.

---

## 🚀 How to Launch the Web Suite

### 1️⃣ Configure Environment Variables
Inside `web_admin_panel/backend/`, create a `.env` file:
```env
PORT=5000
LACON_SOLANA_WALLET=your_master_receiving_wallet_address
X_AI_GROK_API_KEY=your_actual_xai_grok_bearer_token
GEMINI_API_KEY=your_actual_google_gemini_api_token
ADMIN_SECRET_TOKEN=a_secure_master_jwt_passphrase
```

### 2️⃣ Run the Node.js API Back-End
```bash
cd backend
npm install
npm run start
```
Your back-end is now active on `http://localhost:5000` exposing endpoints for syncing master settings, registering nodes, and streaming real-time client sessions.

### 3️⃣ Run the React Front-End Dashboard
```bash
cd ../frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser. The responsive dashboard will fit perfectly on all mobile, tablet, or monitor screens.

---

## 🔗 Android Sync Integration

To bridge the Android VPN client with this Web control panel, simply map the Retrofit endpoints inside `/app/src/main/java/com/example/api/` to query your server's `/api/admin/config` payload. Standard subscription verfications then sync immediately in real-time.

---

## 🌐 Production Cloud Deployment

To launch this suite in production, host the **React Admin Panel Frontend** on **GitHub Pages** (fully free) and deploy the **Node.js Express Server Backend** on a free web platform like **Render**, **Railway**, or a standard Virtual Private Server (VPS).

### 1️⃣ Deploy Frontend on GitHub Pages
We have provided an automated **GitHub Actions Workflow** (`.github/workflows/deploy-web-admin.yml`) to compile and deploy the frontend.

1. **Push your code** to your own GitHub repository (`main` or `master` branch).
2. Go to your GitHub Repository -> **Settings** -> **Actions** -> **General**. Change "Workflow permissions" to **Read and write permissions** (this allows the action to commit built static web pages to `gh-pages` branch).
3. The build runner will compile your React app automatically. Once complete, you will see a new branch in your repo named `gh-pages`.
4. Go to **Settings** -> **Pages**, set the Source branch to `gh-pages` (root folder `/`) and press **Save**.
5. Your custom admin panel will go live at:
   `https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPOSITORY_NAME>/`

### 2️⃣ Deploy backend on Render (or Railway / Fly.io)
Because Render natively supports Node.js services:
1. Log in to [Render](https://render.com) and create a **New -> Web Service**.
2. Connect your GitHub repository.
3. Configure the following service arguments:
   - **Root Directory**: `web_admin_panel/backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm run start`
4. Expand **Advanced** and specify your secure `.env` variables (`LACON_SOLANA_WALLET`, `X_AI_GROK_API_KEY`, `GEMINI_API_KEY`, etc.).
5. Render will launch your live web API at a secure HTTPS address (e.g. `https://loracon-backend.onrender.com`).

### 3️⃣ Connect Frontend with Backend API
Provide your live Node.js Render URL to your compiled GitHub Pages client:
- Go to your GitHub Repository -> **Settings** -> **Secrets and variables** -> **Actions**.
- Click **New repository secret** and add:
  - **Name**: `VITE_API_BASE_URL`
  - **Value**: `https://<your-active-api-server>.onrender.com` (your backend Render address)
- Trigger a quick code change or click **Actions** -> **Re-run all jobs** to compile. The React Frontend will now orchestrate live data directly from your deployed production servers!


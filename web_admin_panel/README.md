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

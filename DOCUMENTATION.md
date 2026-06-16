# <p align="center"><img src="https://img.shields.io/badge/LoraCon-Ecosystem-22c55e?style=for-the-badge&logo=shield&logoColor=black" alt="LoraCon Shield"/> <img src="https://img.shields.io/badge/Lorapok--Labs-Secure--Mesh-38bdf8?style=for-the-badge" alt="Lorapok Labs"/></p>

<p align="center">
  <!-- Interactive Modern Vector Logo Banner -->
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 240" font-family="system-ui, sans-serif" style="background:#030711; border-radius: 24px; border: 1px solid rgba(255,255,255,0.08); width: 100%; max-width: 800px; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
    <!-- Background futuristic grid lines -->
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(22, 197, 94, 0.04)" stroke-width="1"/>
        <circle cx="40" cy="40" r="1.5" fill="rgba(34, 197, 94, 0.08)" />
      </pattern>
      <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#22c55e" />
        <stop offset="100%" stop-color="#10b981" />
      </linearGradient>
      <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#22c55e" />
        <stop offset="50%" stop-color="#38bdf8" />
        <stop offset="100%" stop-color="#a855f7" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="#030711" />
    <rect width="100%" height="100%" fill="url(#grid)" />
    
    <!-- Central Cybernetic Eye / Logo Circle -->
    <g transform="translate(400, 90)">
      <circle r="48" fill="rgba(34, 197, 94, 0.03)" stroke="url(#primaryGrad)" stroke-width="2" stroke-dasharray="10, 5" />
      <circle r="36" fill="rgba(3, 7, 17, 0.9)" stroke="#38bdf8" stroke-width="1.5" />
      <!-- Larvae pattern / Cyber-shield core -->
      <path d="M-15,-10 C0,-25 0,-25 15,-10 C10,5 5,15 0,25 C-5,15 -10,5 -15,-10 Z" fill="url(#primaryGrad)" filter="url(#glow)" opacity="0.85" />
      <circle cx="0" cy="-2" r="3" fill="#ffffff" />
    </g>
    
    <!-- Outer radar rings -->
    <circle cx="400" cy="90" r="110" fill="none" stroke="rgba(56, 189, 248, 0.1)" stroke-width="1" stroke-dasharray="2, 8" />
    <circle cx="400" cy="90" r="140" fill="none" stroke="rgba(34, 197, 94, 0.05)" stroke-width="1" />
    
    <!-- Title Text -->
    <text x="400" y="185" text-anchor="middle" fill="#ffffff" font-size="28" font-weight="900" letter-spacing="8" style="text-transform: uppercase;">LoraCon</text>
    <text x="400" y="210" text-anchor="middle" fill="url(#neonGlow)" font-size="11" font-weight="700" letter-spacing="3" font-family="monospace">DECENTRALIZED ENCRYPTED STEALTH MESH</text>
  </svg>
</p>

# LoraCon Architecture Blueprint `v1.0.10`

Welcome to the official master documentation for **LoraCon**, a next-generation high-speed decentralized virtual private network (VPN) orchestration ecosystem engineered by **Lorapok Labs**. 

LoraCon combines military-grade encryption payloads (**WireGuard Core / ChaCha20-Poly1305 / AES-256-GCM**) with an organism-inspired cybernetic digital aesthetic (Deep Space Slate `#030711` and Neon Active Green `#22c55e`). This master reference manual contains the design taxonomy, step-by-step developer implementation routes, security models, full REST API schema, and decentralized settlement workflows.

---

## 🗺️ Master System Architecture Diagram

Below is the reactive topological map showing real-time handshake, telemetry sync, and payment verification flow:

<p align="center">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 480" font-family="monospace" style="background:#05070f; border-radius: 20px; border: 1px solid rgba(255,255,255,0.06); width: 100%;">
    <!-- Background Grid -->
    <defs>
      <pattern id="archGrid" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255, 255, 255, 0.02)" stroke-width="1"/>
      </pattern>
      <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#22c55e" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.8"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="#05070f" />
    <rect width="100%" height="100%" fill="url(#archGrid)" />

    <!-- 1. Android Mobile Client -->
    <g transform="translate(60, 50)">
      <rect width="230" height="150" rx="15" fill="rgba(255,255,255,0.02)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
      <rect y="0" width="230" height="35" rx="15" fill="rgba(34,197,94,0.1)" stroke="rgba(34,197,94,0.2)" stroke-width="1" />
      <text x="115" y="22" fill="#22c55e" font-size="12" font-weight="bold" text-anchor="middle">ANDROID CLIENT (KOTLIN)</text>
      
      <text x="15" y="60" fill="#ffffff" font-size="11">● Jetpack Compose UI</text>
      <text x="15" y="80" fill="#a1a1aa" font-size="10">● SQLite Local db (Room)</text>
      <text x="15" y="100" fill="#a1a1aa" font-size="10">● WireGuard Tunnel Socket</text>
      <text x="15" y="120" fill="#38bdf8" font-size="10">● LoraConApiService.kt</text>
    </g>

    <!-- 2. React Admin Dashboard -->
    <g transform="translate(60, 275)">
      <rect width="230" height="150" rx="15" fill="rgba(255,255,255,0.02)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
      <rect y="0" width="230" height="35" rx="15" fill="rgba(56,189,248,0.1)" stroke="rgba(56,189,248,0.2)" stroke-width="1" />
      <text x="115" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">REACT APPS (LANDING/ADMIN)</text>
      
      <text x="15" y="60" fill="#ffffff" font-size="11">● Tailwind Cyberspace HUD</text>
      <text x="15" y="80" fill="#a1a1aa" font-size="10">● Framer Motion Engines</text>
      <text x="15" y="100" fill="#a1a1aa" font-size="10">● Axios Global Service Store</text>
      <text x="15" y="120" fill="#22c55e" font-size="10">● Recursive Polling Loops</text>
    </g>

    <!-- 3. Express Master API Server -->
    <g transform="translate(480, 160)">
      <rect width="360" height="180" rx="20" fill="rgba(34,197,94,0.03)" stroke="url(#lineGrad)" stroke-width="1.5" />
      <rect width="360" height="40" rx="20" fill="rgba(34,197,94,0.1)" stroke="rgba(34,197,94,0.2)" stroke-width="1" />
      <text x="180" y="25" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle">CENTRAL NODE.JS BACKEND CORE</text>
      
      <text x="20" y="70" fill="#22c55e" font-size="11">● In-Memory Config Store (Limits/Rates)</text>
      <text x="20" y="95" fill="#38bdf8" font-size="11">● Active Node Registry (Pings/Load Balancing)</text>
      <text x="20" y="120" fill="#ffffff" font-size="11">● Dynamic Client Session Emulator (Mbps Stats)</text>
      <text x="20" y="145" fill="#a855f7" font-size="11">● AI Proxy Gateway (Gemini API / Grok AI)</text>
      <rect x="235" y="157" width="110" height="15" rx="3" fill="#000000" />
      <text x="290" y="168" fill="#a855f7" font-size="8" text-anchor="middle">X_AI_GROK_API_KEY</text>
    </g>

    <!-- Connector Lines and Handshake Signals -->
    <!-- Android Client -> Express Backend -->
    <path d="M 290 125 L 480 200" fill="none" stroke="rgba(56,189,248,0.5)" stroke-width="2" stroke-dasharray="5,5" />
    <circle cx="385" cy="162" r="6" fill="#38bdf8" />
    <text x="385" y="150" fill="#38bdf8" font-size="9" text-anchor="middle">JSON API</text>

    <!-- React Portal -> Express Backend -->
    <path d="M 290 350 L 480 300" fill="none" stroke="rgba(34,197,94,0.5)" stroke-width="2" stroke-dasharray="5,5" />
    <circle cx="385" cy="325" r="6" fill="#22c55e" />
    <text x="385" y="342" fill="#22c55e" font-size="9" text-anchor="middle">POLLING</text>
    
    <!-- Decorative direction arrows -->
    <path d="M 470 196 L 480 200 L 474 191" fill="none" stroke="#38bdf8" stroke-width="2" />
    <path d="M 472 301 L 480 300 L 475 308" fill="none" stroke="#22c55e" stroke-width="2" />
  </svg>
</p>

---

## 🛠️ Technological Domain & Breakdown

### 📱 Android Client (`/app`)
*   **Build Engine**: Gradle (Kotlin DSL - `build.gradle.kts`).
*   **Engine Target**: Android 14.0 (API Level 34) with backwards compatibility down to SDK 26 (Android 8.0).
*   **UI Paradigm**: 100% Jetpack Compose using Material Design 3 and a dynamic dark custom system.
*   **Data Tier**: **Room DB** (Persistent Local Storage) containing tables for nodes, handshake, and metrics history. See definitions inside `/app/src/main/java/com/example/data/`.
*   **Asynchronous Engine**: Kotlin Coroutines & cold flows (`StateFlow` / `SharedFlow`) for ultra-low memory overhead.
*   **AI Diagnostics**: Centralized Gemini SDK implementation (`/app/src/main/java/com/example/api/GeminiApi.kt`) for real-time local channel diagnostics and performance intelligence.

### 💻 Web Portal Admin (`/web_admin_panel/frontend`)
*   **Framework**: React 18 with Vite build bundler.
*   **Aesthetic Layout**: Tailwind CSS + Custom glowing utility classes + Framer Motion atomic route transition wraps.
*   **Client Core**: Modular Axios service client (`api.js`) featuring explicit proxy endpoint mapping.
*   **Polling Loop**: Synchronous dynamic intervals managed via un-overlapping timer closures to guarantee rendering isolation.

### 🔌 REST Core Service Node (`/web_admin_panel/backend`)
*   **Platform**: Node.js & Express.
*   **Session Virtualizer**: Emulated operational statistics for premium and free client routes, computing real-time packet limits.
*   **AI Completion Proxy**: Bidirectional router bridging client prompts to either **Gemini Pro API** or **xAI Grok Completions Engine** based on dynamic master configuration flags.

---

## 🚀 Execution & Handshake Guide (Quick Start)

### 1. Initialize Backend Environment
Configure your local environment parameters. Create `/web_admin_panel/backend/.env`:
```env
PORT=5000
X_AI_GROK_API_KEY=xai-your-secret-grok-api-key-here
GEMINI_API_KEY=your-gemini-api-key-here
```

Launch the Node server:
```bash
cd web_admin_panel/backend
npm install
npm run start
# Server starts listening on http://localhost:5000
```

### 2. Configure & Run React Web Portal
Provide your web UI with the API base URL. Create `/web_admin_panel/frontend/.env`:
```env
VITE_API_BASE_URL=http://localhost:5000
```

Launch the developer portal:
```bash
cd web_admin_panel/frontend
npm install
npm run dev
# Vite builds and spins up host on http://localhost:5173
```

### 3. Build & Run Android Mobile Client
To compile the standalone APK from source:
```bash
# Verify system builds and resolves dependency tree
./gradlew compileJava
./gradlew assembleDebug
```
*The resulting debug APK is written to `app/build/outputs/apk/debug/app-debug.apk`.*

---

## 🧬 Dynamic REST API Schema Reference

All request and response objects are formulated as standard JSON structures. The base route defaults to `http://localhost:5000` or the configured client-side gateway.

### 🛡️ User Authentication Router

#### `POST /api/auth/login`
Validates user credentials and issues a secure application session state descriptor.
*   **Payload Header**: `Content-Type: application/json`
*   **Request JSON**:
    ```json
    {
      "username": "admin",
      "password": "loracon-master-2026"
    }
    ```
*   **Success JSON Response (200 OK)**:
    ```json
    {
      "success": true,
      "role": "SUPERADMIN"
    }
    ```

#### `POST /api/auth/register`
Provisions a new operator user account to the in-memory master state.
*   **Request JSON**:
    ```json
    {
      "username": "sentinel-03",
      "password": "secure-access-password"
    }
    ```
*   **Success JSON Response (200 OK)**:
    ```json
    {
      "success": true,
      "message": "Account created successfully."
    }
    ```

---

### 📊 Admin Orchestration & Master Settings

#### `GET /api/admin/config`
Retrieves all global throttle capacities, price points, routing addresses, and registered VPN node pools.
*   **Request Headers**: `Accept: application/json`
*   **Success JSON Response (200 OK)**:
    ```json
    {
      "success": true,
      "config": {
        "freeBandwidthLimit": 50,
        "freeDailyQuotaLimit": 500,
        "activeApiProvider": "Grok AI API",
        "cryptoSolAddress": "Cpk21xLConDevnetSF92aKJ818vN9SolAddresses",
        "cryptoUsdtAddress": "0xLConDevnetTetherContractAddressUSDT9a83",
        "priceStandardSol": 0.15,
        "pricePremiumSol": 0.35
      },
      "nodes": [
        {
          "id": "srv_ny",
          "name": "NY Liberty Core",
          "country": "United States",
          "flagEmoji": "🇺🇸",
          "ipAddress": "142.250.72.14",
          "pingsMs": 22,
          "loadPercentage": 35,
          "requiredTier": "FREE",
          "isActive": true
        }
      ]
    }
    ```

#### `POST /api/admin/config/update`
Allows instantaneous updates to standard price points and bandwidth ceilings.
*   **Request JSON**:
    ```json
    {
      "freeBandwidthLimit": 75,
      "pricePremiumSol": 0.40,
      "activeApiProvider": "Gemini API"
    }
    ```
*   **Success JSON Response (200 OK)**:
    ```json
    {
      "success": true,
      "message": "System variables updated dynamically on master nodes.",
      "config": {
        "freeBandwidthLimit": 75,
        "freeDailyQuotaLimit": 500,
        "activeApiProvider": "Gemini API",
        "priceStandardSol": 0.15,
        "pricePremiumSol": 0.40
      }
    }
    ```

#### `POST /api/admin/server/add`
Deploys and registers a new active VPN node cluster to the global collection pool.
*   **Request JSON**:
    ```json
    {
      "id": "srv_sg",
      "name": "Singapore Cyber-Mesh",
      "country": "Singapore",
      "flagEmoji": "🇸🇬",
      "ipAddress": "103.242.116.1",
      "pingsMs": 8,
      "requiredTier": "PREMIUM"
    }
    ```
*   **Success JSON Response (200 OK)**:
    ```json
    {
      "success": true,
      "message": "Node 'Singapore Cyber-Mesh' spawned successfully.",
      "nodes": [...]
    }
    ```

#### `DELETE /api/admin/server/delete/:id`
Prunes and deletes an unresponsive or faulty node from the active registry.
*   **Endpoint Parameter**: `:id` - Target ID key parameter. (e.g., `srv_de`)
*   **Success JSON Response (200 OK)**:
    ```json
    {
      "success": true,
      "message": "Node pruned from active cluster registers.",
      "nodes": [...]
    }
    ```

---

## 💸 Decentralized Settlement & Ledger Handshake

LoraCon bypasses standard legacy payment structures in favor of zero-trail physical cryptosystem settlement vectors. The flow ensures complete anonymity and consists of the following phases:

```
  ┌─────────────────┐       ┌──────────────────────────┐       ┌─────────────────┐
  │ Checkout Screen │ ────> │ Transfer to Admin Wallet │ ────> │ Submit TX Hash  │
  └─────────────────┘       └──────────────────────────┘       └─────────────────┘
                                                                        │
                                                                        ▼
  ┌─────────────────┐       ┌──────────────────────────┐       ┌─────────────────┐
  │ Activate Client │ <──── │  Issue Encryption Key   │ <──── │ Admin Approves  │
  └─────────────────┘       └──────────────────────────┘       └─────────────────┘
```

1.  **Selection**: The user opens the **Checkout Handshake interface** inside the React portal and selects either Solana (`SOL`) or Binance Smart Chain (`BNB/USDT`).
2.  **Ledger Execution**: The screen presents the designated Lorapok Labs wallet address. The user performs the transaction outside of traditional third-party checkout handlers via their decentralized wallet (e.g., Phantom Web Wallet, Trust Wallet, MetaMask).
3.  **Hash Verification**: The client app submits the generated transaction signature hash to the dashboard verification queue.
4.  **Admin Ledger Inspection**: The dashboard utilizes the administration ledger scanner to query the explorer node (e.g., `explorer.solana.com`).
5.  **Manual Verification**: Upon confirmation that local ledger assets match subscription tiers, the system grants a high-entropy cryptographically signed **Privilege Connection Key** enabling native high-priority tunneling.

---

## 🧪 Android Client Architecture & Storage Engine

The native client codebase leverages Jetpack Compose to orchestrate high-performance views while preserving strict design alignment.

```
       ┌─────────────────────────────────────────────────────────┐
       │                       MainActivity                      │
       └─────────────────────────────────────────────────────────┘
                                    │
                                    ▼
       ┌─────────────────────────────────────────────────────────┐
       │                       LoraConApp                        │
       └───────────────────────────────────┬─────────────────────┘
                                           │
                                           ▼
       ┌─────────────────────────────────────────────────────────┐
       │                      VpnViewModel                       │
       └─────┬─────────────────────────────────────────────┬─────┘
             │                                             │
             ▼                                             ▼
┌──────────────────────────┐                  ┌──────────────────────────┐
│    VpnRepository (Data)  │                  │      GeminiApi (AI)      │
└────────────┬─────────────┘                  └──────────────────────────┘
             │
             ▼
┌──────────────────────────┐
│ AppDatabase (Room/SQLite)│
└──────────────────────────┘
```

### 🗄️ Database Schemas (`/app/src/main/java/com/example/data`)
*   **`AppDatabase.kt`**: Main application abstraction layer representing the persistent SQLite engine. It manages local migrations and ensures safe initialization.
*   **`VpnDao.kt`**: Provides SQL mappings for standard transaction query execution:
    *   `insertNode()`: Caches active nodes fetched from the centralized telemetry provider.
    *   `getActiveSessions()`: Inspects cached tunnel history to render real-time connection counters.
*   **`VpnEntities.kt`**: Defines schema models:
    *   `VpnServerNode`: Caches server properties (IP and Ping scores) so the connection survives device restarts and cellular tower handoffs.
    *   `VpnMetricsHistory`: Logs bandwidth consumption metrics to output interactive performance graphics on the Android dashboard.

### 🧬 AI Connection Intelligence (`/app/src/main/java/com/example/api`)
The Android client features a local diagnostics module (`GeminiApi.kt`) that communicates with the Gemini API. If the target server latency rises unexpectedly, the local intelligence layer performs a localized analysis of the connection parameters, inspects routing paths, and automatically suggests the optimum egress node.

---

## 🎨 Design System & CSS Anatomy

Adhering to the **Lorapok Labs cybernetic theme**, the visual framework is built on high contrast, custom glows, and distinct layout anatomy:

### 🎨 Colors

| Color Role | Hex Code | Visual Feeling | Usage |
| :--- | :--- | :--- | :--- |
| **Deep Space Canvas**| `#030711` | Absolute dark obsidian slate | Backgrounds, page frames |
| **Active Cyber Green**| `#22c55e` | Radioactive phosphor green | Primary action triggers, status online |
| **Telemetry Sky Blue**| `#38bdf8` | Quantum cyan laser beam | Data telemetry streams, ping indicators |
| **System Warn Purple**| `#a855f7` | High ultraviolet neon | API key errors, proxy routing indicators |

### 🧬 Typical Code Structure for Cyber HUD Glowing Card
```jsx
// Custom Cyber Card with inner translucent neon green border & outer glow
const CyberTelemetryCard = ({ title, value, icon: Icon }) => (
  <div className="relative group overflow-hidden rounded-[2rem] bg-[#0A0A0C] border border-white/5 hover:border-[#22c55e]/30 transition-all duration-300 p-8 shadow-[0_4px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_40px_rgba(34,197,94,0.06)]">
    <div className="absolute top-0 right-0 w-32 h-32 bg-[#22c55e]/5 blur-[50px] rounded-full pointer-events-none transition-opacity group-hover:opacity-100 opacity-60" />
    <div className="flex items-center justify-between mb-4">
      <span className="text-[9px] font-mono tracking-[0.3em] text-[#22c55e] uppercase">{title}</span>
      <Icon className="w-5 h-5 text-slate-500 group-hover:text-[#22c55e] transition-colors" />
    </div>
    <div className="text-3xl font-black text-white tracking-tight font-mono">{value}</div>
  </div>
);
```

---

## 🌍 Platform Deploy Specs & CI/CD Pipeline

The entire system integrates with automated deployment tasks.

### 🧪 GitHub Actions Workflow
The automation script (`.github/workflows/deploy-web-admin.yml`) listens for code integrations pushed to the master repository:
1.  **Trigger**: Code committed to `main`.
2.  **Compile & Tree Verification**: Evaluates linter stages, dependencies, and dependencies mapping trees.
3.  **Vite Build**: Compiles raw JSX assets, minifies production bundles with correct `VITE_API_BASE_URL` injections.
4.  **Static Publish**: Builds assets and deploys directly to public host.

### 🛡️ Security Best Practices
- **Never commit active API Keys** inside code source trees. Use system environmental settings injected at build-time.
- **Node Cluster Safety**: Production exit nodes run isolated in-RAM configs to guarantee strict compliance with the **Zero-Log policy**. If a terminal experiences hardware failover, memory wipes instantly.

---

<p align="center" style="margin-top: 60px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 30px;">
  <img src="https://img.shields.io/badge/Maintained--By-Lorapok--Labs-22c55e?style=flat" alt="Lorapok Labs"/> <img src="https://img.shields.io/badge/Release-v1.0.10_LCon-38bdf8" alt="Release"/>
</p>

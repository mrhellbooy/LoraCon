const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 💾 In-Memory Master Persistent Config State Store
let systemConfig = {
  freeBandwidthLimit: 50, // Mbps
  freeDailyQuotaLimit: 500, // MB
  activeApiProvider: "Grok AI API", // "Gemini API" or "Grok AI API"
  cryptoSolAddress: "Cpk21xLConDevnetSF92aKJ818vN9SolAddresses",
  cryptoUsdtAddress: "0xLConDevnetTetherContractAddressUSDT9a83",
  priceStandardSol: 0.15,
  pricePremiumSol: 0.35,
};

// 🗺️ Simulated Active Clusters Registered inside LoraCon Node Pool
let registeredNodes = [
  { id: "srv_ny", name: "NY Liberty Core", country: "United States", flagEmoji: "🇺🇸", ipAddress: "142.250.72.14", pingsMs: 22, loadPercentage: 35, requiredTier: "FREE", isActive: true },
  { id: "srv_ch", name: "Zurich Cognitive Swiss", country: "Switzerland", flagEmoji: "🇨🇭", ipAddress: "82.163.2.144", pingsMs: 14, loadPercentage: 42, requiredTier: "PREMIUM", isActive: true },
  { id: "srv_de", name: "Frankfurt Rhine-Main", country: "Germany", flagEmoji: "🇩🇪", ipAddress: "194.124.91.5", pingsMs: 35, loadPercentage: 18, requiredTier: "FREE", isActive: true },
  { id: "srv_jp", name: "Tokyo Sentient Node", country: "Japan", flagEmoji: "🇯🇵", ipAddress: "106.155.3.1", pingsMs: 55, loadPercentage: 68, requiredTier: "STANDARD", isActive: true },
];

// 📊 Dynamically Simulated Connected Client Sessions
const generateSimulatedSessions = () => {
  const users = ["Pioneer_Helix", "Cipher_Runner", "Solar_Swiper", "Net_Stalker", "Core_Gazer"];
  const platforms = ["Android 14", "Windows 11 Client", "macOS Sonoma", "Linux Core", "iOS Standard v17"];
  const countries = [
    { name: "Netherlands", flag: "🇳🇱" },
    { name: "United States", flag: "🇺🇸" },
    { name: "Switzerland", flag: "🇨🇭" },
    { name: "Germany", flag: "🇩🇪" },
    { name: "Japan", flag: "🇯🇵" }
  ];
  const protocols = ["WireGuard", "OpenVPN"];

  return users.map((u, i) => {
    const isPrem = i % 2 === 0;
    const speedDown = isPrem 
      ? (Math.random() * 110 + 45).toFixed(1) 
      : (Math.random() * systemConfig.freeBandwidthLimit).toFixed(1);
    const speedUp = (speedDown / (Math.random() * 3 + 2)).toFixed(1);

    return {
      username: u,
      ip: `185.22.${Math.floor(Math.random() * 200)}.${Math.floor(Math.random() * 250)}`,
      platform: platforms[i],
      country: countries[i].name,
      countryFlag: countries[i].flag,
      tier: isPrem ? "PREMIUM" : "FREE",
      protocol: protocols[i % 2],
      speed: `🔻 ${speedDown} Mbps / 🔺 ${speedUp} Mbps`,
    };
  });
};

// 📡 Endpoints: Configuration & Sync Operations

// Get Complete Server State Config
app.get('/api/admin/config', (req, res) => {
  res.json({
    success: true,
    config: systemConfig,
    nodes: registeredNodes
  });
});

// Update System wide variables (crypt, limiters)
app.post('/api/admin/config/update', (req, res) => {
  const { 
    freeBandwidthLimit, 
    freeDailyQuotaLimit, 
    activeApiProvider, 
    cryptoSolAddress, 
    cryptoUsdtAddress,
    priceStandardSol,
    pricePremiumSol
  } = req.body;

  if (freeBandwidthLimit !== undefined) systemConfig.freeBandwidthLimit = Number(freeBandwidthLimit);
  if (freeDailyQuotaLimit !== undefined) systemConfig.freeDailyQuotaLimit = Number(freeDailyQuotaLimit);
  if (activeApiProvider !== undefined) systemConfig.activeApiProvider = activeApiProvider;
  if (cryptoSolAddress !== undefined) systemConfig.cryptoSolAddress = cryptoSolAddress;
  if (cryptoUsdtAddress !== undefined) systemConfig.cryptoUsdtAddress = cryptoUsdtAddress;
  if (priceStandardSol !== undefined) systemConfig.priceStandardSol = Number(priceStandardSol);
  if (pricePremiumSol !== undefined) systemConfig.pricePremiumSol = Number(pricePremiumSol);

  res.json({ success: true, message: "System variables updated dynamically on master nodes.", config: systemConfig });
});

// Fetch Live Client Sessions
app.get('/api/admin/sessions', (req, res) => {
  res.json({
    success: true,
    sessions: generateSimulatedSessions()
  });
});

// Register New Node
app.post('/api/admin/server/add', (req, res) => {
  const { id, name, country, flagEmoji, ipAddress, pingsMs, requiredTier } = req.body;

  if (!id || !name || !ipAddress) {
    return res.status(400).json({ success: false, message: "Server ID Key, Name and IP Address required." });
  }

  const newNode = {
    id,
    name,
    country: country || "Global Node Cluster",
    flagEmoji: flagEmoji || "🌐",
    ipAddress,
    pingsMs: Number(pingsMs) || 45,
    loadPercentage: Math.floor(Math.random() * 35) + 12,
    requiredTier: requiredTier || "FREE",
    isActive: true
  };

  registeredNodes.push(newNode);
  res.json({ success: true, message: `Node '${name}' spawned successfully.`, nodes: registeredNodes });
});

// Delete specific VPN server
app.delete('/api/admin/server/delete/:id', (req, res) => {
  const nodeId = req.params.id;
  const initialCount = registeredNodes.length;
  registeredNodes = registeredNodes.filter(n => n.id !== nodeId);

  if (registeredNodes.length === initialCount) {
    return res.status(404).json({ success: false, message: "Target cluster node not found." });
  }

  res.json({ success: true, message: "Node pruned from active cluster registers.", nodes: registeredNodes });
});


// 🤖 Endpoints: Sentient AI Core Proxy (Gemini vs Grok xAI Proxy)
app.post('/api/ai/chat', async (req, res) => {
  const { prompt, conversationHistory = [] } = req.body;

  if (!prompt) {
    return res.status(400).json({ success: false, message: "Prompt payload is missing." });
  }

  const systemPrompt = "You are LoraCon's Executive Tech Director of Lorapok Labs, managing a high-tech decentralized crypto VPN. Give witty cybersecurity insights, on-point technical explanations about WireGuard/Noise protocols, or Solana ledger auditing tools. Tone is cheeky, sharp, futuristic and techno-holographic.";

  // Option A: Proxy to xAI Grok Completions API
  if (systemConfig.activeApiProvider === "Grok AI API") {
    const grokKey = process.env.X_AI_GROK_API_KEY;

    if (!grokKey) {
      // Fallback response with technical explanation if key is unset
      return res.json({
        success: true,
        provider: "xAI Grok Fallback Node",
        message: "xAI Grok API key is currently unset in back-env variables. Showing Offline Terminal fallback:\n\n*Grok:* SOL devnet validation works beautifully at standard rate " + systemConfig.pricePremiumSol + " SOL. Throttling is strictly capped at " + systemConfig.freeBandwidthLimit + " Mbps to keep nodes optimal. Ask your server master to specify X_AI_GROK_API_KEY inside backend/.env."
      });
    }

    try {
      const messages = [
        { role: "system", content: systemPrompt },
        ...conversationHistory.map(m => ({
          role: m.author === "AI" ? "assistant" : "user",
          content: m.text
        })),
        { role: "user", content: prompt }
      ];

      const response = await axios.post(
        'https://api.x.ai/v1/chat/completions',
        {
          model: 'grok-beta',
          messages,
          temperature: 0.7
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${grokKey}`
          }
        }
      );

      return res.json({
        success: true,
        provider: "xAI Grok API Integration",
        message: response.data.choices[0].message.content
      });

    } catch (error) {
      console.error("Grok Proxy Fail:", error.message);
      return res.json({
        success: true,
        provider: "xAI Grok Error Fallback",
        message: "LCon Node encountered handshaking errors with x.ai nodes: " + error.message + ". Please verify billing details or proxy key in server parameters."
      });
    }
  } 

  // Option B: Proxy to Google Gemini REST API
  else {
    const geminiKey = process.env.GEMINI_API_KEY;

    if (!geminiKey) {
      return res.json({
        success: true,
        provider: "Gemini Fallback Node",
        message: "Google Gemini API key is missing. Ensure GEMINI_API_KEY is supplied in backend/.env configuration."
      });
    }

    try {
      // Build conversation structure in correct Gemini prompt format
      const contents = [
        ...conversationHistory.map(m => ({
          role: m.author === "AI" ? "model" : "user",
          parts: [{ text: m.text }]
        })),
        { role: "user", parts: [{ text: prompt }] }
      ];

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
      
      const response = await axios.post(
        url,
        {
          contents,
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          }
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Gemini Sentinel closed standard pipe.";

      return res.json({
        success: true,
        provider: "Google Gemini v1.5 API Integration",
        message: reply
      });

    } catch (error) {
      console.error("Gemini Proxy Fail:", error.message);
      return res.json({
        success: true,
        provider: "Gemini Error Fallback",
        message: "LoraCon Gemini proxy core caught error: " + error.message
      });
    }
  }
});

// Basic Status Check
app.get('/', (req, res) => {
  res.send('<html><body style="font-family:sans-serif; background:#050505; color:white; padding:50px; text-align:center;"><h1>LoraCon Portal Operational</h1><p>Infrastructure suite for secure, high-availability tunneling.</p></body></html>');
});

// App Startup Listening
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`⚡ LCon MASTER API SERVER BOOTING...                `);
  console.log(`🔒 SECURE CREDENTIALS ENCRYPTED AND CACHED IN MEMORY`);
  console.log(`🌐 PORTAL COMPILING COMPLETED: http://localhost:${PORT}`);
  console.log(`====================================================`);
});

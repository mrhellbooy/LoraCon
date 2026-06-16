import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Activity, 
  Server, 
  Key, 
  RefreshCw, 
  Sliders, 
  Plus, 
  Trash2, 
  Globe, 
  Lock, 
  User, 
  HardDrive,
  Cpu,
  Settings,
  Flame,
  Power
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

function App() {
  // Config & Node states
  const [activeTab, setActiveTab] = useState('FLOW'); // 'FLOW', 'CRYPT', 'SERVERS', 'MONITOR'
  const [config, setConfig] = useState({
    freeBandwidthLimit: 50,
    freeDailyQuotaLimit: 500,
    activeApiProvider: "Grok AI API",
    cryptoSolAddress: "Cpk21xLConDevnetSF92aKJ818vN9SolAddresses",
    cryptoUsdtAddress: "0xLConDevnetTetherContractAddressUSDT9a83",
    priceStandardSol: 0.15,
    pricePremiumSol: 0.35,
  });
  const [nodes, setNodes] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Node registration form state
  const [addNode, setAddNode] = useState({
    id: '',
    name: '',
    country: '',
    flagEmoji: '🌐',
    ipAddress: '',
    pingsMs: '40',
    requiredTier: 'FREE'
  });

  // Fetch full configuration and node cluster details on boot
  const loadWorkspaceState = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/admin/config`);
      const data = await res.json();
      if (data.success) {
        setConfig(data.config);
        setNodes(data.nodes);
        setErrorMsg('');
      } else {
        setErrorMsg('Node sync error: server feedback invalid.');
      }
    } catch (err) {
      setErrorMsg(`LoraCon Backend Server unreached. Ensure your API is running at: ${API_BASE_URL}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch virtual connected users
  const loadSessions = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/sessions`);
      const data = await res.json();
      if (data.success) {
        setSessions(data.sessions);
      }
    } catch (err) {
      console.log('Unable to reach telemetry feed.');
    }
  };

  useEffect(() => {
    loadWorkspaceState();
    loadSessions();
    const cycle = setInterval(loadSessions, 6000);
    return () => clearInterval(cycle);
  }, []);

  // Update variables (throttles, crypt addresses, pricing)
  const handleUpdateConfig = async (newConfig) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/config/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newConfig)
      });
      const data = await res.json();
      if (data.success) {
        setConfig(data.config);
        setStatusMsg('System registers synchronized successfully.');
        setTimeout(() => setStatusMsg(''), 3000);
      }
    } catch (err) {
      setErrorMsg('Synchronize handshake failed.');
    }
  };

  // Compose and deploy dynamic server
  const handleAddNode = async (e) => {
    e.preventDefault();
    if (!addNode.id || !addNode.name || !addNode.ipAddress) {
      alert('Sever ID, Name and IP Address required.');
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/server/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addNode)
      });
      const data = await res.json();
      if (data.success) {
        setNodes(data.nodes);
        setAddNode({ id: '', name: '', country: '', flagEmoji: '🌐', ipAddress: '', pingsMs: '40', requiredTier: 'FREE' });
        setStatusMsg(`Node '${addNode.name}' composed successfully.`);
        setTimeout(() => setStatusMsg(''), 3000);
      }
    } catch (err) {
      alert('Server deployment rejected.');
    }
  };

  // Remove specific VPN server node
  const handleDeleteNode = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/server/delete/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setNodes(data.nodes);
        setStatusMsg('Node decommissioned.');
        setTimeout(() => setStatusMsg(''), 3000);
      }
    } catch (err) {
      alert('Decomission failed.');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F1F5F9] font-mono selection:bg-green-500 selection:text-black">
      {/* HEADER BAR */}
      <header className="border-b border-[#1A1A1A] bg-[#0A0A0A] px-4 py-4 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-green-500 text-black shadow-[0_0_15px_rgba(0,255,0,0.3)]">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-md font-bold tracking-wider text-white md:text-lg">LCon // COGNITIVE MASTER SUITE</h1>
              <p className="text-xs text-green-500">CENTRAL ORCHESTRATION SHIELD • UTC SECURE</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden rounded border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs text-green-400 sm:block">
              ● HOST OK_HANDSHAKE
            </div>
            <button 
              onClick={() => { loadWorkspaceState(); loadSessions(); }}
              className="flex items-center justify-center gap-2 rounded border border-[#333333] hover:border-green-500 hover:text-green-500 bg-[#111111] px-3 py-2 text-xs transition duration-200"
              style={{ minHeight: '40px' }}
            >
              <RefreshCw className="h-3 w-3" />
              <span>SYNC STATES</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-4 md:p-8">
        {/* NETWORK ALERTS / FEEDBACK */}
        {errorMsg && (
          <div className="mb-6 rounded border border-red-500/50 bg-red-500/10 p-4 text-xs text-red-400 cyber-glow">
            ⚠️ {errorMsg}
          </div>
        )}
        {statusMsg && (
          <div className="mb-6 rounded border border-green-500/50 bg-green-500/10 p-4 text-xs text-green-400 cyber-glow">
            🚀 {statusMsg}
          </div>
        )}

        {/* CONTROLLER MAIN HIGHLIGHTS */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded border border-[#222222] bg-[#111111] p-4">
            <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Active Db Endpoints</div>
            <div className="mt-2 text-2xl font-bold text-white">{nodes.filter(n => n.isActive).length} Core Nodes</div>
            <div className="mt-1 text-xs text-green-500">100% active state</div>
          </div>
          <div className="rounded border border-[#222222] bg-[#111111] p-4">
            <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Flow Throttle Cap</div>
            <div className="mt-2 text-2xl font-bold text-green-500">{config.freeBandwidthLimit} Mbps</div>
            <div className="mt-1 text-xs text-gray-400">Standard Free profiles throttled</div>
          </div>
          <div className="rounded border border-[#222222] bg-[#111111] p-4">
            <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">AI Copilot Engine</div>
            <div className="mt-2 text-2xl font-bold text-purple-400">{config.activeApiProvider}</div>
            <div className="mt-1 text-xs text-purple-500">Cognitive REST mapping</div>
          </div>
          <div className="rounded border border-[#222222] bg-[#111111] p-4">
            <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Sol Epoch Prices</div>
            <div className="mt-2 text-2xl font-bold text-white">St: {config.priceStandardSol} / Pr: {config.pricePremiumSol}</div>
            <div className="mt-1 text-xs text-gray-400">Devnet simulated blocks</div>
          </div>
        </div>

        {/* SCREEN NAVIGATION TABS */}
        <div className="mb-6 flex flex-wrap border-b border-[#222222] bg-[#0A0A0A] p-1 rounded gap-1">
          {[
            { id: 'FLOW', label: 'FLOW & API', icon: Sliders },
            { id: 'CRYPT', label: 'CRYPT VALUATION', icon: Key },
            { id: 'SERVERS', label: 'NODES BUILD', icon: Server },
            { id: 'MONITOR', label: 'GRAPH MONITOR', icon: Activity }
          ].map(tab => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-1 items-center justify-center gap-2 rounded px-3 py-3 text-xs font-bold transition duration-150 ${
                  isSelected 
                    ? 'bg-green-500 text-black shadow-[0_0_12px_rgba(0,255,0,0.25)]' 
                    : 'text-gray-400 hover:bg-[#151515] hover:text-white'
                }`}
                style={{ minHeight: '45px' }}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* CONTENT REGIONS */}
        <div className="mt-6">
          {loading ? (
            <div className="flex h-40 items-center justify-center text-gray-400">
              <RefreshCw className="h-6 w-6 animate-spin text-green-500" />
              <span className="ml-3 text-xs tracking-wider">PULLING SYSTEM HANDSHAKES...</span>
            </div>
          ) : (
            <div>
              {/* FLOW & API COMPLETER */}
              {activeTab === 'FLOW' && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded border border-[#222222] bg-[#0D0D0D] p-6">
                    <h2 className="flex items-center gap-2 border-b border-[#222222] pb-3 text-sm font-bold text-white uppercase tracking-wider">
                      <Sliders className="h-4 w-4 text-green-500" />
                      <span>Throttling Limits (Free Users)</span>
                    </h2>

                    <div className="mt-5 space-y-6">
                      <div>
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-gray-400">Bandwidth Capacity Capping</span>
                          <span className="text-green-500">{config.freeBandwidthLimit} Mbps</span>
                        </div>
                        <input 
                          type="range" 
                          min="10" 
                          max="250"
                          value={config.freeBandwidthLimit}
                          onChange={(e) => {
                            setConfig({ ...config, freeBandwidthLimit: Number(e.target.value) });
                          }}
                          className="mt-2 w-full accent-green-500 bg-[#222222] h-1.5 rounded"
                        />
                        <p className="mt-1 text-[10px] text-gray-500">Caps peak speed transfers on all non-subscriber clusters instantly.</p>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-gray-400">Daily Quota Data Cap</span>
                          <span className="text-green-500">{config.freeDailyQuotaLimit} MB</span>
                        </div>
                        <input 
                          type="range" 
                          min="100" 
                          max="2000"
                          value={config.freeDailyQuotaLimit}
                          onChange={(e) => {
                            setConfig({ ...config, freeDailyQuotaLimit: Number(e.target.value) });
                          }}
                          className="mt-2 w-full accent-green-500 bg-[#222222] h-1.5 rounded"
                        />
                        <p className="mt-1 text-[10px] text-gray-500">Limits daily total encryption bandwidth.</p>
                      </div>

                      <button 
                        onClick={() => handleUpdateConfig(config)}
                        className="w-full rounded bg-green-500 px-4 py-3 text-xs font-bold text-black hover:bg-green-400 transition"
                        style={{ minHeight: '48px' }}
                      >
                        WRITE BANDWIDTH CODES
                      </button>
                    </div>
                  </div>

                  <div className="rounded border border-[#222222] bg-[#0D0D0D] p-6">
                    <h2 className="flex items-center gap-2 border-b border-[#222222] pb-3 text-sm font-bold text-white uppercase tracking-wider">
                      <Cpu className="h-4 w-4 text-purple-400" />
                      <span>Sentient AI Copilot Gateway</span>
                    </h2>

                    <div className="mt-5 space-y-6">
                      <div>
                        <span className="text-xs text-gray-400 font-bold block mb-2">Gate Oracle Selection</span>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { id: "Gemini API", label: "Gemini REST" },
                            { id: "Grok AI API", label: "xAI Grok Proxy" }
                          ].map(prov => {
                            const selected = config.activeApiProvider === prov.id;
                            return (
                              <button
                                key={prov.id}
                                onClick={() => {
                                  const updated = { ...config, activeApiProvider: prov.id };
                                  setConfig(updated);
                                  handleUpdateConfig(updated);
                                }}
                                className={`rounded px-3 py-2 text-xs font-bold border transition ${
                                  selected 
                                    ? 'bg-purple-600/20 text-purple-300 border-purple-500 shadow-sm' 
                                    : 'bg-[#151515] text-[#888888] border-[#333333] hover:text-white'
                                }`}
                                style={{ minHeight: '45px' }}
                              >
                                {prov.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="rounded bg-[#050505] border border-purple-500/10 p-3">
                        <span className="text-[10px] text-purple-400 font-bold block uppercase tracking-wider font-mono">Current Proxy Instructions:</span>
                        <p className="text-[11px] text-gray-500 mt-1 font-mono">
                          {config.activeApiProvider === "Grok AI API" 
                            ? "Routing dialogue requests securely to xAI's 'grok-beta' container core over Bearer API handshakes." 
                            : "Routing AI inquiries in standard formats through secure server-side Google Gemini Flash models."
                          }
                        </p>
                      </div>

                      <div className="text-[10px] text-gray-600">
                        * API completions endpoints are proxied through Node.js back-end to protect API Key structures from reverse-engineering.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CRYPT VALUATION */}
              {activeTab === 'CRYPT' && (
                <div className="rounded border border-[#222222] bg-[#0D0D0D] p-6 max-w-2xl mx-auto">
                  <h2 className="flex items-center gap-2 border-b border-[#222222] pb-3 text-sm font-bold text-white uppercase tracking-wider">
                    <Key className="h-4 w-4 text-green-500" />
                    <span>Blockchain Registry Wallet Recipient Addresses</span>
                  </h2>

                  <div className="mt-5 space-y-4">
                    <div>
                      <label className="text-xs text-gray-400 font-bold block mb-1">Solana (SOL) Address</label>
                      <input 
                        type="text" 
                        value={config.cryptoSolAddress}
                        onChange={(e) => setConfig({ ...config, cryptoSolAddress: e.target.value })}
                        className="w-full rounded border border-[#222222] bg-[#050505] p-3 text-xs font-mono text-purple-400 uppercase tracking-widest focus:border-green-500 focus:outline-none"
                        style={{ minHeight: '48px' }}
                      />
                    </div>

                    <div>
                      <label className="text-xs text-gray-400 font-bold block mb-1">USDT Contact Contract Bridge</label>
                      <input 
                        type="text" 
                        value={config.cryptoUsdtAddress}
                        onChange={(e) => setConfig({ ...config, cryptoUsdtAddress: e.target.value })}
                        className="w-full rounded border border-[#222222] bg-[#050505] p-3 text-xs font-mono text-green-400 uppercase tracking-widest focus:border-green-500 focus:outline-none"
                        style={{ minHeight: '48px' }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="text-xs text-gray-400 font-bold block mb-1">Standard Plan (SOL)</label>
                        <input 
                          type="number" 
                          step="0.01"
                          value={config.priceStandardSol}
                          onChange={(e) => setConfig({ ...config, priceStandardSol: Number(e.target.value) })}
                          className="w-full rounded border border-[#222222] bg-[#050505] p-3 text-xs font-mono text-white focus:border-green-500 focus:outline-none"
                          style={{ minHeight: '48px' }}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 font-bold block mb-1">Premium Plan (SOL)</label>
                        <input 
                          type="number" 
                          step="0.01"
                          value={config.pricePremiumSol}
                          onChange={(e) => setConfig({ ...config, pricePremiumSol: Number(e.target.value) })}
                          className="w-full rounded border border-[#222222] bg-[#050505] p-3 text-xs font-mono text-white focus:border-green-500 focus:outline-none"
                          style={{ minHeight: '48px' }}
                        />
                      </div>
                    </div>

                    <p className="text-[10px] text-gray-500 pt-1">
                      These values sync immediately in the Android keys purchase panels when users authorize key subscriptions.
                    </p>

                    <button 
                      onClick={() => handleUpdateConfig(config)}
                      className="w-full rounded bg-green-500 px-4 py-3 text-xs font-bold text-black hover:bg-green-400 transition mt-4"
                      style={{ minHeight: '48px' }}
                    >
                      COMMIT PAYROLL SETTINGS
                    </button>
                  </div>
                </div>
              )}

              {/* NODES BUILD */}
              {activeTab === 'SERVERS' && (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  {/* Deployment Form */}
                  <div className="rounded border border-[#222222] bg-[#0D0D0D] p-6 lg:col-span-1">
                    <h2 className="flex items-center gap-2 border-b border-[#222222] pb-3 text-sm font-bold text-white uppercase tracking-wider">
                      <Plus className="h-4 w-4 text-green-500" />
                      <span>Compose Cluster Profile</span>
                    </h2>

                    <form onSubmit={handleAddNode} className="mt-5 space-y-4">
                      <div>
                        <label className="text-xs text-gray-400 font-bold block mb-1">Node ID Key</label>
                        <input 
                          type="text" 
                          placeholder="e.g. us_sf"
                          value={addNode.id}
                          onChange={(e) => setAddNode({ ...addNode, id: e.target.value })}
                          className="w-full rounded border border-[#222222] bg-[#050505] p-3 text-xs text-white focus:border-green-500 focus:outline-none"
                          style={{ minHeight: '45px' }}
                        />
                      </div>

                      <div>
                        <label className="text-xs text-gray-400 font-bold block mb-1">Node Host Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Frankfurt Rhine-Main"
                          value={addNode.name}
                          onChange={(e) => setAddNode({ ...addNode, name: e.target.value })}
                          className="w-full rounded border border-[#222222] bg-[#050505] p-3 text-xs text-white focus:border-green-500 focus:outline-none"
                          style={{ minHeight: '45px' }}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-gray-400 font-bold block mb-1">Country</label>
                          <input 
                            type="text" 
                            placeholder="Germany"
                            value={addNode.country}
                            onChange={(e) => setAddNode({ ...addNode, country: e.target.value })}
                            className="w-full rounded border border-[#222222] bg-[#050505] p-3 text-xs text-white focus:border-green-500 focus:outline-none"
                            style={{ minHeight: '45px' }}
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-400 font-bold block mb-1">Flag Emoji</label>
                          <input 
                            type="text" 
                            placeholder="🇩🇪"
                            value={addNode.flagEmoji}
                            onChange={(e) => setAddNode({ ...addNode, flagEmoji: e.target.value })}
                            className="w-full rounded border border-[#222222] bg-[#050505] p-3 text-xs text-white focus:border-green-500 focus:outline-none"
                            style={{ minHeight: '45px' }}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-gray-400 font-bold block mb-1">IPv4 Destination Address</label>
                        <input 
                          type="text" 
                          placeholder="193.125.1.42"
                          value={addNode.ipAddress}
                          onChange={(e) => setAddNode({ ...addNode, ipAddress: e.target.value })}
                          className="w-full rounded border border-[#222222] bg-[#050505] p-3 text-xs text-white focus:border-green-500 focus:outline-none"
                          style={{ minHeight: '45px' }}
                        />
                      </div>

                      <div>
                        <label className="text-xs text-gray-400 font-bold block mb-1">Target Required Tier</label>
                        <select 
                          value={addNode.requiredTier}
                          onChange={(e) => setAddNode({ ...addNode, requiredTier: e.target.value })}
                          className="w-full rounded border border-[#222222] bg-[#050505] px-3 py-2 text-xs text-white focus:border-green-500 focus:outline-none"
                          style={{ minHeight: '45px' }}
                        >
                          <option value="FREE">FREE ACCEL (CAPPED)</option>
                          <option value="STANDARD">STANDARD KEY REQUIRED</option>
                          <option value="PREMIUM">PREMIUM ELITE CLUSTER</option>
                        </select>
                      </div>

                      <button 
                        type="submit"
                        className="w-full rounded bg-green-500 px-4 py-3 text-xs font-bold text-black hover:bg-green-400 transition mt-2"
                        style={{ minHeight: '48px' }}
                      >
                        INJECT INSTANCE NODE
                      </button>
                    </form>
                  </div>

                  {/* Nodes List */}
                  <div className="rounded border border-[#222222] bg-[#0D0D0D] p-6 lg:col-span-2">
                    <h2 className="flex items-center justify-between border-b border-[#222222] pb-3 text-sm font-bold text-white uppercase tracking-wider">
                      <span className="flex items-center gap-2">
                        <Server className="h-4 w-4 text-green-500" />
                        <span>Registered Endpoint Instances</span>
                      </span>
                      <span className="text-xs font-bold text-green-500">{nodes.length} registered</span>
                    </h2>

                    <div className="mt-5 space-y-3 max-h-[500px] overflow-y-auto pr-1">
                      {nodes.map(node => (
                        <div 
                          key={node.id}
                          className="flex flex-wrap items-center justify-between gap-4 rounded border border-[#222222] bg-[#050505] p-3"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{node.flagEmoji}</span>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-white">{node.name}</span>
                                <span className={`rounded-full px-2 py-0.5 text-[8px] font-bold ${
                                  node.requiredTier === 'PREMIUM'
                                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                    : 'bg-green-500/20 text-green-400 border border-green-500/30'
                                }`}>
                                  {node.requiredTier}
                                </span>
                              </div>
                              <div className="text-[10px] text-gray-500 mt-0.5">
                                IP: {node.ipAddress} • Ping: {node.pingsMs}ms • Load: {node.loadPercentage}%
                              </div>
                            </div>
                          </div>

                          <button 
                            onClick={() => handleDeleteNode(node.id)}
                            className="flex h-8 w-8 items-center justify-center rounded border border-[#333333] text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
                            style={{ minHeight: '35px', minWidth: '35px' }}
                            title="Prune this node"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* GRAPH TELEMETRY MONITOR */}
              {activeTab === 'MONITOR' && (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  {/* Canvas SVG throughput graph */}
                  <div className="rounded border border-[#222222] bg-[#0D0D0D] p-6 lg:col-span-2">
                    <h2 className="flex items-center gap-2 border-b border-[#222222] pb-3 text-sm font-bold text-white uppercase tracking-wider">
                      <Activity className="h-4 w-4 text-green-500" />
                      <span>Simulated Network Latency Waveforms</span>
                    </h2>

                    <div className="mt-5 rounded bg-[#050505] border border-[#222222] p-4">
                      {/* SVG animated waveform */}
                      <svg className="w-full h-48 bg-[#020202] rounded-md" viewBox="0 0 500 150">
                        <defs>
                          <linearGradient id="gradEmerald" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                          </linearGradient>
                          <linearGradient id="gradPurple" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        {/* Grid lines */}
                        <line x1="0" y1="30" x2="500" y2="30" stroke="#1A1A1A" strokeWidth="1" />
                        <line x1="0" y1="75" x2="500" y2="75" stroke="#1A1A1A" strokeWidth="1" />
                        <line x1="0" y1="120" x2="500" y2="120" stroke="#1A1A1A" strokeWidth="1" />
                        
                        <line x1="100" y1="0" x2="100" y2="150" stroke="#1A1A1A" strokeWidth="1" />
                        <line x1="200" y1="0" x2="200" y2="150" stroke="#1A1A1A" strokeWidth="1" />
                        <line x1="300" y1="0" x2="300" y2="150" stroke="#1A1A1A" strokeWidth="1" />
                        <line x1="400" y1="0" x2="400" y2="150" stroke="#1A1A1A" strokeWidth="1" />

                        {/* Emerald Sine Curve (simulates overall transfer rates) */}
                        <path 
                          d="M  0,60 Q 50,20 100,80 T 200,60 T 300,90 T 400,40 T 500,80 L 500,150 L 0,150 Z" 
                          fill="url(#gradEmerald)" 
                          stroke="#10B981" 
                          strokeWidth="2.5" 
                        />

                        {/* Purple Sine Curve (simulates block validation cycles) */}
                        <path 
                          d="M  0,90 Q 70,120 140,50 T 280,100 T 420,60 T 500,100 L 500,150 L 0,150 Z" 
                          fill="url(#gradPurple)" 
                          stroke="#8B5CF6" 
                          strokeWidth="1.5" 
                        />
                      </svg>
                      
                      <div className="mt-4 flex flex-wrap justify-between gap-4 text-[10px] text-gray-500">
                        <div className="flex items-center gap-1">
                          <span className="block h-2/5 w-3 bg-[#10B981] rounded-full mr-1 h-2 w-2"></span>
                          <span>Node throughput: 42.4 Mbps (Mean)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="block h-2/5 w-3 bg-[#8B5CF6] rounded-full mr-1 h-2 w-2"></span>
                          <span>Neural delays: 14ms (Devnet Avg)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Connected users list */}
                  <div className="rounded border border-[#222222] bg-[#0D0D0D] p-6">
                    <h2 className="flex items-center justify-between border-b border-[#222222] pb-3 text-sm font-bold text-white uppercase tracking-wider">
                      <span className="flex items-center gap-2">
                        <User className="h-4 w-4 text-green-500" />
                        <span>Active VPN Sessions</span>
                      </span>
                      <span className="rounded bg-green-500/10 px-2 py-0.5 text-[9px] font-mono text-green-400">Glow Active</span>
                    </h2>

                    <div className="mt-5 space-y-3 font-mono">
                      {sessions.length === 0 ? (
                        <p className="text-xs text-gray-500 italic">Simulating peer discoveries...</p>
                      ) : (
                        sessions.map((user, i) => (
                          <div 
                            key={i}
                            className="rounded border border-[#1A1A1A] bg-[#050505] p-3 text-xs"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 font-bold text-white">
                                <span>{user.countryFlag}</span>
                                <span>{user.username}</span>
                              </div>
                              <span className={`text-[9px] font-bold ${
                                user.tier === 'PREMIUM' ? 'text-purple-400' : 'text-green-400'
                              }`}>
                                {user.tier}
                              </span>
                            </div>
                            <div className="mt-1 text-[10px] text-gray-500">
                              IP: {user.ip} • OS: {user.platform} • Proc: {user.protocol}
                            </div>
                            <div className="mt-2 border-t border-[#151515] pt-1 text-[11px] font-bold text-green-500">
                              {user.speed}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-12 border-t border-[#1A1A1A] bg-[#0A0A0A] py-6 text-center text-xs text-gray-600">
        <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <span>LoraCon Admin Console v1.0.10 • Produced by Lorapok Labs</span>
          <span className="text-green-500 font-bold">100% SECURE CLIENT TUNNEL SYNCHRONY</span>
        </div>
      </footer>
    </div>
  );
}

export default App;

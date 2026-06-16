import React, { useState, useEffect } from 'react';
import { 
  Shield, Activity, Server, Sliders, Monitor, Cpu, ChevronRight, CreditCard, Users, Terminal, RefreshCw, Cog, Wallet, CheckCircle, Search, HelpCircle, Menu, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import NodeMap from '../components/NodeMap';
import { adminConfig, adminSessions, apiHealth } from '../services/api';
import { useToast } from '../components/Toast';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between px-6 py-4 transition-all duration-300 font-medium ${
      active ? 'bg-[#1a1a1a] text-[#22c55e] border-r-2 border-[#22c55e]' : 'text-slate-500 hover:text-white hover:bg-[#0d0d0d]'
    }`}
  >
    <div className="flex items-center gap-4">
      <Icon size={18} />
      {label}
    </div>
    {active && <motion.div layoutId="activeTab" className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />}
  </button>
);

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('FLOW');
  const [protocol, setProtocol] = useState('WireGuard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [autoConnect, setAutoConnect] = useState(() => {
    return localStorage.getItem('autoConnect') === 'true';
  });
  const showToast = useToast();

  useEffect(() => {
    localStorage.setItem('autoConnect', autoConnect);
  }, [autoConnect]);

  const role = sessionStorage.getItem('role');
  const isSuperAdmin = role === 'SUPERADMIN';
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [config, setConfig] = useState({ 
    freeBandwidthLimit: 50, 
    freeDailyQuotaLimit: 500, 
    activeApiProvider: "Gemini API", 
    cryptoSolAddress: "LoRaConVpnSol...P7yX9wQz", 
    cryptoBnbAddress: "0xLoraConAdmin...Fb32c7",
    cryptoUsdtAddress: "...", 
    priceStandardSol: 0.5, 
    pricePremiumSol: 2.5 
  });
  
  const [nodes, setNodes] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [apiStatus, setApiStatus] = useState('online');
  const [bandwidthData, setBandwidthData] = useState(() => 
    Array.from({ length: 20 }, (_, i) => ({ time: i, value: 20 + Math.random() * 30 }))
  );

  useEffect(() => {
    let timeoutId;
    const pollGateways = () => {
      // Simulate real-time ledger sync
      const logEntry = `[${new Date().toLocaleTimeString()}] LEDGER_POLL: Checking SOL/BSC clusters...`;
      console.log(logEntry);
      
      // Simulate automated approval of pending transactions if they exist
      const hasPending = Math.random() > 0.6;
      if (hasPending) {
        setApiStatus('syncing');
        setTimeout(() => {
          setApiStatus('online');
          showToast("Automated Ledger Sync: 1 transaction verified and provisioned.", "success");
        }, 3000);
      }

      timeoutId = setTimeout(pollGateways, 60000); // Poll every 60s for better performance
    };

    pollGateways();
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    let timeoutId;

    const checkHealth = async () => {
      const { error } = await apiHealth.check();
      if (error) {
        setApiStatus('offline');
        showToast("Connection to backend lost!", "error");
      } else {
        setApiStatus('online');
      }
      // Schedule next poll safely after this one completes
      timeoutId = setTimeout(checkHealth, 30000);
    };

    // Start polling
    checkHealth();

    return () => clearTimeout(timeoutId);
  }, []);

  const fetchData = async () => {
    setIsRefreshing(true);
    const [configRes, sessionRes] = await Promise.all([
        adminConfig.get(),
        adminSessions.get()
    ]);
      
    if (configRes.data && configRes.data.success) {
      setConfig(configRes.data.config);
      setNodes(configRes.data.nodes);
      showToast("System dashboard data synchronized.");
    } else {
      showToast(configRes.error || "Failed to fetch dashboard data.", "error");
    }
    if (sessionRes.data && sessionRes.data.success) {
      setSessions(sessionRes.data.sessions);
    }
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    fetchData();
  };

  const handleConfigChange = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleDeployConfig = async () => {
    setIsRefreshing(true);
    const { data, error } = await adminConfig.update(config);
    if (data && data.success) {
        showToast("Configuration deployed successfully!");
    } else {
        showToast(error || "Failed to deploy: " + (data?.message || "Unknown error"), "error");
    }
    setIsRefreshing(false);
  };
  const [walletConnected, setWalletConnected] = useState(false);
  const [adminWallet, setAdminWallet] = useState('...');

  const connectWallet = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setWalletConnected(true);
      setAdminWallet('6xP...j7vV');
      setIsRefreshing(false);
      showToast("Phantom Wallet connected successfully.", "success");
    }, 1500);
  };

  useEffect(() => {
      const interval = setInterval(() => {
          setBandwidthData(prev => {
              const newData = [...prev.slice(1), { time: prev[prev.length - 1].time + 1, value: Math.random() * 50 }];
              return newData;
          });
      }, 1000);
      return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'FLOW', label: 'Flow Control', icon: Sliders },
    { id: 'SERVERS', label: 'Node Cluster', icon: Server },
    { id: 'MONITOR', label: 'Telemetry', icon: Monitor },
    { id: 'BILLING', label: 'Billing/Finance', icon: CreditCard },
    { id: 'PAYMENT_VERIFY', label: 'Payment Verification', icon: CheckCircle },
    { id: 'USERS', label: 'User Directory', icon: Users },
    { id: 'SYSTEM', label: 'System Logs', icon: Terminal },
    { id: 'SETTINGS', label: 'Settings', icon: Cog }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#F1F5F9] flex flex-col md:flex-row selection:bg-[#22c55e]/20">
      {/* Mobile Header Menu */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-[#1a1a1a] bg-[#050505] z-50">
        <div className="flex items-center gap-3">
          <Shield className="text-[#22c55e]" size={24} />
          <span className="font-bold text-lg tracking-tight">LoraCon</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <aside className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative z-40 bg-[#050505] w-64 h-full border-r border-[#1a1a1a] flex-col pt-6 md:pt-10 transition-transform`}>
        <div className="px-8 mb-12 hidden md:flex items-center gap-3">
            <Shield className="text-[#22c55e]" size={28} />
            <span className="font-bold text-xl tracking-tight">LoraCon</span>
            <span className="text-[10px] bg-[#111] px-2 py-0.5 rounded text-gray-500">{role}</span>
        </div>
        <nav className="flex-1 overflow-y-auto">
          {tabs.map((tab) => (
            <SidebarItem key={tab.id} {...tab} active={activeTab === tab.id} onClick={() => { setActiveTab(tab.id); setIsMobileMenuOpen(false); }} />
          ))}
        </nav>
        <div className="px-8 pb-10 mt-auto hidden md:block">
            <div className="bg-gradient-to-br from-[#22c55e]/10 to-black p-4 rounded-xl border border-[#22c55e]/20">
                <p className="text-xs text-[#22c55e] font-mono mb-1">SYSTEM STATUS</p>
                <p className="text-sm font-bold">ALL RELAYS ACTIVE</p>
            </div>
        </div>
      </aside>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <main className="flex-1 p-4 md:p-12 overflow-x-hidden">
        <header className="mb-6 md:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Control Plane</h1>
                <p className="text-gray-500 font-light text-sm md:text-base">Infrastructure oversight for Lorapok network. <span className="text-[#22c55e]/60 font-mono text-[10px]">v1.0.10</span></p>
            </div>
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <div className="flex items-center gap-2 px-3 py-2 bg-[#111] border border-[#222] rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${apiStatus === 'online' ? 'bg-[#22c55e]' : 'bg-red-500'}`}></div>
                    <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-gray-400">API: {apiStatus}</span>
                </div>
                <button 
                  onClick={handleRefresh}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-[#111] border border-[#222] hover:bg-[#1a1a1a] transition text-sm md:text-base ${isRefreshing ? 'opacity-80' : ''}`}
                >
                  <motion.div
                    animate={{ rotate: isRefreshing ? 360 : 0 }}
                    transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0, ease: "linear" }}
                  >
                    <RefreshCw size={14} className="md:w-4 md:h-4" />
                  </motion.div>
                  {isRefreshing ? 'Syncing...' : 'Refresh'}
                </button>
                {isSuperAdmin && (
                  <>
                    <button className="px-3 py-2 rounded-lg bg-[#111] border border-[#222] hover:bg-[#1a1a1a] transition text-sm md:text-base">System Logs</button>
                    <button onClick={handleDeployConfig} className="px-3 py-2 rounded-lg bg-[#22c55e] text-black font-bold hover:bg-[#22c55e]/80 transition text-sm md:text-base whitespace-nowrap">Deploy Changes</button>
                  </>
                )}
            </div>
        </header>

        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={activeTab}
            className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-4 md:p-8"
        >
          {activeTab === 'FLOW' && (
            <div>
              <h2 className="text-base md:text-lg font-semibold mb-6 md:mb-8 flex items-center gap-2"><Sliders size={18} className="text-[#22c55e]" /> Infrastructure Config</h2>
              
              <div className="bg-[#111] p-4 md:p-6 rounded-xl border border-[#222] mb-6">
                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-4 block">Active VPN Protocol</label>
                <div className="flex flex-wrap gap-2">
                    <button 
                        onClick={() => setProtocol('WireGuard')}
                        className={`px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-bold transition text-sm md:text-base flex-1 md:flex-none ${protocol === 'WireGuard' ? 'bg-[#22c55e] text-black' : 'bg-[#222] text-white hover:bg-[#333]'}`}
                    >WireGuard</button>
                    <button 
                        onClick={() => setProtocol('OpenVPN')}
                        className={`px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-bold transition text-sm md:text-base flex-1 md:flex-none ${protocol === 'OpenVPN' ? 'bg-[#22c55e] text-black' : 'bg-[#222] text-white hover:bg-[#333]'}`}
                    >OpenVPN</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {Object.entries(config).map(([key, val]) => (
                  <div key={key} className="bg-[#111] p-4 md:p-5 rounded-xl border border-[#222]">
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2 block truncate">{key}</label>
                    <input 
                        className="w-full bg-transparent text-sm md:text-lg font-mono outline-none truncate" 
                        value={config[key]} 
                        onChange={(e) => handleConfigChange(key, e.target.value)}
                        readOnly={!isSuperAdmin} 
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'SERVERS' && (
            <div>
                <h2 className="text-base md:text-lg font-semibold mb-6 md:mb-8 flex items-center gap-2"><Server size={18} className="text-[#22c55e]" /> Node Cluster</h2>
                <div className="space-y-4">
                    {nodes.map(node => (
                    <div key={node.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-5 bg-[#111] rounded-xl border border-[#222] gap-4 md:gap-0">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-[#050505] rounded-lg border border-[#222]"><Cpu size={20} className="text-gray-500" /></div>
                            <div>
                                <h4 className="font-bold text-sm md:text-base">{node.name}</h4>
                                <p className={`text-[10px] md:text-xs ${node.isActive ? 'text-[#22c55e]' : 'text-gray-500'}`}>{node.isActive ? 'Active' : 'Inactive'}</p>
                            </div>
                        </div>
                        <div className="w-full md:w-48 h-2 bg-gray-900 rounded-full overflow-hidden">
                            <div className="h-full bg-[#22c55e] rounded-full" style={{ width: `${node.loadPercentage}%` }}></div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
          )}

          {activeTab === 'MONITOR' && (
            <div>
              <h2 className="text-base md:text-lg font-semibold mb-6 md:mb-8 flex items-center gap-2"><Activity size={18} className="text-[#22c55e]" /> Live Telemetry</h2>
              <div className="bg-[#111] p-4 md:p-6 rounded-xl border border-[#222] mb-6 md:mb-8 h-48 md:h-64">
                <NodeMap nodes={nodes} />
              </div>
              <div className="bg-[#111] p-4 md:p-6 rounded-xl border border-[#222] mb-6 md:mb-8 h-48 md:h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={bandwidthData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                        <XAxis dataKey="time" hide />
                        <YAxis stroke="#444" fontSize={10} width={30} />
                        <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #222' }} />
                        <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="grid gap-3">
                {sessions.map(s => (
                  <div key={s.id} className="p-4 md:p-5 bg-[#111] rounded-xl border border-[#222] flex flex-col md:flex-row justify-between font-mono text-xs md:text-sm md:items-center gap-2 md:gap-0">
                    <span className="text-gray-300 font-bold break-all">{s.user}</span>
                    <span className="text-[#22c55e] bg-[#22c55e]/10 px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs w-max">{s.connectionTime}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'BILLING' && (
            <div>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8 gap-4 md:gap-0">
                <h2 className="text-base md:text-lg font-semibold flex items-center gap-2"><CreditCard size={18} className="text-[#22c55e]" /> Protocol Finance</h2>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full md:w-auto items-stretch sm:items-center">
              <div className="flex items-center justify-center gap-2 px-3 py-2 bg-white/[0.03] border border-white/10 rounded-xl whitespace-nowrap">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                 <span className="text-[9px] text-[#22c55e] font-black uppercase tracking-widest italic font-mono">Ledger Polling: Active</span>
              </div>
              <button 
                onClick={connectWallet}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-bold transition-all text-sm ${
                  walletConnected 
                    ? 'bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/30' 
                    : 'bg-[#22c55e] text-black hover:scale-[1.02]'
                }`}
              >
                <Wallet size={16} />
                {walletConnected ? adminWallet : 'Connect Admin Wallet'}
              </button>
            </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="bg-[#111] p-4 md:p-6 rounded-xl border border-[#222]">
                  <p className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest mb-1 truncate">Total Revenue (SOL)</p>
                  <p className="text-lg md:text-2xl font-black text-white">42.50 SOL</p>
                </div>
                <div className="bg-[#111] p-4 md:p-6 rounded-xl border border-[#222]">
                  <p className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest mb-1 truncate">Total Revenue (BNB)</p>
                  <p className="text-lg md:text-2xl font-black text-[#f3ba2f]">8.12 BNB</p>
                </div>
                <div className="bg-[#111] p-4 md:p-6 rounded-xl border border-[#222]">
                  <p className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest mb-1 truncate">Active Subs</p>
                  <p className="text-lg md:text-2xl font-black text-[#22c55e]">142</p>
                </div>
                <div className="bg-[#111] p-4 md:p-6 rounded-xl border border-[#222]">
                  <p className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest mb-1 truncate">Pending Clearance</p>
                  <p className="text-lg md:text-2xl font-black text-amber-500">12</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
                <div className="bg-[#111] p-6 md:p-8 rounded-2xl border border-[#222]">
                  <h3 className="text-xs md:text-sm font-bold mb-6 flex items-center gap-2 uppercase tracking-widest italic opacity-50"><Shield size={14} /> Global Operations</h3>
                  <div className="space-y-4">
                    <div className="p-4 md:p-5 bg-[#050505] rounded-xl border border-white/5">
                      <p className="text-[#22c55e] mb-2 font-bold text-[9px] md:text-[10px] tracking-widest uppercase italic truncate">// SOLANA_MAINNET</p>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-[10px] text-slate-400 font-mono gap-1 sm:gap-0">
                        <span>Balance: 124.5 SOL</span>
                        <span className="text-[#22c55e]">Node Sync: 100%</span>
                      </div>
                    </div>
                    <div className="p-4 md:p-5 bg-[#050505] rounded-xl border border-white/5">
                      <p className="text-[#f3ba2f] mb-2 font-bold text-[9px] md:text-[10px] tracking-widest uppercase italic truncate">// BINANCE_SMART_CHAIN</p>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-[10px] text-slate-400 font-mono gap-1 sm:gap-0">
                        <span>Balance: 14.8 BNB</span>
                        <span className="text-[#22c55e]">Handshake: OK</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#111] p-6 md:p-8 rounded-2xl border border-[#222]">
                  <h3 className="text-xs md:text-sm font-bold mb-6 flex items-center gap-2 uppercase tracking-widest italic opacity-50"><HelpCircle size={14} /> Settlement Guide</h3>
                  <div className="space-y-4 text-[10px] md:text-[11px] text-slate-400 font-mono leading-relaxed">
                    <p className="border-b border-white/5 pb-2">1. All payments are peer-to-peer to admin wallets.</p>
                    <p className="border-b border-white/5 pb-2">2. SOLANA: Transactions are verified via blockhash comparison on Solana Explorer.</p>
                    <p className="border-b border-white/5 pb-2">3. BINANCE: Verification requires cross-checking BEP20 deposit event logs on BscScan.</p>
                    <p>4. PRIVILEGE KEYS are automatically issued upon manual ledger confirmation in the "Verification" tab.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'PAYMENT_VERIFY' && (
            <div className="space-y-6 md:space-y-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 mb-6 md:mb-8">
                <h2 className="text-base md:text-lg font-semibold flex items-center gap-2 w-full md:w-auto"><CheckCircle size={18} className="text-[#22c55e]" /> Payment Verification Terminal</h2>
                <span className="px-3 py-1 bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-[9px] font-black uppercase tracking-widest rounded-full self-start md:self-auto">Secure Auth Active</span>
              </div>

              <div className="bg-[#111] p-4 md:p-8 rounded-2xl border border-[#222]">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 md:mb-10">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input 
                      className="w-full bg-[#050505] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs md:text-sm focus:outline-none focus:border-[#22c55e] transition-colors"
                      placeholder="Input Tx Hash (SOL / BSC)..."
                    />
                  </div>
                  <button className="px-6 py-3 bg-[#22c55e] text-black font-bold rounded-xl hover:scale-105 transition-all text-xs md:text-sm whitespace-nowrap">
                    VERIFY ON LEDGER
                  </button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Pending Transactions</h3>
                  {[
                    { id: '6Xp...8R2', user: 'Sentinel-01', chain: 'Solana', amount: '0.5 SOL', time: '12m ago' },
                    { id: '0x3k...p9a', user: 'Warp-Pilot', chain: 'BSC', amount: '0.1 BNB', time: '5m ago' },
                    { id: '0xabc...123', user: 'Prime-Op', chain: 'BSC', amount: '0.25 BNB', time: '2m ago' }
                  ].map((tx, i) => (
                    <div key={i} className="p-4 md:p-5 bg-[#050505] rounded-xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between group hover:border-[#22c55e]/30 transition-all font-mono gap-4 md:gap-0">
                      <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto justify-between md:justify-start">
                        <div className={`p-2 rounded-lg ${tx.chain === 'Solana' ? 'bg-[#9945FF]/10 text-[#9945FF]' : 'bg-[#f3ba2f]/10 text-[#f3ba2f]'}`}>
                           <p className="text-[9px] font-bold uppercase">{tx.chain}</p>
                        </div>
                        <div className="text-right md:text-left">
                          <p className="text-white text-xs font-bold">{tx.amount} <span className="text-slate-500 text-[10px] md:opacity-0 md:group-hover:opacity-100 transition-opacity">({tx.id})</span></p>
                          <p className="text-[9px] text-slate-600 uppercase tracking-widest">{tx.user} • {tx.time}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 w-full md:w-auto">
                        <button className="flex-1 md:flex-none px-2 py-2 md:py-1.5 bg-blue-500/10 text-blue-500 text-[9px] font-bold uppercase rounded-lg border border-blue-500/20 hover:bg-blue-500 hover:text-white transition-all text-center">View Explorer</button>
                        <button className="flex-1 md:flex-none px-2 py-2 md:py-1.5 bg-[#22c55e]/10 text-[#22c55e] text-[9px] font-bold uppercase rounded-lg border border-[#22c55e]/20 hover:bg-[#22c55e] hover:text-black transition-all text-center">Approve & Issue Key</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#111] p-6 md:p-8 rounded-2xl border border-[#222]">
                <h3 className="text-xs md:text-sm font-bold text-white uppercase italic tracking-tighter mb-6 flex items-center gap-2"><HelpCircle size={16} className="text-[#22c55e]" /> Verification Documentation</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
                   <div className="space-y-4">
                      <h4 className="text-[10px] font-bold text-[#22c55e] uppercase tracking-widest border-b border-[#22c55e]/20 pb-2">Solana Verification (SOL/USDC/USDT)</h4>
                      <ol className="text-[10px] md:text-[11px] text-slate-400 space-y-3 list-decimal pl-4">
                         <li>Open <strong>Solscan</strong> or <strong>Solana Explorer</strong>.</li>
                         <li>Paste the transaction hash from the user's request.</li>
                         <li>Ensure the <strong>Recipient</strong> address matches: <code className="text-[#22c55e] bg-black px-1 break-all">LoRaConVpn...P7yX9wQz</code></li>
                         <li>Confirm the <strong>Status</strong> is "Finalized".</li>
                         <li>Verify the <strong>Amount</strong> matches the requested Protocol Tier.</li>
                      </ol>
                   </div>
                   <div className="space-y-4">
                      <h4 className="text-[10px] font-bold text-[#f3ba2f] uppercase tracking-widest border-b border-[#f3ba2f]/20 pb-2">Binance Verification (BNB/USDT)</h4>
                      <ol className="text-[10px] md:text-[11px] text-slate-400 space-y-3 list-decimal pl-4">
                         <li>Navigate to <strong>BscScan.com</strong>.</li>
                         <li>Search for the provided tx hash or the User's Wallet Address.</li>
                         <li>Check the "Bep-20 Token Transfers" tab if they sent stablecoins.</li>
                         <li>Confirm the destination is: <code className="text-[#f3ba2f] bg-black px-1 break-all">0xLoraConAdmin...Fb32c7</code></li>
                         <li>Identify the "Transaction Action" field for clear amount logs.</li>
                      </ol>
                   </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'USERS' && (
            <div>
              <h2 className="text-base md:text-lg font-semibold mb-6 md:mb-8 flex items-center gap-2"><Users size={18} className="text-[#22c55e]" /> User Directory</h2>
              {isSuperAdmin ? (
                <div className="bg-[#111] rounded-xl border border-[#222] overflow-x-auto">
                    <table className="w-full text-sm text-left min-w-[400px]">
                        <thead className="text-[10px] text-gray-500 uppercase"><tr><th className="px-4 md:px-6 py-4">ID</th><th className="px-4 md:px-6 py-4">Status</th><th className="px-4 md:px-6 py-4">Role</th></tr></thead>
                        <tbody><tr className="border-t border-[#222]"><td className="px-4 md:px-6 py-4">user_001</td><td className="px-4 md:px-6 py-4 text-[#22c55e]">Active</td><td className="px-4 md:px-6 py-4">Admin</td></tr></tbody>
                    </table>
                </div>
              ) : (
                <div className="bg-[#111] rounded-xl border border-[#222] p-6">
                    <p className="text-gray-500 text-sm md:text-base">User management access restricted to SuperAdmin.</p>
                </div>
              )}
            </div>
          )}

            {activeTab === 'SYSTEM' && (
            <div className="space-y-6 md:space-y-8">
              <h2 className="text-base md:text-lg font-semibold mb-6 md:mb-8 flex items-center gap-2"><Terminal size={18} className="text-[#22c55e]" /> Operational Suite</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Real-time Logs</h3>
                  <div className="flex-1 bg-[#050505] p-4 md:p-6 rounded-xl border border-[#222] font-mono text-[9px] md:text-[10px] text-gray-500 min-h-[200px] md:h-64 overflow-y-auto space-y-1">
                    <p>11:05:16 SYSTEM: VARIABLES INJECTED...</p>
                    <p>11:05:17 SYSTEM: FINALIZING STARTUP...</p>
                    <p>11:05:18 SYSTEM: FIRST DEPLOYMENT DETECTED...</p>
                    <p className="text-[#22c55e]">11:05:19 SYSTEM: HELLO, WORLD!</p>
                    <p>12:45:01 NETWORK: ROTATING EPHEMERAL KEYS [Curve25519]</p>
                    <p>12:50:22 PAYMENTS: MONITORING SOLANA_MAINNET...</p>
                    <p className="text-blue-500">12:51:30 PAYMENTS: BSC_SMART_CHAIN HANDSHAKE OK</p>
                  </div>
                </div>

                <div className="space-y-6">
                   <div className="bg-[#111] p-4 md:p-6 rounded-xl border border-[#222]">
                      <h3 className="text-xs font-bold text-[#22c55e] uppercase tracking-widest mb-3">Testing Guide</h3>
                      <ul className="text-[10px] md:text-xs text-slate-400 space-y-3 font-mono">
                         <li className="flex gap-2">
                           <span className="text-[#22c55e]">•</span>
                           <span><strong>Checkout:</strong> Visit Landing &rarr; Plans &rarr; "Secure Subscription" to test Multi-Chain Payment UI.</span>
                         </li>
                         <li className="flex gap-2">
                           <span className="text-[#22c55e]">•</span>
                           <span><strong>Admin Wallet:</strong> Use the button at the top of Billing tab to simulate Phantom connection.</span>
                         </li>
                         <li className="flex gap-2">
                           <span className="text-[#22c55e]">•</span>
                           <span><strong>Wishlist:</strong> Test "Add to Wishlist" on plans. Requests are logged for developer review.</span>
                         </li>
                         <li className="flex gap-2">
                           <span className="text-[#22c55e]">•</span>
                           <span><strong>VPN Simulation:</strong> Check the "Live Demo" on Landing Page for handshake visuals.</span>
                         </li>
                      </ul>
                   </div>
                   
                   <div className="bg-[#111] p-4 md:p-6 rounded-xl border border-[#222]">
                      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Security Note</h3>
                      <p className="text-[9px] md:text-[10px] text-slate-500 leading-relaxed font-mono italic">
                        Access to actual VPN encryption keys and user traffic data is strictly restricted to secure cluster nodes. The Admin Panel only handles orchestration and billing oversight.
                      </p>
                   </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'SETTINGS' && (
            <div>
              <h2 className="text-base md:text-lg font-semibold mb-6 md:mb-8 flex items-center gap-2"><Cog size={18} className="text-[#22c55e]" /> System Settings</h2>
              <div className="bg-[#111] p-4 md:p-6 rounded-xl border border-[#222] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                <div>
                  <h4 className="font-bold text-sm md:text-base">Auto-Connect on Startup</h4>
                  <p className="text-xs md:text-sm text-gray-500">Automatically establish VPN connection on app launch.</p>
                </div>
                <button 
                  onClick={() => setAutoConnect(!autoConnect)}
                  className={`w-14 h-8 rounded-full transition-colors self-end sm:self-center shrink-0 ${autoConnect ? 'bg-[#22c55e]' : 'bg-[#222]'}`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full transition-transform ${autoConnect ? 'translate-x-7' : 'translate-x-1'}`}></div>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}


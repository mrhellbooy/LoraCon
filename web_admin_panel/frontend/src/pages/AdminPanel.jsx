import React, { useState, useEffect } from 'react';
import { 
  Shield, Activity, Server, Sliders, Monitor, Cpu, ChevronRight, CreditCard, Users, Terminal, RefreshCw, Cog
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import NodeMap from '../components/NodeMap';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-6 py-4 transition-all duration-300 font-medium ${
      active ? 'bg-[#1a1a1a] text-green-500 border-r-2 border-green-500' : 'text-gray-500 hover:text-white hover:bg-[#0d0d0d]'
    }`}
  >
    <Icon size={20} />
    {label}
  </button>
);

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('FLOW');
  const [protocol, setProtocol] = useState('WireGuard');
  const [autoConnect, setAutoConnect] = useState(() => {
    return localStorage.getItem('autoConnect') === 'true';
  });

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
    cryptoSolAddress: "...", 
    cryptoUsdtAddress: "...", 
    priceStandardSol: 0, 
    pricePremiumSol: 0 
  });
  
  const [nodes, setNodes] = useState([]);
  const [sessions, setSessions] = useState([]);

  const fetchData = async () => {
    setIsRefreshing(true);
    try {
      const [configRes, sessionRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/admin/config`).then(r => r.json()),
        fetch(`${API_BASE_URL}/api/admin/sessions`).then(r => r.json())
      ]);
      
      if (configRes.success) {
        setConfig(configRes.config);
        setNodes(configRes.nodes);
      }
      if (sessionRes.success) {
        setSessions(sessionRes.sessions);
      }
    } catch (error) {
      console.error("Failed to fetch admin data:", error);
    } finally {
      setIsRefreshing(false);
    }
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
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/config/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      const data = await response.json();
      if (data.success) {
        alert("Configuration deployed successfully!");
      } else {
        alert("Failed to deploy: " + data.message);
      }
    } catch (error) {
      console.error("Deploy failed:", error);
      alert("Deployment failed.");
    } finally {
      setIsRefreshing(false);
    }
  };
  const [bandwidthData, setBandwidthData] = useState(
      Array.from({ length: 20 }, (_, i) => ({ time: i, value: Math.random() * 50 }))
  );

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
    { id: 'USERS', label: 'User Directory', icon: Users },
    { id: 'SYSTEM', label: 'System Logs', icon: Terminal },
    { id: 'SETTINGS', label: 'Settings', icon: Cog }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#F1F5F9] flex selection:bg-green-500/20">
      <aside className="w-64 border-r border-[#1a1a1a] flex flex-col pt-10">
        <div className="px-8 mb-12 flex items-center gap-3">
            <Shield className="text-green-500" size={28} />
            <span className="font-bold text-xl tracking-tight">LoraCon</span>
            <span className="text-[10px] bg-[#111] px-2 py-0.5 rounded text-gray-500">{role}</span>
        </div>
        <nav className="flex-1">
          {tabs.map((tab) => (
            <SidebarItem key={tab.id} {...tab} active={activeTab === tab.id} onClick={() => setActiveTab(tab.id)} />
          ))}
        </nav>
        <div className="px-8 pb-10">
            <div className="bg-gradient-to-br from-green-900/20 to-black p-4 rounded-xl border border-green-900/50">
                <p className="text-xs text-green-500 font-mono mb-1">SYSTEM STATUS</p>
                <p className="text-sm font-bold">ALL RELAYS ACTIVE</p>
            </div>
        </div>
      </aside>

      <main className="flex-1 p-12">
        <header className="mb-12 flex justify-between items-end">
            <div>
                <h1 className="text-3xl font-bold mb-2">Control Plane</h1>
                <p className="text-gray-500 font-light">Infrastructure oversight for Lorapok network.</p>
            </div>
            <div className="flex gap-2">
                <button 
                  onClick={handleRefresh}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#111] border border-[#222] hover:bg-[#1a1a1a] transition ${isRefreshing ? 'opacity-80' : ''}`}
                >
                  <motion.div
                    animate={{ rotate: isRefreshing ? 360 : 0 }}
                    transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0, ease: "linear" }}
                  >
                    <RefreshCw size={16} />
                  </motion.div>
                  {isRefreshing ? 'Syncing...' : 'Refresh'}
                </button>
                {isSuperAdmin && (
                  <>
                    <button className="px-5 py-2.5 rounded-lg bg-[#111] border border-[#222] hover:bg-[#1a1a1a] transition">System Logs</button>
                    <button onClick={handleDeployConfig} className="px-5 py-2.5 rounded-lg bg-green-500 text-black font-bold hover:bg-green-400 transition">Deploy Changes</button>
                  </>
                )}
            </div>
        </header>

        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={activeTab}
            className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-8"
        >
          {activeTab === 'FLOW' && (
            <div>
              <h2 className="text-lg font-semibold mb-8 flex items-center gap-2"><Sliders size={18} className="text-green-500" /> Infrastructure Config</h2>
              
              <div className="bg-[#111] p-6 rounded-xl border border-[#222] mb-6">
                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-4 block">Active VPN Protocol</label>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setProtocol('WireGuard')}
                        className={`px-6 py-2.5 rounded-lg font-bold transition ${protocol === 'WireGuard' ? 'bg-green-500 text-black' : 'bg-[#222] text-white hover:bg-[#333]'}`}
                    >WireGuard</button>
                    <button 
                        onClick={() => setProtocol('OpenVPN')}
                        className={`px-6 py-2.5 rounded-lg font-bold transition ${protocol === 'OpenVPN' ? 'bg-green-500 text-black' : 'bg-[#222] text-white hover:bg-[#333]'}`}
                    >OpenVPN</button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {Object.entries(config).map(([key, val]) => (
                  <div key={key} className="bg-[#111] p-5 rounded-xl border border-[#222]">
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2 block">{key}</label>
                    <input 
                        className="w-full bg-transparent text-lg font-mono outline-none" 
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
                <h2 className="text-lg font-semibold mb-8 flex items-center gap-2"><Server size={18} className="text-green-500" /> Node Cluster</h2>
                <div className="space-y-4">
                    {nodes.map(node => (
                    <div key={node.id} className="flex items-center justify-between p-5 bg-[#111] rounded-xl border border-[#222]">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-[#050505] rounded-lg border border-[#222]"><Cpu size={20} className="text-gray-500" /></div>
                            <div>
                                <h4 className="font-bold">{node.name}</h4>
                                <p className={`text-xs ${node.isActive ? 'text-green-500' : 'text-gray-500'}`}>{node.isActive ? 'Active' : 'Inactive'}</p>
                            </div>
                        </div>
                        <div className="w-48 h-2 bg-gray-900 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: `${node.loadPercentage}%` }}></div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
          )}

          {activeTab === 'MONITOR' && (
            <div>
              <h2 className="text-lg font-semibold mb-8 flex items-center gap-2"><Activity size={18} className="text-green-500" /> Live Telemetry</h2>
              <div className="bg-[#111] p-6 rounded-xl border border-[#222] mb-8 h-64">
                <NodeMap nodes={nodes} />
              </div>
              <div className="bg-[#111] p-6 rounded-xl border border-[#222] mb-8 h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={bandwidthData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                        <XAxis dataKey="time" hide />
                        <YAxis stroke="#444" fontSize={12} />
                        <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #222' }} />
                        <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="grid gap-3">
                {sessions.map(s => (
                  <div key={s.id} className="p-5 bg-[#111] rounded-xl border border-[#222] flex justify-between font-mono text-sm items-center">
                    <span className="text-gray-300 font-bold">{s.user}</span>
                    <span className="text-green-500 bg-green-900/20 px-3 py-1 rounded-full text-xs">{s.connectionTime}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'BILLING' && (
            <div>
              <h2 className="text-lg font-semibold mb-8 flex items-center gap-2"><CreditCard size={18} className="text-green-500" /> Financial Overview</h2>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-[#111] p-6 rounded-xl border border-[#222]">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Monthly Revenue</p>
                  <p className="text-2xl font-bold">$12,450.00</p>
                </div>
                <div className="bg-[#111] p-6 rounded-xl border border-[#222]">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Provider Costs</p>
                  <p className="text-2xl font-bold text-orange-500">$4,200.00</p>
                </div>
                <div className="bg-[#111] p-6 rounded-xl border border-[#222]">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Profit Margin</p>
                  <p className="text-2xl font-bold text-green-500">66.2%</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'USERS' && (
            <div>
              <h2 className="text-lg font-semibold mb-8 flex items-center gap-2"><Users size={18} className="text-green-500" /> User Directory</h2>
              {isSuperAdmin ? (
                <div className="bg-[#111] rounded-xl border border-[#222] overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="text-[10px] text-gray-500 uppercase"><tr><th className="px-6 py-4">ID</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Role</th></tr></thead>
                        <tbody><tr className="border-t border-[#222]"><td className="px-6 py-4">user_001</td><td className="px-6 py-4 text-green-500">Active</td><td className="px-6 py-4">Admin</td></tr></tbody>
                    </table>
                </div>
              ) : (
                <div className="bg-[#111] rounded-xl border border-[#222] p-6">
                    <p className="text-gray-500">User management access restricted to SuperAdmin.</p>
                </div>
              )}
            </div>
          )}

            {activeTab === 'SYSTEM' && (
            <div>
              <h2 className="text-lg font-semibold mb-8 flex items-center gap-2"><Terminal size={18} className="text-green-500" /> System Logs</h2>
              <div className="bg-[#050505] p-6 rounded-xl border border-[#222] font-mono text-xs text-gray-400 h-64 overflow-y-auto">
                <p>11:05:16 SYSTEM: VARIABLES INJECTED...</p>
                <p>11:05:17 SYSTEM: FINALIZING STARTUP...</p>
                <p>11:05:18 SYSTEM: FIRST DEPLOYMENT DETECTED...</p>
                <p className="text-green-500">11:05:19 SYSTEM: HELLO, WORLD!</p>
              </div>
            </div>
          )}
          
          {activeTab === 'SETTINGS' && (
            <div>
              <h2 className="text-lg font-semibold mb-8 flex items-center gap-2"><Cog size={18} className="text-green-500" /> System Settings</h2>
              <div className="bg-[#111] p-6 rounded-xl border border-[#222] flex justify-between items-center">
                <div>
                  <h4 className="font-bold">Auto-Connect on Startup</h4>
                  <p className="text-sm text-gray-500">Automatically establish VPN connection on app launch.</p>
                </div>
                <button 
                  onClick={() => setAutoConnect(!autoConnect)}
                  className={`w-14 h-8 rounded-full transition-colors ${autoConnect ? 'bg-green-500' : 'bg-[#222]'}`}
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

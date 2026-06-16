import React, { useState, useEffect } from 'react';
import { 
  Shield, Activity, Server, Key, RefreshCw, Sliders, Plus, Trash2, User, Cpu, ChevronRight, Monitor
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('FLOW');
  const [config, setConfig] = useState({ 
    freeBandwidthLimit: 0, 
    freeDailyQuotaLimit: 0, 
    activeApiProvider: "Loading...", 
    cryptoSolAddress: "...", 
    cryptoUsdtAddress: "...", 
    priceStandardSol: 0, 
    pricePremiumSol: 0 
  });
  const [nodes, setNodes] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [configRes, sessionsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/admin/config`),
          fetch(`${API_BASE_URL}/api/admin/sessions`)
        ]);
        const configData = await configRes.json();
        const sessionsData = await sessionsRes.json();
        
        if (configData.success) setConfig(configData.config);
        if (sessionsData.success) setSessions(sessionsData.sessions);
        // Assuming nodes are part of config or another endpoint
        if (configData.nodes) setNodes(configData.nodes);
        
      } catch (err) {
        console.error("Failed to fetch admin data", err);
      }
    };
    fetchData();
  }, []);

  const tabs = [
    { id: 'FLOW', label: 'Flow Control', icon: Sliders },
    { id: 'SERVERS', label: 'Node Cluster', icon: Server },
    { id: 'MONITOR', label: 'Telemetry', icon: Monitor }
  ];

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto text-[#F1F5F9]">
      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-2">System Administration</h1>
        <p className="text-gray-400">Real-time oversight of the LoraCon infrastructure.</p>
      </header>

      <div className="flex flex-wrap gap-4 mb-8">
        {tabs.map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition ${activeTab === tab.id ? 'bg-green-500 text-black' : 'bg-[#0D0D0D] border border-[#222] hover:border-gray-600'}`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0D0D0D] border border-[#1A1A1A] rounded-2xl p-8"
      >
        <AnimatePresence mode="wait">
          {activeTab === 'FLOW' && (
            <motion.div key="flow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Sliders className="text-green-500" /> Infrastructure Config</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(config).map(([key, val]) => (
                  <div key={key} className="bg-[#1A1A1A] p-4 rounded-lg border border-[#222]">
                    <label className="text-xs text-gray-500 uppercase tracking-wider">{key}</label>
                    <input className="w-full bg-transparent text-lg font-mono py-1 border-b border-gray-700 outline-none focus:border-green-500" defaultValue={val} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'SERVERS' && (
            <motion.div key="nodes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2"><Server className="text-green-500" /> Active Nodes</h2>
                <button className="bg-green-500 text-black px-4 py-2 rounded font-bold flex items-center gap-2">+ Add Node</button>
              </div>
              <div className="space-y-4">
                {nodes.map(node => (
                  <div key={node.id} className="flex items-center justify-between p-4 bg-[#1A1A1A] rounded-lg border border-[#222]">
                    <div>
                      <h4 className="font-bold">{node.location}</h4>
                      <p className={`text-xs ${node.status === 'Active' ? 'text-green-500' : 'text-orange-500'}`}>{node.status}</p>
                    </div>
                    <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: `${node.load}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'MONITOR' && (
            <motion.div key="monitor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Activity className="text-green-500" /> Active Sessions</h2>
              <div className="space-y-2">
                {sessions.map(s => (
                  <div key={s.id} className="p-4 bg-[#1A1A1A] rounded flex justify-between font-mono text-sm">
                    <span>{s.user} ({s.id})</span>
                    <span className="text-gray-400">{s.connectionTime}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

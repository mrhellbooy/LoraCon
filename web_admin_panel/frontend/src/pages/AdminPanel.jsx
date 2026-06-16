import React, { useState, useEffect } from 'react';
import { 
  Shield, Activity, Server, Sliders, Monitor, Cpu, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const role = sessionStorage.getItem('role');
  const isSuperAdmin = role === 'SUPERADMIN';
  const [config, setConfig] = useState({ 
    freeBandwidthLimit: 50, 
    freeDailyQuotaLimit: 500, 
    activeApiProvider: "Grok AI API", 
    cryptoSolAddress: "9s...A1", 
    cryptoUsdtAddress: "3k...B2", 
    priceStandardSol: 0.15, 
    pricePremiumSol: 0.35 
  });
  const [nodes, setNodes] = useState([{ id: 1, location: 'Singapore-01', load: 45, status: 'Active' },
    { id: 2, location: 'Tokyo-04', load: 78, status: 'Warning' },
    { id: 3, location: 'US-West-09', load: 12, status: 'Active' }]);
  const [sessions, setSessions] = useState([{ id: 'usr_889', user: 'agent_x', connectionTime: '2h 15m' },
    { id: 'usr_991', user: 'node_7', connectionTime: '45m' }]);

  const tabs = [
    { id: 'FLOW', label: 'Flow Control', icon: Sliders },
    { id: 'SERVERS', label: 'Node Cluster', icon: Server },
    { id: 'MONITOR', label: 'Telemetry', icon: Monitor }
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
            {isSuperAdmin && (
              <div className="flex gap-2">
                  <button className="px-5 py-2.5 rounded-lg bg-[#111] border border-[#222] hover:bg-[#1a1a1a] transition">System Logs</button>
                  <button className="px-5 py-2.5 rounded-lg bg-green-500 text-black font-bold hover:bg-green-400 transition">Deploy Changes</button>
              </div>
            )}
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
              <div className="grid grid-cols-2 gap-6">
                {Object.entries(config).map(([key, val]) => (
                  <div key={key} className="bg-[#111] p-5 rounded-xl border border-[#222]">
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2 block">{key}</label>
                    <input className="w-full bg-transparent text-lg font-mono outline-none" defaultValue={val} readOnly={!isSuperAdmin} />
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
                                <h4 className="font-bold">{node.location}</h4>
                                <p className={`text-xs ${node.status === 'Active' ? 'text-green-500' : 'text-orange-500'}`}>{node.status}</p>
                            </div>
                        </div>
                        <div className="w-48 h-2 bg-gray-900 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: `${node.load}%` }}></div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
          )}

          {activeTab === 'MONITOR' && (
            <div>
              <h2 className="text-lg font-semibold mb-8 flex items-center gap-2"><Activity size={18} className="text-green-500" /> Live Telemetry</h2>
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
        </motion.div>
      </main>
    </div>
  );
}

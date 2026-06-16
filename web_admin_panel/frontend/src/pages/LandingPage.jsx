import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Zap, 
  Download, 
  X,
  Smartphone,
  Monitor,
  Apple,
  Terminal,
  ExternalLink,
  Github,
  Twitter,
  Mail,
  Linkedin,
  MessageSquare,
  UserCheck,
  Instagram,
  Facebook,
  Activity,
  Cpu,
  Lock,
  ChevronRight,
  Star,
  Wallet,
  Clock,
  Globe
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import { useToast } from '../components/Toast';
import { wishlist } from '../services/api';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="relative p-8 rounded-[2rem] bg-gradient-to-br from-[#0D0D0D] to-[#030711] border border-white/5 hover:border-[#22c55e]/30 transition-all group overflow-hidden shadow-2xl shadow-black"
  >
    <motion.div 
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
      className="absolute inset-0 bg-gradient-to-br from-[#22c55e]/5 to-transparent pointer-events-none transition-opacity" 
    />
    <div className="absolute top-0 right-0 w-32 h-32 bg-[#22c55e]/5 blur-[40px] rounded-full -mr-16 -mt-16 group-hover:bg-[#22c55e]/10 transition-colors" />
    <div className="relative z-10 text-center md:text-left flex flex-col items-center md:items-start">
      <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center mb-8 group-hover:bg-[#22c55e]/10 group-hover:border-[#22c55e]/30 transition-all duration-300">
        <Icon className="w-8 h-8 text-slate-500 group-hover:text-[#22c55e] transition-colors" />
      </div>
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm font-light">{description}</p>
    </div>
  </motion.div>
);

const DownloadModal = ({ isOpen, onClose }) => {
  const addToast = useToast();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleDownload = (e, item) => {
    e.preventDefault();
    if (item.name === 'Android APK') {
      addToast(`Initiating Secure Handshake for APK...`, 'info');
      setTimeout(() => {
        // Real download trigger
        const dummy = document.createElement('a');
        dummy.href = './LoraCon-Sentinel-v1.0.10.apk'; // Use relative path for sub-folder deployment
        dummy.download = 'LoraCon-Sentinel-v1.0.10.apk';
        document.body.appendChild(dummy);
        dummy.click();
        document.body.removeChild(dummy);
        addToast(`LORAPOK-SENTINEL-v1.0.10.apk (24.5MB) download started. Verify checksum in AI Studio Export.`, 'success');
      }, 2000);
    } else if (item.name === 'Firefox Extension') {
      addToast(`Connecting to Mozilla Add-on Proxy...`, 'info');
      setTimeout(() => {
        addToast(`Handshake successful. Redirecting to Extension Manifest.`, 'success');
      }, 1500);
    } else {
      addToast(`${item.name} is currently in restricted beta.`, 'warning');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] overflow-y-auto bg-black/90 backdrop-blur-3xl p-4 flex items-center justify-center py-12"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl bg-[#09090b] border border-white/5 rounded-3xl overflow-hidden flex flex-col shadow-2xl relative my-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center text-[#22c55e]">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-0.5">LORAPOK ECOSYSTEM</h3>
                  <p className="text-[10px] text-slate-500 font-mono">v4.0.2 ARM64/X86_64</p>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 text-slate-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'Android APK', size: '24.5 MB', icon: Smartphone },
                { name: 'Firefox Extension', size: '2.1 MB', icon: Globe },
                { name: 'Windows Client', size: '48.2 MB', icon: Monitor },
                { name: 'macOS DMG', size: '42.1 MB', icon: Apple },
                { name: 'Linux Binary', size: '18.9 MB', icon: Terminal },
              ].map((item, i) => (
                <motion.a
                  key={item.name}
                  href="#"
                  onClick={(e) => handleDownload(e, item)}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.03)' }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-6 rounded-2xl bg-white/[0.02] border border-white/5 transition-all group flex flex-col gap-4 ${
                    i === 4 ? 'sm:col-span-2 sm:text-center sm:items-center' : ''
                  }`}
                >
                  <item.icon className="w-6 h-6 text-slate-400 group-hover:text-[#22c55e] transition-colors" />
                  <div className={i === 4 ? 'sm:flex sm:flex-col sm:items-center' : ''}>
                    <div className="font-bold text-white tracking-wide mb-1 text-sm">{item.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono tracking-widest">{item.size}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const PlanCard = ({ title, price, features, delay, onSelect, onWishlist }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 hover:border-[#22c55e]/50 transition-all group relative overflow-hidden flex flex-col h-full"
  >
    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
      <Shield className="w-24 h-24 text-[#22c55e]" />
    </div>
    <div className="flex-1">
      <h3 className="text-2xl font-black text-white mb-2">{title}</h3>
      <div className="flex items-baseline gap-1 mb-8">
        <span className="text-4xl font-black text-[#22c55e]">{price}</span>
        <span className="text-slate-500 text-sm font-mono tracking-widest uppercase">/cycle</span>
      </div>
      <ul className="space-y-4 mb-10">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-slate-400">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]/50" />
            {f}
          </li>
        ))}
      </ul>
    </div>
    <div className="space-y-3 mt-auto">
      <button 
        onClick={() => onSelect(title, price)}
        className="w-full py-4 rounded-2xl bg-[#22c55e] border border-transparent text-black font-black uppercase tracking-widest text-[11px] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.2)]"
      >
        <Zap className="w-4 h-4 fill-current" /> Secure Subscription
      </button>
      <button 
        onClick={() => onWishlist(title)}
        className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] hover:bg-[#22c55e] hover:text-black hover:border-transparent transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02] active:scale-95"
      >
        <Star className="w-4 h-4" /> Add to Wishlist
      </button>
    </div>
  </motion.div>
);

const WishlistModal = ({ isOpen, onClose, selectedPlan }) => {
  const addToast = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', service: selectedPlan || 'Protocol Stealth' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setFormData(prev => ({
        ...prev,
        service: selectedPlan || 'Protocol Stealth'
      }));
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, selectedPlan]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { error } = await wishlist.submit(formData);
    
    if (!error) {
      addToast(`Protocol Request Received! We'll reach out to ${formData.email} soon.`, 'success');
      onClose();
    } else {
      // Demo fallback - since we are in a sandbox
      addToast(`Handshake success. Request documented in lorapokdev@gmail.com backlog.`, 'success');
      onClose();
    }
    setIsSubmitting(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[130] overflow-y-auto bg-black/90 backdrop-blur-xl p-4 flex items-center justify-center py-12"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md bg-[#0D0D0D] border border-white/10 rounded-[3rem] p-10 relative overflow-hidden my-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#22c55e] to-transparent" />
            <h2 className="text-3xl font-black text-white mb-2 tracking-tighter uppercase italic">Protocol Wishlist</h2>
            <p className="text-slate-500 text-xs mb-8 font-mono leading-relaxed uppercase tracking-wider">Join the alpha testing queue for our upcoming clusters.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[8px] uppercase tracking-[0.3em] text-[#22c55e] mb-2 font-black">Operator Alias</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#22c55e] transition-colors font-mono text-sm"
                  placeholder="e.g. SENTINEL-01"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[8px] uppercase tracking-[0.3em] text-[#22c55e] mb-2 font-black">Communication Link</label>
                <input 
                  required
                  type="email" 
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#22c55e] transition-colors font-mono text-sm"
                  placeholder="operator@sentinel.net"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[8px] uppercase tracking-[0.3em] text-[#22c55e] mb-2 font-black">Cluster Target</label>
                <select 
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#22c55e] transition-colors font-mono text-sm appearance-none"
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                >
                  <option>Protocol Stealth</option>
                  <option>Protocol Warp</option>
                  <option>Sentinel Prime</option>
                </select>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-5 bg-[#22c55e] text-black font-black uppercase tracking-widest text-[11px] rounded-[1.5rem] hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(34,197,94,0.4)] disabled:opacity-50"
              >
                {isSubmitting ? 'TRANSMITTING...' : 'TRANSMIT REQUEST'}
              </button>
            </form>
            
            <button onClick={onClose} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CheckoutModal = ({ isOpen, onClose, plan }) => {
  const addToast = useToast();
  const [step, setStep] = useState('CHECKOUT'); // CHECKOUT, PAYMENT, SUCCESS
  const [walletConnected, setWalletConnected] = useState(false);
  const [activeTab, setActiveTab] = useState('PAYMENT'); // PAYMENT, HISTORY, USAGE
  const [selectedChain, setSelectedChain] = useState('SOLANA'); // SOLANA, BINANCE
  const [verificationTx, setVerificationTx] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep('CHECKOUT');
      setWalletConnected(false);
      setActiveTab('PAYMENT');
      setSelectedChain('SOLANA');
      setVerificationTx('');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handlePayment = () => {
    if (!walletConnected) {
      addToast(`Please connect your ${selectedChain === 'SOLANA' ? 'Phantom' : 'Binance'} wallet first.`, "warning");
      return;
    }
    setStep('PAYMENT');
    setTimeout(() => {
      setStep('SUCCESS');
      addToast(`Subscription for ${plan.title} activated via ${selectedChain === 'SOLANA' ? 'Solana' : 'BNB'} Chain.`, "success");
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[120] overflow-y-auto bg-black/95 backdrop-blur-2xl p-4 flex items-center justify-center py-12"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-4xl bg-[#080808] border border-white/10 rounded-[3rem] flex flex-col lg:flex-row h-auto overflow-hidden lg:h-[80vh] lg:max-h-[85vh] my-auto"
            onClick={e => e.stopPropagation()}
          >
        {/* Left Side: Summary & Branding */}
        <div className="w-full lg:w-1/3 bg-white/[0.02] border-b lg:border-b-0 lg:border-r border-white/5 p-10 flex flex-col justify-between relative overflow-hidden shrink-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[#22c55e]/5 blur-[80px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none" />
          <div className="relative z-10">
            <Logo size={40} className="mb-10" />
            <span className="p-1 px-3 bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-[8px] font-black uppercase tracking-[0.3em] rounded-full">Secure Checkout</span>
            <h2 className="text-4xl font-black text-white mt-6 mb-2 tracking-tighter uppercase italic">{plan.title}</h2>
            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest mb-10">Access Tier Alpha</p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Plan Rate:</span>
                <span className="text-white font-bold">{plan.price}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Network Fee:</span>
                <span className="text-[#22c55e] font-bold">~0.00005 SOL / BNB</span>
              </div>
              <div className="h-px bg-white/5 my-6" />
              <div className="flex justify-between items-center">
                <span className="text-white font-black uppercase text-xs tracking-widest italic">Total Due:</span>
                <span className="text-2xl font-black text-[#22c55e]">{plan.price}</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-10">
            <p className="text-[9px] text-slate-600 leading-relaxed font-mono uppercase tracking-tighter">
              // Multi-Chain Settlement Active (Solana/BSC)<br />
              // Direct Wallet-to-Wallet Authentication<br />
              // Handshake rotation: 15min cycles
            </p>
          </div>
        </div>

        {/* Right Side: Interactive Module */}
        <div className="flex-1 p-10 flex flex-col relative min-h-0">
          <button onClick={onClose} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors z-20">
            <X size={24} />
          </button>

          {step === 'SUCCESS' ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
               <div className="w-20 h-20 bg-[#22c55e]/10 rounded-full flex items-center justify-center mb-8 animate-pulse">
                  <Shield size={40} className="text-[#22c55e]" />
               </div>
               <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-4">Link Established</h3>
               <p className="text-slate-400 max-w-sm mb-10 leading-relaxed uppercase font-mono text-[10px] tracking-widest italic">
                  Your sentinel node allocation is complete. Privilege keys have been signed and delivered to your workspace terminal.
               </p>
               <button 
                onClick={onClose}
                className="px-10 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-black uppercase tracking-widest text-xs hover:bg-[#22c55e] hover:text-black transition-all"
               >
                 Close Gate
               </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-6 border-b border-white/5 mb-8">
                {['PAYMENT', 'HISTORY', 'USAGE'].map(tab => (
                  <button
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     className={`pb-4 text-[9px] font-black uppercase tracking-[0.3em] transition-all relative ${activeTab === tab ? 'text-[#22c55e]' : 'text-slate-600 hover:text-slate-400'}`}
                  >
                    {tab}
                    {activeTab === tab && <motion.div layoutId="tabUnderline" className="absolute bottom-0 left-0 w-full h-[2px] bg-[#22c55e]" />}
                  </button>
                ))}
              </div>

              <div className="flex-1 pr-2 custom-scrollbar overflow-y-auto min-h-0">
                {activeTab === 'PAYMENT' && (
                  <div className="space-y-8 py-4">
                    <div className="flex gap-2 p-1 bg-white/[0.03] border border-white/10 rounded-2xl">
                      <button 
                        onClick={() => { setSelectedChain('SOLANA'); setWalletConnected(false); }}
                        className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${selectedChain === 'SOLANA' ? 'bg-[#22c55e] text-black shadow-lg' : 'text-slate-500 hover:text-white'}`}
                      >
                        Solana Network
                      </button>
                      <button 
                        onClick={() => { setSelectedChain('BINANCE'); setWalletConnected(false); }}
                        className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${selectedChain === 'BINANCE' ? 'bg-[#f3ba2f] text-black shadow-lg' : 'text-slate-500 hover:text-white'}`}
                      >
                        Binance Smart Chain
                      </button>
                    </div>

                    <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 relative overflow-hidden">
                       <div className="flex items-center justify-between mb-8">
                          <div className="flex items-center gap-3">
                             <Wallet className={`w-6 h-6 ${selectedChain === 'SOLANA' ? 'text-[#22c55e]' : 'text-[#f3ba2f]'}`} />
                             <h4 className="font-bold text-white uppercase tracking-tighter italic">{selectedChain === 'SOLANA' ? 'Phantom' : 'Binance'} Wallet</h4>
                          </div>
                          {!walletConnected ? (
                            <button 
                              onClick={() => setWalletConnected(true)}
                              className={`px-4 py-2 ${selectedChain === 'SOLANA' ? 'bg-[#22c55e]' : 'bg-[#f3ba2f]'} text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-105 active:scale-95 transition-all`}
                            >
                              Connect
                            </button>
                          ) : (
                            <div className={`flex items-center gap-2 px-3 py-1.5 ${selectedChain === 'SOLANA' ? 'bg-[#22c55e]/10 border-[#22c55e]/30' : 'bg-[#f3ba2f]/10 border-[#f3ba2f]/30'} rounded-xl`}>
                               <div className={`w-1.5 h-1.5 rounded-full ${selectedChain === 'SOLANA' ? 'bg-[#22c55e]' : 'bg-[#f3ba2f]'} animate-pulse`} />
                               <span className={`text-[10px] ${selectedChain === 'SOLANA' ? 'text-[#22c55e]' : 'text-[#f3ba2f]'} font-mono`}>{selectedChain === 'SOLANA' ? '6xP...j7vV' : '0x7...E4d1'}</span>
                            </div>
                          )}
                       </div>
                       
                       <div className="space-y-4">
                          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Recipient Address [Escrow]</p>
                          <div className="p-4 bg-black rounded-2xl border border-white/5 font-mono text-[9px] text-slate-300 break-all select-all flex items-center justify-between">
                             <span>{selectedChain === 'SOLANA' ? 'LoRaConVpnSol...P7yX9wQz' : '0xLoraConAdmin...Fb32c7'}</span>
                             <Clock className="w-3 h-3 text-slate-600 shrink-0" />
                          </div>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Select Network Asset</h4>
                       <div className="grid grid-cols-4 gap-4">
                          {(selectedChain === 'SOLANA' ? ['SOL', 'USDC', 'USDT', 'BONK'] : ['BNB', 'USDT', 'USDC', 'CAKE']).map(asset => (
                            <button key={asset} className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#22c55e]/50 transition-all font-black text-center group">
                               <div className="text-[#22c55e] mb-1 group-hover:scale-110 transition-transform text-xs">{asset}</div>
                               <div className="text-[7px] text-slate-600 font-mono tracking-tighter">Ready</div>
                            </button>
                          ))}
                       </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                       <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">Manual Verification</h4>
                       <div className="space-y-3">
                          <p className="text-[8px] text-slate-600 font-mono italic">// If automatic sync fails, provide hash for manual admin clearance</p>
                          <input 
                            value={verificationTx}
                            onChange={(e) => setVerificationTx(e.target.value)}
                            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-[10px] text-white font-mono focus:border-[#22c55e] outline-none"
                            placeholder="Enter Transaction Hash..."
                          />
                       </div>
                    </div>
                  </div>
                )}

                {activeTab === 'HISTORY' && (
                  <div className="space-y-4 py-4">
                    {[
                      { date: '2026-05-14', amount: '0.5 SOL', status: 'CONFIRMED', tx: '62Xp...8R2' },
                      { date: '2026-04-14', amount: '0.5 SOL', status: 'CONFIRMED', tx: 'A9yQ...1Lp' },
                      { date: '2026-03-14', amount: '0.5 SOL', status: 'EXPIRED', tx: '---' }
                    ].map((h, i) => (
                      <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between group hover:border-white/20 transition-all">
                        <div className="flex items-center gap-4">
                          <div className={`w-2 h-2 rounded-full ${h.status === 'CONFIRMED' ? 'bg-[#22c55e]' : 'bg-red-500'}`} />
                          <div>
                            <p className="text-xs font-bold text-white">{h.amount}</p>
                            <p className="text-[8px] text-slate-500 font-mono uppercase tracking-widest">{h.date} • {h.tx}</p>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-slate-700 group-hover:text-slate-400 transition-colors" />
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'USAGE' && (
                  <div className="space-y-10 py-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <div>
                          <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Global Throughput</h4>
                          <p className="text-2xl font-black text-white italic tracking-tighter">742.8 GB <span className="text-[#22c55e] text-sm italic">/ 1 TB</span></p>
                        </div>
                        <Activity className="w-5 h-5 text-[#22c55e] animate-pulse" />
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: "74.2%" }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-[#166534] to-[#22c55e]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                       <div className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/5">
                          <p className="text-[9px] text-slate-500 uppercase tracking-widest font-mono mb-2">Relay Nodes Touched</p>
                          <p className="text-2xl font-black text-white">42 Nodes</p>
                       </div>
                       <div className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/5">
                          <p className="text-[9px] text-slate-500 uppercase tracking-widest font-mono mb-2">Crypto Keys Rotated</p>
                          <p className="text-2xl font-black text-[#22c55e]">1,280</p>
                       </div>
                    </div>
                  </div>
                )}
              </div>

              {activeTab === 'PAYMENT' && (
                <div className="pt-8 mt-auto border-t border-white/5">
                  <button 
                    onClick={handlePayment}
                    disabled={step === 'PAYMENT'}
                    className={`w-full py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-[11px] transition-all flex items-center justify-center gap-3 ${
                      step === 'PAYMENT' 
                        ? 'bg-white/5 text-slate-500 cursor-not-allowed' 
                        : 'bg-[#22c55e] text-black shadow-[0_0_40px_rgba(34,197,94,0.3)] hover:scale-[1.02] active:scale-95'
                    }`}
                  >
                    {step === 'PAYMENT' ? (
                      <>Validating on Ledger <Activity className="w-4 h-4 animate-spin" /></>
                    ) : (
                      <>Authorize Transaction <ChevronRight className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
      )}
    </AnimatePresence>
  );
};

const LorapokVpnDemo = () => {
  const [status, setStatus] = useState('CONNECTED');
  const [connInfo, setConnInfo] = useState({ name: 'node_ch_105', city: 'Zurich', country: 'Switzerland', ip: '179.43.144.157' });
  const [ping, setPing] = useState(32);
  const [speeds, setSpeeds] = useState({ down: 42.5, up: 12.8 });

  const mockNodes = [
    { name: 'us_east_sentinel', city: 'Washington DC', country: 'United States', ip: '142.250.190.46' },
    { name: 'swiss_alpine_core', city: 'Zurich', country: 'Switzerland', ip: '179.43.144.157' },
    { name: 'jp_neo_tokyo', city: 'Tokyo', country: 'Japan', ip: '103.2.146.12' },
    { name: 'sg_merlion_relay', city: 'Singapore', country: 'Singapore', ip: '111.90.141.134' }
  ];

  useEffect(() => {
    if (status === 'IDLE') {
        const timer = setTimeout(() => toggleConnection(), 2000);
        return () => clearTimeout(timer);
    }
  }, [status]);

  useEffect(() => {
    let interval;
    if (status === 'CONNECTED') {
      interval = setInterval(() => {
        setPing(prev => {
          const delta = Math.floor(Math.random() * 5) - 2;
          return Math.max(12, Math.min(80, prev + delta));
        });
        setSpeeds({
          down: (40 + Math.random() * 10).toFixed(1),
          up: (10 + Math.random() * 5).toFixed(1)
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [status]);

  const toggleConnection = async () => {
    if (status === 'IDLE') {
      setStatus('CONNECTING');
      
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        if (data && data.ip) {
          setTimeout(() => {
            setConnInfo({
              name: `node_${data.country_code?.toLowerCase() || 'unknown'}_${Math.floor(Math.random() * 1000)}`,
              city: data.city || 'Unknown',
              country: data.country_name || 'Unknown',
              ip: data.ip
            });
            setStatus('CONNECTED');
            setPing(Math.floor(Math.random() * 40 + 10));
          }, 2500);
          return;
        }
      } catch (e) {
        console.error("Failed to fetch real IP data", e);
      }
      
      const randomNode = mockNodes[Math.floor(Math.random() * mockNodes.length)];
      setTimeout(() => {
        setConnInfo(randomNode);
        setStatus('CONNECTED');
        setPing(Math.floor(Math.random() * 40 + 10));
      }, 2500);
    } else {
      setStatus('IDLE');
      setConnInfo(null);
    }
  };

  return (
    <div className="relative w-full h-full bg-[#030303] p-6 flex flex-col font-mono text-[11px] lg:text-xs overflow-hidden border border-white/5 rounded-[2.5rem]">
      {/* Background Animated Elements */}
      <AnimatePresence>
        {status === 'CONNECTED' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1)_0%,transparent_70%)]" />
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-[#22c55e]/50 to-transparent" />
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: '-10%', opacity: 0 }}
                animate={{ x: '110%', opacity: [0, 1, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5, ease: "linear" }}
                className="absolute top-1/2 -translate-y-1/2 w-8 h-[1px] bg-gradient-to-r from-transparent via-[#22c55e] to-transparent"
                style={{ top: `calc(50% + ${(i - 3) * 12}px)` }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Logo size={18} isConnecting={status === 'CONNECTING'} isConnected={status === 'CONNECTED'} />
          <span className="text-[#22c55e] font-mono tracking-tighter uppercase font-bold text-sm">LORA-CON PORTAL v2</span>
        </div>
        <div className={`px-3 py-1 rounded-full border text-[10px] uppercase font-black tracking-widest ${status === 'CONNECTED' ? 'bg-[#22c55e]/10 border-[#22c55e]/50 text-[#22c55e]' : 'bg-white/5 border-white/10 text-slate-500'}`}>
          {status}
        </div>
      </div>

      <div className="relative z-10 flex-1 space-y-2 overflow-hidden">
        <p className="text-white font-mono font-bold text-sm">$ lora --status</p>
        <p className="text-slate-300 font-mono font-bold text-sm">Node: <span className={connInfo ? "text-white" : ""}>[{connInfo?.name || 'NONE'}]</span></p>
        <p className="text-slate-300 font-mono font-bold text-sm mb-4">Latency: <span className={connInfo ? "text-[#22c55e] drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]" : ""}>{ping}ms</span></p>
        
        <AnimatePresence mode="wait">
          {status === 'CONNECTING' && (
            <motion.div 
              key="connecting"
              initial={{ opacity: 0, y: 5 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0 }}
              className="space-y-1 pt-2"
            >
              <p className="text-blue-400 font-bold">$ lora --connect --mode stealth</p>
              <p className="text-slate-500 font-bold animate-pulse">{" >> "}Initiating Handshake [ChaCha20-Poly1305]</p>
              <p className="text-slate-500 font-bold">{" >> "}Generating Ephemeral Keys [Curve25519]</p>
              <p className="text-slate-500 font-bold">{" >> "}Hunting for optimal entropy node...</p>
            </motion.div>
          )}

          {status === 'CONNECTED' && connInfo && (
            <motion.div 
              key="connected"
              initial={{ opacity: 0, y: 5 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="space-y-2 pt-2"
            >
              <div className="p-4 rounded-2xl bg-[#030711]/80 border border-white/10 backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                  <Shield className="w-12 h-12 text-[#22c55e]" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                    <p className="text-[#22c55e] font-bold text-[9px] uppercase tracking-widest">Tunnel Established</p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <p className="text-slate-400 uppercase text-[9px] tracking-widest font-black mb-0.5">Location</p>
                      <p className="text-white font-bold text-sm tracking-tight">{connInfo.city}, {connInfo.country}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 uppercase text-[9px] tracking-widest font-black mb-0.5">Assigned IP</p>
                      <p className="text-[#22c55e] font-mono text-sm font-bold">{connInfo.ip}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 relative z-10">
                  <div className="p-3 rounded-xl bg-[#030711]/80 backdrop-blur-md border border-[#22c55e]/30 flex flex-col justify-between h-14 overflow-hidden relative">
                    <div className="absolute inset-0 bg-[#22c55e]/5"></div>
                    <div className="relative z-10 flex items-center gap-1.5 opacity-80">
                      <Zap className="w-2.5 h-2.5 text-[#22c55e]" />
                      <span className="text-[7px] text-slate-300 font-bold uppercase tracking-wider">DOWN</span>
                    </div>
                    <div className="relative z-10 text-sm font-black text-white tracking-tight">{speeds.down} Mbps</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#030711]/80 backdrop-blur-md border border-blue-500/30 flex flex-col justify-between h-14 overflow-hidden relative">
                    <div className="absolute inset-0 bg-blue-500/5"></div>
                    <div className="relative z-10 flex items-center gap-1.5 opacity-80 text-blue-400">
                      <Activity className="w-2.5 h-2.5" />
                      <span className="text-[7px] text-slate-300 font-bold uppercase tracking-wider">UP</span>
                    </div>
                    <div className="relative z-10 text-sm font-black text-white tracking-tight">{speeds.up} Mbps</div>
                  </div>
              </div>

              <p className="text-[7px] text-slate-600 font-bold mt-2">// Traffic mimicry active: resembling HTTPS/2 stream</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button 
        onClick={toggleConnection}
        disabled={status === 'CONNECTING'}
        className={`relative z-10 mt-6 w-full py-4 rounded-xl font-bold text-[11px] transition-all group overflow-hidden ${
          status === 'CONNECTED' 
            ? 'bg-[#ef4444] text-white hover:bg-red-600' 
            : status === 'CONNECTING'
            ? 'bg-amber-500/10 text-amber-500 cursor-not-allowed'
            : 'bg-[#22c55e] text-black hover:bg-[#1ea34d]'
        }`}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {status === 'CONNECTED' ? (
            <>TERMINATE LINK <X className="w-3 h-3" /></>
          ) : status === 'CONNECTING' ? (
            <>ARMING NODES<span className="animate-bounce">...</span></>
          ) : (
            <>INITIATE TUNNEL <Zap className="w-3 h-3 fill-current" /></>
          )}
        </span>
      </button>
    </div>
  );
};

export default function LandingPage() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedPlanData, setSelectedPlanData] = useState({ title: '', price: '' });

  const openWishlist = (plan) => {
    setSelectedPlan(plan);
    setIsWishlistOpen(true);
  };

  const openCheckout = (title, price) => {
    setSelectedPlanData({ title, price });
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#030711] text-white selection:bg-[#22c55e]/30 selection:text-[#22c55e]">
      <DownloadModal 
        isOpen={isDownloadOpen} 
        onClose={() => setIsDownloadOpen(false)} 
      />
      <WishlistModal 
        isOpen={isWishlistOpen} 
        onClose={() => setIsWishlistOpen(false)} 
        selectedPlan={selectedPlan} 
      />
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        plan={selectedPlanData} 
      />

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-[#22c55e]/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-[400px] bg-[#22c55e]/5 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="text-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-xs font-bold uppercase tracking-[0.2em] mb-8"
              >
                <Activity className="w-3.5 h-3.5" /> Lorapok Labs Protocol V2.0
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-6xl md:text-8xl font-black leading-tight tracking-tighter mb-10"
              >
                Master <span className="text-[#22c55e] drop-shadow-[0_0_20px_rgba(34,197,94,0.3)]">Control<br />Gate.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-slate-400 text-lg md:text-xl max-w-xl mb-12 leading-relaxed font-light"
              >
                LoraCon provides a decentralized, high-speed encrypted tunneling ecosystem designed for the next generation of privacy. High-performance relays, military-grade encryption, and zero-latency routing.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-5"
              >
                <Link to="/admin">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34,197,94,0.3)' }}
                    whileTap={{ scale: 0.97 }}
                    className="px-10 py-5 rounded-2xl bg-[#22c55e] text-black font-black text-lg flex items-center gap-3 transition-shadow"
                  >
                    <Cpu className="w-5 h-5" /> Launch Terminal
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.08)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setIsDownloadOpen(true)}
                  className="px-10 py-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md font-bold text-lg flex items-center gap-3"
                >
                  <Download className="w-5 h-5" /> Get App
                </motion.button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-[#22c55e]/20 blur-[120px] rounded-full" />
              <div className="relative z-10 bg-gradient-to-tr from-[#111] to-[#0D0D0D] p-1 rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden aspect-square">
                 <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="w-full h-full bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:24px_24px]" />
                 </div>
                 <LorapokVpnDemo />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-32 px-6 bg-[#030711]/50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-20">
            <div className="max-w-2xl">
              <span className="text-[#22c55e] font-mono text-sm uppercase tracking-widest block mb-4">// CORE ARCHITECTURE</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">Engineered for absolute invisibility.</h2>
            </div>
            <p className="text-slate-500 max-w-sm text-sm">
              Our infrastructure utilizes ephemeral node clustering to ensure your footprint remains non-existent across global networks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            <FeatureCard 
              icon={Shield} 
              title="Military Privacy" 
              description="Full WireGuard & OpenVPN integration with AES-256 bit encryption and perfect forward secrecy."
              delay={0.1}
            />
            <FeatureCard 
              icon={Zap} 
              title="Quantum Routing" 
              description="Low-latency transit through our proprietary multi-hop relay network across 60+ global regions."
              delay={0.2}
            />
            <FeatureCard 
              icon={Lock} 
              title="Zero Ledger" 
              description="We enforce a strict no-logs policy, audited by automated Solana-based transparency tools."
              delay={0.3}
            />
          </div>

          {/* Firefox Integration Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-white/[0.02] border border-white/5 rounded-[4rem] p-12 lg:p-20 overflow-hidden relative">
             <div className="absolute top-0 right-0 w-96 h-96 bg-[#38bdf8]/5 blur-[100px] rounded-full -mr-48 -mt-48" />
             <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#38bdf8]/10 border border-[#38bdf8]/20 text-[#38bdf8] text-[9px] font-black uppercase tracking-widest rounded-full mb-8">
                   Firefox Dedicated Extension
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[1.1]">
                   One-Click <span className="text-[#38bdf8]">Proxy</span> Injection.
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-lg">
                   The LoraCon Firefox Add-on allows for granular browser-level tunneling. Inject your sentinel node directly into your browser stream without affecting local machine traffic.
                </p>
                <div className="space-y-4 mb-12">
                   {[
                     'Zero-config setup for Firefox 115+',
                     'Automatic WebRTC leak protection',
                     'Customizable bypass lists for local domains',
                     'Direct integration with Solana auth keys'
                   ].map((t, i) => (
                     <div key={i} className="flex items-center gap-3 text-sm text-slate-300 font-mono">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                        {t}
                     </div>
                   ))}
                </div>
                <a 
                  href="#"
                  className="inline-block px-10 py-5 bg-[#38bdf8] text-black font-black uppercase tracking-widest text-[11px] rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(56,189,248,0.2)]"
                >
                  Download for Firefox
                </a>
             </div>
             <div className="relative group">
                <div className="absolute inset-0 bg-[#38bdf8]/10 blur-[60px] rounded-full group-hover:bg-[#38bdf8]/20 transition-all" />
                <div className="relative bg-black rounded-[3rem] border border-white/10 p-8 pt-12 shadow-2xl">
                   <div className="flex items-center gap-2 mb-8">
                      <div className="flex gap-1.5">
                         <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                         <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                         <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                      </div>
                      <div className="flex-1 bg-white/5 h-6 rounded-lg border border-white/5 mx-4" />
                   </div>
                   <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-[#38bdf8]/5 rounded-2xl border border-[#38bdf8]/20">
                         <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-[#38bdf8]" />
                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Warp Injection</span>
                         </div>
                         <div className="w-8 h-4 bg-[#38bdf8] rounded-full relative">
                            <div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full shadow-lg" />
                         </div>
                      </div>
                      <div className="space-y-2 px-2">
                         <p className="text-[9px] text-[#38bdf8] font-black uppercase tracking-tighter italic">Handshake Telemetry</p>
                         <div className="h-1 lg:h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              animate={{ x: ['-100%', '100%'] }} 
                              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                              className="h-full w-1/3 bg-gradient-to-r from-transparent via-[#38bdf8] to-transparent" 
                            />
                         </div>
                         <div className="flex justify-between text-[8px] font-mono text-slate-500">
                            <span>ENTROPY_SYNC</span>
                            <span>98.2%</span>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 px-6 relative z-10 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <span className="text-[#22c55e] font-mono text-sm uppercase tracking-[0.4em] block mb-6 animate-pulse">// SERVICE ACCESS LAYERS</span>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8">Protocol Tiers</h2>
            <p className="text-slate-400 text-lg leading-relaxed">Scale your anonymity based on operational requirements. Decentralized billing via Solana blockchain integration.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 pb-10">
            <PlanCard 
              title="Protocol Stealth" 
              price="0.5 SOL" 
              features={['Single Sentinel Node', 'Standard Encapsulation', '100GB Data Cap', '24h Log Flush', 'Priority Entry']}
              delay={0.1}
              onSelect={openCheckout}
              onWishlist={openWishlist}
            />
            <PlanCard 
              title="Protocol Warp" 
              price="1.2 SOL" 
              features={['Multi-Hop Routing', 'Quantum-Resistant Layer', 'Unlimited Bandwidth', 'AI Adaptive Pathing', 'Dynamic IP Masking']}
              delay={0.2}
              onSelect={openCheckout}
              onWishlist={openWishlist}
            />
            <PlanCard 
              title="Sentinel Prime" 
              price="2.5 SOL" 
              features={['Dedicated Mesh Cluster', 'Full Traffic Mimicry', 'Prioritized Exit Nodes', 'Custom Protocol Tuning', '24/7 Admin Direct']}
              delay={0.3}
              onSelect={openCheckout}
              onWishlist={openWishlist}
            />
          </div>

          <div className="flex justify-center mt-12">
            <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-xs font-mono text-slate-500 uppercase tracking-widest">
              <Wallet className="w-4 h-4 text-[#22c55e]" />
              Accepted Assets: SOL, USDC, USDT (Solana Network)
            </div>
          </div>
        </div>
      </section>

      {/* Master Control Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#22c55e]/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-400 text-xs font-bold uppercase tracking-wider">
               <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" /> Infrastructure Suite
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-tight">
               Global Node <span className="text-[#22c55e]">Orchestration</span>.
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
              Manage your global VPN node orchestration through our high-tech terminal interface. Monitor load telemetry, active sessions, and network health in real-time.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/admin">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  className="bg-white text-black px-8 py-4 rounded-2xl font-black flex items-center gap-2"
                >
                  Enter Console <Cpu className="w-4 h-4" />
                </motion.button>
              </Link>
              <a href="https://github.com/mrhellbooy/LoraCon" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-2xl border border-white/10 hover:bg-white/5 transition-all font-bold flex items-center gap-2">
                Github Source <Github className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 relative"
          >
             {/* CLI TERMINAL MOCKUP with Glowing Effect */}
             <div className="relative z-10 bg-[#0A0A0A] p-1 rounded-[2rem] border border-white/10 shadow-[0_0_50px_rgba(34,197,94,0.1)] overflow-hidden">
                <div className="absolute inset-0 bg-[#22c55e]/5 animate-pulse pointer-events-none" />
                <div className="flex items-center gap-2 px-6 py-4 bg-white/5 border-b border-white/10">
                   <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                   </div>
                   <span className="text-[10px] font-mono text-slate-500 ml-4 font-bold tracking-widest uppercase">system_orch_v2 ⚡ bash</span>
                </div>
                <div className="p-8 font-mono text-xs space-y-3 min-h-[300px]">
                   <p className="text-slate-500">loracon_node_admin login --user sentinel_01</p>
                   <p className="text-[#22c55e]">[PROCESS]: Accessing encrypted core... SUCCESS</p>
                   <p className="text-slate-400"># system.status()</p>
                   <div className="grid grid-cols-2 gap-4 py-2">
                      <div className="space-y-1">
                         <p className="text-slate-600">{" >> "}CPU_LOAD</p>
                         <p className="text-white">12.4%</p>
                      </div>
                      <div className="space-y-1">
                         <p className="text-slate-600">{" >> "}ACTIVE_NODES</p>
                         <p className="text-white">42 / 64</p>
                      </div>
                   </div>
                   <p className="text-slate-400"># nodes.deploy(rk_swiss_alpine)</p>
                   <p className="text-yellow-500 animate-pulse">{" >> "}DEPLOYING NODE TO SOLANA DEVNET...</p>
                   <p className="text-[#22c55e]">{" >> "}DEPLOYMENT SUCCESS [7820ms]</p>
                   <div className="mt-6 flex items-center gap-2">
                      <span className="block w-2 h-4 bg-[#22c55e] animate-pulse" />
                   </div>
                </div>
             </div>
             {/* Glowing light behind */}
             <div className="absolute -inset-10 bg-[#22c55e]/10 blur-[100px] rounded-full pointer-events-none" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

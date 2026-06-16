import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'loracon-master-2026') { // Very basic "Superadmin" check
      sessionStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      setError('Invalid Access Token.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505]">
      <div className="bg-[#0D0D0D] p-8 rounded-2xl border border-[#222] w-96 text-center">
        <Shield size={48} className="text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-6">Superadmin Login</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="password"
            className="w-full bg-[#1A1A1A] text-white p-3 rounded mb-4 border border-[#333] outline-none"
            placeholder="Enter Master Token"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-green-500 text-black py-3 rounded font-bold">Access Node Cluster</button>
          {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
}

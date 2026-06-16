import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (data.success) {
        sessionStorage.setItem('role', data.role);
        navigate('/admin');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Connection Error.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030711]">
      <div className="bg-[#0D0D0D] p-8 rounded-2xl border border-[#222] w-96 text-center">
        <Shield size={48} className="text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-6">LoraCon Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="text"
            className="w-full bg-[#1A1A1A] text-white p-3 rounded border border-[#333] outline-none"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input 
            type="password"
            className="w-full bg-[#1A1A1A] text-white p-3 rounded border border-[#333] outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-green-500 text-black py-3 rounded font-bold">Access Node Cluster</button>
          <p className="text-sm text-gray-500">
            <a href="#/register" className="text-green-500">New? Register</a> | <a href="#/reset-password" className="text-green-500">Reset</a>
          </p>
          {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
}

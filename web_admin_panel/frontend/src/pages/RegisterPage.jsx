import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (data.success) {
        navigate('/login');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Connection Error.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505]">
      <div className="bg-[#0D0D0D] p-8 rounded-2xl border border-[#222] w-96 text-center">
        <UserPlus size={48} className="text-cyan-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-6">Create Account</h2>
        <form onSubmit={handleRegister} className="space-y-4">
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
          <button className="w-full bg-cyan-500 text-black py-3 rounded font-bold">Register Account</button>
          <a href="#/login" className="text-sm text-green-500 hover:underline">Back to Login</a>
          {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
}

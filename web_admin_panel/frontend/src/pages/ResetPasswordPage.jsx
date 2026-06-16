import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

export default function ResetPasswordPage() {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, newPassword })
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
    <div className="min-h-screen flex items-center justify-center bg-[#030711]">
      <div className="bg-[#0D0D0D] p-8 rounded-2xl border border-[#222] w-96 text-center">
        <Lock size={48} className="text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-6">Reset Password</h2>
        <form onSubmit={handleReset} className="space-y-4">
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
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button className="w-full bg-yellow-500 text-black py-3 rounded font-bold">Update Password</button>
          <a href="#/login" className="text-sm text-green-500 hover:underline">Back to Login</a>
          {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
}

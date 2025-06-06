import React, { useState } from 'react';
import { useAuth } from '../AuthContext';

const API_BASE = 'http://localhost:4000/api';

export default function AuthForm() {
  const { login } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Authentication failed');
      } else {
        login(data.user, data.token);
      }
    } catch {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-green-950 to-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-black/80 border border-green-900 rounded-3xl shadow-2xl p-10 flex flex-col gap-6"
      >
        <h2 className="text-3xl font-extrabold text-center mb-2 bg-gradient-to-r from-green-400 via-green-200 to-green-400 bg-clip-text text-transparent drop-shadow-lg">
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </h2>
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered input-success bg-black/80 text-white border-green-950 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered input-success bg-black/80 text-white border-green-950 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-400 text-center text-base font-semibold">{error}</div>}
        <button
          className="btn btn-success text-white font-bold text-lg rounded-xl py-3 shadow-md hover:scale-105 transition-all duration-200 border border-green-950 bg-gradient-to-r from-green-950 to-black"
          type="submit"
          disabled={loading}
        >
          {loading ? (mode === 'login' ? 'Logging in...' : 'Signing up...') : (mode === 'login' ? 'Login' : 'Sign Up')}
        </button>
        <div className="text-green-100 text-center mt-2">
          {mode === 'login' ? (
            <>
              Don't have an account?{' '}
              <button type="button" className="underline text-green-300 hover:text-green-400 font-semibold" onClick={() => setMode('signup')}>
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button type="button" className="underline text-green-300 hover:text-green-400 font-semibold" onClick={() => setMode('login')}>
                Login
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

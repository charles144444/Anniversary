import React, { useState, useEffect } from 'react';
import { Fade } from 'react-awesome-reveal';
import { useAuth } from '../AuthContext';

const API_BASE = 'http://localhost:4000/api';
const senders = ['You', 'Jessie'];

export default function Guestbook() {
  const { user, token, logout } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [sender, setSender] = useState('You');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMessages() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`${API_BASE}/messages`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 401 || res.status === 403) {
          logout();
          return;
        }
        const data = await res.json();
        setMessages(data);
      } catch {
        setError('Failed to load messages');
      }
      setLoading(false);
    }
    fetchMessages();
  }, [token, logout]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Please enter a message.');
      return;
    }
    setError('');
    try {
      const res = await fetch(`${API_BASE}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sender, text }),
      });
      if (res.status === 401 || res.status === 403) {
        logout();
        return;
      }
      if (!res.ok) {
        setError('Failed to send message');
      } else {
        const newMsg = await res.json();
        setMessages((prev) => [newMsg, ...prev]);
        setText('');
      }
    } catch {
      setError('Failed to send message');
    }
  };

  const handleDelete = async (id) => {
    setError('');
    try {
      const res = await fetch(`${API_BASE}/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401 || res.status === 403) {
        logout();
        return;
      }
      if (!res.ok) {
        setError('Failed to delete message');
      } else {
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
      }
    } catch {
      setError('Failed to delete message');
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-10 mb-16 bg-black/60 backdrop-blur-md border border-green-950 rounded-3xl shadow-2xl p-8">
      <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-green-400 via-green-200 to-green-400 bg-clip-text text-transparent drop-shadow-lg">
        Our Private Messages
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-8 bg-black/40 border border-green-900 rounded-xl p-4 shadow">
        <div className="flex gap-2 items-center">
          <span className="text-white font-semibold">From:</span>
          <select
            className="select select-success select-sm bg-black/80 text-white border-green-950"
            value={sender}
            onChange={e => setSender(e.target.value)}
          >
            {senders.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <textarea
          className="textarea textarea-success bg-black/80 text-white border-green-950"
          placeholder="Your message..."
          value={text}
          onChange={e => setText(e.target.value)}
          maxLength={120}
          rows={2}
        />
        {error && <span className="text-red-400 text-sm">{error}</span>}
        <button className="btn btn-white btn-sm w-full text-red-500 font-bold" type="submit">Send</button>
      </form>
      {loading ? (
        <div className="text-green-200 text-center">Loading...</div>
      ) : (
        <>
          <div className="border-t border-green-900/40 mb-8"></div>
          <div className="flex flex-col gap-4">
            <Fade cascade damping={0.15} triggerOnce>
              {messages.length === 0 && (
                <div className="alert alert-info text-white">No messages yet. Leave the first note!</div>
              )}
              {messages.map((msg) => (
                <div key={msg.id} className="card bg-black/80 border border-green-950 shadow-xl p-4 flex flex-col gap-2 relative rounded-2xl hover:scale-[1.02] hover:shadow-emerald-700/40 transition-transform duration-200">
                  <button
                    className="absolute right-2 top-2 rounded-full bg-red-600 text-white p-2 shadow-lg transition hover:bg-red-700 hover:scale-110 hover:shadow-xl border-2 border-white/80"
                    title="Delete message"
                    onClick={() => handleDelete(msg.id)}
                    style={{ width: '2.2rem', height: '2.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="badge badge-success text-white">{msg.sender}</span>
                  </div>
                  <div className="text-white text-base break-words">{msg.text}</div>
                </div>
              ))}
            </Fade>
          </div>
        </>
      )}
    </div>
  );
}

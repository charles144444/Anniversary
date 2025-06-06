import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';

const API_BASE = 'http://localhost:4000/api';

export default function AdminPanel() {
  const { token, user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null); // user id for which action is loading

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        setError('Failed to fetch users');
        setUsers([]);
      } else {
        const data = await res.json();
        setUsers(data);
      }
    } catch {
      setError('Failed to fetch users');
      setUsers([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    setActionLoading(id);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/admin/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to delete user');
      } else {
        setUsers(users.filter(u => u.id !== id));
      }
    } catch {
      setError('Failed to delete user');
    }
    setActionLoading(null);
  };

  const handleToggleAdmin = async (id) => {
    setActionLoading(id);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/admin/users/${id}/toggle-admin`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to update admin status');
      } else {
        // Update user in list
        setUsers(users.map(u => u.id === id ? { ...u, is_admin: u.is_admin ? 0 : 1 } : u));
      }
    } catch {
      setError('Failed to update admin status');
    }
    setActionLoading(null);
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-10 mb-16 bg-black/70 backdrop-blur-md border border-green-950 rounded-3xl shadow-2xl p-8">
      <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-green-400 via-green-200 to-green-400 bg-clip-text text-transparent drop-shadow-lg">
        Admin Panel
      </h2>
      {loading ? (
        <div className="text-green-200 text-center">Loading users...</div>
      ) : error ? (
        <div className="text-red-400 text-center">{error}</div>
      ) : (
        <table className="table w-full text-white">
          <thead>
            <tr>
              <th className="text-left">ID</th>
              <th className="text-left">Username</th>
              <th className="text-left">Admin?</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b border-green-900/40">
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.is_admin ? 'Yes' : 'No'}</td>
                <td className="flex gap-2">
                  {user.id !== currentUser.id && (
                    <>
                      <button
                        className="btn btn-xs btn-error"
                        disabled={actionLoading === user.id}
                        onClick={() => handleDelete(user.id)}
                      >
                        {actionLoading === user.id ? 'Deleting...' : 'Delete'}
                      </button>
                      <button
                        className="btn btn-xs btn-info"
                        disabled={actionLoading === user.id}
                        onClick={() => handleToggleAdmin(user.id)}
                      >
                        {actionLoading === user.id
                          ? 'Updating...'
                          : user.is_admin
                          ? 'Demote'
                          : 'Promote'}
                      </button>
                    </>
                  )}
                  {user.id === currentUser.id && <span className="text-green-400 font-bold">You</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

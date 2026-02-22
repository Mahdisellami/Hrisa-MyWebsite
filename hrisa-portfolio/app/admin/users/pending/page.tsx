'use client';

import { useEffect, useState } from 'react';
import { Check, X, Clock } from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  status: string;
  created_at: number;
}

export default function PendingUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = async () => {
    try {
      const res = await fetch('/api/admin/users?status=PENDING');
      const data = await res.json();
      setUsers(data.users);
    } catch (error) {
      console.error('Failed to fetch pending users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId: string) => {
    if (!confirm('Approve this user?')) return;

    setProcessing(userId);
    try {
      const res = await fetch(`/api/admin/users/${userId}/approve`, {
        method: 'POST',
      });

      if (res.ok) {
        // Remove from list
        setUsers(users.filter(u => u.id !== userId));
      } else {
        alert('Failed to approve user');
      }
    } catch (error) {
      console.error('Approve error:', error);
      alert('Failed to approve user');
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (userId: string) => {
    if (!confirm('Reject this user? They will receive an email notification.')) return;

    setProcessing(userId);
    try {
      const res = await fetch(`/api/admin/users/${userId}/reject`, {
        method: 'POST',
      });

      if (res.ok) {
        // Remove from list
        setUsers(users.filter(u => u.id !== userId));
      } else {
        alert('Failed to reject user');
      }
    } catch (error) {
      console.error('Reject error:', error);
      alert('Failed to reject user');
    } finally {
      setProcessing(null);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-sand-200 rounded w-1/4" />
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-sand-200 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold text-sand-950 mb-2">
          Pending Users
        </h1>
        <p className="text-sand-600">
          Review and approve access requests
        </p>
      </div>

      {users.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border-2 border-sand-200 p-12 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-display font-bold text-sand-950 mb-2">
            All Caught Up!
          </h2>
          <p className="text-sand-600">
            No pending access requests at the moment.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {users.map(user => (
            <div
              key={user.id}
              className="bg-white rounded-xl shadow-sm border-2 border-sand-200 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-bold text-sand-950">
                        {user.name || 'No name provided'}
                      </h3>
                      <p className="text-sm text-sand-600">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-sand-600 mt-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Requested {formatDate(user.created_at)}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleReject(user.id)}
                    disabled={processing === user.id}
                    className="flex items-center gap-2 px-4 py-2 border-2 border-red-200 text-red-700 hover:bg-red-50 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X className="w-5 h-5" />
                    Reject
                  </button>
                  <button
                    onClick={() => handleApprove(user.id)}
                    disabled={processing === user.id}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Check className="w-5 h-5" />
                    Approve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { UserCheck, UserX, Clock, Trash2 } from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  status: string;
  created_at: number;
  last_login_at: number | null;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      setUsers(data.users);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      ADMIN: 'bg-red-100 text-red-700 border-red-200',
      EDITOR: 'bg-blue-100 text-blue-700 border-blue-200',
      PUBLIC: 'bg-gray-100 text-gray-700 border-gray-200',
    };
    return colors[role as keyof typeof colors] || colors.PUBLIC;
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      APPROVED: { icon: UserCheck, class: 'bg-green-100 text-green-700 border-green-200', text: 'Approved' },
      PENDING: { icon: Clock, class: 'bg-orange-100 text-orange-700 border-orange-200', text: 'Pending' },
      REJECTED: { icon: UserX, class: 'bg-red-100 text-red-700 border-red-200', text: 'Rejected' },
    };
    return badges[status as keyof typeof badges] || badges.PENDING;
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-sand-200 rounded w-1/4" />
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-sand-200 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const pendingCount = users.filter(u => u.status === 'PENDING').length;
  const approvedUsers = users.filter(u => u.status === 'APPROVED');
  const pendingUsers = users.filter(u => u.status === 'PENDING');
  const rejectedUsers = users.filter(u => u.status === 'REJECTED');

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-display font-bold text-sand-950 mb-2">
            Users
          </h1>
          <p className="text-sand-600">
            Manage user access and permissions
          </p>
        </div>
        {pendingCount > 0 && (
          <a
            href="/admin/users/pending"
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors"
          >
            Review {pendingCount} Pending Request{pendingCount !== 1 ? 's' : ''}
          </a>
        )}
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border-2 border-sand-200 p-6">
          <div className="text-3xl font-bold text-green-600 mb-1">
            {approvedUsers.length}
          </div>
          <div className="text-sm text-sand-600">Approved Users</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border-2 border-sand-200 p-6">
          <div className="text-3xl font-bold text-orange-600 mb-1">
            {pendingUsers.length}
          </div>
          <div className="text-sm text-sand-600">Pending Approval</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border-2 border-sand-200 p-6">
          <div className="text-3xl font-bold text-red-600 mb-1">
            {rejectedUsers.length}
          </div>
          <div className="text-sm text-sand-600">Rejected</div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border-2 border-sand-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-sand-50 border-b border-sand-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-sand-900">User</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-sand-900">Role</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-sand-900">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-sand-900">Joined</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-sand-900">Last Login</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand-200">
            {users.map(user => {
              const StatusBadge = getStatusBadge(user.status);
              const StatusIcon = StatusBadge.icon;

              return (
                <tr key={user.id} className="hover:bg-sand-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-sand-900">
                        {user.name || user.email}
                      </div>
                      {user.name && (
                        <div className="text-sm text-sand-600">{user.email}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRoleBadge(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${StatusBadge.class}`}>
                      <StatusIcon className="w-3 h-3" />
                      {StatusBadge.text}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-sand-600">
                    {formatDate(user.created_at)}
                  </td>
                  <td className="px-6 py-4 text-sm text-sand-600">
                    {user.last_login_at ? formatDate(user.last_login_at) : 'Never'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sand-600">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
}

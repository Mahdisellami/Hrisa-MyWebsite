'use client';

import { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';

interface AuditLog {
  id: string;
  user_id: string | null;
  action: string;
  resource_type: string | null;
  resource_id: string | null;
  ip_address: string | null;
  created_at: number;
}

export default function AuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/admin/audit?limit=100');
      const data = await res.json();
      setLogs(data.logs);
    } catch (error) {
      console.error('Failed to fetch audit logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const getActionColor = (action: string) => {
    if (action.includes('LOGIN')) return 'bg-blue-100 text-blue-700';
    if (action.includes('LOGOUT')) return 'bg-gray-100 text-gray-700';
    if (action.includes('APPROVED')) return 'bg-green-100 text-green-700';
    if (action.includes('REJECTED')) return 'bg-red-100 text-red-700';
    if (action.includes('DENIED')) return 'bg-orange-100 text-orange-700';
    if (action.includes('CREATED')) return 'bg-purple-100 text-purple-700';
    return 'bg-sand-100 text-sand-700';
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-sand-200 rounded w-1/4" />
          <div className="space-y-3">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-16 bg-sand-200 rounded" />
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
          Audit Logs
        </h1>
        <p className="text-sand-600">
          Security and access event history
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border-2 border-sand-200 p-6">
          <div className="text-3xl font-bold text-sand-950 mb-1">
            {logs.length}
          </div>
          <div className="text-sm text-sand-600">Recent Events</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border-2 border-blue-200 p-6">
          <div className="text-3xl font-bold text-blue-600 mb-1">
            {logs.filter(l => l.action.includes('LOGIN')).length}
          </div>
          <div className="text-sm text-sand-600">Login Events</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border-2 border-green-200 p-6">
          <div className="text-3xl font-bold text-green-600 mb-1">
            {logs.filter(l => l.action.includes('APPROVED')).length}
          </div>
          <div className="text-sm text-sand-600">Approvals</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border-2 border-orange-200 p-6">
          <div className="text-3xl font-bold text-orange-600 mb-1">
            {logs.filter(l => l.action.includes('DENIED')).length}
          </div>
          <div className="text-sm text-sand-600">Access Denied</div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-xl shadow-sm border-2 border-sand-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-sand-50 border-b border-sand-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-sand-900">Timestamp</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-sand-900">Action</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-sand-900">Resource</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-sand-900">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-200">
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-sand-50">
                  <td className="px-6 py-4 text-sm text-sand-600 whitespace-nowrap">
                    {formatDate(log.created_at)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getActionColor(log.action)}`}>
                      {log.action.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-sand-900">
                    {log.resource_type && log.resource_id ? (
                      <code className="text-xs">{log.resource_type}: {log.resource_id}</code>
                    ) : (
                      <span className="text-sand-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-sand-600">
                    {log.ip_address || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {logs.length === 0 && (
          <div className="text-center py-12">
            <Activity className="w-12 h-12 text-sand-300 mx-auto mb-4" />
            <p className="text-sand-600">No audit logs found</p>
          </div>
        )}
      </div>
    </div>
  );
}

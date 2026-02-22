'use client';

import { useEffect, useState } from 'react';
import { Users, Shield, Share2, Activity } from 'lucide-react';

interface Stats {
  users: { count: number };
  pendingUsers: { count: number };
  activeSessions: { count: number };
  protectedResources: { count: number };
  activeShareLinks: { count: number };
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-sand-200 rounded w-1/4" />
          <div className="grid md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
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
          Dashboard
        </h1>
        <p className="text-sand-600">
          Overview of your portfolio's access management
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border-2 border-sand-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-sand-950 mb-1">
            {stats?.users.count || 0}
          </div>
          <div className="text-sm text-sand-600">Total Users</div>
          {stats && stats.pendingUsers.count > 0 && (
            <div className="mt-2 text-xs text-orange-600 font-semibold">
              {stats.pendingUsers.count} pending approval
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border-2 border-sand-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-sand-950 mb-1">
            {stats?.activeSessions.count || 0}
          </div>
          <div className="text-sm text-sand-600">Active Sessions</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border-2 border-sand-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-sand-950 mb-1">
            {stats?.protectedResources.count || 0}
          </div>
          <div className="text-sm text-sand-600">Protected Resources</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border-2 border-sand-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Share2 className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-sand-950 mb-1">
            {stats?.activeShareLinks.count || 0}
          </div>
          <div className="text-sm text-sand-600">Active Share Links</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <a
          href="/admin/users/pending"
          className="group p-6 bg-white border-2 border-sand-200 hover:border-brand-500 rounded-xl transition-all"
        >
          <h3 className="text-lg font-display font-bold text-sand-950 mb-2 group-hover:text-brand-600 transition-colors">
            Review Pending Users
          </h3>
          <p className="text-sand-600 text-sm">
            {stats?.pendingUsers.count || 0} registration{stats?.pendingUsers.count !== 1 ? 's' : ''} waiting for approval
          </p>
        </a>

        <a
          href="/admin/share-links"
          className="group p-6 bg-white border-2 border-sand-200 hover:border-brand-500 rounded-xl transition-all"
        >
          <h3 className="text-lg font-display font-bold text-sand-950 mb-2 group-hover:text-brand-600 transition-colors">
            Create Share Link
          </h3>
          <p className="text-sand-600 text-sm">
            Generate temporary access links for specific content
          </p>
        </a>

        <a
          href="/admin/permissions"
          className="group p-6 bg-white border-2 border-sand-200 hover:border-brand-500 rounded-xl transition-all"
        >
          <h3 className="text-lg font-display font-bold text-sand-950 mb-2 group-hover:text-brand-600 transition-colors">
            Manage Permissions
          </h3>
          <p className="text-sand-600 text-sm">
            Control which content requires authentication
          </p>
        </a>
      </div>
    </div>
  );
}

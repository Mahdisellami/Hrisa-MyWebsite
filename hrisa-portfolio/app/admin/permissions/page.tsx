'use client';

import { useEffect, useState } from 'react';
import { Shield, Lock } from 'lucide-react';

interface ProtectedResource {
  id: string;
  resource_type: string;
  resource_id: string;
  min_role: string;
  created_at: number;
}

export default function PermissionsPage() {
  const [resources, setResources] = useState<ProtectedResource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const res = await fetch('/api/admin/permissions');
      const data = await res.json();
      setResources(data.resources);
    } catch (error) {
      console.error('Failed to fetch permissions:', error);
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

  const getTypeColor = (type: string) => {
    const colors = {
      PAGE: 'bg-blue-100 text-blue-700 border-blue-200',
      SECTION: 'bg-purple-100 text-purple-700 border-purple-200',
      PROJECT: 'bg-green-100 text-green-700 border-green-200',
    };
    return colors[type as keyof typeof colors] || colors.PAGE;
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-sand-200 rounded w-1/4" />
          <div className="h-64 bg-sand-200 rounded-xl" />
        </div>
      </div>
    );
  }

  const byType = {
    PAGE: resources.filter(r => r.resource_type === 'PAGE'),
    SECTION: resources.filter(r => r.resource_type === 'SECTION'),
    PROJECT: resources.filter(r => r.resource_type === 'PROJECT'),
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold text-sand-950 mb-2">
          Protected Resources
        </h1>
        <p className="text-sand-600">
          Manage access control for pages, sections, and projects
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border-2 border-sand-200 p-6">
          <div className="text-3xl font-bold text-sand-950 mb-1">
            {resources.length}
          </div>
          <div className="text-sm text-sand-600">Total Protected</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border-2 border-blue-200 p-6">
          <div className="text-3xl font-bold text-blue-600 mb-1">
            {byType.PAGE.length}
          </div>
          <div className="text-sm text-sand-600">Pages</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border-2 border-purple-200 p-6">
          <div className="text-3xl font-bold text-purple-600 mb-1">
            {byType.SECTION.length}
          </div>
          <div className="text-sm text-sand-600">Sections</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border-2 border-green-200 p-6">
          <div className="text-3xl font-bold text-green-600 mb-1">
            {byType.PROJECT.length}
          </div>
          <div className="text-sm text-sand-600">Projects</div>
        </div>
      </div>

      {/* Resources Table */}
      <div className="bg-white rounded-xl shadow-sm border-2 border-sand-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-sand-50 border-b border-sand-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-sand-900">Type</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-sand-900">Resource ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-sand-900">Min Role</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-sand-900">Protected Since</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand-200">
            {resources.map(resource => (
              <tr key={resource.id} className="hover:bg-sand-50">
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(resource.resource_type)}`}>
                    {resource.resource_type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-sand-400" />
                    <code className="text-sm text-sand-900">{resource.resource_id}</code>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    resource.min_role === 'ADMIN'
                      ? 'bg-red-100 text-red-700 border border-red-200'
                      : 'bg-blue-100 text-blue-700 border border-blue-200'
                  }`}>
                    {resource.min_role}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-sand-600">
                  {formatDate(resource.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> These resources require authentication to view. Users must have the minimum role specified or higher.
        </p>
      </div>
    </div>
  );
}

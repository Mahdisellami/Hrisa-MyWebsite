'use client';

import { useEffect, useState } from 'react';
import { Share2, Copy, Check, Plus, ExternalLink } from 'lucide-react';

interface ShareLink {
  id: string;
  token: string;
  resource_type: string;
  resource_id: string | null;
  expires_at: number;
  max_uses: number | null;
  use_count: number;
  created_at: number;
}

export default function ShareLinksPage() {
  const [links, setLinks] = useState<ShareLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form state
  const [resourceType, setResourceType] = useState('ALL');
  const [resourceId, setResourceId] = useState('');
  const [expiresInHours, setExpiresInHours] = useState(24);
  const [maxUses, setMaxUses] = useState('');

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const res = await fetch('/api/admin/share-links');
      const data = await res.json();
      setLinks(data.links);
    } catch (error) {
      console.error('Failed to fetch share links:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      const res = await fetch('/api/admin/share-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resourceType,
          resourceId: resourceId || null,
          expiresInHours,
          maxUses: maxUses ? parseInt(maxUses) : null,
        }),
      });

      if (res.ok) {
        setShowCreateForm(false);
        setResourceType('ALL');
        setResourceId('');
        setExpiresInHours(24);
        setMaxUses('');
        fetchLinks();
      } else {
        alert('Failed to create share link');
      }
    } catch (error) {
      console.error('Create error:', error);
      alert('Failed to create share link');
    } finally {
      setCreating(false);
    }
  };

  const copyToClipboard = (token: string, id: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    const url = `${baseUrl}/share/${token}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
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

  const isExpired = (timestamp: number) => {
    return timestamp < Math.floor(Date.now() / 1000);
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

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-display font-bold text-sand-950 mb-2">
            Share Links
          </h1>
          <p className="text-sand-600">
            Create temporary access links for sharing content
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-semibold transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Share Link
        </button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <div className="bg-white rounded-xl shadow-sm border-2 border-sand-200 p-6 mb-8">
          <h2 className="text-xl font-display font-bold text-sand-950 mb-4">
            New Share Link
          </h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-sand-900 mb-2">
                  Resource Type
                </label>
                <select
                  value={resourceType}
                  onChange={(e) => setResourceType(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-sand-300 rounded-lg focus:outline-none focus:border-brand-500"
                >
                  <option value="ALL">All Access</option>
                  <option value="PAGE">Specific Page</option>
                  <option value="SECTION">Specific Section</option>
                  <option value="PROJECT">Specific Project</option>
                </select>
              </div>

              {resourceType !== 'ALL' && (
                <div>
                  <label className="block text-sm font-medium text-sand-900 mb-2">
                    Resource ID
                  </label>
                  <input
                    type="text"
                    value={resourceId}
                    onChange={(e) => setResourceId(e.target.value)}
                    placeholder="e.g., mahdi-sellami, hrisa-code"
                    className="w-full px-4 py-2 border-2 border-sand-300 rounded-lg focus:outline-none focus:border-brand-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-sand-900 mb-2">
                  Expires In (hours)
                </label>
                <input
                  type="number"
                  value={expiresInHours}
                  onChange={(e) => setExpiresInHours(parseInt(e.target.value))}
                  min="1"
                  max="8760"
                  className="w-full px-4 py-2 border-2 border-sand-300 rounded-lg focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-sand-900 mb-2">
                  Max Uses (optional)
                </label>
                <input
                  type="number"
                  value={maxUses}
                  onChange={(e) => setMaxUses(e.target.value)}
                  placeholder="Unlimited"
                  min="1"
                  className="w-full px-4 py-2 border-2 border-sand-300 rounded-lg focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={creating}
                className="px-6 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                {creating ? 'Creating...' : 'Create Link'}
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-6 py-2 border-2 border-sand-300 text-sand-700 hover:bg-sand-50 rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Links List */}
      <div className="space-y-4">
        {links.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border-2 border-sand-200 p-12 text-center">
            <Share2 className="w-12 h-12 text-sand-300 mx-auto mb-4" />
            <h3 className="text-lg font-display font-bold text-sand-950 mb-2">
              No Share Links Yet
            </h3>
            <p className="text-sand-600">
              Create your first share link to start sharing content
            </p>
          </div>
        ) : (
          links.map(link => {
            const expired = isExpired(link.expires_at);
            const usesRemaining = link.max_uses ? link.max_uses - link.use_count : null;

            return (
              <div
                key={link.id}
                className={`bg-white rounded-xl shadow-sm border-2 p-6 ${
                  expired ? 'border-red-200 opacity-60' : 'border-sand-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                        link.resource_type === 'ALL'
                          ? 'bg-purple-100 text-purple-700 border-purple-200'
                          : 'bg-blue-100 text-blue-700 border-blue-200'
                      }`}>
                        {link.resource_type}
                      </span>
                      {link.resource_id && (
                        <code className="text-sm text-sand-600">{link.resource_id}</code>
                      )}
                      {expired && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
                          Expired
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-sand-600 mb-3">
                      <span>Expires: {formatDate(link.expires_at)}</span>
                      <span>Used: {link.use_count} {usesRemaining !== null ? `/ ${link.max_uses}` : '(unlimited)'}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <code className="flex-1 px-3 py-2 bg-sand-50 border border-sand-200 rounded text-sm text-sand-900 truncate">
                        {window.location.origin}/share/{link.token}
                      </code>
                      <button
                        onClick={() => copyToClipboard(link.token, link.id)}
                        className="px-4 py-2 border-2 border-sand-300 hover:bg-sand-50 rounded-lg transition-colors"
                      >
                        {copiedId === link.id ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <Copy className="w-5 h-5 text-sand-600" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

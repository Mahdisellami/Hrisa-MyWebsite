'use client';

import { useState, useEffect } from 'react';
import { X, Check, Clock, Calendar } from 'lucide-react';

interface Resource {
  id: string;
  type: string;
  displayName: string;
  minRole: string;
}

interface ApprovalModalProps {
  user: {
    id: string;
    email: string;
    name: string | null;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (userId: string, resourcePermissions: string[], expiresAt: number | null) => Promise<void>;
}

export default function ApprovalModal({ user, isOpen, onClose, onApprove }: ApprovalModalProps) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [approving, setApproving] = useState(false);
  const [timeLimit, setTimeLimit] = useState<'none' | '7days' | '30days' | '90days' | '1year'>('none');

  useEffect(() => {
    if (isOpen) {
      fetchResources();
      setSelectedResources([]);
      setTimeLimit('none');
    }
  }, [isOpen]);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/resources');
      const data = await res.json();
      // Filter to only show SECTION type resources (photography galleries)
      const sections = data.resources.filter((r: Resource) => r.type === 'SECTION');
      setResources(sections);
    } catch (error) {
      console.error('Failed to fetch resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleResource = (resourceId: string) => {
    setSelectedResources(prev =>
      prev.includes(resourceId)
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]
    );
  };

  const selectAll = () => {
    setSelectedResources(resources.map(r => r.id));
  };

  const deselectAll = () => {
    setSelectedResources([]);
  };

  const handleApprove = async () => {
    if (!user || selectedResources.length === 0) return;

    const expiresAt = calculateExpiresAt(timeLimit);

    setApproving(true);
    try {
      await onApprove(user.id, selectedResources, expiresAt);
      onClose();
    } catch (error) {
      console.error('Approval failed:', error);
    } finally {
      setApproving(false);
    }
  };

  const calculateExpiresAt = (limit: typeof timeLimit): number | null => {
    if (limit === 'none') return null;

    const now = Math.floor(Date.now() / 1000);
    const daysToSeconds: Record<string, number> = {
      '7days': 7 * 24 * 60 * 60,
      '30days': 30 * 24 * 60 * 60,
      '90days': 90 * 24 * 60 * 60,
      '1year': 365 * 24 * 60 * 60,
    };

    return now + daysToSeconds[limit];
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-display font-bold text-white">
              Approve Access Request
            </h2>
            <p className="text-green-100 text-sm mt-1">
              {user.name || user.email}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Time Limit Section */}
          <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h3 className="font-display font-bold text-sand-950">
                Access Duration
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'none', label: 'Permanent Access', recommended: true },
                { value: '7days', label: '7 Days' },
                { value: '30days', label: '30 Days' },
                { value: '90days', label: '90 Days' },
                { value: '1year', label: '1 Year' },
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setTimeLimit(option.value as typeof timeLimit)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    timeLimit === option.value
                      ? 'bg-blue-500 text-white'
                      : 'bg-white border-2 border-sand-200 text-sand-700 hover:bg-sand-50'
                  }`}
                >
                  {option.label}
                  {option.recommended && timeLimit === option.value && (
                    <span className="text-xs ml-1">(Recommended)</span>
                  )}
                </button>
              ))}
            </div>
            {timeLimit !== 'none' && (
              <div className="mt-3 flex items-start gap-2 text-sm text-blue-700">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Access will automatically expire after the selected duration</span>
              </div>
            )}
          </div>

          {/* Section Selection */}
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display font-bold text-sand-950 text-lg">
              Select Photography Sections
            </h3>
            <div className="flex gap-2">
              <button
                onClick={selectAll}
                className="text-sm text-green-600 hover:text-green-700 font-semibold"
              >
                Select All
              </button>
              <span className="text-sand-400">|</span>
              <button
                onClick={deselectAll}
                className="text-sm text-red-600 hover:text-red-700 font-semibold"
              >
                Deselect All
              </button>
            </div>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 bg-sand-200 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-2 mb-4">
              {resources.map(resource => (
                <button
                  key={resource.id}
                  onClick={() => toggleResource(resource.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    selectedResources.includes(resource.id)
                      ? 'bg-green-50 border-green-500'
                      : 'bg-white border-sand-200 hover:bg-sand-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-md border-2 flex items-center justify-center ${
                        selectedResources.includes(resource.id)
                          ? 'bg-green-500 border-green-500'
                          : 'border-sand-300'
                      }`}
                    >
                      {selectedResources.includes(resource.id) && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sand-950">
                        {resource.displayName}
                      </p>
                      <p className="text-xs text-sand-500">
                        ID: {resource.id}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Selection Summary */}
          <div className="p-4 bg-sand-50 border-2 border-sand-200 rounded-xl">
            <p className="text-sm text-sand-700">
              <span className="font-bold text-sand-950">
                {selectedResources.length}
              </span>{' '}
              section{selectedResources.length !== 1 ? 's' : ''} selected
              {timeLimit !== 'none' && (
                <span className="text-blue-600">
                  {' '}• Expires in{' '}
                  {
                    {
                      '7days': '7 days',
                      '30days': '30 days',
                      '90days': '90 days',
                      '1year': '1 year',
                    }[timeLimit]
                  }
                </span>
              )}
            </p>
            {selectedResources.length === 0 && (
              <p className="text-xs text-red-600 mt-1">
                ⚠️ At least one section must be selected
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-sand-50 border-t-2 border-sand-200 flex gap-3 justify-end">
          <button
            onClick={onClose}
            disabled={approving}
            className="px-6 py-2 border-2 border-sand-300 text-sand-700 hover:bg-sand-100 rounded-lg font-semibold transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleApprove}
            disabled={approving || selectedResources.length === 0}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {approving ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Approving...
              </>
            ) : (
              <>
                <Check className="w-5 h-5" />
                Approve with Selected Sections
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

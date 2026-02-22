'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Shield,
  Share2,
  FileText,
  ArrowLeft
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Permissions', href: '/admin/permissions', icon: Shield },
  { name: 'Share Links', href: '/admin/share-links', icon: Share2 },
  { name: 'Audit Logs', href: '/admin/audit', icon: FileText },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-sand-200 min-h-screen p-6">
      {/* Back to site */}
      <Link
        href="/"
        className="flex items-center gap-2 text-sm text-sand-600 hover:text-brand-600 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Site
      </Link>

      {/* Admin title */}
      <div className="mb-8">
        <h2 className="text-2xl font-display font-bold text-sand-950">Admin</h2>
        <p className="text-sm text-sand-600 mt-1">Portfolio Management</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                isActive
                  ? 'bg-brand-50 text-brand-700 border-2 border-brand-200'
                  : 'text-sand-700 hover:bg-sand-50 border-2 border-transparent'
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

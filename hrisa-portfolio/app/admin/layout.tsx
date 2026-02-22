'use client';

import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { ProtectedPage } from '@/components/auth/ProtectedPage';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedPage minRole="ADMIN">
      <div className="flex min-h-screen bg-sand-50">
        <AdminSidebar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </ProtectedPage>
  );
}

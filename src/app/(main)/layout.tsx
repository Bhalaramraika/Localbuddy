import type { ReactNode } from 'react';
import { BottomNav } from '@/components/layout/bottom-nav';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen text-white">
      <main className="flex-1 pb-32">{children}</main>
      <BottomNav />
    </div>
  );
}

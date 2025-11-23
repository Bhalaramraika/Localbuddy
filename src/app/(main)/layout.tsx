import type { ReactNode } from 'react';
import { BottomNav } from '@/components/layout/bottom-nav';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
       <div className="absolute inset-0 -z-10 h-full w-full bg-transparent bg-[radial-gradient(#2E3054_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <main className="flex-1 pb-28">{children}</main>
      <BottomNav />
    </div>
  );
}

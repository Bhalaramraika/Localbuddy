'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Wallet, MessageSquare, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/wallet', icon: Wallet, label: 'Wallet' },
  { href: '/chat', icon: MessageSquare, label: 'Chat' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-sm h-20 glass-card z-50 md:hidden">
      <nav className="flex justify-around items-center h-full px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 w-full h-full transition-colors rounded-lg',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-white'
              )}
            >
              <div className={cn(
                  'p-3 rounded-full transition-all relative',
                  isActive ? 'glass-card bg-primary/10' : ''
              )}>
                  <item.icon className={cn('h-7 w-7 transition-transform', isActive && "scale-110 ")} />
                  {isActive && <div className="absolute inset-0 cyan-glow blur-md -z-10"/>}
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

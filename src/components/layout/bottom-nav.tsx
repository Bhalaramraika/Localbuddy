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
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-background/70 backdrop-blur-xl border-t border-white/10 z-50 md:hidden">
      <nav className="flex justify-around items-center h-full">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 w-full h-full transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <item.icon className={cn('h-6 w-6 transition-transform', isActive && "scale-110")} />
              <span className={cn('text-xs font-medium', isActive && "font-bold")}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

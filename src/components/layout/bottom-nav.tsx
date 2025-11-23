'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Wallet, MessageSquare, User, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

const navItems = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/tasks', icon: Briefcase, label: 'Tasks' },
  { href: '/chat', icon: MessageSquare, label: 'Chat' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 bg-black/30 backdrop-blur-lg z-50 md:hidden">
      <nav className="flex justify-around items-center h-full px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 w-full h-full transition-colors rounded-lg',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              )}
            >
                <div className={cn(
                    'p-3 rounded-full transition-all',
                    isActive && 'bg-primary/20'
                )}>
                    <item.icon className={cn('h-6 w-6 transition-transform', isActive && "scale-110 ")} />
                </div>
              
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

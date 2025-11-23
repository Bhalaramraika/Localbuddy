
'use client';
import { Home, Wallet, MessageSquare, User, Trophy } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/wallet', icon: Wallet, label: 'Wallet' },
    { href: '/chat', icon: MessageSquare, label: 'Chat' },
    { href: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    { href: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-6 text-white pb-28">
      {children}
      <footer className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-50">
        <nav className="glass-card flex items-center justify-around p-3 rounded-full">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-1 transition-colors',
                  isActive ? 'text-neon-cyan' : 'text-gray-400 hover:text-neon-cyan'
                )}
              >
                <div className={cn('p-2 rounded-full', isActive ? 'bg-neon-cyan/20' : '')}>
                  <item.icon className="w-6 h-6" style={isActive ? { filter: 'drop-shadow(0 0 5px var(--neon-cyan))' } : {}} />
                </div>
              </Link>
            );
          })}
        </nav>
      </footer>
    </div>
  );
}

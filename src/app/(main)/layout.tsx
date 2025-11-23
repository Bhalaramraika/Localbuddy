
'use client';
import { Home, Wallet, MessageSquare, User as UserIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useUser } from '@/firebase';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isUserLoading } = useUser();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/wallet', label: 'Wallet', icon: Wallet },
    { href: '/chat', label: 'Chat', icon: MessageSquare },
    { href: '/profile', label: 'Profile', icon: UserIcon },
  ];

  const mainAppRoutes = ['/', '/wallet', '/chat', '/profile', '/leaderboard', '/tasks'];

  const isAuthPage = pathname.startsWith('/auth');

  useEffect(() => {
    if (!isUserLoading && !user && !isAuthPage) {
      router.push('/auth/login');
    }
  }, [isUserLoading, user, router, isAuthPage]);

  if (isAuthPage) {
    return <div className="w-full max-w-6xl mx-auto">{children}</div>;
  }
  
  if (isUserLoading || (!user && !isAuthPage)) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <Loader className="w-12 h-12 animate-spin text-main-accent" />
        <p className="mt-4 text-lg text-gray-600">Loading your space...</p>
      </div>
    );
  }

  // Show nav if the current path is one of the main app routes or starts with one of them (for dynamic routes like /tasks/[id])
  const showNav = mainAppRoutes.some(route => pathname === route || (route !== '/' && pathname.startsWith(route)));


  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-6 text-foreground pb-28">
      {children}
      {showNav && (
        <footer className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-50">
          <nav className="glass-card flex items-center justify-around p-2.5 rounded-full">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'flex flex-col items-center gap-1 transition-colors',
                    isActive ? 'text-main-accent' : 'text-gray-500 hover:text-main-accent'
                  )}
                >
                  <div className={cn('p-2 rounded-full transition-all duration-300', isActive ? 'bg-main-accent/20' : '')}>
                    <item.icon className="w-5 h-5" style={isActive ? { filter: 'drop-shadow(0 0 5px var(--main-accent))' } : {}} />
                  </div>
                </Link>
              );
            })}
          </nav>
        </footer>
      )}
    </div>
  );
}

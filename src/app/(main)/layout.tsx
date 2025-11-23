
'use client';
import { Home, Wallet, MessageSquare, User as UserIcon, Plus } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useUser } from '@/firebase';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import * as React from 'react';

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
    // Placeholder for the center button
    { href: '/tasks/create', label: 'Create', icon: Plus, isCenter: true },
    { href: '/chat', label: 'Chat', icon: MessageSquare },
    { href: '/profile', label: 'Profile', icon: UserIcon },
  ];

  const mainAppRoutes = ['/', '/wallet', '/chat', '/profile', '/leaderboard', '/tasks'];

  const isAuthPage = pathname.startsWith('/auth');

  useEffect(() => {
    // If auth is still loading, do nothing and wait.
    if (isUserLoading) {
      return;
    }

    // If auth has loaded, and there's no user, and we are NOT on an auth page, redirect to login.
    if (!user && !isAuthPage) {
      router.replace('/auth/login');
    }
    
    // If auth has loaded, and there IS a user, and we ARE on an auth page, redirect to home.
    if (user && isAuthPage) {
        router.replace('/');
    }

  }, [isUserLoading, user, router, isAuthPage, pathname]);
  
  // If we are on an auth page, just render the children (the login/signup form)
  if (isAuthPage) {
    return <>{children}</>;
  }

  // If we are on a main app page, but the user is still loading or not yet available, show a loader.
  if (isUserLoading || !user) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <Loader className="w-12 h-12 animate-spin text-main-accent" />
        <p className="mt-4 text-lg text-gray-600">Loading your space...</p>
      </div>
    );
  }

  const showNav = mainAppRoutes.some(route => pathname === route || (route !== '/' && pathname.startsWith(route)));


  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-6 text-foreground pb-28">
      {children}
      {showNav && (
        <footer className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-50">
          <nav className="glass-card flex items-center justify-around p-2.5 rounded-full">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              if (item.isCenter) {
                return (
                  <Link href={item.href} key={item.label}>
                    <div className={cn(
                      'w-16 h-16 bg-main-accent rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110 shadow-lg shadow-black/30 -translate-y-6',
                      isActive ? 'ring-4 ring-white/50' : ''
                    )}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                  </Link>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'flex flex-col items-center gap-1 transition-colors w-16',
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

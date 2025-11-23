
'use client';
import { Home, Wallet, MessageSquare, User as UserIcon, Plus } from 'lucide-react';
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

  const showNav = mainAppRoutes.some(route => pathname === route || (route !== '/' && pathname.startsWith(route)));


  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-6 text-foreground pb-28">
      {children}
      {showNav && (
        <footer className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-50">
          <div className="relative">
            <Link href="/tasks/create">
                <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-16 h-16 bg-main-accent rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110 shadow-lg shadow-black/30">
                    <Plus className="w-8 h-8 text-white" />
                </div>
            </Link>
             <nav className="glass-card flex items-center justify-around p-2.5 rounded-full">
                {navItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                    <React.Fragment key={item.label}>
                    {/* Add a placeholder for the center button */}
                    {index === 2 && <div className="w-12 h-12"></div>}
                    <Link
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
                    </React.Fragment>
                );
                })}
            </nav>
          </div>
        </footer>
      )}
    </div>
  );
}

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export default function LoginPage() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden p-4">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      
      <div className="w-full max-w-md mx-auto p-8 animate-fade-in-up">
        <div className="glass-card p-8 text-center shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/20 rounded-full inline-block glass-card">
                <Icons.logo className="h-16 w-16 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2 font-headline drop-shadow-lg">
            Local Buddy Pro
          </h1>
          <p className="text-muted-foreground mb-8 drop-shadow-lg">
            Your friendly neighborhood task app.
          </p>

          <div className="space-y-4">
            <Button
              className="w-full h-14 text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 cyan-glow glass-card"
              asChild
            >
              <Link href="/home">
                Login
              </Link>
            </Button>
            <Button variant="ghost" className="w-full h-14 text-lg font-semibold text-muted-foreground glass-card" asChild>
              <Link href="/home">Continue as Guest</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

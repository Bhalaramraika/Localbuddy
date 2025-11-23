import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export default function LoginPage() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>
      
      <div className="w-full max-w-md mx-auto p-8 animate-fade-in-up">
        <div className="bg-card/60 dark:bg-card/40 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl p-8 text-center">
          <div className="flex justify-center mb-6">
            <Icons.logo className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2 font-headline">
            Local Buddy Pro
          </h1>
          <p className="text-muted-foreground mb-8">
            Your friendly neighborhood task app.
          </p>

          <div className="space-y-4">
            <Button
              className="w-full h-12 text-lg animate-breathing bg-primary hover:bg-primary/90"
              asChild
            >
              <Link href="/home">
                <Icons.google className="mr-2 h-6 w-6" />
                Login with Google
              </Link>
            </Button>
            <Button variant="ghost" className="w-full h-12 text-lg" asChild>
              <Link href="/home">Continue as Guest</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

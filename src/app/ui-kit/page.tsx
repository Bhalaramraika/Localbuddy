
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress, CircleProgress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { AlertTriangle, Award, Check, ChevronRight, Home, Zap } from "lucide-react";
import * as React from "react";

const ComponentShowcase = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="glass-card p-6">
        <h2 className="text-2xl font-bold mb-6 text-neon-cyan border-b-2 border-neon-cyan/30 pb-2">{title}</h2>
        <div className="flex flex-wrap items-start gap-4">
            {children}
        </div>
    </div>
);

export default function UIKitPage() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-8 text-white pb-28">
        <header className="text-center">
            <h1 className="text-5xl font-bold" style={{ textShadow: '0 0 15px var(--neon-pink)' }}>UI Component Kit</h1>
            <p className="text-gray-400 mt-2">A showcase of all available UI components with Cyberpunk styling.</p>
        </header>

        <ComponentShowcase title="Buttons">
            <Button className="cyan-glow-button h-12 text-base font-bold transition-all duration-300 ease-in-out transform hover:scale-105">
                Glow Button <Zap className="ml-2 w-5 h-5"/>
            </Button>
            <Button variant="outline" className="h-12 text-md glass-card border-neon-gold/50 text-neon-gold hover:bg-neon-gold/10 hover:text-neon-gold">
                Outline Gold
            </Button>
            <Button variant="outline" className="h-12 text-md glass-card border-neon-pink/50 text-neon-pink hover:bg-neon-pink/10 hover:text-neon-pink">
                Outline Pink
            </Button>
             <Button variant="destructive" className="h-12">
                Destructive
            </Button>
            <Button size="lg" className="pill-active">
                Pill Active
            </Button>
        </ComponentShowcase>

        <ComponentShowcase title="Inputs">
            <Input
                type="text"
                placeholder="Your text here..."
                className="glass-card w-full max-w-sm h-12 px-6 rounded-full border-none focus-visible:ring-2 focus-visible:ring-neon-cyan"
            />
            <Input
                type="password"
                placeholder="Your password..."
                className="glass-pill w-full max-w-sm h-12 px-6 rounded-md border-neon-gold/50 focus-visible:ring-2 focus-visible:ring-neon-gold"
            />
        </ComponentShowcase>

        <ComponentShowcase title="Cards & Pills">
            <Card className="glass-card w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-neon-green">Glass Card</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>This is a standard glass-morphic card component.</p>
                </CardContent>
            </Card>
             <div className="p-4 rounded-lg glass-pill w-full max-w-sm">
                <p className="font-bold text-white">Glass Pill</p>
                <p className="text-sm text-gray-400">A smaller, pill-shaped glass component.</p>
            </div>
        </ComponentShowcase>

        <ComponentShowcase title="Progress Bars">
            <div className="w-full max-w-md flex flex-col gap-4">
                <Progress value={progress} className="h-3 [&>div]:bg-neon-cyan" />
                <Progress value={progress + 20} className="h-3 [&>div]:bg-neon-gold" />
                <Progress value={progress - 10} className="h-3 [&>div]:bg-neon-pink" />
            </div>
            <CircleProgress value={72} size={150} strokeWidth={12} color="var(--neon-cyan)" />
            <CircleProgress value={45} size={120} strokeWidth={10} color="var(--neon-gold)" />
            <CircleProgress value={90} size={100} strokeWidth={8} color="var(--neon-green)" showPercentage={false}/>
        </ComponentShowcase>
        
        <ComponentShowcase title="Navigation & Badges">
             <nav className="glass-card flex items-center justify-around p-3 rounded-full w-full max-w-sm">
              <a href="#" className="flex flex-col items-center gap-1 text-neon-cyan">
                 <div className="p-2 bg-neon-cyan/20 rounded-full">
                    <Home className="w-6 h-6" style={{ filter: 'drop-shadow(0 0 5px var(--neon-cyan))' }} />
                 </div>
              </a>
              <a href="#" className="flex flex-col items-center gap-1 text-gray-400 hover:text-neon-cyan transition-colors">
                <Zap className="w-6 h-6" />
              </a>
            </nav>
            <div className="flex flex-col gap-2">
              <div className="bg-neon-pink/80 text-white text-xs font-bold px-3 py-1 rounded-full shadow-[0_0_8px_var(--neon-pink)]">
                  Urgent
              </div>
               <span className="text-xs font-semibold px-2 py-1 rounded-full bg-neon-cyan/20 text-neon-cyan">New</span>
            </div>
        </ComponentShowcase>

         <ComponentShowcase title="Complex Components">
            <div className="flex items-center gap-4 p-3 glass-pill mb-3 transition-all duration-300 hover:bg-white/5 hover:border-neon-cyan border border-transparent rounded-lg cursor-pointer group w-full max-w-md">
                <div className="p-3 bg-white/5 rounded-full transition-all duration-300 group-hover:bg-neon-cyan/10 group-hover:scale-110">
                   <Zap className="w-6 h-6 text-neon-gold transition-colors duration-300 group-hover:text-neon-cyan" />
                </div>
                <div className="flex-grow">
                    <p className="font-bold text-white">Advanced List Item</p>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300">Subtitle goes here</p>
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-xs font-semibold px-2 py-1 rounded-full bg-neon-cyan/20 text-neon-cyan transition-all duration-300 group-hover:shadow-[0_0_8px] var(--neon-cyan)">Tag</span>
                   <ChevronRight className="w-5 h-5 text-gray-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-neon-cyan" />
                </div>
            </div>
            <div className="flex items-center justify-center gap-2 text-neon-gold text-sm glass-card p-2 px-4 cursor-pointer hover:bg-neon-gold/10 transition-all transform hover:scale-105">
                <AlertTriangle className="w-4 h-4" />
                <span>Verification Banner</span>
            </div>
         </ComponentShowcase>
    </div>
  );
}

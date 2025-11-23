import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { currentUser, badges } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CheckCircle, Settings, Star } from "lucide-react";
import Image from "next/image";

const GlassCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`glass-card ${className}`}>
    {children}
  </div>
);

const ProfileHeader = () => (
  <div className="flex flex-col items-center pt-10 pb-6 px-4">
    <div className="relative">
      <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
        <AvatarImage src={PlaceHolderImages.find(p => p.id === currentUser.avatarId)?.imageUrl} />
        <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="absolute -bottom-1 -right-1 h-8 w-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-background">
        <CheckCircle className="h-5 w-5 text-white" />
      </div>
    </div>
    <h1 className="text-3xl font-bold text-center font-headline mt-4">{currentUser.name}</h1>
    <p className="text-muted-foreground">{currentUser.level}</p>
  </div>
);

const XPProgress = () => {
    const xpPercentage = (currentUser.xp / 1000) * 100;
    return (
        <GlassCard className="p-4">
            <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-semibold">XP: {currentUser.xp} / 1000</p>
                <Star className="h-5 w-5 text-secondary" />
            </div>
            <Progress value={xpPercentage} className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-secondary [&>div]:to-amber-300" />
      </GlassCard>
    );
}

const Stats = () => (
    <GlassCard className="p-4">
        <h3 className="font-semibold mb-4 text-lg">Stats</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
            <div>
                <p className="text-2xl font-bold">₹{currentUser.stats.totalEarnings.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total Earnings</p>
            </div>
            <div>
                <p className="text-2xl font-bold">{currentUser.stats.tasksCompleted}</p>
                <p className="text-xs text-muted-foreground">Tasks</p>
            </div>
             <div>
                <p className="text-2xl font-bold flex items-center justify-center gap-1">{currentUser.stats.rating.toFixed(1)} <Star className="h-4 w-4 text-secondary"/></p>
                <p className="text-xs text-muted-foreground">Rating</p>
            </div>
        </div>
    </GlassCard>
)

const Badges = () => (
    <GlassCard>
        <CardHeader>
        <CardTitle className="text-lg">Badges Case</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
        {badges.slice(0,3).map(badge => (
            <div key={badge.id} className="flex flex-col items-center text-center p-2 rounded-lg bg-white/5">
            <div className="p-3 bg-black/20 rounded-full mb-2">
                <badge.icon className="h-8 w-8 text-primary" />
            </div>
            <p className="text-sm font-semibold">{badge.name}</p>
            </div>
        ))}
        </CardContent>
    </GlassCard>
)


export default function ProfilePage() {
  return (
    <div className="relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-64 bg-purple-900/40 blur-3xl -z-10" />
         <div className="p-4 space-y-6">
            <ProfileHeader />
            <XPProgress />
            <Stats />
            <Badges />
            <GlassCard>
                <Button variant="ghost" className="w-full justify-start text-lg h-14">
                    <Settings className="mr-4"/> Settings
                </Button>
            </GlassCard>
         </div>
    </div>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { currentUser, badges } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Award, CheckCircle2, DollarSign, ListChecks, Settings, Star } from "lucide-react";
import Image from "next/image";

const GlassCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-card/60 dark:bg-card/40 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg rounded-2xl ${className}`}>
    {children}
  </div>
);

const ProfileHeader = () => (
  <div className="relative h-48 rounded-b-3xl overflow-hidden -mx-4 -mt-4">
    <Image 
      src={PlaceHolderImages.find(p => p.id === 'profile_hero')?.imageUrl ?? ''} 
      alt="Profile background"
      fill
      className="object-cover"
      data-ai-hint="abstract gradient"
    />
    <div className="absolute inset-0 bg-black/30"></div>
  </div>
);

export default function ProfilePage() {
  const xpPercentage = (currentUser.xp / 1000) * 100;

  return (
    <div className="space-y-6">
      <ProfileHeader />
      <div className="px-4 space-y-6 -mt-32">
        <div className="flex flex-col items-center">
          <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
            <AvatarImage src={PlaceHolderImages.find(p => p.id === currentUser.avatarId)?.imageUrl} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-2 mt-4">
            <h1 className="text-3xl font-bold text-center font-headline">{currentUser.name}</h1>
            <CheckCircle2 className="h-7 w-7 text-trust-green" />
          </div>
          <p className="text-muted-foreground">Joined {currentUser.joinDate}</p>
          <Button variant="outline" className="mt-4 bg-background/80">Edit Profile</Button>
        </div>

        <GlassCard>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold text-gold-yellow">{currentUser.level}</p>
              <p className="text-sm text-muted-foreground">{currentUser.xp} / 1000 XP</p>
            </div>
            <Progress value={xpPercentage} className="h-3 [&>div]:bg-gold-yellow" />
            <p className="text-xs text-center text-muted-foreground mt-2">Complete more tasks to become a Local Hero!</p>
          </CardContent>
        </GlassCard>

        <div className="grid grid-cols-3 gap-4 text-center">
            <GlassCard className="p-4">
                <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-xl font-bold">₹{currentUser.stats.totalEarnings.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Earnings</p>
            </GlassCard>
            <GlassCard className="p-4">
                <ListChecks className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-xl font-bold">{currentUser.stats.tasksCompleted}</p>
                <p className="text-xs text-muted-foreground">Tasks</p>
            </GlassCard>
            <GlassCard className="p-4">
                <Star className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-xl font-bold">{currentUser.stats.rating.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground">Rating</p>
            </GlassCard>
        </div>

        <GlassCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Award className="text-gold-yellow"/> Badges</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4">
            {badges.map(badge => (
              <div key={badge.id} className="flex flex-col items-center text-center p-2 rounded-lg bg-muted/50">
                <div className="p-3 bg-background rounded-full mb-2">
                  <badge.icon className="h-8 w-8 text-secondary" />
                </div>
                <p className="text-sm font-semibold">{badge.name}</p>
              </div>
            ))}
          </CardContent>
        </GlassCard>
        
        <GlassCard className="p-4">
            <Button variant="ghost" className="w-full justify-start text-lg h-12">
                <Settings className="mr-4"/> Settings
            </Button>
        </GlassCard>
      </div>
    </div>
  );
}

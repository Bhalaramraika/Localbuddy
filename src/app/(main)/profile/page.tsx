import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CheckCircle, Star, Award, Edit, Settings, Check } from "lucide-react";

const ProfileHeader = () => (
  <div className="flex flex-col items-center pt-10 pb-6 px-4 glass-card">
    <div className="relative">
      <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
        <AvatarImage src={PlaceHolderImages.find(p => p.id === "user2")?.imageUrl} alt="Rahul Smith" />
        <AvatarFallback>RS</AvatarFallback>
      </Avatar>
      <div className="absolute -bottom-1 -right-1 h-8 w-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-background">
        <CheckCircle className="h-5 w-5 text-white" />
      </div>
    </div>
    <h1 className="text-2xl font-bold text-center text-white mt-4 drop-shadow-md">Rahul Smith</h1>
    <p className="text-white/70 drop-shadow-sm">Level 2: Pro</p>
  </div>
);

const XPProgress = () => {
    const xpPercentage = (350 / 500) * 100;
    return (
        <div className="relative glass-card p-4 mx-4">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-secondary" />
                    <p className="text-sm font-semibold text-white drop-shadow-md">XP: 350 / 500</p>
                </div>
            </div>
            <Progress value={xpPercentage} className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-primary" />
      </div>
    );
}

const Stats = () => (
    <div className="glass-card p-6 mx-4">
        <div className="grid grid-cols-3 gap-4 text-center">
            <div>
                <p className="text-2xl font-bold text-white drop-shadow-md">₹12,500</p>
                <p className="text-xs text-white/70 drop-shadow-sm">Total Earnings</p>
            </div>
            <div>
                <p className="text-2xl font-bold text-white drop-shadow-md">25</p>
                <p className="text-xs text-white/70 drop-shadow-sm">Tasks</p>
            </div>
             <div>
                <p className="text-2xl font-bold text-white flex items-center justify-center gap-1 drop-shadow-md">4.8 <Star className="h-4 w-4 text-secondary"/></p>
                <p className="text-xs text-white/70 drop-shadow-sm">Rating</p>
            </div>
        </div>
    </div>
)

const badges = [
    { name: 'Verified User', icon: Check, color: "text-success"},
    { name: 'Fast Worker', icon: Edit, color: "text-blue-400"},
    { name: '5-Star Hero', icon: Award, color: "text-secondary"},
]

const Badges = () => (
    <div className="glass-card p-6 mx-4">
        <h3 className="font-semibold mb-4 text-lg text-white drop-shadow-md">Badges Case</h3>
        <div className="grid grid-cols-3 gap-4">
            {badges.map(badge => (
                <div key={badge.name} className="flex flex-col items-center text-center p-2 rounded-lg glass-card">
                    <div className="p-3 bg-black/20 rounded-full mb-2 glass-card">
                        <badge.icon className={`h-8 w-8 ${badge.color}`} />
                    </div>
                    <p className="text-xs font-semibold text-white/80 drop-shadow-sm">{badge.name}</p>
                </div>
            ))}
        </div>
    </div>
)


export default function ProfilePage() {
  return (
    <div className="relative overflow-hidden pt-10">
         <div className="p-4 space-y-6">
            <ProfileHeader />
            <XPProgress />
            <Stats />
            <Badges />
            <div className="mx-4">
                <Button variant="ghost" className="w-full justify-center text-lg h-14 glass-card text-white hover:bg-white/20">
                    <Settings className="mr-4 h-6 w-6"/> Settings
                </Button>
            </div>
         </div>
    </div>
  );
}

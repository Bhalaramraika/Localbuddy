
'use client';
import Image from 'next/image';
import { Check, Star, Award, Pen, Settings, LogOut, Edit, Camera, Wallet, Briefcase, Shield } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Progress, CircleProgress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as React from 'react';
import { cn } from '@/lib/utils';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

const StatCard = ({ value, label, icon }: { value: string, label: string, icon: React.ReactNode }) => (
  <div className="flex flex-col items-center glass-card p-4 rounded-lg flex-1 group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-main-accent/20">
    <div className="text-main-accent mb-2 transition-transform duration-300 group-hover:scale-125">{icon}</div>
    <p className="text-2xl font-bold text-white">{value}</p>
    <p className="text-sm text-gray-400 group-hover:text-white">{label}</p>
  </div>
);

const Badge = ({ icon, color, label, achieved, description }: { icon: React.ReactNode, color: string, label: string, achieved: boolean, description: string }) => (
  <div className={cn("flex flex-col items-center gap-2 transition-opacity group relative", achieved ? 'opacity-100' : 'opacity-40')}>
    <div className={cn(`w-20 h-20 rounded-full flex items-center justify-center glass-card border-2 transition-all duration-300 group-hover:scale-105`, achieved ? color : 'border-gray-600')} style={achieved ? {boxShadow: `0 0 15px var(--${color.replace('border-','')})`} : {}}>
      {icon}
    </div>
    <p className="text-xs text-center">{label}</p>
    {achieved && 
        <div className="absolute bottom-full mb-2 w-48 p-2 text-xs text-center bg-black/80 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {description}
        </div>
    }
  </div>
);

const SkillPill = ({ name, level, xp, maxXp }: { name: string, level: number, xp: number, maxXp: number }) => (
    <div className="glass-pill px-4 py-2 group">
        <div className="flex justify-between items-center">
            <span className="font-semibold text-sm">{name}</span>
            <span className="text-xs text-main-accent">Level {level}</span>
        </div>
        <Progress value={(xp/maxXp) * 100} className="h-1 mt-2 bg-black/30 [&>div]:bg-main-accent transition-all duration-300 group-hover:[&>div]:shadow-[0_0_8px_var(--main-accent)]"/>
        <p className="text-xs text-gray-500 text-right mt-1">{xp}/{maxXp} XP</p>
    </div>
);

const ProfileHeader = () => {
    const userAvatar = getImage('user2');
    const [isEditing, setIsEditing] = React.useState(false);
    const [name, setName] = React.useState('Rahul Smith');

    return (
      <header className="flex flex-col items-center gap-4 glass-card p-6 w-full">
        <div className="relative group">
          {userAvatar && (
            <Image
              src={userAvatar.imageUrl}
              alt="Rahul Smith"
              width={120}
              height={120}
              className="rounded-full border-4 border-main-accent"
              style={{boxShadow: '0 0 20px var(--main-accent)'}}
            />
          )}
          <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Camera className="w-8 h-8 text-white" />
          </div>
          <div className="absolute bottom-1 right-1 bg-green-400 rounded-full p-1 border-2 border-gray-800">
            <Check className="w-4 h-4 text-black" />
          </div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            {isEditing ? (
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} onBlur={() => setIsEditing(false)} className="bg-transparent border-b-2 border-main-accent text-3xl font-bold text-center w-64 focus:outline-none" />
            ) : (
                <h1 className="text-3xl font-bold">{name}</h1>
            )}
            <button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? <Check className="w-5 h-5 text-green-400"/> : <Edit className="w-5 h-5 text-gray-400 cursor-pointer hover:text-main-accent"/>}
            </button>
          </div>
          <p className="text-lg text-gray-400">Level 2: Pro Tasker</p>
        </div>
        
        <div className="w-full px-4">
           <div className="relative w-full h-4 glass-pill rounded-full overflow-hidden">
                <div 
                    className="h-full rounded-full bg-main-accent" 
                    style={{
                        width: `${(350/500)*100}%`,
                        boxShadow: '0 0 10px var(--main-accent)'
                    }}
                />
            </div>
            <div className="flex justify-between items-center text-xs text-gray-300 mt-1">
                <span>XP: 350 / 500</span>
                <span className="flex items-center gap-1">To Lvl 3 <Star className="w-4 h-4 text-yellow-400" /></span>
            </div>
        </div>
      </header>
    );
};

export default function ProfilePage() {
  const allBadges = [
    { icon: <Shield className="w-10 h-10 text-green-400" />, color: "border-green-400", label: "Verified", achieved: true, description: "Your identity has been successfully verified." },
    { icon: <Pen className="w-10 h-10 text-main-accent" />, color: "border-main-accent", label: "Fast Worker", achieved: true, description: "Completed 10+ tasks before deadline." },
    { icon: <Award className="w-10 h-10 text-yellow-400" />, color: "border-yellow-400", label: "5-Star Hero", achieved: true, description: "Maintained a 5-star rating over 20 tasks." },
    { icon: <Star className="w-10 h-10 text-gray-500" />, color: "border-gray-500", label: "Top Earner", achieved: false, description: "Become one of the top 1% earners on the platform." },
  ];
  
  const skills = [
      { name: "Plumbing", level: 4, xp: 850, maxXp: 1000 },
      { name: "Tech Repair", level: 3, xp: 550, maxXp: 750 },
      { name: "Cleaning", level: 2, xp: 300, maxXp: 500 },
      { name: "Delivery", level: 1, xp: 50, maxXp: 250 },
  ];

  const overallProgress = 72;

  return (
    <>
      <ProfileHeader />

      <section className="glass-card w-full p-4">
        <div className="flex justify-around gap-4">
          <StatCard value="₹12.5k" label="Earnings" icon={<Wallet className="w-6 h-6"/>} />
          <StatCard value="25" label="Tasks Done" icon={<Briefcase className="w-6 h-6"/>} />
          <StatCard value="4.8 ★" label="Avg. Rating" icon={<Star className="w-6 h-6"/>} />
        </div>
      </section>

      <section className="glass-card p-6 flex flex-col md:flex-row items-center gap-6 w-full">
        <div className="flex-shrink-0">
            <CircleProgress value={overallProgress} size={150} strokeWidth={12} color="var(--main-accent)" />
        </div>
        <div className="text-center md:text-left">
            <h2 className="text-xl font-bold">Overall Progress</h2>
            <p className="text-gray-400 mt-1">You're doing great! Keep completing tasks to unlock new badges and higher-paying opportunities. Your consistency is your greatest asset.</p>
        </div>
      </section>

      <Tabs defaultValue="badges" className="w-full">
        <TabsList className="grid w-full grid-cols-2 glass-card p-1 h-auto">
          <TabsTrigger value="badges" className="data-[state=active]:pill-active data-[state=inactive]:glass-card">Badges</TabsTrigger>
          <TabsTrigger value="skills" className="data-[state=active]:pill-active data-[state=inactive]:glass-card">Skills</TabsTrigger>
        </TabsList>
        <TabsContent value="badges" className="mt-6">
            <section className="flex flex-col gap-4">
                <h2 className="text-xl font-bold px-2">Badge Showcase</h2>
                <div className="glass-card p-6">
                <div className="grid grid-cols-4 gap-4">
                    {allBadges.map(badge => <Badge key={badge.label} {...badge} />)}
                </div>
                </div>
            </section>
        </TabsContent>
        <TabsContent value="skills" className="mt-6">
             <section className="flex flex-col gap-4">
                <h2 className="text-xl font-bold px-2">Skill Set</h2>
                <div className="glass-card p-4 flex flex-col gap-3">
                    {skills.map(skill => <SkillPill key={skill.name} {...skill} />)}
                </div>
            </section>
        </TabsContent>
      </Tabs>

      <footer className="mt-4 grid grid-cols-2 gap-4 w-full">
         <Button variant="outline" className="w-full h-12 text-md glass-card border-white/20 hover:bg-white/10 hover:text-white transition-all transform hover:scale-105">
            <Settings className="mr-2 h-5 w-5" />
            Settings
        </Button>
         <Button variant="outline" className="w-full h-12 text-md glass-card border-destructive-accent/50 text-destructive-accent hover:bg-destructive-accent/10 hover:text-destructive-accent transition-all transform hover:scale-105">
            <LogOut className="mr-2 h-5 w-5" />
            Logout
        </Button>
      </footer>
    </>
  );
}

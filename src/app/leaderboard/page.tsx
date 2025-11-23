
'use client';

import Image from 'next/image';
import { Crown, Trophy, TrendingUp, TrendingDown } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

type LeaderboardUser = {
  rank: number;
  name: string;
  avatarId: string;
  score: number;
  change: number;
};

const leaderboardData: LeaderboardUser[] = [
  { rank: 1, name: 'CyberRonin', avatarId: 'user2', score: 15200, change: 0 },
  { rank: 2, name: 'GlitchMaster', avatarId: 'user1', score: 14800, change: 2 },
  { rank: 3, name: 'SynthWave', avatarId: 'user3', score: 14500, change: -1 },
  { rank: 4, name: 'DataWraith', avatarId: 'user4', score: 13900, change: 1 },
  { rank: 5, name: 'Jax', avatarId: 'user5', score: 13200, change: -2 },
  { rank: 6, name: 'Echo', avatarId: 'user2', score: 12800, change: 0 },
  { rank: 7, name: 'Nova', avatarId: 'user3', score: 12100, change: 3 },
  { rank: 8, name: 'Vector', avatarId: 'user1', score: 11500, change: 0 },
  { rank: 9, name: 'Pixel', avatarId: 'user4', score: 11200, change: -1 },
  { rank: 10, name: 'GridRunner', avatarId: 'user5', score: 10800, change: 2 },
];

const RankIndicator = ({ rank }: { rank: number }) => {
  if (rank === 1) return <Crown className="w-6 h-6 text-yellow-400" style={{ filter: 'drop-shadow(0 0 5px #facc15)' }} />;
  if (rank === 2) return <Trophy className="w-5 h-5 text-gray-300" />;
  if rank === 3) return <Trophy className="w-5 h-5 text-yellow-700" />;
  return <span className="font-bold text-lg">{rank}</span>;
};

const ChangeIndicator = ({ change }: { change: number }) => {
  if (change > 0) return <TrendingUp className="w-5 h-5 text-green-400" />;
  if (change < 0) return <TrendingDown className="w-5 h-5 text-red-400" />;
  return <span className="text-gray-500">-</span>;
};

const LeaderboardRow = ({ user }: { user: LeaderboardUser }) => {
  const avatar = getImage(user.avatarId);
  const isTopThree = user.rank <= 3;

  return (
    <div className={cn(
      "flex items-center gap-4 p-3 glass-pill mb-3 transition-all duration-300 hover:bg-white/10 hover:border-main-accent border border-transparent rounded-lg cursor-pointer group",
      isTopThree && 'border-yellow-400/30'
    )}>
      <div className="w-10 text-center flex items-center justify-center">
        <RankIndicator rank={user.rank} />
      </div>
      <Image src={avatar?.imageUrl || ''} alt={user.name} width={48} height={48} className="rounded-full border-2 border-main-accent/50 group-hover:border-main-accent transition-colors" />
      <div className="flex-grow">
        <p className="font-bold text-white text-lg">{user.name}</p>
        <p className="text-sm text-green-400" style={{textShadow: '0 0 8px #4ade80'}}>{user.score.toLocaleString()} XP</p>
      </div>
      <div className="w-12 text-center flex justify-center items-center gap-1">
        <ChangeIndicator change={user.change} />
        {user.change !== 0 && <span className={cn("text-sm", user.change > 0 ? 'text-green-400' : 'text-red-400')}>{Math.abs(user.change)}</span>}
      </div>
    </div>
  );
};

export default function LeaderboardPage() {
  return (
    <>
      <header className="glass-card p-6 text-center">
        <div className="flex justify-center items-center gap-4">
            <Trophy className="w-10 h-10 text-yellow-400" style={{ filter: 'drop-shadow(0 0 10px #facc15)' }}/>
            <h1 className="text-4xl font-bold">Leaderboard</h1>
            <Trophy className="w-10 h-10 text-yellow-400" style={{ filter: 'drop-shadow(0 0 10px #facc15)' }}/>
        </div>
        <p className="text-gray-400 text-sm mt-2">See who's dominating the task world.</p>
      </header>
      
      <Tabs defaultValue="weekly" className="w-full">
        <TabsList className="grid w-full grid-cols-3 glass-card p-1 h-auto">
          <TabsTrigger value="daily" className="data-[state=active]:pill-active data-[state=inactive]:glass-card">Daily</TabsTrigger>
          <TabsTrigger value="weekly" className="data-[state=active]:pill-active data-[state=inactive]:glass-card">Weekly</TabsTrigger>
          <TabsTrigger value="all-time" className="data-[state=active]:pill-active data-[state=inactive]:glass-card">All-Time</TabsTrigger>
        </TabsList>
        <TabsContent value="weekly" className="mt-6">
            <div className="flex flex-col gap-2">
                {leaderboardData.map(user => (
                    <LeaderboardRow key={user.rank} user={user} />
                ))}
            </div>
        </TabsContent>
        <TabsContent value="daily" className="mt-6 text-center text-gray-500">
            <p>Daily leaderboards are coming soon!</p>
        </TabsContent>
        <TabsContent value="all-time" className="mt-6 text-center text-gray-500">
             <p>All-Time leaderboards are coming soon!</p>
        </TabsContent>
      </Tabs>
    </>
  );
}

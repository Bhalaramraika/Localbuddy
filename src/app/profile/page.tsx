import Image from 'next/image';
import { Check, Star, Award, Pen, Settings } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const StatCard = ({ value, label }: { value: string, label: string }) => (
  <div className="flex flex-col items-center">
    <p className="text-2xl font-bold text-white">{value}</p>
    <p className="text-sm text-gray-400">{label}</p>
  </div>
);

const Badge = ({ icon, color, label }: { icon: React.ReactNode, color: string, label: string }) => (
  <div className="flex flex-col items-center gap-2">
    <div className={`w-16 h-16 rounded-full flex items-center justify-center glass-pill border-2 ${color}`}>
      {icon}
    </div>
    <p className="text-xs text-center">{label}</p>
  </div>
);

export default function ProfilePage() {
  const userAvatar = PlaceHolderImages.find(img => img.id === 'user2');

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-8 text-white pb-28">
      {/* Profile Header */}
      <header className="flex flex-col items-center gap-4">
        <div className="relative">
          {userAvatar && (
            <Image
              src={userAvatar.imageUrl}
              alt="Rahul Smith"
              width={120}
              height={120}
              className="rounded-full border-4 border-neon-cyan"
            />
          )}
          <div className="absolute bottom-1 right-1 bg-neon-green rounded-full p-1">
            <Check className="w-4 h-4 text-black" />
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold">Rahul Smith</h1>
          <p className="text-lg text-gray-400">Level 2: Pro</p>
        </div>
        
        {/* XP Bar */}
        <div className="w-full px-4">
           <div className="relative w-full h-4 glass-pill rounded-full overflow-hidden">
                <div 
                    className="h-full rounded-full" 
                    style={{
                        width: `${(350/500)*100}%`,
                        background: 'linear-gradient(90deg, #8A2BE2, var(--neon-cyan))'
                    }}
                />
            </div>
            <div className="flex justify-between items-center text-xs text-gray-300 mt-1">
                <span>XP: 350 / 500</span>
                <Star className="w-4 h-4 text-neon-gold" />
            </div>
        </div>
      </header>

      {/* Stats Container */}
      <section className="glass-card w-full p-6">
        <div className="flex justify-around">
          <StatCard value="₹12,500" label="Total Earnings" />
          <div className="w-px bg-white/10"></div>
          <StatCard value="25" label="Tasks" />
          <div className="w-px bg-white/10"></div>
          <StatCard value="4.8 ★" label="Rating" />
        </div>
      </section>

      {/* Badges Case */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Badges Case</h2>
        <div className="glass-card p-6">
          <div className="flex justify-around">
            <Badge
              icon={<Check className="w-8 h-8 text-neon-green" />}
              color="border-neon-green"
              label="Verified User"
            />
            <Badge
              icon={<Pen className="w-8 h-8 text-neon-cyan" />}
              color="border-neon-cyan"
              label="Fast Worker"
            />
            <Badge
              icon={<Award className="w-8 h-8 text-neon-gold" />}
              color="border-neon-gold"
              label="5-Star Hero"
            />
          </div>
        </div>
      </section>

      {/* Footer Button */}
      <footer className="mt-4">
         <Button variant="outline" className="w-full h-12 text-lg glass-card border-white/20 hover:bg-white/10 hover:text-white">
            <Settings className="mr-2 h-5 w-5" />
            Settings
        </Button>
      </footer>
    </div>
  );
}

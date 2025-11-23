import Image from 'next/image';
import {
  Bell,
  Home,
  Wallet,
  MessageSquare,
  User,
  Siren,
  Shield,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const getImage = (id: string) =>
  PlaceHolderImages.find((img) => img.id === id);

export default function HomePage() {
  const userAvatar = getImage('user2');

  const stories = [
    {
      id: 'story2',
      label: 'Top Buddies',
      Icon: Users,
      ringColor: 'ring-neon-cyan',
    },
    {
      id: 'story1',
      label: 'Urgent',
      Icon: Siren,
      ringColor: 'ring-neon-pink',
    },
    {
      id: 'story3',
      label: 'Safety Tips',
      Icon: Shield,
      ringColor: 'ring-neon-gold',
    },
  ];

  const filters = ['All', 'Household', 'Tech', 'Cleaning'];

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-8 text-white pb-28">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {userAvatar && (
            <div className="glass-card p-1 rounded-full">
              <Image
                src={userAvatar.imageUrl}
                alt={userAvatar.description}
                width={48}
                height={48}
                className="rounded-full border-2 border-neon-cyan"
              />
            </div>
          )}
          <div className="relative glass-card p-3 rounded-full">
            <Bell className="w-6 h-6 text-gray-400" />
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-neon-pink ring-2 ring-transparent"></span>
          </div>
        </div>
        <div className="glass-card rounded-full px-4 py-2">
          <p className="text-sm font-medium">
            Wallet: <span className="font-bold text-neon-green">₹1,500</span>
          </p>
        </div>
      </header>

      {/* Stories */}
      <section className="glass-card p-4">
        <div className="flex space-x-6 overflow-x-auto pb-2 -mx-4 px-4">
          {stories.map((story) => {
            const storyImage = getImage(story.id);
            return (
              <div
                key={story.label}
                className="flex flex-col items-center gap-2 flex-shrink-0"
              >
                <div
                  className={`relative w-20 h-20 rounded-full flex items-center justify-center ring-2 ${story.ringColor} ring-offset-4 ring-offset-transparent bg-black/20 glass-pill`}
                >
                  {storyImage ? (
                    <Image
                      src={storyImage.imageUrl}
                      alt={story.label}
                      width={80}
                      height={80}
                      className="rounded-full object-cover p-1"
                    />
                  ) : (
                    <story.Icon className="w-8 h-8" />
                  )}
                </div>
                <p className="text-xs text-gray-400">{story.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Filters */}
      <section>
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {filters.map((filter, index) => (
            <button
              key={filter}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                index === 0
                  ? 'pill-active'
                  : 'glass-card text-gray-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Hero Task Card */}
      <section className="glass-card p-6 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-white">Need Plumber ASAP</h2>
            <p className="text-3xl font-bold text-neon-green mt-1">₹500</p>
          </div>
          <div className="bg-neon-pink/80 text-white text-xs font-bold px-3 py-1 rounded-full">
            Urgent
          </div>
        </div>
        <div className="glass-card border-red-700/50 rounded-lg p-2 text-center">
          <p className="text-sm text-red-200">Countdown: 00:02:35:34</p>
        </div>
        <Button className="w-full h-12 text-base cyan-glow-button">
          Accept Task
        </Button>
      </section>

      {/* Floating Bottom Navigation */}
      <footer className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md z-50">
        <nav className="glass-card flex items-center justify-around p-3 rounded-full">
          <a href="#" className="flex flex-col items-center gap-1 text-neon-cyan">
             <div className="p-2 bg-neon-cyan/20 rounded-full">
                <Home className="w-6 h-6" style={{ filter: 'drop-shadow(0 0 5px var(--neon-cyan))' }} />
             </div>
          </a>
          <a href="/wallet" className="flex flex-col items-center gap-1 text-gray-400">
            <Wallet className="w-6 h-6" />
          </a>
          <a href="/chat" className="flex flex-col items-center gap-1 text-gray-400">
            <MessageSquare className="w-6 h-6" />
          </a>
          <a href="/profile" className="flex flex-col items-center gap-1 text-gray-400">
            <User className="w-6 h-6" />
          </a>
        </nav>
      </footer>
    </div>
  );
}

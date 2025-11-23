import Image from 'next/image';
import { Phone, Mic, Play, MoreVertical } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ChatPage() {
  const userAvatar = PlaceHolderImages.find(img => img.id === 'user2');

  return (
    <div className="w-full max-w-md h-[calc(100vh-4rem)] mx-auto flex flex-col text-white">
      {/* Header */}
      <header className="glass-card flex items-center justify-between p-3 mb-4">
        <div className="flex items-center gap-3">
          {userAvatar && (
            <Image
              src={userAvatar.imageUrl}
              alt="Rahul's Avatar"
              width={40}
              height={40}
              className="rounded-full border-2 border-neon-cyan"
            />
          )}
          <span className="font-bold text-lg">Rahul</span>
        </div>
        <div className="flex items-center gap-4">
          <Phone className="w-6 h-6 cursor-pointer" />
          <div className="relative px-4 py-1.5 rounded-full bg-neon-pink/80 cursor-pointer shadow-[0_0_10px_var(--neon-pink)]">
            <span className="font-bold text-sm">SOS</span>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-grow space-y-6 overflow-y-auto p-4 -mx-4 glass-card mb-4">
        {/* Incoming Message */}
        <div className="flex justify-start">
          <div className="glass-card max-w-xs p-3 rounded-2xl rounded-bl-lg" style={{ backgroundColor: 'rgba(0, 240, 255, 0.1)'}}>
            <p className="text-sm">Hi, are you on your way? I'm waiting at the location.</p>
          </div>
        </div>

        {/* Outgoing Message */}
        <div className="flex justify-end">
          <div className="glass-card max-w-xs p-3 rounded-2xl rounded-br-lg" style={{backgroundColor: 'rgba(255, 255, 255, 0.08)'}}>
            <p className="text-sm">Hey, almost there. Please release the payment from escrow.</p>
          </div>
        </div>
        
        {/* Voice Note */}
        <div className="flex justify-start">
          <div className="glass-card flex items-center gap-3 p-3 rounded-2xl rounded-bl-lg" style={{ backgroundColor: 'rgba(0, 240, 255, 0.1)'}}>
            <Play className="w-6 h-6 text-neon-cyan cursor-pointer" />
            <div className="w-32 h-1 bg-gray-500/50 rounded-full relative">
              <div className="absolute top-0 left-0 h-full bg-neon-cyan w-1/3 rounded-full"></div>
            </div>
            <span className="text-xs text-gray-400">0:23</span>
          </div>
        </div>

         {/* Incoming Message 2 */}
         <div className="flex justify-start">
          <div className="glass-card max-w-xs p-3 rounded-2xl rounded-bl-lg" style={{ backgroundColor: 'rgba(0, 240, 255, 0.1)'}}>
            <p className="text-sm">Okay, I've just released it. Check your wallet.</p>
          </div>
        </div>
      </div>

      {/* Action Hub - Bottom Drawer */}
      <footer className="glass-card p-4">
        <div className="text-center mb-4">
          <h3 className="font-bold text-xl">Action Hub</h3>
        </div>
        <div className="relative flex items-center w-full mb-4">
          <Input
            type="text"
            placeholder="Your text here..."
            className="glass-card w-full h-12 pl-4 pr-12 rounded-full border-none focus-visible:ring-2 focus-visible:ring-neon-cyan"
          />
          <Mic className="absolute right-4 w-6 h-6 text-gray-400 cursor-pointer" />
        </div>
        <Button className="w-full h-14 text-lg font-bold rounded-full" style={{ background: 'linear-gradient(90deg, var(--neon-gold), #ffc107)', color: '#000', boxShadow: '0 0 20px var(--neon-gold)'}}>
          Release Payment 💸
        </Button>
      </footer>
    </div>
  );
}

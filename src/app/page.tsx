
'use client';

import Image from 'next/image';
import {
  Bell,
  Siren,
  Shield,
  Users,
  ChevronRight,
  Plus,
  Zap,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import * as React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn, formatCurrency, sleep } from '@/lib/utils';

const getImage = (id: string) =>
  PlaceHolderImages.find((img) => img.id === id);

const TaskCardImage = ({ imageUrl, title, tag }: { imageUrl: string, title: string, tag: string }) => (
    <div className="relative w-full h-40 rounded-lg overflow-hidden border border-white/10">
        <Image src={imageUrl} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className={`absolute top-2 right-2 bg-neon-pink/80 text-white text-xs font-bold px-3 py-1 rounded-full shadow-[0_0_8px_var(--neon-pink)] transition-all duration-300 group-hover:bg-neon-pink`}>
            {tag}
        </div>
    </div>
);

const TaskCardHeader = ({ title, price, tag, hasImage }: { title: string, price: string, tag: string, hasImage: boolean }) => (
    <div className="flex justify-between items-start">
        <div className="flex flex-col">
            <h2 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-neon-cyan">{title}</h2>
            <p className="text-2xl font-bold text-neon-green mt-1" style={{ textShadow: '0 0 10px var(--neon-green)' }}>{price}</p>
        </div>
        {!hasImage && (
            <div className="bg-neon-pink/80 text-white text-xs font-bold px-3 py-1 rounded-full shadow-[0_0_8px_var(--neon-pink)] transition-all duration-300 group-hover:bg-neon-pink">
                {tag}
            </div>
        )}
    </div>
);

const TaskCardCountdown = ({ countdown }: { countdown: string }) => {
    const [remaining, setRemaining] = React.useState(countdown);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setRemaining(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="glass-card border-red-700/50 rounded-lg p-2 text-center transition-all duration-300 group-hover:border-neon-pink/50 group-hover:scale-105">
            <p className="text-sm text-red-200 group-hover:text-neon-pink">Countdown: {remaining}</p>
        </div>
    );
};

const TaskCardProgress = () => {
    const [progress, setProgress] = React.useState(0);
    
    React.useEffect(() => {
        setProgress(Math.random() * 100);
    }, []);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setProgress(prev => (prev > 90 ? 10 : prev + Math.random() * 20));
        }, 2000 + Math.random() * 2000);
        return () => clearTimeout(timer);
    }, [progress]);

    return (
        <div>
            <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                <p>Task Progress</p>
                <p>{Math.round(progress)}%</p>
            </div>
            <Progress value={progress} className="h-2 bg-black/40 [&>div]:bg-neon-cyan" />
        </div>
    );
};

const TaskCardButton = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isAccepted, setIsAccepted] = React.useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        await sleep(1500);
        setIsLoading(false);
        setIsAccepted(true);
    };

    return (
        <Button 
            className={cn(
                "w-full h-12 text-base font-bold transition-all duration-300 ease-in-out transform hover:scale-105",
                isAccepted ? "bg-neon-green/80 text-black shadow-[0_0_15px_var(--neon-green)]" : "cyan-glow-button"
            )}
            onClick={handleClick}
            disabled={isLoading || isAccepted}
        >
            {isLoading ? "Accepting..." : (isAccepted ? "Task Accepted" : "Accept Task")}
            {!isAccepted && <Zap className="ml-2 w-5 h-5"/>}
        </Button>
    );
};

const TaskCard = ({ title, price, tag, countdown, imageUrl }: { title: string, price: string, tag: string, countdown: string, imageUrl?: string }) => {
  return (
    <div className="glass-card p-4 flex flex-col gap-4 group transition-all duration-300 hover:shadow-2xl hover:shadow-neon-cyan/10 hover:-translate-y-1">
      {imageUrl && <TaskCardImage imageUrl={imageUrl} title={title} tag={tag} />}
      <TaskCardHeader title={title} price={price} tag={tag} hasImage={!!imageUrl} />
      <TaskCardCountdown countdown={countdown} />
      <TaskCardProgress />
      <TaskCardButton />
    </div>
  );
};

const AdvancedListItem = ({ icon, title, subtitle, tag, tagColor }: { icon: React.ReactNode, title: string, subtitle: string, tag: string, tagColor: string }) => (
    <div className="flex items-center gap-4 p-3 glass-pill mb-3 transition-all duration-300 hover:bg-white/5 hover:border-neon-cyan border border-transparent rounded-lg cursor-pointer group">
        <div className="p-3 bg-white/5 rounded-full transition-all duration-300 group-hover:bg-neon-cyan/10 group-hover:scale-110">
            {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6 transition-colors duration-300 group-hover:text-neon-cyan' })}
        </div>
        <div className="flex-grow">
            <p className="font-bold text-white">{title}</p>
            <p className="text-sm text-gray-400 group-hover:text-gray-300">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
           <span className={`text-xs font-semibold px-2 py-1 rounded-full ${tagColor} transition-all duration-300 group-hover:shadow-[0_0_8px] ${tagColor.replace('bg-', '').replace('/20', '')}`}>{tag}</span>
           <ChevronRight className="w-5 h-5 text-gray-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-neon-cyan" />
        </div>
    </div>
);

const HeaderWalletBalance = () => {
    const [balance, setBalance] = React.useState(0);
    
    React.useEffect(() => {
        setBalance(1500);
    }, []);
    
    React.useEffect(() => {
        const interval = setInterval(() => {
            setBalance(prev => prev + (Math.random() * 100 - 40));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="glass-card rounded-full px-4 py-2 hover:border-neon-green/50 border border-transparent transition-all">
          <p className="text-sm font-medium">
            Wallet: <span className="font-bold text-neon-green transition-all duration-500" style={{ textShadow: '0 0 10px var(--neon-green)' }}>{formatCurrency(balance, 'INR', 'en-IN')}</span>
          </p>
        </div>
    );
};

const HeaderNotificationBell = () => (
    <div className="relative glass-card p-3 rounded-full cursor-pointer hover:border-neon-pink/50 border border-transparent transition-all group">
        <Bell className="w-6 h-6 text-gray-400 group-hover:text-neon-pink transition-colors duration-300" />
        <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-neon-pink ring-2 ring-transparent animate-pulse group-hover:animate-none shadow-[0_0_8px_var(--neon-pink)]"></span>
    </div>
);

const HeaderAvatar = ({ userAvatar }: { userAvatar?: { imageUrl: string, description: string }}) => (
    <>
    {userAvatar && (
        <div className="glass-card p-1 rounded-full hover:border-neon-cyan/50 border-2 border-transparent transition-all">
            <Image
                src={userAvatar.imageUrl}
                alt={userAvatar.description}
                width={48}
                height={48}
                className="rounded-full border-2 border-neon-cyan"
            />
        </div>
    )}
    </>
);

const MainHeader = () => {
    const userAvatar = getImage('user2');
    return (
        <header className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
                <HeaderAvatar userAvatar={userAvatar} />
                <HeaderNotificationBell />
            </div>
            <HeaderWalletBalance />
        </header>
    );
};

const StoryItem = ({ story }: { story: { id: string, label: string, Icon: React.ElementType, ringColor: string }}) => {
    const storyImage = getImage(story.id);
    return (
        <div
            key={story.label}
            className="flex flex-col items-center gap-2 flex-shrink-0 w-24 cursor-pointer group"
        >
            <div
                className={cn(
                    `relative w-20 h-20 rounded-full flex items-center justify-center ring-2 ring-offset-4 ring-offset-transparent bg-black/20 glass-pill transition-all duration-300 group-hover:ring-4`,
                    story.ringColor,
                    `shadow-[0_0_15px_] ${story.ringColor.replace('ring-', 'var(--neon-')})`
                )}
            >
                {storyImage ? (
                    <Image
                        src={storyImage.imageUrl}
                        alt={story.label}
                        width={80}
                        height={80}
                        className="rounded-full object-cover p-1 transition-transform duration-300 group-hover:scale-90"
                    />
                ) : (
                    <story.Icon className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
                )}
            </div>
            <p className="text-xs text-gray-400 text-center truncate w-full transition-colors duration-300 group-hover:text-white">{story.label}</p>
        </div>
    );
};

const AddStoryButton = () => (
    <div className="flex-shrink-0 pl-2">
        <button className="w-16 h-20 rounded-full flex flex-col items-center justify-center glass-pill border-2 border-dashed border-white/20 transition-all duration-300 hover:border-neon-cyan hover:text-neon-cyan hover:scale-105">
            <Plus className="w-6 h-6 text-gray-400 transition-colors duration-300" />
            <p className="text-xs text-gray-400 mt-1 transition-colors duration-300">Add</p>
        </button>
    </div>
);

const StoriesSection = () => {
    const stories = [
        { id: 'story2', label: 'Top Buddies', Icon: Users, ringColor: 'ring-neon-cyan' },
        { id: 'story1', label: 'Urgent', Icon: Siren, ringColor: 'ring-neon-pink' },
        { id: 'story3', label: 'Safety Tips', Icon: Shield, ringColor: 'ring-neon-gold' },
        { id: 'user3', label: 'Jenny', Icon: User, ringColor: 'ring-neon-green' },
        { id: 'user4', label: 'David', Icon: User, ringColor: 'ring-neon-cyan' },
    ];
    return (
        <section className="glass-card p-4 w-full">
            <div className="flex items-center">
                <div className="flex space-x-6 overflow-x-auto pb-2 -mx-4 px-4">
                    {stories.map((story) => <StoryItem key={story.id} story={story} />)}
                </div>
                <AddStoryButton />
            </div>
        </section>
    );
};

const TaskFilters = () => {
    const filters = ['All', 'Household', 'Tech', 'Cleaning', 'Delivery', 'Tutoring', 'Other'];
    const [activeFilter, setActiveFilter] = React.useState('All');
    return (
        <section className="w-full">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 -ml-4 pl-4">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={cn(
                            'px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap transform hover:-translate-y-0.5',
                            activeFilter === filter
                                ? 'pill-active'
                                : 'glass-card text-gray-300 hover:bg-white/10 hover:text-white'
                        )}
                    >
                        {filter}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default function HomePage() {
  const advancedListItems = [
      {
          icon: <Zap className="w-6 h-6 text-neon-gold" />,
          title: "Flash Task: Data Entry",
          subtitle: "Complete within 30 mins",
          tag: "New",
          tagColor: "bg-neon-cyan/20 text-neon-cyan"
      },
      {
          icon: <Shield className="w-6 h-6 text-neon-green" />,
          title: "Verify Your ID",
          subtitle: "Enhanced account security",
          tag: "Recommended",
          tagColor: "bg-neon-green/20 text-neon-green"
      },
      {
          icon: <Users className="w-6 h-6 text-neon-pink" />,
          title: "Team Up for a Project",
          subtitle: "A big cleaning gig is available",
          tag: "High Pay",
          tagColor: "bg-neon-pink/20 text-neon-pink"
      }
  ];

  const tasks = [
    { title: "Need Plumber ASAP", price: "₹500", tag: "Urgent", countdown: "00:02:35:34", imageUrl: undefined },
    { title: "Fix My Laptop", price: "₹1200", tag: "Tech", countdown: "00:10:15:02", imageUrl: getImage('task_tech')?.imageUrl },
    { title: "House Deep Cleaning", price: "₹2500", tag: "Household", countdown: "01:05:22:18", imageUrl: getImage('task_cleaning')?.imageUrl }
  ];

  return (
    <>
      <MainHeader />
      <StoriesSection />
      <TaskFilters />

      <section className="w-full grid grid-cols-1 gap-6">
        {tasks.map((task, index) => (
            <TaskCard 
              key={index}
              title={task.title}
              price={task.price}
              tag={task.tag}
              countdown={task.countdown}
              imageUrl={task.imageUrl}
            />
        ))}
      </section>

      <section className="glass-card p-4 w-full">
          <h3 className="font-bold text-lg mb-3 px-2">Priority Hub</h3>
          {advancedListItems.map(item => <AdvancedListItem key={item.title} {...item} />)}
      </section>
    </>
  );
}

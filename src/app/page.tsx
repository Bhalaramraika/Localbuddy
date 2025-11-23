
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
import { cn, formatCurrency, sleep } from '@/lib/utils';

const getImage = (id: string) =>
  PlaceHolderImages.find((img) => img.id === id);

const TaskCardImage = ({ imageUrl, title, tag }: { imageUrl: string, title: string, tag: string }) => (
    <div className="relative w-full h-40 rounded-lg overflow-hidden border border-black/5">
        <Image src={imageUrl} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className={`absolute top-2 right-2 bg-destructive-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transition-all duration-300 group-hover:bg-destructive-accent`}>
            {tag}
        </div>
    </div>
);

const TaskCardHeader = ({ title, price, tag, hasImage }: { title: string, price: string, tag: string, hasImage: boolean }) => (
    <div className="flex justify-between items-start">
        <div className="flex flex-col">
            <h2 className="text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-main-accent">{title}</h2>
            <p className="text-2xl font-bold text-green-600 mt-1">{price}</p>
        </div>
        {!hasImage && (
            <div className="bg-destructive-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transition-all duration-300 group-hover:bg-destructive-accent">
                {tag}
            </div>
        )}
    </div>
);

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
                isAccepted ? "bg-green-500 text-white shadow-lg" : "cyan-glow-button"
            )}
            onClick={handleClick}
            disabled={isLoading || isAccepted}
        >
            {isLoading ? "Accepting..." : (isAccepted ? "Task Accepted" : "Accept Task")}
            {!isAccepted && <Zap className="ml-2 w-5 h-5"/>}
        </Button>
    );
};

const TaskCard = ({ title, price, tag, imageUrl }: { title: string, price: string, tag: string, imageUrl?: string }) => {
  return (
    <div className="glass-card p-4 flex flex-col gap-4 group transition-all duration-300 hover:shadow-2xl hover:shadow-gray-300 hover:-translate-y-1">
      {imageUrl && <TaskCardImage imageUrl={imageUrl} title={title} tag={tag} />}
      <TaskCardHeader title={title} price={price} tag={tag} hasImage={!!imageUrl} />
      <TaskCardButton />
    </div>
  );
};

const AdvancedListItem = ({ icon, title, subtitle, tag, tagColor }: { icon: React.ReactNode, title: string, subtitle: string, tag: string, tagColor: string }) => (
    <div className="flex items-center gap-4 p-3 glass-pill mb-3 transition-all duration-300 hover:bg-gray-100 hover:border-gray-300 border border-transparent rounded-lg cursor-pointer group">
        <div className="p-3 bg-gray-100 rounded-full transition-all duration-300 group-hover:bg-main-accent/10 group-hover:scale-110">
            {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6 transition-colors duration-300 group-hover:text-main-accent' })}
        </div>
        <div className="flex-grow">
            <p className="font-bold text-foreground">{title}</p>
            <p className="text-sm text-gray-500 group-hover:text-gray-600">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
           <span className={`text-xs font-semibold px-2 py-1 rounded-full ${tagColor}`}>{tag}</span>
           <ChevronRight className="w-5 h-5 text-gray-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-main-accent" />
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
        <div className="glass-card rounded-full px-4 py-2 hover:border-green-500/50 border border-transparent transition-all">
          <p className="text-sm font-medium">
            Wallet: <span className="font-bold text-green-600 transition-all duration-500">{formatCurrency(balance, 'INR', 'en-IN')}</span>
          </p>
        </div>
    );
};

const HeaderNotificationBell = () => (
    <div className="relative glass-card p-3 rounded-full cursor-pointer hover:border-destructive-accent/50 border border-transparent transition-all group">
        <Bell className="w-6 h-6 text-gray-400 group-hover:text-destructive-accent transition-colors duration-300" />
        <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-destructive-accent ring-2 ring-transparent animate-pulse group-hover:animate-none shadow-[0_0_8px_var(--destructive-accent)]"></span>
    </div>
);

const HeaderAvatar = ({ userAvatar }: { userAvatar?: { imageUrl: string, description: string }}) => (
    <>
    {userAvatar && (
        <div className="glass-card p-1 rounded-full hover:border-main-accent/50 border-2 border-transparent transition-all">
            <Image
                src={userAvatar.imageUrl}
                alt={userAvatar.description}
                width={48}
                height={48}
                className="rounded-full border-2 border-main-accent"
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
                    `relative w-20 h-20 rounded-full flex items-center justify-center ring-2 ring-offset-4 ring-offset-background bg-gray-100 glass-pill transition-all duration-300 group-hover:ring-4 overflow-hidden`,
                    story.ringColor
                )}
            >
                {storyImage ? (
                    <Image
                        src={storyImage.imageUrl}
                        alt={story.label}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                ) : (
                    <story.Icon className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
                )}
            </div>
            <p className="text-xs text-gray-500 text-center truncate w-full transition-colors duration-300 group-hover:text-foreground">{story.label}</p>
        </div>
    );
};

const AddStoryButton = () => (
    <div className="flex-shrink-0 pl-2">
        <button className="w-16 h-20 rounded-full flex flex-col items-center justify-center glass-pill border-2 border-dashed border-gray-300 transition-all duration-300 hover:border-main-accent hover:text-main-accent hover:scale-105">
            <Plus className="w-6 h-6 text-gray-400 transition-colors duration-300" />
            <p className="text-xs text-gray-400 mt-1 transition-colors duration-300">Add</p>
        </button>
    </div>
);

const StoriesSection = () => {
    const stories = [
        { id: 'story2', label: 'Top Buddies', Icon: Users, ringColor: 'ring-main-accent' },
        { id: 'story1', label: 'Urgent', Icon: Siren, ringColor: 'ring-destructive-accent' },
        { id: 'story3', label: 'Safety Tips', Icon: Shield, ringColor: 'ring-yellow-400' },
        { id: 'user3', label: 'Jenny', Icon: User, ringColor: 'ring-green-400' },
        { id: 'user4', label: 'David', Icon: User, ringColor: 'ring-main-accent' },
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
                                : 'glass-card text-gray-500 hover:bg-gray-100 hover:text-foreground'
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
          icon: <Zap className="w-6 h-6 text-yellow-500" />,
          title: "Flash Task: Data Entry",
          subtitle: "Complete within 30 mins",
          tag: "New",
          tagColor: "bg-main-accent/20 text-main-accent"
      },
      {
          icon: <Shield className="w-6 h-6 text-green-500" />,
          title: "Verify Your ID",
          subtitle: "Enhanced account security",
          tag: "Recommended",
          tagColor: "bg-green-500/20 text-green-600"
      },
      {
          icon: <Users className="w-6 h-6 text-destructive-accent" />,
          title: "Team Up for a Project",
          subtitle: "A big cleaning gig is available",
          tag: "High Pay",
          tagColor: "bg-destructive-accent/20 text-destructive-accent"
      }
  ];

  const tasks = [
    { title: "Need Plumber ASAP", price: "₹500", tag: "Urgent", imageUrl: undefined },
    { title: "Fix My Laptop", price: "₹1200", tag: "Tech", imageUrl: getImage('task_tech')?.imageUrl },
    { title: "House Deep Cleaning", price: "₹2500", tag: "Household", imageUrl: getImage('task_cleaning')?.imageUrl }
  ];

  return (
    <>
      <MainHeader />
      <StoriesSection />
      <TaskFilters />

      <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {tasks.map((task, index) => (
            <TaskCard 
              key={index}
              title={task.title}
              price={task.price}
              tag={task.tag}
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

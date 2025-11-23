
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
  Loader,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import * as React from 'react';
import { cn, formatCurrency } from '@/lib/utils';
import { getTaskSuggestions, TaskSuggestionInput } from '@/ai/flows/suggestion-flow';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore, useCollection, useMemoFirebase, updateDocumentNonBlocking } from '@/firebase';
import { collection, doc, query, where } from 'firebase/firestore';

const getImage = (id: string) =>
  PlaceHolderImages.find((img) => img.id === id);

const TaskCardImage = ({ imageUrl, title, tag }: { imageUrl: string, title: string, tag: string }) => (
    <div className="relative w-full h-40 rounded-lg overflow-hidden border border-black/5">
        <Image src={imageUrl} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className={`absolute top-2 right-2 bg-black/50 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transition-all duration-300 backdrop-blur-sm`}>
            {tag}
        </div>
    </div>
);

const TaskCardHeader = ({ title, price, tag, hasImage }: { title: string, price: number, tag: string, hasImage: boolean }) => (
    <div className="flex justify-between items-start">
        <div className="flex flex-col">
            <h2 className="text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-main-accent">{title}</h2>
            <p className="text-2xl font-bold text-gray-800 mt-1">{formatCurrency(price)}</p>
        </div>
        {!hasImage && (
            <div className="bg-black/50 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-sm">
                {tag}
            </div>
        )}
    </div>
);

const TaskCardButton = ({ task, user }: { task: any, user: User | null }) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const firestore = useFirestore();

    const isAccepted = task.status === 'assigned' && task.buddyId === user?.uid;
    const isMyTask = task.posterId === user?.uid;
    const isUnavailable = task.status !== 'Open';

    const handleClick = async () => {
        if (!firestore || !user) return;
        setIsLoading(true);
        const taskRef = doc(firestore, 'tasks', task.id);
        updateDocumentNonBlocking(taskRef, {
            status: 'assigned',
            buddyId: user.uid
        });
        // No need to set is loading to false, UI will update reactively
    };

    if (isMyTask) {
         return <Button disabled className="w-full h-12 text-base font-bold" variant="outline">Your Task</Button>;
    }
    
    if (isAccepted) {
        return <Button disabled className="w-full h-12 text-base font-bold bg-green-500 text-white">Task Accepted</Button>
    }

    return (
        <Button 
            className="w-full h-12 text-base font-bold transition-all duration-300 ease-in-out transform hover:scale-105 bg-black text-white hover:bg-black/80"
            onClick={handleClick}
            disabled={isLoading || isUnavailable || !user}
        >
            {isLoading && <Loader className="w-5 h-5 animate-spin mr-2" />}
            {isUnavailable ? 'Task Unavailable' : "Accept Task"}
            {!isUnavailable && <Zap className="ml-2 w-5 h-5"/>}
        </Button>
    );
};

const TaskCard = ({ task, user }: { task: any, user: User | null }) => {
  const { title, budget, category, reasoning } = task;
  const imageUrl = getImage(`task_${category?.toLowerCase()}`)?.imageUrl;
  return (
    <div className="glass-card p-4 flex flex-col gap-4 group transition-all duration-300 hover:shadow-2xl hover:shadow-gray-300 hover:-translate-y-1">
      {imageUrl && <TaskCardImage imageUrl={imageUrl} title={title} tag={category} />}
      <TaskCardHeader title={title} price={budget} tag={category} hasImage={!!imageUrl} />
      {reasoning && <p className="text-sm text-gray-600 border-l-2 border-gray-300 pl-3">{reasoning}</p>}
      <TaskCardButton task={task} user={user} />
    </div>
  );
};

const AdvancedListItem = ({ icon, title, subtitle, tag, tagColor }: { icon: React.ReactNode, title: string, subtitle: string, tag: string, tagColor: string }) => (
    <div className="flex items-center gap-4 p-3 glass-pill mb-3 transition-all duration-300 hover:bg-gray-100/80 rounded-lg cursor-pointer group">
        <div className="p-3 bg-gray-100 rounded-full transition-all duration-300 group-hover:bg-black/10 group-hover:scale-110">
            {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6 transition-colors duration-300 group-hover:text-black' })}
        </div>
        <div className="flex-grow">
            <p className="font-bold text-foreground">{title}</p>
            <p className="text-sm text-gray-500 group-hover:text-gray-600">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
           <span className={`text-xs font-semibold px-2 py-1 rounded-full ${tagColor}`}>{tag}</span>
           <ChevronRight className="w-5 h-5 text-gray-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-black" />
        </div>
    </div>
);

const HeaderWalletBalance = ({ balance, isLoading }: { balance: number, isLoading: boolean }) => {
    return (
        <div className="glass-card rounded-full px-4 py-2 hover:border-gray-300/80 border border-transparent transition-all">
          <p className="text-sm font-medium text-gray-700">
            Wallet: {isLoading ? <Loader className="w-4 h-4 inline-block animate-spin"/> : <span className="font-bold text-black transition-all duration-500">{formatCurrency(balance)}</span>}
          </p>
        </div>
    );
};

const HeaderNotificationBell = () => (
    <div className="relative glass-card p-3 rounded-full cursor-pointer hover:border-red-400/50 border border-transparent transition-all group">
        <Bell className="w-6 h-6 text-gray-500 group-hover:text-red-500 transition-colors duration-300" />
        <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white animate-pulse group-hover:animate-none shadow-[0_0_8px_var(--destructive-accent)]"></span>
    </div>
);

const HeaderAvatar = ({ userAvatar }: { userAvatar?: { imageUrl: string, description: string }}) => (
    <>
    {userAvatar && (
        <div className="glass-card p-1 rounded-full hover:border-black/20 border-2 border-transparent transition-all">
            <Image
                src={userAvatar.imageUrl}
                alt={userAvatar.description}
                width={48}
                height={48}
                className="rounded-full border-2 border-gray-200"
            />
        </div>
    )}
    </>
);

const MainHeader = ({ userData, isUserLoading }: { userData: any, isUserLoading: boolean }) => {
    const userAvatar = getImage('user2');
    return (
        <header className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
                <HeaderAvatar userAvatar={userData?.photoUrl ? { imageUrl: userData.photoUrl, description: 'User avatar' } : userAvatar} />
                <HeaderNotificationBell />
            </div>
            <HeaderWalletBalance balance={userData?.walletBalance || 0} isLoading={isUserLoading} />
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
                    `relative w-20 h-20 rounded-full flex items-center justify-center ring-2 ring-offset-2 ring-offset-background bg-gray-100/80 glass-pill transition-all duration-300 group-hover:ring-4 overflow-hidden`,
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
        <button className="w-16 h-20 rounded-full flex flex-col items-center justify-center glass-pill border-2 border-dashed border-gray-300 transition-all duration-300 hover:border-black/50 hover:text-black hover:scale-105">
            <Plus className="w-6 h-6 text-gray-400 transition-colors duration-300" />
            <p className="text-xs text-gray-400 mt-1 transition-colors duration-300">Add</p>
        </button>
    </div>
);

const StoriesSection = () => {
    const stories = [
        { id: 'story2', label: 'Top Buddies', Icon: Users, ringColor: 'ring-gray-400' },
        { id: 'story1', label: 'Urgent', Icon: Siren, ringColor: 'ring-red-500' },
        { id: 'story3', label: 'Safety Tips', Icon: Shield, ringColor: 'ring-blue-500' },
        { id: 'user3', label: 'Jenny', Icon: User, ringColor: 'ring-green-400' },
        { id: 'user4', label: 'David', Icon: User, ringColor: 'ring-purple-400' },
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
                                ? 'bg-black text-white shadow-md'
                                : 'glass-card text-gray-500 hover:bg-gray-200/60 hover:text-foreground'
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
  const { user, isUserLoading: isAuthLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [tasks, setTasks] = React.useState<any[]>([]);

  const userDocRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);
  // Note: We're not using useDoc here because MainHeader will fetch it. We just need the ref.

  const tasksQuery = useMemoFirebase(() => {
      if (!firestore) return null;
      return query(collection(firestore, 'tasks'), where('status', '==', 'Open'));
  }, [firestore]);

  const { data: firestoreTasks, isLoading: areTasksLoading } = useCollection(tasksQuery);

  React.useEffect(() => {
      if (firestoreTasks) {
          setTasks(firestoreTasks);
      }
  }, [firestoreTasks]);

  const advancedListItems = [
      {
          icon: <Zap className="w-6 h-6 text-yellow-500" />,
          title: "Flash Task: Data Entry",
          subtitle: "Complete within 30 mins",
          tag: "New",
          tagColor: "bg-blue-100 text-blue-800"
      },
      {
          icon: <Shield className="w-6 h-6 text-green-500" />,
          title: "Verify Your ID",
          subtitle: "Enhanced account security",
          tag: "Recommended",
          tagColor: "bg-green-100 text-green-800"
      },
      {
          icon: <Users className="w-6 h-6 text-red-500" />,
          title: "Team Up for a Project",
          subtitle: "A big cleaning gig is available",
          tag: "High Pay",
          tagColor: "bg-red-100 text-red-800"
      }
  ];

  const handleGenerateSuggestions = async () => {
    setIsGenerating(true);
    try {
        const input: TaskSuggestionInput = {
            userSkills: ["Plumbing", "Tech Repair", "Driving"],
            currentLocation: "Mumbai",
            taskHistory: [
                { title: "Fix My Laptop", category: "Tech", completed: true },
                { title: "Deliver a package", category: "Delivery", completed: false },
            ]
        };
        const result = await getTaskSuggestions(input);
        const newTasks = result.suggestions.map(s => ({
            ...s, // Spread suggestion properties
            id: `ai_${Date.now()}_${Math.random()}`, // Create a temporary unique ID
            budget: s.estimatedEarning,
            reasoning: s.reasoning,
            status: 'Open',
            posterId: 'ai_generated'
        }));
        setTasks(prev => [...newTasks, ...prev]);
        toast({
            title: "New Tasks Suggested!",
            description: "We've found some new tasks for you.",
        });
    } catch (error) {
        console.error("Failed to get task suggestions", error);
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Could not fetch AI suggestions. Please try again.",
        });
    } finally {
        setIsGenerating(false);
    }
  };

  const { data: userData, isLoading: isUserLoading } = useCollection(userDocRef);

  return (
    <>
      <MainHeader userData={userData} isUserLoading={isAuthLoading || isUserLoading} />
      <StoriesSection />
      <TaskFilters />

      <section className="w-full">
        <Button onClick={handleGenerateSuggestions} disabled={isGenerating} className="w-full h-14 mb-6 text-lg font-bold bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
            {isGenerating ? (
                <>
                    <Loader className="mr-2 h-5 w-5 animate-spin" />
                    Generating Suggestions...
                </>
            ) : (
                "Get AI Suggestions"
            )}
        </Button>
      </section>

      <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {areTasksLoading ? (
            <div className="col-span-full flex justify-center items-center h-40">
                <Loader className="w-12 h-12 animate-spin text-main-accent" />
            </div>
        ) : tasks && tasks.length > 0 ? (
            tasks.map((task, index) => (
                <TaskCard 
                  key={task.id || index}
                  task={task}
                  user={user}
                />
            ))
        ) : (
            <div className="col-span-full text-center text-gray-500 py-10 glass-card">
                <p>No open tasks available right now. Check back later!</p>
            </div>
        )}
      </section>

      <section className="glass-card p-4 w-full">
          <h3 className="font-bold text-lg mb-3 px-2">Priority Hub</h3>
          {advancedListItems.map(item => <AdvancedListItem key={item.title} {...item} />)}
      </section>
    </>
  );
}

    
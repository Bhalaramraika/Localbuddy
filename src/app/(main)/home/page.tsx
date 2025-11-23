'use client'
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Siren, Shield } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

const HomeHeader = () => (
  <div className="flex items-center justify-between p-4 glass-card mx-4">
    <Avatar className="h-12 w-12 border-2 border-primary glass-card p-0.5">
      <AvatarImage src={PlaceHolderImages.find(img => img.id === "user1")?.imageUrl} alt={"Sarah Williams"} />
      <AvatarFallback className="glass-card">S</AvatarFallback>
    </Avatar>
    <div className="flex items-center gap-4">
       <div className="relative glass-card h-12 w-12 flex items-center justify-center rounded-full">
        <Bell className="h-7 w-7 text-white/80" />
        <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-destructive animate-pulse border-2 border-background"></span>
      </div>
      <div className="pill-chip glass-card">
        <p className="font-semibold text-sm text-white drop-shadow-lg">Wallet: ₹1,500</p>
      </div>
    </div>
  </div>
);

const stories = [
    { id: 2, imageId: "story2", label: "Top Buddies", icon: null },
    { id: 1, imageId: "story1", label: "Urgent", icon: Siren, ringColor: "ring-destructive" },
    { id: 3, imageId: "story3", label: "Safety Tips", icon: Shield, ringColor: "ring-secondary" },
];

const Stories = () => (
  <div className="pl-4 mt-6">
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex w-max space-x-6 pb-4">
        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center gap-2.5 text-center w-20 shrink-0">
             <div className={cn(
                 "p-0.5 rounded-full glass-card",
                 story.icon ? `${story.ringColor} ring-2 ring-offset-4 ring-offset-background` : 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500'
             )}>
              <Avatar className={cn(
                  "h-16 w-16 border-2 glass-card p-0.5",
                  story.icon ? "border-transparent bg-white/5 flex items-center justify-center" : "border-background bg-background"
              )}>
                {story.icon ? <story.icon className="h-8 w-8 text-white"/> : <AvatarImage src={PlaceHolderImages.find(img => img.id === story.imageId)?.imageUrl} />}
                <AvatarFallback className="glass-card">{story.label.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <p className="text-xs font-medium text-white/90 truncate w-full drop-shadow-lg">{story.label}</p>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="hidden" />
    </ScrollArea>
  </div>
);

const FilterChips = () => {
    const categories = ["All", "Household", "Tech", "Cleaning"];
    return (
        <div className="px-4 mt-2">
            <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max space-x-3 pb-2">
                {categories.map((category, index) => (
                <div 
                    key={category} 
                    className={cn(
                        "pill-chip glass-card text-white/90 drop-shadow-lg",
                         index === 0 && "bg-primary/20 border-primary/30 text-white font-bold"
                    )}
                >
                    {category}
                </div>
                ))}
            </div>
            <ScrollBar orientation="horizontal" className="hidden" />
            </ScrollArea>
        </div>
    )
};


const TaskCard = () => (
    <div className="glass-card overflow-hidden shadow-lg animate-fade-in-up relative mx-4">
        <div className="absolute top-4 right-4 pill-chip glass-card bg-destructive/50 text-white text-xs px-3 h-7">Urgent</div>
      <div className="p-6 flex flex-col items-center text-center">
        <h3 className="font-bold text-2xl text-white mt-4 drop-shadow-lg">Need Plumber ASAP</h3>
        <p className="text-5xl font-bold text-success my-4 drop-shadow-[0_2px_4px_rgba(0,255,148,0.5)]">₹500</p>
        
        <div className="glass-card bg-destructive/20 p-2 rounded-lg text-center mb-6 w-full">
            <p className="text-xs text-destructive font-semibold drop-shadow-lg">Countdown: 00:02:35:34</p>
        </div>

        <Button size="lg" className="w-full h-14 glass-card bg-primary/20 border-primary/30 text-primary-foreground font-bold text-base cyan-glow">
            Accept Task
        </Button>
      </div>
    </div>
  );

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6 pt-10">
      <HomeHeader />
      <Stories />
      <FilterChips />
      <div className="mt-6">
        <TaskCard />
      </div>
    </div>
  );
}

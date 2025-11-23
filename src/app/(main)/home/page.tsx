import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Map, Search, MapPin, Clock } from "lucide-react";
import { tasks, categories, stories, currentUser } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const HomeHeader = () => (
  <div className="flex items-center justify-between p-4">
    <div className="flex items-center gap-3">
      <Avatar className="h-12 w-12 border-2 border-primary">
        <AvatarImage src={PlaceHolderImages.find(img => img.id === currentUser.avatarId)?.imageUrl} alt={currentUser.name} />
        <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm text-muted-foreground">Welcome back,</p>
        <h2 className="text-xl font-bold font-headline">{currentUser.name}</h2>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="text-right">
        <p className="text-sm font-semibold text-primary">₹{currentUser.walletBalance.toLocaleString()}</p>
        <p className="text-xs text-muted-foreground">Balance</p>
      </div>
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-6 w-6" />
        <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-destructive animate-pulse"></span>
      </Button>
    </div>
  </div>
);

const Stories = () => (
  <div className="px-4">
    <ScrollArea className="w-full whitespace-nowrap rounded-lg">
      <div className="flex w-max space-x-4 pb-4">
        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center gap-2 text-center w-20 shrink-0">
             <div className="p-1 rounded-full bg-gradient-to-tr from-secondary to-primary">
              <Avatar className="h-16 w-16 border-2 border-background">
                <AvatarImage src={PlaceHolderImages.find(img => img.id === story.imageId)?.imageUrl} />
                <AvatarFallback>{story.label.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <p className="text-xs font-medium truncate w-full">{story.label}</p>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  </div>
);

const SearchAndFilters = () => (
  <div className="px-4 space-y-4">
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input placeholder="Search for tasks..." className="pl-10 h-12 rounded-full" />
      <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2">
        <Map className="h-5 w-5" />
      </Button>
    </div>
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex w-max space-x-2 pb-2">
        {categories.map((category, index) => (
          <Button key={category} variant={index === 0 ? "default" : "outline"} className="rounded-full">
            {category}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  </div>
);

import { Input } from "@/components/ui/input";

const TaskCard = ({ task }: { task: typeof tasks[0] }) => (
  <Card className="overflow-hidden bg-card/60 dark:bg-card/40 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg animate-fade-in-up rounded-2xl">
    <CardContent className="p-4">
      <div className="flex items-start gap-4">
        <Avatar className="h-12 w-12 border-2 border-muted">
          <AvatarImage src={PlaceHolderImages.find(img => img.id === task.poster.avatarId)?.imageUrl} alt={task.poster.name} />
          <AvatarFallback>{task.poster.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg font-headline">{task.title}</h3>
              <p className="text-sm text-muted-foreground">{task.poster.name} • <Badge variant="secondary" className="bg-gold-yellow/20 text-gold-yellow">{task.poster.level}</Badge></p>
            </div>
            <p className="text-2xl font-bold text-trust-green">₹{task.price}</p>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground mt-3">
             <div className="flex items-center gap-4">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {task.location}</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {task.deadline}</span>
             </div>
            <Button className="bg-trust-green hover:bg-trust-green/90 text-primary-foreground shimmer-button">
              Accept Task
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6 pt-4">
      <HomeHeader />
      <Stories />
      <SearchAndFilters />
      <div className="px-4 space-y-4">
        <h2 className="text-2xl font-bold font-headline">Nearby Tasks</h2>
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

// Add this CSS for the shimmer effect to a global CSS file or a style tag if needed.
// For simplicity, it's mentioned here but should be in globals.css.
const style = `
.shimmer-button {
  position: relative;
  overflow: hidden;
}

.shimmer-button::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 200%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2.5s infinite;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}
`;

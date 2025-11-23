'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Map, Search, MapPin, Clock, Wallet } from "lucide-react";
import { tasks, categories, stories, currentUser } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const HomeHeader = () => (
  <div className="flex items-center justify-between p-4">
    <div className="flex items-center gap-3">
      <Avatar className="h-10 w-10 border-2 border-primary">
        <AvatarImage src={PlaceHolderImages.find(img => img.id === currentUser.avatarId)?.imageUrl} alt={currentUser.name} />
        <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
      </Avatar>
    </div>
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" className="relative glass-card h-10 w-10">
        <Bell className="h-5 w-5" />
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive animate-pulse"></span>
      </Button>
      <div className="glass-card flex items-center gap-2 px-3 py-1.5">
        <Wallet className="h-5 w-5 text-muted-foreground" />
        <p className="font-semibold text-sm">₹{currentUser.walletBalance.toLocaleString()}</p>
      </div>
    </div>
  </div>
);

const Stories = () => (
  <div className="pl-4">
    <h2 className="text-xl font-bold font-headline mb-3">Stories</h2>
    <ScrollArea className="w-full whitespace-nowrap rounded-lg">
      <div className="flex w-max space-x-4 pb-4">
        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center gap-2 text-center w-20 shrink-0">
             <div className="p-0.5 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
              <Avatar className="h-16 w-16 border-2 border-background bg-background">
                <AvatarImage src={PlaceHolderImages.find(img => img.id === story.imageId)?.imageUrl} />
                <AvatarFallback>{story.label.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <p className="text-xs font-medium truncate w-full">{story.label}</p>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="hidden" />
    </ScrollArea>
  </div>
);

const FilterChips = () => (
  <div className="pl-4">
    <h2 className="text-xl font-bold font-headline mb-3">Filters</h2>
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex w-max space-x-2 pb-2">
        {categories.map((category, index) => (
          <Button key={category} variant={index === 0 ? "secondary" : "ghost"} 
          className={cn(
            "rounded-full h-9",
            index === 0 ? "bg-primary/80 text-primary-foreground" : "glass-card"
          )}>
            {category}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="hidden" />
    </ScrollArea>
  </div>
);

import { Input } from "@/components/ui/input";

const TaskCard = ({ task }: { task: typeof tasks[0] }) => (
    <Card className="glass-card overflow-hidden shadow-lg animate-fade-in-up">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
            <p className="text-sm text-muted-foreground">Main Task</p>
            <Badge variant="destructive" className="bg-red-500/80 text-white">Urgent</Badge>
        </div>
        <h3 className="font-bold text-xl font-headline mb-1">{task.title}</h3>
        <p className="text-3xl font-bold text-primary mb-3">₹{task.price}</p>
        
        <div className="glass-card bg-black/20 p-2 rounded-lg text-center mb-4">
            <p className="text-xs text-red-400">Countdown: {task.deadline}</p>
        </div>

        <Button size="lg" className="w-full h-12 bg-primary/80 text-primary-foreground font-bold text-base hover:bg-primary">
            Accept Task
        </Button>
      </CardContent>
    </Card>
  );

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6 pt-4">
      <HomeHeader />
      <Stories />
      <FilterChips />
      <div className="px-4 space-y-4">
        {tasks.slice(0,1).map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ChevronLeft, Phone, Mic } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ChatHeader = () => (
    <div className="p-4 border-b border-white/10 glass-card flex items-center justify-between sticky top-0 z-20 rounded-b-3xl rounded-t-none">
        <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild className="glass-card rounded-full">
                <Link href="/home">
                    <ChevronLeft className="h-6 w-6 text-white"/>
                </Link>
            </Button>
            <Avatar className="h-10 w-10 glass-card p-0.5 rounded-full">
                <AvatarImage src={PlaceHolderImages.find(p => p.id === "user2")?.imageUrl} alt={"Rahul"} />
                <AvatarFallback className="glass-card">R</AvatarFallback>
            </Avatar>
            <h1 className="text-xl font-bold text-white">Rahul</h1>
        </div>
        <div className="flex items-center gap-4">
            <Phone className="h-6 w-6 text-white/70"/>
            <Button className="h-11 px-5 glass-card bg-destructive/50 text-white font-bold text-sm rounded-full shadow-[0_0_15px] shadow-destructive/70">
                SOS
            </Button>
        </div>
    </div>
);

const MessageBubble = ({ message, isCurrentUser }: { message: { content: string }, isCurrentUser: boolean }) => (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in-up`}>
        <div className={cn(
            'max-w-xs lg:max-w-md px-5 py-3 glass-card',
            isCurrentUser ? 'bg-white/20 rounded-br-lg' : 'bg-blue-500/20 rounded-bl-lg'
        )}>
            <p className="text-white drop-shadow-md">{message.content}</p>
        </div>
    </div>
);

const VoiceMessageBubble = () => (
    <div className="flex justify-start mb-4 animate-fade-in-up">
        <div className="glass-card bg-blue-500/20 rounded-2xl rounded-bl-lg flex items-center gap-3 px-4 py-3">
            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full glass-card bg-primary/20 text-primary-foreground">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 7.5L11.5 3.26795V11.732L3.5 7.5Z" fill="currentColor"></path></svg>
            </Button>
            <div className="flex items-center gap-0.5 h-6">
                {[...Array(15)].map((_, i) => (
                    <span key={i} style={{height: `${Math.random() * 70 + 20}%`}} className="w-0.5 bg-white/70 rounded-full"></span>
                ))}
            </div>
        </div>
    </div>
)

const ActionHub = () => (
    <div className="fixed bottom-24 left-0 right-0 z-30 p-3 md:p-5 md:bottom-5">
        <div className="glass-card p-4 space-y-4 rounded-3xl">
            <h3 className="text-lg font-bold text-white px-2 drop-shadow-md">Action Hub</h3>
            <div className="relative">
                <Input placeholder="Your text here..." className="glass-card border-none rounded-full h-12 pl-5 pr-12 text-white placeholder:text-white/60" />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full glass-card">
                        <Mic className="h-5 w-5 text-white/70" />
                    </Button>
                </div>
            </div>
             <Button className="w-full h-14 text-lg font-semibold glass-card bg-secondary/30 text-secondary-foreground gold-glow rounded-xl">
                Release Payment 💸
            </Button>
        </div>
    </div>
);

export default function ChatPage() {
  const messages = [
    { content: "Hi ywuams on call rou time with kiney payment to resure urhent you rowii", isCurrentUser: false },
    { content: "Hey low; release payment your phone?", isCurrentUser: true },
    { content: "We've in now your voice note || can change you about me Rahul?", isCurrentUser: false },
  ];

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader />

      <ScrollArea className="flex-1 px-4 pt-4">
        {messages.map((msg, i) => (
            <MessageBubble key={i} message={msg} isCurrentUser={msg.isCurrentUser} />
        ))}
        <VoiceMessageBubble />
      </ScrollArea>
      <ActionHub />
    </div>
  );
}

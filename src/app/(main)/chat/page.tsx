import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ChevronLeft, Phone, Mic } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ChatHeader = () => (
    <div className="p-4 border-b border-white/10 bg-black/20 backdrop-blur-lg sticky top-0 z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
                <Link href="/home">
                    <ChevronLeft className="h-6 w-6"/>
                </Link>
            </Button>
            <Avatar className="h-10 w-10">
                <AvatarImage src={PlaceHolderImages.find(p => p.id === "user2")?.imageUrl} alt={"Rahul"} />
                <AvatarFallback>R</AvatarFallback>
            </Avatar>
            <h1 className="text-xl font-bold text-white">Rahul</h1>
        </div>
        <div className="flex items-center gap-4">
            <Phone className="h-6 w-6 text-muted-foreground"/>
            <Button className="h-11 px-5 bg-destructive text-white font-bold text-sm rounded-full shadow-[0_0_15px] shadow-destructive/70">
                SOS
            </Button>
        </div>
    </div>
);

const MessageBubble = ({ message, isCurrentUser }: { message: { content: string }, isCurrentUser: boolean }) => (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in-up`}>
        <div className={cn(
            'max-w-xs lg:max-w-md px-5 py-3 rounded-2xl glass-card',
            isCurrentUser ? 'bg-white/10 rounded-br-lg' : 'bg-blue-500/20 border-blue-400/20 rounded-bl-lg'
        )}>
            <p className="text-white">{message.content}</p>
        </div>
    </div>
);

const VoiceMessageBubble = () => (
    <div className="flex justify-start mb-4 animate-fade-in-up">
        <div className="glass-card bg-blue-500/20 border-blue-400/20 rounded-2xl rounded-bl-lg flex items-center gap-3 px-4 py-3">
            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-primary text-primary-foreground">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 7.5L11.5 3.26795V11.732L3.5 7.5Z" fill="currentColor"></path></svg>
            </Button>
            <div className="flex items-center gap-0.5 h-6">
                {[...Array(15)].map((_, i) => (
                    <span key={i} style={{height: `${Math.random() * 70 + 20}%`}} className="w-0.5 bg-muted-foreground rounded-full"></span>
                ))}
            </div>
        </div>
    </div>
)

const ActionHub = () => (
    <div className="fixed bottom-0 left-0 right-0 z-30 p-3">
        <div className="glass-card p-4 space-y-4">
            <h3 className="text-lg font-bold text-white px-2">Action Hub</h3>
            <div className="relative">
                <Input placeholder="Your text here..." className="glass-card border-none rounded-full h-12 pl-5 pr-12 text-white" />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                        <Mic className="h-5 w-5 text-muted-foreground" />
                    </Button>
                </div>
            </div>
             <Button className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-amber-400 to-yellow-500 text-black gold-glow">
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

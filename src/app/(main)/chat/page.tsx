import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chats, currentUser } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ChevronLeft, Phone, Search, Smile, Paperclip, Mic, Landmark } from "lucide-react";
import Link from "next/link";


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
            <h1 className="text-xl font-bold">Rahul</h1>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="glass-card h-11 w-11">
                <Phone className="h-5 w-5" />
            </Button>
            <Button className="h-11 px-4 bg-red-500/90 text-white font-bold text-sm">
                SOS
            </Button>
        </div>
    </div>
);

const MessageBubble = ({ message, isCurrentUser }: { message: { content: string }, isCurrentUser: boolean }) => (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in-up`}>
        <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-3xl ${isCurrentUser ? 'bg-primary/90 text-primary-foreground rounded-br-lg' : 'glass-card bg-white/10 rounded-bl-lg'}`}>
            <p>{message.content}</p>
        </div>
    </div>
);

const VoiceMessageBubble = () => (
    <div className="flex justify-start mb-4 animate-fade-in-up">
        <div className="glass-card bg-white/10 rounded-3xl rounded-bl-lg flex items-center gap-3 px-4 py-3">
            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-primary text-primary-foreground">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 7.5L11.5 3.26795V11.732L3.5 7.5Z" fill="currentColor"></path></svg>
            </Button>
            {/* Dummy waveform */}
            <div className="flex items-center gap-0.5 h-6">
                <span className="w-0.5 h-2 bg-muted-foreground rounded-full"></span>
                <span className="w-0.5 h-4 bg-muted-foreground rounded-full"></span>
                <span className="w-0.5 h-5 bg-muted-foreground rounded-full"></span>
                <span className="w-0.5 h-3 bg-muted-foreground rounded-full"></span>
                <span className="w-0.5 h-2 bg-muted-foreground rounded-full"></span>
                <span className="w-0.5 h-2 bg-muted-foreground rounded-full"></span>
                <span className="w-0.5 h-4 bg-muted-foreground rounded-full"></span>
                <span className="w-0.5 h-5 bg-muted-foreground rounded-full"></span>
                <span className="w-0.5 h-6 bg-muted-foreground rounded-full"></span>
                <span className="w-0.5 h-4 bg-muted-foreground rounded-full"></span>
                <span className="w-0's life?'.5 h-5 bg-muted-foreground rounded-full"></span>
                <span className="w-0.5 h-3 bg-muted-foreground rounded-full"></span>
            </div>
            <p className="text-xs text-muted-foreground">SOS</p>
        </div>
    </div>
)

const MessageInput = () => (
    <div className="p-4 bg-black/20 backdrop-blur-lg sticky bottom-24 z-20">
        <div className="glass-card p-4 space-y-3">
            <p className="text-sm font-semibold">Action Hub</p>
            <div className="relative">
                <Input placeholder="Your text here..." className="bg-black/20 border-none rounded-full h-12 pl-4 pr-24" />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                        <Mic className="h-5 w-5" />
                    </Button>
                </div>
            </div>
             <Button className="w-full h-12 text-base font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/90 gold-glow">
                Release Payment
                <Landmark className="ml-2 h-5 w-5" />
            </Button>
        </div>
    </div>
);

export default function ChatPage() {
  const messages = [
    { content: "Hi yıyırams on call rou time with kiney payment to resure urhent you rowii", isCurrentUser: true },
    { content: "Hey low; release payment your phone?", isCurrentUser: false },
    { content: "We've in now your voice note || can change you about me Rahul?", isCurrentUser: false },
  ];

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader />

      <ScrollArea className="flex-1 px-4 pt-4">
        <p className="text-center text-xs text-muted-foreground mb-4">Today New</p>
        {messages.map((msg, i) => (
            <MessageBubble key={i} message={msg} isCurrentUser={msg.isCurrentUser} />
        ))}
        <VoiceMessageBubble />
      </ScrollArea>
      <MessageInput />
    </div>
  );
}

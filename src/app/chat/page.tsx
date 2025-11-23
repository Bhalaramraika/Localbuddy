
'use client';
import Image from 'next/image';
import { Phone, Mic, MoreVertical, Paperclip, Send, Camera, Play, Pause, Trash2, FileText, MapPin } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

const UserAvatar = ({ imageUrl, alt, borderColor }: { imageUrl: string; alt: string; borderColor: string }) => (
    <Image src={imageUrl} alt={alt} width={32} height={32} className={cn("rounded-full border-2", borderColor)} />
);

const MessageBubble = ({ children, isOutgoing }: { children: React.ReactNode, isOutgoing: boolean }) => (
    <div
        className={cn(
            "glass-card max-w-xs p-3 rounded-2xl group relative",
            isOutgoing ? "rounded-br-lg bg-white/10" : "rounded-bl-lg bg-main-accent/10"
        )}
    >
        {children}
        <div className="absolute -bottom-5 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <Trash2 className="w-4 h-4 text-red-400 cursor-pointer hover:text-destructive-accent" />
        </div>
    </div>
);

const MessageTimestamp = ({ time, isOutgoing }: { time: string; isOutgoing: boolean }) => (
    <span className={cn("text-xs text-gray-500 mt-1", isOutgoing ? 'text-right' : 'text-left')}>{time}</span>
);

const ChatMessage = ({ text, isOutgoing, time }: { text: React.ReactNode; isOutgoing: boolean; time: string }) => {
    return (
        <div className={cn("flex items-end gap-2", isOutgoing ? "justify-end" : "justify-start")}>
            {!isOutgoing && <UserAvatar imageUrl={getImage('user2')?.imageUrl || ''} alt="User" borderColor="border-main-accent" />}
            <div className="flex flex-col">
                <MessageBubble isOutgoing={isOutgoing}>
                    {text}
                </MessageBubble>
                <MessageTimestamp time={time} isOutgoing={isOutgoing} />
            </div>
             {isOutgoing && <UserAvatar imageUrl={getImage('user1')?.imageUrl || ''} alt="My Avatar" borderColor="border-secondary-accent" />}
        </div>
    );
};

const VoiceNote = ({ duration, progress: initialProgress, isOutgoing }: { duration: string; initialProgress: number, isOutgoing: boolean }) => {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [progress, setProgress] = React.useState(initialProgress);

    React.useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress(p => {
                    if (p >= 100) {
                        setIsPlaying(false);
                        return 100;
                    }
                    return p + 5;
                });
            }, 200);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const togglePlay = () => {
        if (progress >= 100) setProgress(0);
        setIsPlaying(!isPlaying);
    };

    return (
        <div className={cn("flex items-center gap-3 w-52")}>
            <button onClick={togglePlay}>
                {isPlaying ? <Pause className="w-6 h-6 text-main-accent cursor-pointer" /> : <Play className="w-6 h-6 text-main-accent cursor-pointer" />}
            </button>
            <div className="w-full h-1 bg-gray-500/50 rounded-full relative">
                <div className="absolute top-0 left-0 h-full bg-main-accent" style={{ width: `${progress}%` }}></div>
                <div className="absolute top-1/2 -translate-y-1/2 h-3 w-3 bg-white rounded-full" style={{ left: `calc(${progress}% - 6px)`}}></div>
            </div>
            <span className="text-xs text-gray-400">{duration}</span>
        </div>
    );
};

const ImageAttachment = ({ imageUrl }: { imageUrl: string }) => (
    <Image src={imageUrl} width={200} height={150} alt="attachment" className="rounded-lg border border-white/10 transition-transform duration-300 hover:scale-105 cursor-pointer" />
);

const LocationAttachment = () => (
    <div className="flex items-center gap-2 text-main-accent p-2 glass-pill rounded-lg cursor-pointer hover:bg-main-accent/20">
        <MapPin className="w-6 h-6" />
        <div>
            <p className="font-bold text-sm text-white">Location Shared</p>
            <p className="text-xs">Click to view map</p>
        </div>
    </div>
);


const ChatHeader = () => {
    const userAvatar = getImage('user2');
    return (
        <header className="glass-card flex items-center justify-between p-3">
            <div className="flex items-center gap-3">
                {userAvatar && (
                    <Image
                        src={userAvatar.imageUrl}
                        alt="Rahul's Avatar"
                        width={40}
                        height={40}
                        className="rounded-full border-2 border-main-accent"
                    />
                )}
                <div>
                    <span className="font-bold text-lg">Rahul</span>
                    <p className="text-xs text-green-400 flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full inline-block animate-pulse"></span>
                        Online
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 cursor-pointer hover:text-main-accent transition-colors" />
                <div className="relative px-4 py-1.5 rounded-full bg-destructive-accent/80 cursor-pointer shadow-[0_0_10px_var(--destructive-accent)] hover:bg-destructive-accent transition-all hover:scale-110">
                    <span className="font-bold text-sm">SOS</span>
                </div>
                <MoreVertical className="w-6 h-6 cursor-pointer hover:text-main-accent transition-colors" />
            </div>
        </header>
    );
};

const AttachmentMenu = ({ onSelect }: { onSelect: (type: string) => void }) => (
    <div className="absolute bottom-32 left-4 w-48 glass-card p-2 rounded-lg shadow-lg">
        <div className="flex flex-col gap-1">
            <button onClick={() => onSelect('camera')} className="flex items-center gap-2 p-2 text-sm rounded-md hover:bg-white/10"><Camera className="w-5 h-5 text-main-accent"/> Photo/Video</button>
            <button onClick={() => onSelect('document')} className="flex items-center gap-2 p-2 text-sm rounded-md hover:bg-white/10"><FileText className="w-5 h-5 text-secondary-accent"/> Document</button>
            <button onClick={() => onSelect('location')} className="flex items-center gap-2 p-2 text-sm rounded-md hover:bg-white/10"><MapPin className="w-5 h-5 text-green-400"/> Location</button>
        </div>
    </div>
);

const ChatFooter = ({ onSend }: { onSend: (message: any) => void }) => {
    const [message, setMessage] = React.useState('');
    const [showAttachments, setShowAttachments] = React.useState(false);

    const handleSend = () => {
        if (message.trim()) {
            onSend({ type: 'text', content: message, isOutgoing: true, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute:'2-digit' }) });
            setMessage('');
        }
    };

    const handleAttachmentSelect = (type: string) => {
        if (type === 'location') {
             onSend({ type: 'location', isOutgoing: true, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute:'2-digit' }) });
        }
        setShowAttachments(false);
    };

    return (
        <div className="mt-auto">
            {showAttachments && <AttachmentMenu onSelect={handleAttachmentSelect} />}
            <div className="glass-card p-4">
                <div className="relative flex items-center w-full mb-4">
                    <button onClick={() => setShowAttachments(!showAttachments)} className="absolute left-4 z-10">
                        <Paperclip className="w-6 h-6 text-gray-400 cursor-pointer hover:text-main-accent" />
                    </button>
                    <Input
                        type="text"
                        placeholder="Your text here..."
                        className="glass-card w-full h-12 px-12 rounded-full border-none focus-visible:ring-2 focus-visible:ring-main-accent"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <div className="absolute right-4 flex items-center gap-3">
                        <Camera className="w-6 h-6 text-gray-400 cursor-pointer hover:text-main-accent" />
                        <Mic className="w-6 h-6 text-gray-400 cursor-pointer hover:text-main-accent" />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="outline" className="flex-1 h-14 text-lg font-bold rounded-full glass-card border-secondary-accent/50 text-secondary-accent hover:bg-secondary-accent/10 hover:text-secondary-accent">
                    Request Payment
                    </Button>
                    <Button onClick={handleSend} className="flex-1 h-14 text-lg font-bold rounded-full cyan-glow-button">
                    <Send className="w-5 h-5 mr-2" /> Send
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default function ChatPage() {
  const [messages, setMessages] = React.useState([
      { type: 'text', content: "Hi, are you on your way? I'm waiting at the location.", isOutgoing: false, time: '10:30 AM' },
      { type: 'text', content: "Hey, almost there. Please release the payment from escrow.", isOutgoing: true, time: '10:32 AM' },
      { type: 'voice', duration: "0:23", progress: 33, isOutgoing: false, time: '10:33 AM' },
      { type: 'text', content: "Okay, I've just released it. Check your wallet.", isOutgoing: false, time: '10:34 AM' },
      { type: 'text', content: "Got it, thanks! I'm just around the corner.", isOutgoing: true, time: '10:35 AM' },
      { type: 'image', imageUrl: getImage('task_household')?.imageUrl, isOutgoing: true, time: '10:36 AM' },
      { type: 'location', isOutgoing: false, time: '10:38 AM' }
  ]);

  const handleSend = (newMessage: any) => {
      setMessages(prev => [...prev, newMessage]);
  };

  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if(viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  return (
    <div className="w-full h-[calc(100vh-150px)] flex flex-col">
      <ChatHeader />
      <ScrollArea className="flex-grow my-4 -mx-4" ref={scrollAreaRef}>
        <div className="p-4 space-y-6">
            {messages.map((msg, index) => (
                <div key={index}>
                    {msg.type === 'text' && <ChatMessage text={<p className="text-sm">{msg.content}</p>} isOutgoing={msg.isOutgoing} time={msg.time} />}
                    {msg.type === 'voice' && <ChatMessage text={<VoiceNote duration={msg.duration} initialProgress={msg.progress} isOutgoing={msg.isOutgoing}/>} isOutgoing={msg.isOutgoing} time={msg.time} />}
                    {msg.type === 'image' && msg.imageUrl && <ChatMessage text={<ImageAttachment imageUrl={msg.imageUrl}/>} isOutgoing={msg.isOutgoing} time={msg.time} />}
                    {msg.type === 'location' && <ChatMessage text={<LocationAttachment />} isOutgoing={msg.isOutgoing} time={msg.time} />}
                </div>
            ))}
        </div>
      </ScrollArea>
      <ChatFooter onSend={handleSend} />
    </div>
  );
}

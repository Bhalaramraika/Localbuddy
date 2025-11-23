
'use client';
import Image from 'next/image';
import { Phone, Mic, MoreVertical, Paperclip, Send, Camera, Play, Pause, Trash2, FileText, MapPin, Loader, IndianRupee } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSearchParams } from 'next/navigation';
import { useUser, useFirestore, useDoc, useMemoFirebase, updateDocumentNonBlocking, addDocumentNonBlocking, useCollection } from '@/firebase';
import { doc, collection, writeBatch, runTransaction, getDoc, increment, query, where, orderBy, onSnapshot } from 'firebase/firestore';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

const UserAvatar = ({ imageUrl, alt, borderColor }: { imageUrl: string; alt: string; borderColor: string }) => (
    <Image src={imageUrl} alt={alt} width={32} height={32} className={cn("rounded-full border-2", borderColor)} />
);

const MessageBubble = ({ children, isOutgoing }: { children: React.ReactNode, isOutgoing: boolean }) => (
    <div
        className={cn(
            "glass-card max-w-xs p-3 rounded-2xl group relative",
            isOutgoing ? "rounded-br-lg bg-gray-100" : "rounded-bl-lg bg-main-accent/10"
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

const ChatMessage = ({ text, isOutgoing, time, userDetails }: { text: React.ReactNode; isOutgoing: boolean; time: string, userDetails?: any }) => {
    const avatarUrl = isOutgoing ? userDetails?.photoUrl : getImage('user2')?.imageUrl;
    const borderColor = isOutgoing ? "border-secondary-accent" : "border-main-accent";
    
    return (
        <div className={cn("flex items-end gap-2", isOutgoing ? "justify-end" : "justify-start")}>
            {!isOutgoing && <UserAvatar imageUrl={avatarUrl || ''} alt="User" borderColor={borderColor} />}
            <div className="flex flex-col">
                <MessageBubble isOutgoing={isOutgoing}>
                    {text}
                </MessageBubble>
                <MessageTimestamp time={time} isOutgoing={isOutgoing} />
            </div>
             {isOutgoing && <UserAvatar imageUrl={avatarUrl || ''} alt="My Avatar" borderColor={borderColor} />}
        </div>
    );
};

const VoiceNote = ({ duration, progress: initialProgress }: { duration: string; initialProgress: number }) => {
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
                <div className="absolute top-1/2 -translate-y-1/2 h-3 w-3 bg-foreground rounded-full" style={{ left: `calc(${progress}% - 6px)`}}></div>
            </div>
            <span className="text-xs text-gray-400">{duration}</span>
        </div>
    );
};

const ImageAttachment = ({ imageUrl }: { imageUrl: string }) => (
    <Image src={imageUrl} width={200} height={150} alt="attachment" className="rounded-lg border border-gray-200 transition-transform duration-300 hover:scale-105 cursor-pointer" />
);

const LocationAttachment = () => (
    <div className="flex items-center gap-2 text-main-accent p-2 glass-pill rounded-lg cursor-pointer hover:bg-main-accent/20">
        <MapPin className="w-6 h-6" />
        <div>
            <p className="font-bold text-sm text-foreground">Location Shared</p>
            <p className="text-xs">Click to view map</p>
        </div>
    </div>
);


const ChatHeader = ({ taskData, isLoading }: { taskData: any, isLoading: boolean }) => {
    const userAvatar = getImage('user2');

    if (isLoading || !taskData) {
        return (
            <header className="glass-card flex items-center justify-between p-3">
                <Loader className="w-6 h-6 animate-spin" />
            </header>
        )
    }

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
                    <span className="font-bold text-lg">{taskData.title}</span>
                    <p className={cn(
                        "text-xs flex items-center gap-1",
                        taskData.status === 'Open' && 'text-blue-500',
                        taskData.status === 'assigned' && 'text-yellow-500',
                        taskData.status === 'completed' && 'text-green-500',
                        taskData.status === 'paid' && 'text-purple-500',
                    )}>
                        <span className="w-2 h-2 bg-current rounded-full inline-block animate-pulse"></span>
                        Status: {taskData.status}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 cursor-pointer hover:text-main-accent transition-colors" />
                <div className="relative px-4 py-1.5 rounded-full bg-destructive-accent/80 cursor-pointer shadow-[0_0_10px_var(--destructive-accent)] hover:bg-destructive-accent transition-all hover:scale-110">
                    <span className="font-bold text-sm text-white">SOS</span>
                </div>
                <MoreVertical className="w-6 h-6 cursor-pointer hover:text-main-accent transition-colors" />
            </div>
        </header>
    );
};

const AttachmentMenu = ({ onSelect }: { onSelect: (type: string) => void }) => (
    <div className="absolute bottom-32 left-4 w-48 glass-card p-2 rounded-lg shadow-lg">
        <div className="flex flex-col gap-1">
            <button onClick={() => onSelect('camera')} className="flex items-center gap-2 p-2 text-sm rounded-md hover:bg-gray-100"><Camera className="w-5 h-5 text-main-accent"/> Photo/Video</button>
            <button onClick={() => onSelect('document')} className="flex items-center gap-2 p-2 text-sm rounded-md hover:bg-gray-100"><FileText className="w-5 h-5 text-secondary-accent"/> Document</button>
            <button onClick={() => onSelect('location')} className="flex items-center gap-2 p-2 text-sm rounded-md hover:bg-gray-100"><MapPin className="w-5 h-5 text-green-500"/> Location</button>
        </div>
    </div>
);

const ChatFooter = ({ onSend, taskData, user, chatId }: { onSend: (message: any) => void; taskData: any, user: any, chatId: string | null }) => {
    const [message, setMessage] = React.useState('');
    const [showAttachments, setShowAttachments] = React.useState(false);
    const firestore = useFirestore();

    const handleSend = () => {
        if (message.trim() && firestore && chatId) {
            const messagesCol = collection(firestore, 'chats', chatId, 'messages');
            addDocumentNonBlocking(messagesCol, {
                text: message,
                senderId: user.uid,
                timestamp: new Date()
            });
            setMessage('');
        }
    };

    const handleAttachmentSelect = (type: string) => {
        // This is a placeholder for future functionality
        setShowAttachments(false);
    };

    const handleRequestPayment = () => {
        if (!firestore || !taskData) return;
        const taskRef = doc(firestore, 'tasks', taskData.id);
        updateDocumentNonBlocking(taskRef, { status: 'completed' });
    };

    const handleReleasePayment = async () => {
        if (!firestore || !taskData || !user) return;
        const { id: taskId, budget, posterId, buddyId } = taskData;
    
        try {
            await runTransaction(firestore, async (transaction) => {
                const posterRef = doc(firestore, "users", posterId);
                const buddyRef = doc(firestore, "users", buddyId);
                const taskRef = doc(firestore, "tasks", taskId);
                const transactionRef = doc(collection(firestore, 'transactions'));
    
                const posterDoc = await transaction.get(posterRef);
                const buddyDoc = await transaction.get(buddyRef);
    
                if (!posterDoc.exists() || !buddyDoc.exists()) {
                    throw "User not found";
                }
    
                // 1. Decrement poster's balance (not needed, balance is virtual)
                // 2. Increment buddy's balance
                transaction.update(buddyRef, { walletBalance: increment(budget) });
    
                // 3. Update task status to 'paid'
                transaction.update(taskRef, { status: 'paid' });
    
                // 4. Create transaction record for buddy (income)
                const buddyTransaction = {
                    userId: buddyId,
                    taskId,
                    type: 'release',
                    amount: budget,
                    status: 'success',
                    timestamp: new Date(),
                };
                transaction.set(doc(collection(firestore, 'transactions')), buddyTransaction);

                 // 5. Create transaction record for poster (outcome)
                 const posterTransaction = {
                    userId: posterId,
                    taskId,
                    type: 'withdraw', // This is an outcome for the poster
                    amount: budget,
                    status: 'success',
                    timestamp: new Date(),
                };
                transaction.set(doc(collection(firestore, 'transactions')), posterTransaction);
            });
    
        } catch (error) {
            console.error("Payment release failed:", error);
            // Here you would emit a proper error
        }
    };
    
    const isBuddy = user?.uid === taskData?.buddyId;
    const isPoster = user?.uid === taskData?.posterId;

    const renderActionButtons = () => {
        if (!taskData) return null;

        switch(taskData.status) {
            case 'assigned':
                if (isBuddy) {
                    return (
                        <Button onClick={handleRequestPayment} className="flex-1 h-14 text-lg font-bold rounded-full bg-yellow-500 text-white hover:bg-yellow-600">
                            Request Payment
                        </Button>
                    );
                }
                return <p className="text-center text-sm text-gray-500 w-full">Waiting for buddy to complete the task.</p>;
            case 'completed':
                 if (isPoster) {
                    return (
                        <Button onClick={handleReleasePayment} className="flex-1 h-14 text-lg font-bold rounded-full cyan-glow-button">
                           <IndianRupee className="w-5 h-5 mr-2" /> Release Payment
                        </Button>
                    );
                }
                return <p className="text-center text-sm text-gray-500 w-full">Payment requested. Waiting for release.</p>;
            case 'paid':
                return <p className="text-center text-sm text-green-500 w-full">Payment for this task has been completed.</p>;
            default:
                return (
                     <Button onClick={handleSend} className="flex-1 h-14 text-lg font-bold rounded-full cyan-glow-button">
                        <Send className="w-5 h-5 mr-2" /> Send
                    </Button>
                );
        }
    }


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
                   {renderActionButtons()}
                </div>
            </div>
        </div>
    );
};


function ChatPageContent() {
  const searchParams = useSearchParams();
  const taskId = searchParams.get('taskId');
  const { user } = useUser();
  const firestore = useFirestore();
  const [messages, setMessages] = React.useState<any[]>([]);

  const taskDocRef = useMemoFirebase(() => {
    if (!firestore || !taskId) return null;
    return doc(firestore, 'tasks', taskId);
  }, [firestore, taskId]);

  const { data: taskData, isLoading: isTaskLoading } = useDoc(taskDocRef);

  const chatQuery = useMemoFirebase(() => {
      if (!firestore || !taskId) return null;
      return query(collection(firestore, 'chats'), where('taskId', '==', taskId));
  }, [firestore, taskId]);

  const { data: chatData } = useCollection(chatQuery);
  const chatId = chatData && chatData.length > 0 ? chatData[0].id : null;

  const messagesQuery = useMemoFirebase(() => {
      if (!firestore || !chatId) return null;
      return query(collection(firestore, 'chats', chatId, 'messages'), orderBy('timestamp', 'asc'));
  }, [firestore, chatId]);

  const { data: liveMessages } = useCollection(messagesQuery);

  React.useEffect(() => {
    if (liveMessages) {
        setMessages(liveMessages);
    }
  }, [liveMessages])


  const userDocRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);
  
  const { data: userData } = useDoc(userDocRef);

  const handleSend = (newMessage: any) => {
      // This is now handled by the ChatFooter component directly
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

  // Create chat if it doesn't exist
  React.useEffect(() => {
    if (firestore && taskId && taskData && user && chatData && chatData.length === 0 && (user.uid === taskData.posterId || user.uid === taskData.buddyId)) {
        const chatCol = collection(firestore, 'chats');
        addDocumentNonBlocking(chatCol, {
            taskId: taskId,
            participantIds: [taskData.posterId, taskData.buddyId].filter(Boolean)
        });
    }
  }, [firestore, taskId, taskData, user, chatData]);


  if (!taskId) {
      return (
          <div className="flex items-center justify-center h-full text-gray-500">
              <p>Please select a task to start chatting.</p>
          </div>
      );
  }

  return (
    <div className="w-full h-[calc(100vh-150px)] flex flex-col">
      <ChatHeader taskData={taskData} isLoading={isTaskLoading} />
      <ScrollArea className="flex-grow my-4 -mx-4" ref={scrollAreaRef}>
        <div className="p-4 space-y-6">
            {messages.map((msg, index) => (
                <div key={index}>
                    <ChatMessage 
                        text={<p className="text-sm">{msg.text}</p>} 
                        isOutgoing={msg.senderId === user?.uid} 
                        time={new Date(msg.timestamp?.toDate()).toLocaleTimeString('en-US', { hour: '2-digit', minute:'2-digit' })} 
                        userDetails={userData} 
                    />
                </div>
            ))}
        </div>
      </ScrollArea>
      <ChatFooter onSend={handleSend} taskData={taskData} user={user} chatId={chatId} />
    </div>
  );
}


export default function ChatPage() {
    return (
        <React.Suspense fallback={<Loader className="w-12 h-12 animate-spin" />}>
            <ChatPageContent />
        </React.Suspense>
    )
}

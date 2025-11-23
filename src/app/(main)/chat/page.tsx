import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chats, currentUser } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Search } from "lucide-react";
import Link from "next/link";

export default function ChatPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border/60 bg-background/60 backdrop-blur-xl sticky top-0 z-10">
        <h1 className="text-2xl font-bold font-headline">Chats</h1>
        <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search chats..." className="pl-10 h-11 rounded-full bg-muted" />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="divide-y divide-border/60">
          {chats.map((chat) => {
            const otherUser = chat.participants.find(p => p.id !== currentUser.id)!;
            return (
              <Link href={`/task/${chat.taskId}`} key={chat.id}>
                <div className="p-4 flex items-center gap-4 hover:bg-muted/40 transition-colors animate-fade-in-up">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={PlaceHolderImages.find(p => p.id === otherUser.avatarId)?.imageUrl} alt={otherUser.name} />
                    <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h2 className="font-semibold">{otherUser.name}</h2>
                      <p className="text-xs text-muted-foreground">{chat.lastMessage.timestamp}</p>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage.content}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

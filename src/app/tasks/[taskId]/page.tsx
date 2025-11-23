
'use client';

import { useParams } from 'next/navigation';
import { useDoc, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { doc, DocumentReference } from 'firebase/firestore';
import { ArrowLeft, Loader, User, MapPin, Calendar, Tag, IndianRupee, Shield, MessageSquare, Zap } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { formatCurrency, timeAgo } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const getImage = (id: string) => PlaceHolderImages.find((img) => img.id === id);

const DetailItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | React.ReactNode }) => (
    <div className="flex items-center gap-4">
        <div className="text-main-accent">{icon}</div>
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="font-semibold text-foreground">{value}</p>
        </div>
    </div>
);


export default function TaskDetailPage() {
    const params = useParams();
    const taskId = params.taskId as string;
    const { user } = useUser();
    const firestore = useFirestore();

    const taskDocRef = useMemoFirebase(() => {
        if (!firestore || !taskId) return null;
        return doc(firestore, 'tasks', taskId);
    }, [firestore, taskId]);

    const { data: taskData, isLoading: isTaskLoading } = useDoc(taskDocRef);

    const posterDocRef = useMemoFirebase(() => {
        if (!firestore || !taskData?.posterId) return null;
        return doc(firestore, 'users', taskData.posterId);
    }, [firestore, taskData?.posterId]);
    
    const { data: posterData, isLoading: isPosterLoading } = useDoc(posterDocRef);

    if (isTaskLoading || isPosterLoading) {
        return (
            <div className="w-full h-[calc(100vh-150px)] flex items-center justify-center">
                <Loader className="w-12 h-12 animate-spin text-main-accent" />
            </div>
        );
    }

    if (!taskData) {
        return (
            <div className="w-full h-[calc(100vh-150px)] flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-bold text-destructive-accent">Task Not Found</h2>
                <p className="text-gray-500 mt-2">The task you are looking for might have been deleted or does not exist.</p>
                <Link href="/" className="mt-6">
                    <Button variant="outline">Go Back Home</Button>
                </Link>
            </div>
        );
    }
    
    const taskImage = getImage(`task_${taskData.category?.toLowerCase()}`) || getImage('task_other');
    const posterImage = posterData?.photoUrl || getImage('user5')?.imageUrl;


    return (
        <div className="w-full flex flex-col gap-6 text-foreground">
            <header className="relative">
                 <Link href="/" className="absolute top-4 left-4 z-10 p-2 bg-black/50 rounded-full text-white">
                    <ArrowLeft className="w-6 h-6 cursor-pointer hover:text-main-accent transition-colors" />
                </Link>
                {taskImage && (
                    <div className="relative w-full h-64 rounded-b-3xl overflow-hidden">
                        <Image src={taskImage.imageUrl} alt={taskData.title} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    </div>
                )}
                 <div className="absolute bottom-6 left-6 text-white">
                    <h1 className="text-4xl font-bold" style={{textShadow: '0 2px 10px rgba(0,0,0,0.5)'}}>{taskData.title}</h1>
                 </div>
            </header>

            <main className="flex flex-col gap-6 -mt-8">
                <div className="glass-card p-6 z-10">
                    <p className="text-gray-600">{taskData.description}</p>
                </div>

                <div className="glass-card p-6 grid grid-cols-2 gap-x-4 gap-y-6">
                    <DetailItem icon={<IndianRupee />} label="Budget" value={formatCurrency(taskData.budget)} />
                    <DetailItem icon={<Tag />} label="Category" value={taskData.category} />
                    <DetailItem icon={<MapPin />} label="Location" value={taskData.location} />
                    <DetailItem icon={<Calendar />} label="Posted" value={timeAgo(taskData.createdAt)} />
                </div>

                <div className="glass-card p-6">
                    <h3 className="font-bold text-lg mb-4">Posted By</h3>
                    <div className="flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            {posterImage && <Image src={posterImage} alt={posterData?.name || 'Poster'} width={48} height={48} className="rounded-full border-2 border-secondary-accent" />}
                            <div>
                                <p className="font-bold text-lg">{posterData?.name || 'Loading...'}</p>
                                <div className="flex items-center gap-2 text-sm text-yellow-500">
                                    <Shield size={14} />
                                    <span>Identity Verified</span>
                                </div>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon">
                            <MessageSquare className="w-6 h-6 text-main-accent" />
                        </Button>
                    </div>
                </div>

                <div className="mt-4">
                    <Button className="w-full h-14 text-lg font-bold cyan-glow-button">
                        <Zap className="w-5 h-5 mr-2" />
                        Accept Task
                    </Button>
                </div>
            </main>
        </div>
    );
}


'use client';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotificationSettingsPage() {
    return (
        <div className="w-full max-w-md mx-auto flex flex-col gap-6 text-foreground">
            <header className="flex items-center gap-4 p-4">
                <Link href="/profile/settings">
                    <ArrowLeft className="w-6 h-6 cursor-pointer hover:text-main-accent transition-colors" />
                </Link>
                <h1 className="text-3xl font-bold text-main-accent">Notification Settings</h1>
            </header>

            <main className="flex flex-col gap-4 px-4">
                <div className="glass-card p-6 text-center">
                    <p className="text-gray-500">Notification preferences will be here.</p>
                </div>
            </main>
        </div>
    );
}

'use client';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full max-w-md mx-auto flex flex-col gap-8 text-foreground min-h-[calc(100vh-100px)] justify-center">
            {children}
        </div>
    );
}

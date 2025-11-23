'use client';
import Link from "next/link";
import AuthForm from "../AuthForm";

export default function LoginPage() {
    return (
        <>
            <header className="text-center">
                <h1 className="text-4xl font-bold text-main-accent">Welcome Back</h1>
                <p className="text-gray-500 mt-2">Log in to continue your journey in the cyber-verse.</p>
            </header>
            <AuthForm mode="login" />
            <p className="text-center text-sm text-gray-500 mt-6">
                Don&apos;t have an account?{' '}
                <Link href="/auth/signup" className="font-semibold text-main-accent hover:underline">
                    Sign up
                </Link>
            </p>
        </>
    );
}

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth, useFirestore, useUser } from '@/firebase';
import {
  initiateEmailSignUp,
  initiateEmailSignIn,
} from '@/firebase/non-blocking-login';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { doc } from 'firebase/firestore';
import * as React from 'react';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
});

type AuthFormProps = {
  mode: 'login' | 'signup';
};

export default function AuthForm({ mode }: AuthFormProps) {
  const { toast } = useToast();
  const auth = useAuth();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  React.useEffect(() => {
    if (!isUserLoading && user) {
        router.push('/');
    }
  }, [user, isUserLoading, router]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (mode === 'signup') {
        initiateEmailSignUp(auth, values.email, values.password);
        
        // We can't get the user immediately, so we'll rely on the auth state listener to create the user doc.
        // This is a simplification. A more robust solution might use a cloud function.
        const unsubscribe = auth.onAuthStateChanged(newUser => {
            if (newUser && newUser.email === values.email) {
                const userRef = doc(firestore, 'users', newUser.uid);
                setDocumentNonBlocking(userRef, {
                    id: newUser.uid,
                    name: newUser.email, // default name
                    photoUrl: '',
                    location: '',
                    walletBalance: 1000, // starting balance
                    xp: 0,
                    level: 'Rookie',
                    verificationStatus: 'pending',
                    mobileVerified: false,
                    aadharVerified: false,
                    joinDate: new Date().toISOString(),
                }, { merge: true });
                unsubscribe();
            }
        });


        toast({
          title: 'Account Created!',
          description: "We're setting up your profile. Redirecting...",
        });

      } else {
        initiateEmailSignIn(auth, values.email, values.password);
        toast({
          title: 'Logging In...',
          description: 'Authenticating your credentials.',
        });
      }
    // We don't need to setIsLoading(false) here because the useEffect will trigger a redirect
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Authentication Failed',
        description: error.message || 'An unknown error occurred.',
      });
      setIsLoading(false);
    }
  };

  if (isUserLoading || user) {
    return (
       <div className="w-full h-screen flex flex-col items-center justify-center">
        <Loader className="w-12 h-12 animate-spin text-main-accent" />
        <p className="mt-4 text-lg text-gray-600">Checking credentials...</p>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 glass-card p-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="you@example.com"
                  {...field}
                  className="glass-card"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...field}
                  className="glass-card"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full h-12 text-lg font-bold cyan-glow-button" disabled={isLoading}>
          {isLoading && <Loader className="mr-2 h-5 w-5 animate-spin" />}
          {mode === 'login' ? 'Log In' : 'Sign Up'}
        </Button>
      </form>
    </Form>
  );
}

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
import { useAuth, useUser } from '@/firebase';
import {
  initiatePhoneNumberSignIn,
  confirmOtpCode,
} from '@/firebase/non-blocking-login';
import * as React from 'react';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { ConfirmationResult, RecaptchaVerifier } from 'firebase/auth';
import { RecaptchaVerifier as FirebaseRecaptchaVerifier } from 'firebase/auth';

const phoneSchema = z.object({
  phone: z.string().regex(/^\+[1-9]\d{1,14}$/, 'Please enter a valid phone number with country code (e.g., +919876543210).'),
});

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits.'),
});

export default function MobileAuthForm() {
  const { toast } = useToast();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);
  const [step, setStep] = React.useState<'phone' | 'otp'>('phone');
  const [confirmationResult, setConfirmationResult] = React.useState<ConfirmationResult | null>(null);
  const recaptchaVerifierRef = React.useRef<RecaptchaVerifier | null>(null);
  const sendOtpButtonRef = React.useRef<HTMLButtonElement>(null);


  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: '',
    },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });


  React.useEffect(() => {
    if (!auth) return;

    // Create the verifier once and associate it with the button
    if (!recaptchaVerifierRef.current && sendOtpButtonRef.current) {
        recaptchaVerifierRef.current = new FirebaseRecaptchaVerifier(
            auth,
            sendOtpButtonRef.current, 
            { 'size': 'invisible' }
        );
    }
  }, [auth]);


  React.useEffect(() => {
    if (!isUserLoading && user) {
      router.replace('/');
    }
  }, [user, isUserLoading, router]);

  const onPhoneSubmit = async (values: z.infer<typeof phoneSchema>) => {
    setIsLoading(true);
    if (!recaptchaVerifierRef.current) {
      toast({ variant: 'destructive', title: 'reCAPTCHA not ready. Please wait a moment and try again.' });
      setIsLoading(false);
      return;
    }

    try {
      const confirmation = await initiatePhoneNumberSignIn(auth, values.phone, recaptchaVerifierRef.current);
      setConfirmationResult(confirmation);
      setStep('otp');
      toast({ title: 'OTP Sent!', description: `An OTP has been sent to ${values.phone}.` });
    } catch (error: any) {
      console.error("OTP Send Error:", error);
      toast({
        variant: 'destructive',
        title: 'Failed to Send OTP',
        description: error.message || 'An unknown error occurred. Please ensure your domain is authorized in Firebase console.',
      });
      // In case of error, reset the verifier if it exists
      recaptchaVerifierRef.current?.clear();

    } finally {
      setIsLoading(false);
    }
  };

  const onOtpSubmit = async (values: z.infer<typeof otpSchema>) => {
    setIsLoading(true);
    if (!confirmationResult) {
      toast({ variant: 'destructive', title: 'Verification session expired. Please try again.' });
      setIsLoading(false);
      setStep('phone');
      return;
    }
    try {
      // This part is non-blocking. The onAuthStateChanged listener will handle success.
      await confirmOtpCode(confirmationResult, values.otp);
      toast({ title: 'Success!', description: 'You are now logged in.' });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Invalid OTP',
        description: error.message || 'The OTP you entered is incorrect.',
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
    <div className="glass-card p-8">
      {step === 'phone' ? (
        <Form {...phoneForm}>
          <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-6">
            <FormField
              control={phoneForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+919876543210" {...field} className="glass-card" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
                ref={sendOtpButtonRef}
                type="submit" 
                className="w-full h-12 text-lg font-bold cyan-glow-button" 
                disabled={isLoading}
            >
              {isLoading && <Loader className="mr-2 h-5 w-5 animate-spin" />}
              Send OTP
            </Button>
          </form>
        </Form>
      ) : (
        <Form {...otpForm}>
          <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-6">
            <FormField
              control={otpForm.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter OTP</FormLabel>
                  <FormControl>
                    <Input placeholder="123456" {...field} className="glass-card text-center tracking-[1rem]" maxLength={6} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full h-12 text-lg font-bold cyan-glow-button" disabled={isLoading}>
              {isLoading && <Loader className="mr-2 h-5 w-5 animate-spin" />}
              Verify OTP
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}

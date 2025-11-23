
'use client';
import {
  Auth,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from 'firebase/auth';

/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  signInAnonymously(authInstance);
}

/** Initiate email/password sign-up (non-blocking). */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string): void {
  createUserWithEmailAndPassword(authInstance, email, password);
}

/** Initiate email/password sign-in (non-blocking). */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): void {
  signInWithEmailAndPassword(authInstance, email, password);
}

/** Initiate Google sign-in with a popup (non-blocking). */
export function initiateGoogleSignIn(authInstance: Auth): void {
  const provider = new GoogleAuthProvider();
  signInWithPopup(authInstance, provider).catch(error => {
    if (error.code !== 'auth/popup-closed-by-user') {
      console.error('Google Sign-In Error:', error);
    } else {
      console.info('Google Sign-In popup closed by user.');
    }
  });
}

/**
 * Sets up the reCAPTCHA verifier for phone number authentication.
 * @param authInstance The Firebase Auth instance.
 * @param containerId The ID of the HTML element where the reCAPTCHA should be rendered.
 * @returns A RecaptchaVerifier instance.
 */
export function setupRecaptcha(authInstance: Auth, containerId: string): RecaptchaVerifier {
  // It's important that this is only called once per page load.
  // The reCAPTCHA will now be visible to the user.
  return new RecaptchaVerifier(authInstance, containerId, {
    // 'size': 'invisible' is removed to make it visible.
  });
}

/**
 * Initiates phone number sign-in.
 * @param authInstance The Firebase Auth instance.
 * @param phoneNumber The user's phone number in E.164 format.
 * @param appVerifier The RecaptchaVerifier instance.
 * @returns A Promise that resolves with a ConfirmationResult object.
 */
export async function initiatePhoneNumberSignIn(
  authInstance: Auth,
  phoneNumber: string,
  appVerifier: RecaptchaVerifier
): Promise<ConfirmationResult> {
  return signInWithPhoneNumber(authInstance, phoneNumber, appVerifier);
}

/**
 * Confirms the OTP code sent to the user's phone.
 * @param confirmationResult The ConfirmationResult object from initiatePhoneNumberSignIn.
 * @param otpCode The 6-digit OTP code entered by the user.
 * @returns A Promise that resolves with the UserCredential on successful sign-in.
 */
export async function confirmOtpCode(
  confirmationResult: ConfirmationResult,
  otpCode: string
) {
  // Do not await this. Let the onAuthStateChanged listener handle the redirect.
  confirmationResult.confirm(otpCode);
}

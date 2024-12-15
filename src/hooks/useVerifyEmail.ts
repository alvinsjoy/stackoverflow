'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { account } from '@/models/client/config';
import { useAuthStore } from '@/store/Auth';

export function useVerifyEmail() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { verifyEmail, user } = useAuthStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const checkVerification = async () => {
      try {
        const currentUser = await account.get();
        if (currentUser.emailVerification) {
          router.push('/');
          return;
        }
      } catch (error) {
        console.error('Error checking verification status:', error);
      }
    };

    if (user) {
      checkVerification();
    }
  }, [user, router]);

  useEffect(() => {
    const emailSent = searchParams.get('emailSent');
    if (emailSent === 'true') {
      setMessage('Verification email has been sent! Please check your inbox.');
    }

    const secret = searchParams.get('secret');
    const userId = searchParams.get('userId');

    if (secret && userId) {
      setIsLoading(true);
      account
        .updateVerification(userId, secret)
        .then(() => {
          setMessage('Email verified successfully! Redirecting...');
          setTimeout(() => {
            router.push('/');
          }, 2000);
        })
        .catch((error) => {
          console.error('Error verifying email:', error);
          setError('Failed to verify email. Please try again.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [searchParams, router]);

  const handleResendVerification = async () => {
    setIsLoading(true);
    setError('');
    setMessage('');

    const response = await verifyEmail();

    if (response.success) {
      setMessage('Verification email sent! Please check your inbox.');
    } else {
      setError(response.error?.message || 'Failed to send verification email');
    }

    setIsLoading(false);
  };

  return {
    isLoading,
    error,
    message,
    handleResendVerification,
  };
}

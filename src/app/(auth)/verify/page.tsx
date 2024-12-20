'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useVerifyEmail } from '@/hooks/useVerifyEmail';

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

export default function VerifyEmail() {
  const { isLoading: isAuthChecking } = useAuth({ requireAuth: true });
  const { isLoading, error, message, handleResendVerification } =
    useVerifyEmail();

  if (isAuthChecking || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-none bg-white p-4 shadow-input dark:bg-black md:rounded-2xl md:p-8">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Email Verification
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Please verify your email address to continue using StackUnderflow.
      </p>

      {error && (
        <p className="mt-4 text-center text-sm text-red-500 dark:text-red-400">
          {error}
        </p>
      )}

      {message && (
        <p className="mt-4 text-center text-sm text-green-500 dark:text-green-400">
          {message}
        </p>
      )}

      <div className="mt-8">
        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          onClick={handleResendVerification}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Resend Verification Email'}
          <BottomGradient />
        </button>
      </div>
    </div>
  );
}

'use client';

import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React from 'react';

import ROUTES from '@/constants/routes';
import { toast } from 'sonner';

import { Button } from '../ui/button';

const SocialAuthForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || ROUTES.HOME;

  const buttonClass =
    'background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5 cursor-pointer';

  const handleSignIn = async (provider: 'github') => {
    try {
      console.log('Attempting to sign in with provider:', provider);
      // For OAuth providers, let NextAuth handle the redirect naturally
      await signIn(provider, {
        callbackUrl: callbackUrl,
        redirect: true, // Let NextAuth handle OAuth redirect
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('Sign-in Failed', {
        description:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred during sign-in',
      });
    }
  };

  return (
    <div className='mt-10 flex flex-wrap gap-2.5'>
      <Button className={buttonClass} onClick={() => handleSignIn('github')}>
        <Image
          src='/icons/github.svg'
          alt='Github Logo'
          width={20}
          height={20}
          className='invert-colors mr-2.5 object-contain'
        />
        <span>Log in with GitHub</span>
      </Button>
    </div>
  );
};

export default SocialAuthForm;

'use client';

import Image from 'next/image';
import { signIn } from 'next-auth/react';
import React from 'react';

import ROUTES from '@/constants/routes';
import { toast } from 'sonner';

import { Button } from '../ui/button';

const SocialAuthForm = () => {
  const buttonClass =
    'background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5 cursor-pointer';

  const handleSignIn = async (provider: 'github') => {
    try {
      console.log('Attempting to sign in with provider:', provider);
      const result = await signIn(provider, {
        callbackUrl: ROUTES.HOME,
        redirect: false,
      });
      console.log('Sign-in result:', result);

      if (result?.error) {
        console.error('Sign-in error:', result.error);
        toast.error('Sign-in Failed', {
          description:
            result.error === 'OAuthSignin'
              ? 'GitHub OAuth configuration error. Please check your environment variables.'
              : result.error === 'OAuthCallback'
                ? 'GitHub OAuth callback error. Please try again.'
                : result.error === 'OAuthCreateAccount'
                  ? 'Could not create account. Please try again.'
                  : result.error === 'EmailCreateAccount'
                    ? 'Could not create account with this email.'
                    : result.error === 'Callback'
                      ? 'Callback error occurred.'
                      : result.error === 'OAuthAccountNotLinked'
                        ? 'Email already exists with a different provider.'
                        : result.error === 'EmailSignin'
                          ? 'Check your email for a sign-in link.'
                          : result.error === 'CredentialsSignin'
                            ? 'Invalid credentials.'
                            : result.error === 'SessionRequired'
                              ? 'Please sign in to access this page.'
                              : 'An unexpected error occurred during sign-in.',
        });
      } else if (result?.ok) {
        toast.success('Sign-in successful!');
        // Redirect will be handled by NextAuth
        window.location.href = ROUTES.HOME;
      }
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

  // const handleSignIn = async (provider: 'github' | 'google') => {
  //   try {
  //     await signIn(provider, {
  //       callbackUrl: ROUTES.HOME,
  //       redirect: false,
  //     });
  //   } catch (error) {
  //     console.log(error);

  //     toast.error('Sign-in Failed', {
  //       description:
  //         error instanceof Error
  //           ? error.message
  //           : 'An unexpected error occurred during sign-in',
  //     });
  //   }
  // };

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

      {/* <Button className={buttonClass} onClick={() => handleSignIn('google')}>
        <Image
          src='/icons/google.svg'
          alt='Google Logo'
          width={20}
          height={20}
          className='mr-2.5 object-contain'
        />
        <span>Log in with Google</span>
      </Button> */}
    </div>
  );
};

export default SocialAuthForm;

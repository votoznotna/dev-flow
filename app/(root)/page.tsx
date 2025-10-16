import { auth, signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import ROUTES from '@/constants/routes';
import React from 'react';

const Home = async () => {
  const session = await auth();
  console.log(session);
  return (
    <>
      <h1 className='text-3xl text-violet-700 font-black'>
        Welcome to Next.js!
      </h1>
      <form
        className='px-10 pt-[100px]'
        action={async () => {
          'use server';
          await signOut({ redirectTo: ROUTES.SIGN_IN });
        }}
      >
        <Button type='submit'>Sign out</Button>
      </form>
    </>
  );
};

export default Home;

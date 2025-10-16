'use client';

import React from 'react';

import AuthForm from '@/components/forms/AuthForm';
// import { signInWithCredentials } from '@/lib/actions/auth.action';
import { SignInSchema } from '@/lib/validations';

const SignIn = () => {
  return (
    <AuthForm
      formType='SIGN_IN'
      schema={SignInSchema}
      defaultValues={{ email: '', password: '' }}
      onSubmit={async () => {
        return {
          success: true,
          status: 200,
          error: null,
        };
      }}
    />
  );
};

export default SignIn;

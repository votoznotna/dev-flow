import { z } from 'zod';

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required.')
    .email('Please provide a valid email address.'),

  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long.')
    .max(100, 'Password cannot exceed 100 characters.'),
});

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long.')
    .max(30, 'Username cannot exceed 30 characters.')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores.'
    ),

  name: z
    .string()
    .min(1, 'Name is required.')
    .max(50, 'Name cannot exceed 50 characters.')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces.'),

  email: z
    .string()
    .min(1, 'Email is required.')
    .email('Please provide a valid email address.'),

  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long.')
    .max(100, 'Password cannot exceed 100 characters.')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
    .regex(/[0-9]/, 'Password must contain at least one number.')
    .regex(
      /[^a-zA-Z0-9]/,
      'Password must contain at least one special character.'
    ),
});

export const AskQuestionSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: 'Title must be at least 5 characters.',
    })
    .max(130, { message: 'Title must not be longer then 130 characters.' }),
  content: z.string().min(100, { message: 'Minimum of 100 characters.' }),
  tags: z
    .array(
      z
        .string()
        .min(1, { message: 'Tag must have at least 1 character.' })
        .max(15, { message: 'Tag must not exceed 15 characters.' })
    )
    .min(1, { message: 'Add at least one tag.' })
    .max(3, { message: 'Maximum of 3 tags.' }),
});

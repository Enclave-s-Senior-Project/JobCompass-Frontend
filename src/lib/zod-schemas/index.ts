import { z } from 'zod';

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

const signUpSchema = z
    .object({
        full_name: z.string().min(1, 'Full name is required'),
        username: z
            .string()
            .min(4, 'Username must be at least 4 characters')
            .max(20, 'Username must be at most 20 characters.'),
        email: z.string().min(1, 'Email is required').email('Invalid email'),
        password: z
            .string()
            .min(1, 'New password is required')
            .max(32, 'Password must be at most 32 characters')
            .regex(
                passwordRegex,
                'Password must be at least 8 characters with uppercase, number, and special character'
            ),
        confirmPassword: z.string().min(8, 'Confirm Password is required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Confirm password does not match',
        path: ['confirmPassword'],
    });

const verifyEmailSchema = z.object({
    code: z.string().min(6, 'Code is min 6 characters'),
});

const verifySignInSchema = z.object({
    username: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
        .string()
        .min(1, 'New password is required')
        .max(32, 'Password must be at most 32 characters')
        .regex(passwordRegex, 'Password must be at least 8 characters with uppercase, number, and special character'),
});

const forgetPasswordSchema = z.object({
    email: z.string().trim().min(1, 'Email is required').email('Invalid email'),
});

const resetPasswordSchema = z
    .object({
        newPassword: z
            .string()
            .min(1, 'New password is required')
            .max(32, 'Password must be at most 32 characters')
            .regex(
                passwordRegex,
                'Password must be at least 8 characters with uppercase, number, and special character'
            ),
        confirmPassword: z.string().min(1, 'Confirm password is required'),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'Confirm password does not match',
        path: ['confirmPassword'],
    });

export { signUpSchema, verifySignInSchema, verifyEmailSchema, forgetPasswordSchema, resetPasswordSchema };

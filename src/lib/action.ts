'use client';
import { ForgetPasswordCredentials, SignInCredentials, SignUpCredentials } from 'form-credentials';
import { z } from 'zod';
import * as service from '@/services/auth';
import { useRouter } from 'next/navigation';

const signUpSchema = z
    .object({
        full_name: z.string().min(1, 'Full name is required'),
        username: z.string().min(1, 'Username is required'),
        email: z.string().min(1, 'Email is required').email('Invalid email'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        confirmPassword: z.string().min(8, 'Confirm Password is required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });
export const signInSubmit = (currentState: SignInCredentials, formData: FormData) => {
    // conduct validate & submit...

    const email = formData.get('email')?.toString() ?? '';
    const password = formData.get('password')?.toString() ?? '';

    console.log({
        email,
        password,
    });

    return currentState;
};

export const signUpSubmit = async (currentState: SignUpCredentials, formData: FormData) => {
    const formValue = {
        full_name: formData.get('full_name')?.toString() || '',
        username: formData.get('username')?.toString() || '',
        email: formData.get('email')?.toString() || '',
        password: formData.get('password')?.toString() || '',
        confirmPassword: formData.get('confirmPassword')?.toString() || '',
    };
    const validation = signUpSchema.safeParse(formValue);

    if (!validation.success) {
        return {
            ...currentState,
            errors: validation.error.flatten().fieldErrors,
            success: false,
            email: formValue.email,
        };
    }
    const temp = await service.register(formValue);
    if (temp.code === 400 && temp.message_code === 'AUTH_REGISTER_EMAIL_EXISTS') {
        return {
            ...currentState,
            errors: {
                email: ['This email is already registered.'],
            },
            success: false,
        };
    } else if (temp.code >= 200 && temp.code <= 299) {
        return {
            ...currentState,
            errors: {},
            success: true,
            email: formValue.email,
        };
    }
    return { ...currentState, errors: {}, success: false };
};

export const forgetPasswordSubmit = (currentState: ForgetPasswordCredentials, formData: FormData) => {
    const email = formData.get('email');

    console.log({ email });

    //     handle call api
    //     ...

    return currentState;
};

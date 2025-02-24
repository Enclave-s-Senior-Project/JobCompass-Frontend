import { BaseAxios } from './axios';
import * as Services from '@/services';
import { DetailedRequest } from '@/types';
import { toast } from 'react-toastify';
import { errorKeyMessage } from './message-keys';
import {
    applyJobCoverLetterSchema,
    forgetPasswordSchema,
    resetPasswordSchema,
    signUpSchema,
    verifyEmailSchema,
    verifySignInSchema,
} from './zod-schemas';
import { handleErrorToast } from './utils';
import { JobService } from '@/services/job.service';
import { ApplyJobService } from '@/services/applyJob.service';

export const signInSubmit = async (currentState: DetailedRequest.SignInRequest, formData: FormData) => {
    const username = formData.get('username')?.toString() ?? '';
    const password = formData.get('password')?.toString() ?? '';
    const data = { username, password };
    const axios = new BaseAxios('auth');
    const validate = verifySignInSchema.safeParse(data);

    currentState.username = username;
    currentState.password = password;

    if (!validate.success) {
        return {
            ...currentState,
            errors: {
                ...validate.error.flatten().fieldErrors,
            },
            success: false,
        };
    }

    try {
        const res = await Services.AuthService.login(data);
        if (res.value)
            axios.storeTokenInfo(res.value?.accessToken, res.value?.tokenType, res.value?.accessTokenExpires);
        return {
            ...currentState,
            errors: {},
            success: true,
        };
    } catch (err: any) {
        handleErrorToast(err);
    }

    return {
        ...currentState,
        errors: {},
        success: false,
    };
};

export const signUpSubmit = async (currentState: DetailedRequest.SignUpRequest, formData: FormData) => {
    const formValue = {
        full_name: formData.get('full_name')?.toString() || '',
        username: formData.get('username')?.toString() || '',
        email: formData.get('email')?.toString() || '',
        password: formData.get('password')?.toString() || '',
        confirmPassword: formData.get('confirmPassword')?.toString() || '',
    };

    currentState.full_name = formValue.full_name;
    currentState.username = formValue.username;
    currentState.email = formValue.email;
    currentState.password = formValue.password;
    currentState.confirmPassword = formValue.confirmPassword;

    const validation = signUpSchema.safeParse(formValue);

    if (!validation.success) {
        return {
            ...currentState,
            errors: validation.error.flatten().fieldErrors,
            success: false,
        };
    }
    try {
        const temp = await Services.AuthService.register(formValue);
        if (temp.code >= 200 && temp.code <= 299) {
            return {
                ...currentState,
                errors: {},
                success: true,
            };
        }
    } catch (error: any) {
        console.log(error);
        handleErrorToast(error);
    }
    return { ...currentState, errors: {}, success: false };
};

export const forgetPasswordSubmit = async (currentState: any, formData: FormData) => {
    currentState.email = formData.get('email')?.toString() ?? '';
    const validation = forgetPasswordSchema.safeParse({ email: currentState.email });

    if (!validation.success) {
        return {
            ...currentState,
            errors: validation.error.flatten().fieldErrors,
            success: false,
            data: {},
        };
    }

    try {
        const data = await Services.AuthService.forgetPassword({ email: currentState.email });
        return { ...currentState, errors: {}, success: true, data };
    } catch (error: any) {
        if (error.props.title) {
            const errorMessage = errorKeyMessage[error.props.title as keyof typeof errorKeyMessage] || 'Oops!';
            toast.error(errorMessage);
        }
    }

    return { ...currentState, errors: {}, success: false, data: {} };
};

export const verifyEmail = async (currentState: any, formData: FormData) => {
    const email = currentState.email;
    const code = formData.get('code')?.toString() || '';
    const formValue = { email, code };
    const validation = verifyEmailSchema.safeParse(formValue);
    if (!validation.success) {
        return {
            ...currentState,
            errors: validation.error.flatten().fieldErrors,
            success: false,
        };
    }
    try {
        const temp = await Services.AuthService.verifyEmail(formValue);
        if (temp.code >= 200 && temp.code <= 299) {
            return {
                ...currentState,
                errors: {},
                success: true,
            };
        }
    } catch (error: any) {
        handleErrorToast(error);
    }
    return { ...currentState, errors: {}, success: false };
};

export const resetPassword = async (currentState: any, formData: FormData) => {
    currentState.newPassword = formData.get('newPassword')?.toString() ?? '';
    currentState.confirmPassword = formData.get('confirmPassword')?.toString() ?? '';

    const validation = resetPasswordSchema.safeParse(currentState);
    if (!validation.success) {
        return { ...currentState, errors: validation.error.flatten().fieldErrors, success: false, data: null };
    }

    try {
        const dataResponse = await Services.AuthService.resetPassword({
            email: currentState.email,
            newPassword: currentState.newPassword,
            iv: currentState.iv,
            token: currentState.token,
        });
        return { ...currentState, errors: {}, success: true, data: dataResponse.value };
    } catch (error: any) {
        handleErrorToast(error);
    }

    return { ...currentState, errors: {}, success: false, data: null };
};

export const applyJob = async (currentState: any, formData: FormData) => {
    currentState.selectedCv = formData.get('selectedCv')?.toString() ?? '';
    currentState.coverLetter = formData.get('coverLetter')?.toString() ?? '';

    console.log('Selected CV:', currentState.selectedCv);
    console.log('Cover Letter:', currentState.coverLetter);
    const validation = applyJobCoverLetterSchema.safeParse(currentState);
    if (!validation.success) {
        return { ...currentState, errors: validation.error.flatten().fieldErrors, success: false, data: null };
    }
    try {
        const applyJob = await ApplyJobService.applyJobCoverLetter({
            cvId: currentState.selectedCv,
            coverLetter: currentState.coverLetter,
            jobId: '95117f99-2282-4657-938a-2ad500f70612',
        });
        return { ...currentState, errors: {}, success: true, data: applyJob };
    } catch (error: any) {
        handleErrorToast(error);
    }

    return { ...currentState, errors: {}, success: false, data: null };
};

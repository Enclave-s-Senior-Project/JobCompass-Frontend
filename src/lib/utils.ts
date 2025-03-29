import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import crypto from 'crypto';
import { errorKeyMessage } from './message-keys';
import { toast } from 'sonner';
import { Address, AppliedJob } from '@/types';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const algorithm = 'aes-256-cbc'; // AES encryption algorithm
const secretKey = process.env.NEXT_PUBLIC_APP_SECRET_KEY || '';
const iv = crypto.randomBytes(16); // Generate random IV

// 🔹 Encrypt Function
export function encrypt(text: string): string {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
}

// 🔹 Decrypt Function
export function decrypt(encryptedToken: string): string {
    const [ivHex, encryptedHex] = encryptedToken.split(':');
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(ivHex, 'hex'));
    let decrypted = decipher.update(encryptedHex, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}

export const getClientSideCookie = (name: string): string | undefined => {
    const cookieValue = document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${name}=`))
        ?.split('=')[1];

    return cookieValue;
};

export const handleErrorToast = (err: any) => {
    if (err.props?.title && errorKeyMessage) {
        const errorMessage = errorKeyMessage[err.props.title as keyof typeof errorKeyMessage];
        toast.error(errorMessage);
    } else {
        toast.error('Oops! Please try again');
    }
};

export const downloadFileViaURL = async (url: string) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const blob = await response.blob(); // Convert response to a Blob
        const fileName = url.split('/').pop() || 'downloaded_file'; // Extract filename or set default

        // Create a temporary link element to trigger download
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up
    } catch (error) {
        handleErrorToast(error);
    }
};

export const toFormattedDate = (date: string | Date, withHour: boolean = false) => {
    let format: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit', year: 'numeric' };
    format = withHour ? { ...format, hour: '2-digit', minute: '2-digit' } : format;
    return new Date(date).toLocaleString('default', format);
};

export function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1).toLowerCase();
}

export function getAppliedJobStatus(appliedJob: AppliedJob) {
    return (
        new Date(appliedJob?.job.deadline).getTime() > new Date().getTime() &&
        appliedJob.isActive &&
        !appliedJob.isDenied
    );
}

export function getJobAddress(addresses: Address[]) {
    return addresses?.length > 0
        ? addresses?.map((address: Address) => `${address?.city}, ${address?.country}`).join('| ')
        : 'Unknown location';
}

export function toDollarK(number: number) {
    return Number(number) >= 1000 ? `${Number(number) / 1000}K` : number;
}

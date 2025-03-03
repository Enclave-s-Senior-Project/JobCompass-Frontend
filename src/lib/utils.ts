import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import crypto from 'crypto';
import { errorKeyMessage } from './message-keys';
import { toast } from 'react-toastify';

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
    if (err.props?.title) {
        const errorMessage = errorKeyMessage[err.props.title as keyof typeof errorKeyMessage];
        toast.error(errorMessage);
    }
};

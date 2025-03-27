'use client';

// This is a simplified version of the toast hook
// In a real app, you would use a proper toast library

import { useState } from 'react';

type ToastVariant = 'default' | 'destructive';

interface Toast {
    id: string;
    title: string;
    description?: string;
    variant?: ToastVariant;
}

export function useToast() {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const toast = ({
        title,
        description,
        variant = 'default',
    }: {
        title: string;
        description?: string;
        variant?: ToastVariant;
    }) => {
        const id = Math.random().toString(36).substring(2, 9);
        const newToast = { id, title, description, variant };

        setToasts((prevToasts) => [...prevToasts, newToast]);

        // Auto dismiss after 3 seconds
        setTimeout(() => {
            setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
        }, 3000);

        return id;
    };

    return { toast, toasts };
}

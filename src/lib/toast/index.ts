import { motion } from 'framer-motion';
import React from 'react';
import { toast as reactToast, ToastOptions } from 'react-hot-toast';
import { IoIosWarning, IoIosInformationCircle } from 'react-icons/io';

/**
 * Custom toast interface with strongly typed methods
 */
interface CustomToast {
    success: (message: string, options?: ToastOptions) => string;
    error: (message: string, options?: ToastOptions) => string;
    info: (message: string, options?: ToastOptions) => string;
    warning: (message: string, options?: ToastOptions) => string;
    loading: (message: string, options?: ToastOptions) => string;
    dismiss: (id?: string) => void;
    remove: (id?: string) => void;
}

// Base styling applied to all toast variants
const baseStyle = {
    borderRadius: '4px',
    padding: '8px 12px',
    fontSize: '14px',
};

// Animation properties for icon animations
const iconAnimationProps = {
    animate: { scale: [1, 1.2, 1] },
    transition: {
        duration: 0.8,
        repeatType: 'reverse' as const,
        ease: 'easeInOut',
    },
};

// Create and export the toast utility with custom styling
export const toast: CustomToast = {
    success: (message, options) =>
        reactToast.success(message, {
            style: {
                ...baseStyle,
                backgroundColor: '#CEECD5',
                color: '#044012',
            },
            ...options,
        }),

    error: (message, options) =>
        reactToast.error(message, {
            style: {
                ...baseStyle,
                backgroundColor: '#F9DCDC',
                color: '#5A2020',
            },
            ...options,
        }),

    info: (message, options) =>
        reactToast(message, {
            style: {
                ...baseStyle,
                backgroundColor: '#CEE0F5',
                color: '#042852',
            },
            icon: React.createElement(
                motion.div,
                iconAnimationProps,
                React.createElement(IoIosInformationCircle, {
                    size: 20,
                    color: '#0A65CC',
                })
            ),
            ...options,
        }),

    warning: (message, options) =>
        reactToast(message, {
            style: {
                ...baseStyle,
                backgroundColor: '#FFEDCC',
                color: '#664200',
            },
            icon: React.createElement(
                motion.div,
                iconAnimationProps,
                React.createElement(IoIosWarning, {
                    size: 20,
                    color: '#FFA500',
                })
            ),
            ...options,
        }),

    loading: (message, options) =>
        reactToast.loading(message, {
            style: {
                ...baseStyle,
            },
            ...options,
        }),

    // Using the direct methods from react-hot-toast to avoid circular references
    dismiss: (id) => reactToast.dismiss(id),
    remove: (id) => reactToast.remove(id),
};

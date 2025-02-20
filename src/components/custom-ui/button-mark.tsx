import React from 'react';
import { Button } from '@/components/ui/button';
import { Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ButtonMark = ({
    className,
    onClick,
    variant = 'secondary',
    size = 'icon-lg',
}: {
    className?: string;
    variant?: 'outline' | 'secondary';
    size?: 'icon-xl' | 'icon-lg' | 'icon-md';
    onClick?: () => void;
}) => {
    return (
        <Button type="button" className={cn(className)} size={size} variant={variant} onClick={onClick}>
            <Bookmark />
        </Button>
    );
};

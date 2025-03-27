'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ButtonMark = ({
    className,
    handleUnMark,
    handleMark,
    size = 'icon-lg',
    mark,
    disabled = false,
}: {
    className?: string;
    handleUnMark?: () => void;
    handleMark?: () => void;
    size?: 'icon-xl' | 'icon-lg' | 'icon-md';
    mark?: boolean;
    onClick?: () => void;
    disabled?: boolean;
}) => {
    const [marked, setMarked] = useState(!!mark);
    const handleClick = () => {
        if (marked && typeof handleUnMark === 'function') {
            setMarked(false);
            handleUnMark();
        } else if (!marked && typeof handleMark === 'function') {
            setMarked(true);
            handleMark();
        }
    };
    return (
        <Button
            disabled={disabled}
            type="button"
            className={cn(className)}
            size={size}
            variant={marked ? 'primary' : 'third'}
            onClick={handleClick}
        >
            <Bookmark />
        </Button>
    );
};

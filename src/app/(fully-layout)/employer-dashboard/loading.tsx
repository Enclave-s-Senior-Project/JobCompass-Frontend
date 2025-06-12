import { LoadingOnlyIcon } from '@/components/custom-ui/loading';
import React from 'react';

export default function Loading() {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <LoadingOnlyIcon />
        </div>
    );
}

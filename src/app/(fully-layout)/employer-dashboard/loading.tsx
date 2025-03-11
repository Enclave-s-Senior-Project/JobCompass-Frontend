import { LoadingOnlyIcon } from '@/components/custom-ui/loading';
import React from 'react';

export default function Loading() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <LoadingOnlyIcon />
        </div>
    );
}

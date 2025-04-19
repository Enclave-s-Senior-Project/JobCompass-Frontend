import { CloudUpload } from 'lucide-react';
import React, { Fragment } from 'react';

export function DefaultPlaceholderImage({ maxSize, pixel }: { pixel: number; maxSize: number }) {
    return (
        <Fragment>
            <CloudUpload className="size-5 text-gray-300 md:size-8 lg:size-12" />
            <p className="mt-4 text-[10px] text-gray-700 md:text-sm">
                <strong className="font-medium text-gray-900">Browse photo</strong> or drop here
            </p>
            <p className="mt-2 hidden px-4 text-[12px] leading-[18px] text-gray-500 md:block">
                A photo larger than {pixel} pixels work best. Max photo size {maxSize} MB.
            </p>
        </Fragment>
    );
}

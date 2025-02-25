import { CloudUpload } from 'lucide-react';
import React, { Fragment } from 'react';

export function DefaultPlaceholderImage({ maxSize, pixel }: { pixel: number; maxSize: number }) {
    return (
        <Fragment>
            <CloudUpload className="text-gray-300 size-12" />
            <p className="mt-4 size-sm text-gray-700">
                <strong className="text-gray-900 font-medium">Browse photo</strong> or drop here
            </p>
            <p className="px-4 mt-2 text-gray-500 text-[12px] leading-[18px]">
                A photo larger than {pixel} pixels work best. Max photo size {maxSize} MB.
            </p>
        </Fragment>
    );
}

'use client';

import React, { ChangeEvent, useRef, useState, memo } from 'react';
import clsx from 'clsx';
import { DefaultPlaceholderImage } from './default-placeholder-image';

// Types
interface ImageData {
    url: string;
    size: number;
}

interface ImageInputProps {
    name: string;
    initImage?: string;
    isAvatar?: boolean;
    isError?: boolean;
    value?: string;
    disabled?: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

// Utility Functions
const createImageData = (file: File): ImageData => ({
    url: URL.createObjectURL(file),
    size: Number((file.size / (1024 * 1024)).toFixed(2)),
});

const createEmptyChangeEvent = (
    inputRef: React.RefObject<HTMLInputElement>,
    name: string
): ChangeEvent<HTMLInputElement> =>
    ({
        ...new Event('change'),
        target: {
            ...inputRef.current!,
            name,
            type: 'file',
            value: '',
            files: null,
        },
    }) as unknown as ChangeEvent<HTMLInputElement>;

// Main Component
export const ImageInput = memo(
    ({ name, initImage, isAvatar = false, isError = false, onChange, value, disabled }: ImageInputProps) => {
        const [image, setImage] = useState<ImageData>({
            size: 0,
            url: initImage ?? value ?? '',
        });
        const inputFileRef = useRef<HTMLInputElement>(null);

        // Event Handlers
        const handleSelectFile = () => {
            inputFileRef.current?.click();
        };

        const handleResetImage = () => {
            setImage({ size: 0, url: initImage ?? value ?? '' });
            if (inputFileRef.current) {
                inputFileRef.current.files = null;
                if (typeof onChange === 'function')
                    onChange(createEmptyChangeEvent(inputFileRef as React.RefObject<HTMLInputElement>, name));
            }
        };

        const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;

            onChange?.(e);
            setImage(createImageData(file));
        };

        // Render Helpers
        const containerClasses = clsx(
            'h-24 md:h-40 lg:h-60 flex items-center flex-col justify-center text-center bg-gray-50/70 rounded-md border-2',
            image.url ? 'border-primary-500' : 'border-dashed',
            isError && 'border-red-500'
        );

        const imageClasses = clsx(
            'rounded-sm object-cover object-center overflow-hidden',
            isAvatar ? 'size-24 md:size-40 lg:size-60' : 'h-24 md:h-40 lg:h-60 w-full'
        );

        return (
            <div className={clsx('relative w-full pb-5', disabled ? 'cursor-not-allowed' : 'cursor-pointer')}>
                <div className={containerClasses} onClick={handleSelectFile}>
                    {image.url ? (
                        <img src={image.url} alt="Profile Picture" className={imageClasses} />
                    ) : (
                        <DefaultPlaceholderImage maxSize={isAvatar ? 2 : 5} pixel={isAvatar ? 100 : 720} />
                    )}
                </div>

                <input
                    ref={inputFileRef}
                    type="file"
                    name={name}
                    className="hidden"
                    onChange={handleImageChange}
                    disabled={disabled}
                    // value={value}
                    multiple={false}
                    accept="image/jpg,image/png,image/jpeg"
                />

                {image.size > 0 && (
                    <div className="absolute bottom-0 flex items-center gap-3 text-[10px] md:text-[12px]">
                        <span className="text-gray-600">{image.size} MB</span>
                        <span className="text-gray-900 hover:underline cursor-pointer" onClick={handleResetImage}>
                            Remove
                        </span>
                        <span
                            className="hidden lg:block text-primary font-medium hover:underline cursor-pointer"
                            onClick={handleSelectFile}
                        >
                            Replace
                        </span>
                    </div>
                )}
            </div>
        );
    }
);

ImageInput.displayName = 'ImageInput';

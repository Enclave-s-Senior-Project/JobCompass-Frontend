'use client';

import React, { ChangeEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { DefaultPlaceholderImage } from './default-placeholder-image';
import { toast } from 'react-toastify';

type Props = { name: string; initImage: string; isAvatar?: boolean; isError?: boolean };
type ImageProps = { url: string; size: number };

export function ImageInput({ name, initImage, isAvatar = false, isError = false }: Props) {
    const [image, setImage] = useState<ImageProps>({ size: 0, url: initImage ?? '' });

    const inputFileRef = useRef<HTMLInputElement>(null);

    const handleSelectFile = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click();
        }
    };

    const handleResetImage = () => {
        setImage({ size: 0, url: initImage });
        if (inputFileRef.current) {
            inputFileRef.current.files = null;
        }
    };

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const mb = file.size / (1024 * 1024);

            if (mb > (isAvatar ? 2 : 5)) {
                toast.warn('Your image is too large');
                return;
            }

            const imageUrl = URL.createObjectURL(file);
            setImage({
                url: imageUrl,
                size: +(file.size / (1024 * 1024)).toFixed(2),
            });
        }
    };

    return (
        <div className="relative w-full pb-5">
            <div
                className={clsx(
                    'h-24 md:h-40 lg:h-60 flex items-center flex-col justify-center text-center bg-gray-50/70 rounded-md border-2',
                    image.url ? 'border-primary-500' : 'border-dashed',
                    isError ? 'border-red-500' : ''
                )}
                onClick={handleSelectFile}
            >
                {!image.url ? (
                    <DefaultPlaceholderImage maxSize={isAvatar ? 2 : 5} pixel={isAvatar ? 100 : 720} />
                ) : (
                    <img
                        src={image.url ?? ''}
                        alt="Profile Picture"
                        className={clsx(
                            'rounded-sm object-cover object-center overflow-hidden',
                            isAvatar ? 'size-24 md:size-40 lg:size-60' : 'h-24 md:h-40 lg:h-60 w-full'
                        )}
                    />
                )}
            </div>
            <input
                name={name}
                ref={inputFileRef}
                type="file"
                className="hidden"
                onChange={handleOnChange}
                multiple={false}
                accept="image/jpg, image/png, image/jpeg"
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

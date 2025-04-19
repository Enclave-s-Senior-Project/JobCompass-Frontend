'use client';

import clsx from 'clsx';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { GoStarFill } from 'react-icons/go';

type Props = {
    stars?: number;
    value?: number;
    setValue?: Dispatch<SetStateAction<number>>;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    className?: string;
    interactive?: boolean;
};

const defaultFunction = () => {};

export const Rating = ({ stars = 5, value = 3, setValue, size = 'md', className, interactive = true }: Props) => {
    const [current, setCurrent] = useState(value);

    useEffect(() => {
        setCurrent(value);
    }, [value]);

    const handleMouseEnter = (index: number) => {
        setCurrent(index);
    };
    const handleMouseLeave = () => {
        setCurrent(value);
    };
    const handleChange = () => {
        if (setValue) {
            setValue(current);
        }
    };

    return (
        <div className={className}>
            <div className="flex items-center gap-1">
                {Array.from({ length: stars }).map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={interactive ? handleChange : defaultFunction}
                        onMouseEnter={interactive ? () => handleMouseEnter(index + 1) : defaultFunction}
                        onMouseLeave={interactive ? handleMouseLeave : defaultFunction}
                    >
                        <GoStarFill
                            className={clsx(
                                'transition-all',
                                interactive ? 'cursor-pointer hover:scale-125' : 'cursor-default',
                                index + 1 <= current ? `text-warning-500` : 'text-gray-400',
                                size === 'xs'
                                    ? 'size-5'
                                    : size === 'sm'
                                      ? 'size-8'
                                      : size === 'md'
                                        ? 'size-10'
                                        : size === 'lg'
                                          ? 'size-12'
                                          : size === 'xs'
                                            ? 'size-8'
                                            : size === 'tiny'
                                              ? 'size-5'
                                              : ''
                            )}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

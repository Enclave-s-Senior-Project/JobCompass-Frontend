'use client';

import { useEffect, useState } from 'react';

/**
 * How to use: const debouncedSearch = useDebounce(search, 1000)
 * @param value : T - the text to be debounced
 * @param delay : ms - the time to delay the debounced
 * @returns debouncedValue: T - the debounced value
 */
export function useDebounce<T>(value: T, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}

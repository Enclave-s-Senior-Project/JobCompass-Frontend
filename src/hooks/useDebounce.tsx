'use client';

import { useEffect, useState } from 'react';

/**
 * How to use: const debouncedSearch = useDebounce(search, 1000)
 * @param value : string - the text to be debounced
 * @param delay : ms - the time to delay the debounced
 * @returns debouncedValue: string - the debounced value
 */
export function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}

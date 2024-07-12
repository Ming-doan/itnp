import { useState, useEffect } from 'react';

function useDebounceState<T>(input: T, delay: number, callback: (value: T) => void): [T, (value: T) => void] {
    const [debouncedValue, setDebouncedValue] = useState<T>(input);

    useEffect(() => {
        const handler = setTimeout(() => {
            callback(debouncedValue);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [debouncedValue, delay, callback]);

    return [debouncedValue, setDebouncedValue];
}

export default useDebounceState
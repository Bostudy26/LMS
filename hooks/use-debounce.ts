import { useEffect, useState } from 'react';   

// useDebounce help to delay 500ms to getting any database without crash/worry about reqeusts.
// type but it will 500ms later to read finally of our input.


export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
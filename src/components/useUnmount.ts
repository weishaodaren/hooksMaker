import { useRef } from 'react';

const useUnmount = (fn: () => void) => {
  const fnRef = useRef(fn);
  fnRef.current = fn;
};

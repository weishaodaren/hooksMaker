import { useRef, useCallback } from 'react';

const useLock = <P extends any[] = Array<any>, T extends any = any>(
  fn: (...args: P) => Promise<T>
) => {
  const lock = useRef(false);
  return useCallback(
    async (...args: P) => {
      if (lock.current) return;
      lock.current = true;

      try {
        const ret = await fn(...args);
        lock.current = false;
        return ret;
      } catch (e) {
        lock.current = false;
        throw e;
      }
    },
    [fn]
  );
};

export default useLock;

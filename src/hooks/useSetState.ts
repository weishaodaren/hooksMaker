import { useState, useCallback } from 'react';

const useSetState = <T extends object>(
  initialState: T = {} as T
): [T, (patch: Partial<T> | ((_state: T) => Partial<T>)) => void] => {
  const [state, setState] = useState(initialState);
  const mergeState = useCallback((patch) => {
    setState((_state: any) => ({
      ..._state,
      patch,
    }));
  }, []);

  return [state, mergeState];
};

export default useSetState;

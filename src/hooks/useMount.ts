import { EffectCallback, useEffect } from 'react';

const useEffectOnce = (effect: EffectCallback) => {
  useEffect(effect, []);
};

const useMount = (fn: () => void) => {
  useEffectOnce(() => fn());
};

export default useMount;

import { useEffect } from 'react';

const useLifecycles = (mount: () => void, unmount?: () => void) => {
  useEffect(() => {
    if (mount) {
      mount();
    }
    return () => {
      if (unmount) {
        unmount();
      }
    };
  }, []);
};

export default useLifecycles;

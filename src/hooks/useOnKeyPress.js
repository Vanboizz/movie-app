import { useEffect } from 'react';

const useOnKeyPress = (callback, targetKey) => {
  useEffect(() => {
    const keyPressHandler = (e) => {
      if (e.key === targetKey) {
        callback();
      }
    };
    window.addEventListener('keydown', keyPressHandler);
    return () => {
      window.removeEventListener('keydown', keyPressHandler);
    };
  }, [callback, targetKey]);
};

export default useOnKeyPress;

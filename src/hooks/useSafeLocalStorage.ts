import { useState } from 'react';

export const useSafeLocalStorage = (key: string, initialValue: undefined) => {
   const [valueProxy, setValueProxy] = useState(() => {
      try {
         const value = window.localStorage.getItem(key);
         return value ? JSON.parse(value) : initialValue;
      } catch (error) {
         return initialValue;
      }
   });

   const setValue = (value: string) => {
      window.localStorage.setItem(key, value);
      setValueProxy(value);
   };

   return [valueProxy, setValue];
};

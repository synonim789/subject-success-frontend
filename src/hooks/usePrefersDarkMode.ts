import { useEffect, useState } from 'react';

export const usePrefersDarkMode = () => {
   const [value, setValue] = useState(true);
   useEffect(() => {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setValue(mediaQuery.matches);

      const handler = () => setValue(mediaQuery.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
   }, []);

   return value;
};

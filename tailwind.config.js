/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         colors: {
            'text-black': '#2A323C',
            'text-gray': '#737D8C',
            'green-house': {
               50: '#f0fce9',
               100: '#def7d0',
               200: '#bff0a6',
               300: '#97e373',
               400: '#73d447',
               500: '#53b929',
               600: '#3c941c',
               700: '#30711a',
               800: '#2a5a1a',
               900: '#28511c',
               950: '#102a09',
            },
         },
      },
   },
   plugins: [],
};

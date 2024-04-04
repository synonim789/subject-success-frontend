/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         colors: {
            'text-black': '#2A323C',
            'text-gray': '#737D8C',
         },
      },
   },
   plugins: [],
};

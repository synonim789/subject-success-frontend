import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import { cn } from '../utils/cn';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
   icon?: ReactNode;
   error?: FieldError;
   labelText: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
   (
      {
         id,
         error,
         labelText,
         type,
         placeholder,
         name,
         step,
         icon,
         className,
         ...props
      },
      ref,
   ) => {
      return (
         <div className="text-left">
            <label
               htmlFor={id}
               className={cn('font-medium text-gray-400', {
                  'text-red-500 dark:text-red-400': error,
               })}
            >
               {labelText}
            </label>
            <div
               className={cn(
                  'relative mb-4 mt-1 flex  w-full flex-col text-left',
                  {
                     'mb-0.5': error,
                  },
               )}
            >
               <input
                  type={type}
                  placeholder={placeholder}
                  name={name}
                  id={id}
                  className={cn(
                     'rounded-md  border border-[#CDD6E1] bg-transparent py-3 pl-5 pr-12 outline-none dark:border-slate-600 dark:text-white dark:[color-scheme:dark]',
                     className,
                     { ' border-red-500 dark:border-red-400': error },
                  )}
                  step={step}
                  ref={ref}
                  {...props}
               />

               {icon && (
                  <div className="absolute inset-y-0 right-3 flex items-center text-gray-600">
                     {icon}
                  </div>
               )}
            </div>
            {error?.message && (
               <div
                  className="mb-1.5 text-justify font-semibold text-red-500 dark:text-red-400"
                  role="alert"
               >
                  {error.message}
               </div>
            )}
         </div>
      );
   },
);
export default Input;

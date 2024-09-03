import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import { cn } from '../utils/cn';
import Input from './Input';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
   labelText: string;
   icon?: ReactNode;
   error?: FieldError;
}

const ProfileInput = forwardRef<HTMLInputElement, Props>(
   (
      {
         id,
         labelText,
         name,
         placeholder,
         type,
         error,
         icon,
         disabled = false,
         ...props
      },
      ref,
   ) => {
      return (
         <Input
            labelText={labelText}
            type={type}
            placeholder={placeholder}
            name={name}
            id={id}
            className={cn(
               'rounded-none border-0 border-b-2 border-[#CDD6E1] bg-transparent py-3 pl-5 pr-3 outline-none transition-all duration-500 placeholder:font-bold placeholder:text-gray-600 focus:border-green-house-500 dark:border-slate-600 dark:text-white',
               {
                  ' border-0 border-b-2 border-red-500 focus:border-red-500 dark:border-red-400':
                     error,
               },
            )}
            disabled={disabled}
            icon={icon}
            ref={ref}
            error={error}
            {...props}
         />
      );
   },
);
export default ProfileInput;

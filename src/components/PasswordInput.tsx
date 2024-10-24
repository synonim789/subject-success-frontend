import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { FieldError } from 'react-hook-form';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import Input from './Input';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
   error?: FieldError;
   labelText: string
}

export const PasswordInput = forwardRef<HTMLInputElement, Props>(
   ({ error, placeholder, id, labelText, ...props }, ref) => {
      const [showPassword, setShowPassword] = useState<boolean>(false);

      return (
         <div>
            <Input
               type={showPassword ? 'text' : 'password'}
               ref={ref}
               labelText={labelText}
               id={id}
               placeholder={placeholder || '**********'}
               autoComplete="current-password"
               error={error}
               {...props}
               icon={
                  <button
                     type="button"
                     onClick={() => setShowPassword(!showPassword)}
                     title={showPassword ? 'Hide password' : 'Show password'}
                  >
                     {showPassword ? (
                        <LuEyeOff className="size-5" />
                     ) : (
                        <LuEye className="size-5" />
                     )}
                  </button>
               }
            />
         </div>
      );
   },
);

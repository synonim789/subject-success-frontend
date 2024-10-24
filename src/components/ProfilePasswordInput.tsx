import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { FieldError } from 'react-hook-form';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import ProfileInput from './ProfileInput';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
   error?: FieldError;
   labelText: string;
}

const ProfilePasswordInput = forwardRef<HTMLInputElement, Props>(
   ({ id, error, labelText, ...props }, ref) => {
      const [showPassword, setShowPassword] = useState<boolean>(false);

      return (
         <ProfileInput
            type={showPassword ? 'text' : 'password'}
            labelText={labelText}
            ref={ref}
            id={id}
            error={error}
            icon={
               <button onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                     <LuEyeOff className="size-5" />
                  ) : (
                     <LuEye className="size-5" />
                  )}
               </button>
            }
            {...props}
         />
      );
   },
);

export default ProfilePasswordInput;

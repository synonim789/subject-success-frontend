import { ReactNode, useState } from 'react';
import { FieldError } from 'react-hook-form';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

type Input = {
   label: string;
   placeholder: string;
   icon?: ReactNode;
   id: string;
   name: string;
   type: string;
   isPassword?: boolean;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   register: any;
   error?: FieldError;
};

const Input = ({
   label,
   placeholder,
   icon,
   id,
   name,
   type,
   isPassword,
   register,
   error,
}: Input) => {
   const [isPasswordVisible, setIsPassowrdVisible] = useState(false);

   const togglePasswordVisibilty = () => {
      setIsPassowrdVisible(!isPasswordVisible);
   };

   return (
      <div className="text-left">
         <label
            htmlFor={id}
            className={`${error ? 'text-red-500' : 'text-gray-400'} font-medium`}
         >
            {label}
         </label>
         <div
            className={` ${error ? 'mb-0.5' : 'mb-4'} relative mt-1 flex w-full flex-col text-left`}
         >
            <input
               type={
                  isPassword ? (isPasswordVisible ? 'text' : 'password') : type
               }
               placeholder={placeholder}
               name={name}
               id={id}
               className={`${
                  error
                     ? 'border-2 border-red-500'
                     : 'border-[#CDD6E1] dark:border-slate-600'
               }  rounded-md border bg-transparent py-3 pl-5 pr-3 outline-none dark:text-white`}
               {...register}
            />
            {isPassword && (
               <button
                  className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                  onClick={togglePasswordVisibilty}
                  type="button"
               >
                  {isPasswordVisible ? (
                     <IoMdEye size={20} />
                  ) : (
                     <IoMdEyeOff size={20} />
                  )}
               </button>
            )}

            {icon && (
               <div className="absolute inset-y-0 right-3 flex items-center text-gray-600">
                  {icon}
               </div>
            )}
         </div>
         {error?.message && (
            <div
               className="mb-1.5 text-justify font-semibold text-red-500"
               role="alert"
            >
               {error.message}
            </div>
         )}
      </div>
   );
};
export default Input;

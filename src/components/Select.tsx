import { FieldError } from 'react-hook-form';

type Props = {
   label: string;
   id: string;
   name: string;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   register: any;
   error?: FieldError;
   options: string[];
};

const Select = ({ label, id, name, register, error, options }: Props) => {
   return (
      <div className="text-left">
         <label
            htmlFor={id}
            className={`${error ? 'text-red-500 dark:text-red-400' : 'text-gray-400'} font-medium`}
         >
            {label}
         </label>
         <div
            className={` ${error ? 'mb-0.5' : 'mb-4'} relative mt-1 flex w-full  flex-col text-left`}
         >
            <select
               name={name}
               id={id}
               className={`${
                  error
                     ? 'border-2 border-red-500 dark:border-red-400'
                     : 'border-[#CDD6E1] dark:border-slate-600'
               }  rounded-md border bg-transparent py-3 pl-5 pr-3 outline-none dark:text-white`}
               {...register}
            >
               {options.map((option) => (
                  <option
                     value={option}
                     key={option}
                     className="text-black dark:bg-black dark:text-white"
                  >
                     {option}
                  </option>
               ))}
            </select>
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
};
export default Select;

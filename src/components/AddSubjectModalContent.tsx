import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAddSubjectMutation } from '../app/api/subjectApiSlice';
import { AddSubjectFields, addSubjectSchema } from '../types/addSubjectSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { isFetchBaseQueryError } from '../utils/isFetchBaseQueryError';
import Input from './Input';
import { Button, Label, ListBox, ListBoxItem, Popover, Select, SelectValue } from 'react-aria-components';
import { FaChevronDown } from 'react-icons/fa';
import SubmitButton from './SubmitButton';

const AddSubjectModalContent = () => {
   const [addSubject, { isLoading }] = useAddSubjectMutation();

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
      control,
   } = useForm<AddSubjectFields>({
      resolver: zodResolver(addSubjectSchema),
      mode: 'onBlur',
   });

   const submitHandler: SubmitHandler<AddSubjectFields> = async (data) => {
      try {
         const { name, type } = data;
         await addSubject({
            name,
            type,
         }).unwrap();
         toast.success('Subject addess successsfully');
         reset();
      } catch (err) {
         if (isFetchBaseQueryError(err)) {
            const errMsg = (err as { data: { message: string } }).data.message;
            toast.error(errMsg);
         }
      }
   };

   if (isLoading) {
      return <p>Loading...</p>;
   }
   return (
      <div className="flex w-full items-center">
         <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex items-center gap-5">
               <Input
                  register={{ ...register('name') }}
                  label="Name"
                  placeholder="Enter name of subject"
                  id="name"
                  name="name"
                  type="text"
               />
               <Controller
                  control={control}
                  name="type"
                  render={({ field: { onChange } }) => (
                     <Select className="text-left" onSelectionChange={onChange}>
                        <Label
                           className={`${errors.type ? 'text-red-500 dark:text-red-400' : 'text-gray-400'} font-medium`}
                        >
                           Type
                        </Label>
                        <div className="relative mb-4 mt-1 flex w-full  flex-col text-left">
                           <Button className="flex items-center justify-between gap-x-5 rounded-md border border-[#CDD6E1] bg-transparent py-3 pl-5 pr-3 outline-none dark:border-slate-600 dark:text-white">
                              <SelectValue className="w-full text-gray-400" />
                              <FaChevronDown />
                           </Button>
                           <Popover className="overflow-hidden rounded-xl border border-black/10  bg-white p-2 text-slate-700 shadow-2xl dark:border-white dark:bg-zinc-900 dark:text-zinc-300">
                              <ListBox className="isolate max-h-[inherit] overflow-auto outline-none">
                                 <ListBoxItem
                                    id="grade"
                                    className="cursor-pointer rounded-lg p-1 font-semibold transition hover:bg-green-house-400 hover:text-black"
                                 >
                                    Grade
                                 </ListBoxItem>
                                 <ListBoxItem
                                    id="completion"
                                    className="cursor-pointer rounded-lg p-1 font-semibold transition hover:bg-green-house-400 hover:text-black"
                                 >
                                    Completion
                                 </ListBoxItem>
                              </ListBox>
                           </Popover>
                        </div>
                     </Select>
                  )}
               />
            </div>

            <SubmitButton text="Add Subject" disabled={isSubmitting} />
         </form>
      </div>
   );
};
export default AddSubjectModalContent;

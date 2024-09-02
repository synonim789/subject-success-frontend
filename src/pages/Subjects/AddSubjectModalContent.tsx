import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import {
   Button,
   Label,
   ListBox,
   ListBoxItem,
   Popover,
   Select,
   SelectValue,
} from 'react-aria-components';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaChevronDown } from 'react-icons/fa';
import { useAddSubjectMutation } from '../../app/api/subjectApiSlice';
import Input from '../../components/Input';
import SubmitButton from '../../components/SubmitButton';
import { ModalContext } from '../../context/ModalContext';
import { isFetchBaseQueryError } from '../../utils/isFetchBaseQueryError';
import { AddSubjectFields, addSubjectSchema } from '../../validation/subject';

const AddSubjectModalContent = () => {
   const [addSubject, { isLoading }] = useAddSubjectMutation();
   const { close } = useContext(ModalContext)!;
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
         toast.success('Subject added successfully');
         reset();
         close();
      } catch (err) {
         if (isFetchBaseQueryError(err)) {
            const errMsg = (err as { data: { message: string } }).data.message;
            toast.error(errMsg);
         }
      }
   };

   if (isLoading) {
      return (
         <AiOutlineLoading3Quarters
            className="animate-spin dark:text-white"
            size={40}
         />
      );
   }
   return (
      <div className="flex w-full items-center">
         <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col items-start gap-3 md:flex-row md:gap-5">
               <Input
                  labelText="Name"
                  placeholder="Enter name of subject"
                  id="name"
                  type="text"
                  {...register('name')}
                  error={errors.name}
               />
               <Controller
                  control={control}
                  name="type"
                  render={({ field: { onChange } }) => (
                     <Select
                        className="w-full text-left"
                        onSelectionChange={onChange}
                        aria-label="choose type"
                     >
                        <Label
                           className={`${errors.type ? 'text-red-500 dark:text-red-400' : 'text-gray-400'} font-medium`}
                        >
                           Type
                        </Label>
                        <div className="relative mb-4 mt-1 flex w-full  flex-col text-left">
                           <Button className="flex items-center justify-between gap-x-5 rounded-md border border-[#CDD6E1] bg-transparent py-3 pl-5 pr-3 text-left outline-none dark:border-slate-600 dark:text-white">
                              <SelectValue className="w-full text-gray-400" />
                              <FaChevronDown />
                           </Button>
                           <Popover
                              className="overflow-hidden rounded-xl border border-black/10  bg-white p-2 text-slate-700 shadow-2xl dark:border-white/40 dark:bg-zinc-900 dark:text-zinc-300"
                              ref={(ref) =>
                                 ref?.addEventListener('touchend', (e) =>
                                    e.preventDefault(),
                                 )
                              }
                           >
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

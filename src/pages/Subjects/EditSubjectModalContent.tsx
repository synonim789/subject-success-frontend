import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import {
   Button,
   Checkbox,
   Key,
   Label,
   ListBox,
   ListBoxItem,
   Popover,
   Select,
   SelectValue,
} from 'react-aria-components';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaCheck, FaChevronDown } from 'react-icons/fa';
import { useEditSubjectMutation } from '../../app/api/subjectApiSlice';
import Input from '../../components/Input';
import SubmitButton from '../../components/SubmitButton';
import {
   editSubjectFields,
   editSubjectSchema,
} from '../../types/editSubjectSchema';
import { isFetchBaseQueryError } from '../../utils/isFetchBaseQueryError';

type Props = {
   subjectName: string;
   subjectType: 'grade' | 'completion';
   subjectCompleted?: boolean | undefined;
   subjectGrade?: number | undefined;
   subjectId: string;
};

const EditSubjectModalContent = ({
   subjectName,
   subjectType,
   subjectCompleted,
   subjectGrade,
   subjectId,
}: Props) => {
   const [type, setType] = useState<'grade' | 'completion' | Key>(subjectType);
   const [completed, setCompleted] = useState(subjectCompleted);
   const [editSubject, { isLoading }] = useEditSubjectMutation();

   const {
      handleSubmit,
      register,
      control,
      formState: { errors, isSubmitting },
      watch,
   } = useForm<editSubjectFields>({
      resolver: zodResolver(editSubjectSchema),
      mode: 'onBlur',
      defaultValues: {
         name: subjectName,
         type: subjectType,
         completion: subjectCompleted,
         grade: subjectGrade,
      },
   });

   const submitHandler: SubmitHandler<editSubjectFields> = async (data) => {
      try {
         const { name, type, completion, grade } = data;

         await editSubject({
            name,
            type,
            completion,
            grade,
            subjectId,
         }).unwrap();
         toast.success('Subject updated successfully');
      } catch (err) {
         if (isFetchBaseQueryError(err)) {
            const errMsg = (err as { data: { message: string } }).data.message;
            toast.error(errMsg);
         }
      }
   };

   const selectedType = watch('type');

   if (isLoading) {
      return <p>Loading...</p>;
   }

   console.log(errors);

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
                  error={errors.name}
               />
               <Controller
                  control={control}
                  name="type"
                  render={({ field: { onChange } }) => (
                     <Select
                        className="text-left"
                        onSelectionChange={(selected) => {
                           onChange(selected);
                           setType(selected);
                        }}
                        selectedKey={type}
                     >
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
               {selectedType === 'completion' && (
                  <div className="text-left">
                     <Controller
                        control={control}
                        name="completion"
                        render={({ field: { onChange } }) => (
                           <Checkbox
                              className="group cursor-pointer"
                              onChange={(complete) => {
                                 onChange(complete);
                                 setCompleted(complete);
                              }}
                              isSelected={completed}
                           >
                              {({ isSelected }) => (
                                 <>
                                    <div className="flex h-full items-center gap-2 text-lg">
                                       <div
                                          className={`active: flex h-8 w-8 flex-shrink items-center justify-center rounded  border-2 hover:bg-green-house-300 ${isSelected && 'border-none bg-green-house-500 text-white hover:bg-green-house-900'}`}
                                       >
                                          {isSelected && <FaCheck size={15} />}
                                       </div>
                                       Completed
                                    </div>
                                 </>
                              )}
                           </Checkbox>
                        )}
                     />
                  </div>
               )}
               {selectedType === 'grade' && (
                  <Input
                     type="number"
                     label="Grade"
                     placeholder="Enter Grade"
                     id="grade"
                     name="grade"
                     register={{
                        ...register('grade', { valueAsNumber: true }),
                     }}
                     error={errors.grade}
                     step={0.1}
                  />
               )}
            </div>

            <SubmitButton text="Edit Subject" disabled={isSubmitting} />
         </form>
      </div>
   );
};
export default EditSubjectModalContent;

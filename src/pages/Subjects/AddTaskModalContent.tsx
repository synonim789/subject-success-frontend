import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAddTaskMutation } from '../../app/api/taskApiSlice';
import Input from '../../components/Input';
import SubmitButton from '../../components/SubmitButton';
import { ModalContext } from '../../context/ModalContext';
import { isFetchBaseQueryError } from '../../utils/isFetchBaseQueryError';
import { AddTaskFields, addTaskSchema } from '../../validation/task';

type Props = {
   subjectId: string;
};

const AddTaskModalContent = ({ subjectId }: Props) => {
   const [addTask] = useAddTaskMutation();
   const { close } = useContext(ModalContext)!;

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
   } = useForm<AddTaskFields>({
      resolver: zodResolver(addTaskSchema),
      mode: 'onBlur',
      defaultValues: {
         date: new Date().toISOString().substring(0, 10),
      },
   });

   const submitHandler: SubmitHandler<AddTaskFields> = async (data) => {
      try {
         const { name, date } = data;
         await addTask({ subjectId, name, date }).unwrap();
         toast.success('Task added successfully');
         close();
      } catch (err) {
         if (isFetchBaseQueryError(err)) {
            const errMsg = (err as { data: { message: string } }).data.message;
            toast.error(errMsg);
         }
      }
   };

   return (
      <div className="flex w-full items-center">
         <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col gap-3 md:flex-row md:gap-5">
               <Input
                  id="name"
                  labelText="Name"
                  placeholder="Enter Task"
                  type="text"
                  {...register('name')}
                  error={errors.name}
               />
               <Input
                  type="date"
                  labelText="Date"
                  placeholder="dd/mm/yyyy"
                  className="w-full"
                  {...register('date')}
                  error={errors.date}
                  id="date"
               />
            </div>

            <SubmitButton text="Add Task" disabled={isSubmitting} />
         </form>
      </div>
   );
};
export default AddTaskModalContent;

import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useEditTaskNameMutation } from '../app/api/taskApiSlice';
import { ModalContext } from '../context/ModalContext';
import { isFetchBaseQueryError } from '../utils/isFetchBaseQueryError';
import { EditTaskFields, editTaskSchema } from '../validation/task';
import Input from './Input';
import SubmitButton from './SubmitButton';

type Props = {
   taskId: string;
   taskName: string;
   taskDate?: string;
};

const EditTaskModalContent = ({ taskId, taskName, taskDate }: Props) => {
   const { close } = useContext(ModalContext)!;
   const [editTaskName] = useEditTaskNameMutation();

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
   } = useForm<EditTaskFields>({
      resolver: zodResolver(editTaskSchema),
      mode: 'onBlur',
      defaultValues: {
         name: taskName,
         date: taskDate
            ? new Date(taskDate).toISOString().substring(0, 10)
            : undefined,
      },
   });

   const submitHandler: SubmitHandler<EditTaskFields> = async (data) => {
      try {
         const { name, date } = data;
         await editTaskName({ taskId, name, date }).unwrap();
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
            <div className="flex flex-col gap-5 md:flex-row">
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
                  id="date"
                  labelText="Date"
                  placeholder=""
                  {...register('date')}
                  error={errors.date}
               />
            </div>

            <SubmitButton text="Edit Task" disabled={isSubmitting} />
         </form>
      </div>
   );
};
export default EditTaskModalContent;

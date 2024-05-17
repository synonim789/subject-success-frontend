import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useEditTaskNameMutation } from '../../app/api/taskApiSlice';
import Input from '../../components/Input';
import SubmitButton from '../../components/SubmitButton';
import { ModalContext } from '../../context/ModalContext';
import { EditTaskFields, editTaskSchema } from '../../types/schemas';
import { isFetchBaseQueryError } from '../../utils/isFetchBaseQueryError';

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
            : '',
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
            <div className="flex gap-5">
               <Input
                  id="name"
                  label="Name"
                  placeholder="Enter Task"
                  name="name"
                  type="text"
                  register={{ ...register('name') }}
                  error={errors.name}
               />
               <Input
                  type="date"
                  id="date"
                  label="Date"
                  placeholder=""
                  name="date"
                  register={{ ...register('date') }}
                  error={errors.date}
               />
            </div>

            <SubmitButton text="Edit Task" disabled={isSubmitting} />
         </form>
      </div>
   );
};
export default EditTaskModalContent;

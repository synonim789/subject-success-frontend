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
};

const EditTaskModalContent = ({ taskId, taskName }: Props) => {
   const { close } = useContext(ModalContext)!;
   const [editTaskName] = useEditTaskNameMutation();

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
   } = useForm<EditTaskFields>({
      resolver: zodResolver(editTaskSchema),
      mode: 'onBlur',
      defaultValues: { name: taskName },
   });

   const submitHandler: SubmitHandler<EditTaskFields> = async (data) => {
      try {
         const { name } = data;
         await editTaskName({ taskId, name }).unwrap();
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
            <Input
               id="name"
               label="Name"
               placeholder="Enter Task"
               name="name"
               type="text"
               register={{ ...register('name') }}
               error={errors.name}
            />
            <SubmitButton text="Add Task" disabled={isSubmitting} />
         </form>
      </div>
   );
};
export default EditTaskModalContent;

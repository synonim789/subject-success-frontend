import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAddTaskMutation } from '../../app/api/taskApiSlice';
import Input from '../../components/Input';
import SubmitButton from '../../components/SubmitButton';
import { AddTaskFields, addTaskSchema } from '../../types/addTaskSchema';
import { isFetchBaseQueryError } from '../../utils/isFetchBaseQueryError';

type Props = {
   subjectId: string;
};

const AddTaskModalContent = ({ subjectId }: Props) => {
   const [addTask, { isLoading }] = useAddTaskMutation();
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
   } = useForm<AddTaskFields>({
      resolver: zodResolver(addTaskSchema),
      mode: 'onBlur',
   });

   const submitHandler: SubmitHandler<AddTaskFields> = async (data) => {
      try {
         const { name } = data;
         await addTask({ subjectId, name }).unwrap();
         toast.success('Task added successfully');
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
export default AddTaskModalContent;

import { useContext } from 'react';
import toast from 'react-hot-toast';
import { useDeleteAllTasksMutation } from '../../app/api/taskApiSlice';
import { ModalContext } from '../../context/ModalContext';
import { isFetchBaseQueryError } from '../../utils/isFetchBaseQueryError';

const DeleteAllTaskModalContent = () => {
   const { close } = useContext(ModalContext)!;
   const [deleteTasks] = useDeleteAllTasksMutation();

   const handleDelete = async () => {
      try {
         await deleteTasks();
         toast.success('Tasks deleted successfully');
         close();
      } catch (err) {
         if (isFetchBaseQueryError(err)) {
            const errMsg = (err as { data: { message: string } }).data.message;
            toast.error(errMsg);
         }
      }
   };

   return (
      <section className="m-5">
         <h2 className="mb-4 text-3xl font-bold">
            Do you really want to delete all the tasks?
         </h2>
         <div className="flex items-center justify-center gap-10">
            <button
               className="rounded-md bg-green-500 px-4 py-2 font-bold transition hover:bg-green-600"
               onClick={handleDelete}
            >
               Yes, I want
            </button>
            <button
               className="rounded-md bg-red-500 px-4 py-2 font-bold transition hover:bg-red-600"
               onClick={close}
            >
               No, I don't
            </button>
         </div>
      </section>
   );
};
export default DeleteAllTaskModalContent;

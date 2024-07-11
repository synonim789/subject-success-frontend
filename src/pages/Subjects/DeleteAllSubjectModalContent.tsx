import { useContext } from 'react';
import toast from 'react-hot-toast';
import { useDeleteAllSubjectsMutation } from '../../app/api/subjectApiSlice';
import { ModalContext } from '../../context/ModalContext';

const DeleteAllSubjectModalContent = () => {
   const { close } = useContext(ModalContext)!;
   const [deleteSubjects] = useDeleteAllSubjectsMutation();

   const handleDelete = async () => {
      try {
         await deleteSubjects();
         toast.success('Subjects deleted successfully');
         close();
      } catch (err) {
         const errMsg = (err as { data: { message: string } }).data.message;
         toast.error(errMsg);
      }
   };

   return (
      <section className="m-5">
         <h2 className="text-3xl font-bold">
            Do you really want to delete all the subjects?
         </h2>
         <p className="my-4 text-xl font-semibold">
            (It will also delete all the tasks)
         </p>
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
export default DeleteAllSubjectModalContent;

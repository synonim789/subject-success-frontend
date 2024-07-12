import { useContext } from 'react';
import toast from 'react-hot-toast';
import { useSendLogoutMutation } from '../../app/api/authApiSlice';
import { useDeleteUserMutation } from '../../app/api/userApiSlice';
import { ModalContext } from '../../context/ModalContext';

const DeleteUserModalContent = () => {
   const { close } = useContext(ModalContext)!;
   const [deleteUser] = useDeleteUserMutation();
   const [logout] = useSendLogoutMutation();

   const handleDelete = async () => {
      try {
         await deleteUser();
         await logout();
         toast.success('User deleted successfully');
      } catch (err) {
         const errMsg = (err as { data: { message: string } }).data.message;
         toast.error(errMsg);
      }
   };

   return (
      <section className="m-5">
         <h2 className="mb-6 text-3xl">
            Do your really want to delete your account?
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
export default DeleteUserModalContent;

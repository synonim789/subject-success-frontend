import { Button } from 'react-aria-components';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';
import { useGetUserQuery } from '../../app/api/userApiSlice';
import Header from '../../components/Header';
import ModalComponent from '../../components/Modal';
import DeleteUserModalContent from './DeleteUserModalContent';
import SetNewPasswordForm from './SetNewPasswordForm';
import UpdateUserInfo from './UpdateUserInfo';
import UploadImageModalContent from './UploadImageModalContent';
import ProfileImagePlaceholder from '/profile-placeholder.jpg';

const ProfilePage = () => {
   const { data, isLoading, isError } = useGetUserQuery();

   if (isLoading) {
      return (
         <AiOutlineLoading3Quarters
            className="animate-spin dark:text-white"
            size={40}
         />
      );
   }

   if (isError) {
      return <p>Error</p>;
   }

   return (
      <>
         <section>
            <Header text="profile" />
            <section className="mb-5 flex w-full flex-col items-center justify-between gap-10 rounded-xl  bg-white px-5 py-8 drop-shadow-xl sm:flex-row dark:bg-dark-700">
               <div className="flex flex-col items-center gap-10 md:flex-row">
                  <div className="relative w-fit">
                     {data?.picture ? (
                        <img
                           src={data.picture}
                           alt="picture"
                           className="relative size-28 rounded-full"
                           referrerPolicy="no-referrer"
                        />
                     ) : (
                        <img
                           src={ProfileImagePlaceholder}
                           alt="profile placeholder image"
                           className="relative size-28 rounded-full"
                        />
                     )}
                     <ModalComponent
                        button={
                           <Button
                              className="absolute bottom-0 right-0 flex size-12 cursor-pointer items-center justify-center rounded-full bg-green-house-500 p-1 text-white transition duration-300 hover:scale-110 hover:bg-green-house-600 hover:text-black dark:hover:text-black"
                              aria-label="edit profile image"
                           >
                              <CiEdit size={25} />
                           </Button>
                        }
                     >
                        <UploadImageModalContent />
                     </ModalComponent>
                  </div>
                  <div className="text-center sm:text-left">
                     <p className="text-xl dark:text-white/85">
                        {data?.username}
                     </p>
                     <p className="text-lg dark:text-white/55">{data?.email}</p>
                  </div>
               </div>

               <ModalComponent
                  button={
                     <Button
                        className="rounded-lg bg-red-500 px-2 py-1 text-lg text-white transition hover:bg-red-600"
                        aria-label="delete user"
                     >
                        Delete User
                     </Button>
                  }
               >
                  <DeleteUserModalContent />
               </ModalComponent>
            </section>
            <section className="flex w-full flex-col gap-10 lg:flex-row">
               <UpdateUserInfo />
               <SetNewPasswordForm />
            </section>
         </section>
      </>
   );
};
export default ProfilePage;

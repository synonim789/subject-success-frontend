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
      return <p>Loading...</p>;
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
                        buttonChildren={<CiEdit size={25} />}
                        buttonClassName="absolute bottom-0 right-0 flex size-12 cursor-pointer items-center justify-center rounded-full bg-green-house-500 p-1 transition duration-300 hover:scale-110 hover:bg-green-house-600 hover:text-white"
                        children={<UploadImageModalContent />}
                        label="edit image"
                     />
                  </div>
                  <div className="text-center sm:text-left">
                     <p className="text-xl dark:text-white/85">
                        {data?.username}
                     </p>
                     <p className="text-lg dark:text-white/55">{data?.email}</p>
                  </div>
               </div>

               <ModalComponent
                  buttonChildren={<>Delete User</>}
                  buttonClassName="rounded-lg bg-red-500 px-2 py-1 text-white transition hover:bg-red-600 text-lg"
                  children={<DeleteUserModalContent />}
                  label="delete user"
               />
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

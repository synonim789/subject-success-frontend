import { useRef } from 'react';
import { CiEdit } from 'react-icons/ci';
import { useGetUserQuery } from '../../app/api/userApiSlice';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import UploadImageModalContent from '../../components/UploadImageModalContent';
import SetNewPasswordForm from './SetNewPasswordForm';
import UpdateUserInfo from './UpdateUserInfo';
import ProfileImagePlaceholder from '/profile-placeholder.jpg';

const ProfilePage = () => {
   const { data, isLoading, isError } = useGetUserQuery();
   const modalRef = useRef<HTMLDialogElement | null>(null);
   const showModal = () => modalRef.current?.showModal();
   const closeModal = () => modalRef.current?.close();

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
            <section className="mb-5  flex w-full flex-col items-center gap-10 rounded-xl  bg-white px-5 py-8 drop-shadow-xl sm:flex-row dark:bg-dark-700">
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

                  <button
                     className="absolute bottom-0 right-0 flex size-12 cursor-pointer items-center justify-center rounded-full bg-green-house-500 p-1 transition duration-300 hover:scale-110 hover:bg-green-house-600 hover:text-white"
                     type="button"
                     onClick={showModal}
                     aria-label="Edit Image"
                  >
                     <CiEdit size={25} />
                  </button>
               </div>
               <div className="text-center sm:text-left">
                  <p className="text-xl dark:text-white/85">{data?.username}</p>
                  <p className="text-lg dark:text-white/55">{data?.email}</p>
               </div>
            </section>
            <section className="flex w-full flex-col gap-10 lg:flex-row">
               <UpdateUserInfo />
               <SetNewPasswordForm />
            </section>
         </section>
         <Modal modalRef={modalRef} close={closeModal}>
            <UploadImageModalContent />
         </Modal>
      </>
   );
};
export default ProfilePage;

import { CiEdit } from 'react-icons/ci';
import { useGetUserQuery } from '../../app/api/userApiSlice';
import Header from '../../components/Header';
import ProfileInput from '../../components/ProfileInput';
import SubmitButton from '../../components/SubmitButton';
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
      <section>
         <Header text="profile" />
         <section className="mb-5  flex w-full items-center gap-10  rounded-xl bg-white px-5 py-8 drop-shadow-xl dark:bg-dark-700">
            <div className="relative w-fit">
               {data?.picture ? (
                  <img
                     src={data.picture}
                     alt="piture"
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
               >
                  <CiEdit size={25} />
               </button>
            </div>
            <div>
               <p className="text-xl dark:text-white/85">{data?.username}</p>
               <p className="text-lg dark:text-white/55">{data?.email}</p>
            </div>
         </section>
         <section className="flex w-full flex-col gap-10 lg:flex-row">
            <section className=" w-full rounded-xl bg-white/80 p-10 drop-shadow-xl  dark:bg-dark-600">
               <ProfileInput
                  name="username"
                  type="text"
                  label="Username"
                  id="username"
                  placeholder="Enter Username"
                  register=""
               />
               <ProfileInput
                  name="Email"
                  type="email"
                  label="Email"
                  id="email"
                  placeholder="Enter Email"
                  register=""
                  disabled
               />
               <SubmitButton text="update user" disabled={false} />
            </section>
            <section className=" grid w-full rounded-xl bg-white/80 p-10 drop-shadow-xl  dark:bg-dark-600">
               <ProfileInput
                  name="Password"
                  type="password"
                  label="Password"
                  id="password"
                  placeholder="Enter Password"
                  register=""
                  isPassword
               />
               <ProfileInput
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  id="confirmPassword"
                  placeholder="Re-enter Password"
                  register=""
                  isPassword
               />
               <SubmitButton text="Reset Password" disabled={false} />
            </section>
         </section>
      </section>
   );
};
export default ProfilePage;

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
   useGetUserQuery,
   useUpdateUsernameMutation,
} from '../../app/api/userApiSlice';
import ProfileInput from '../../components/ProfileInput';
import SubmitButton from '../../components/SubmitButton';
import {
   UpdateUsernameFields,
   updateUsernameSchema,
} from '../../types/schemas';
import { isFetchBaseQueryError } from '../../utils/isFetchBaseQueryError';

const UpdateUserInfo = () => {
   const { data, isSuccess } = useGetUserQuery();
   const [updateUsername, { error }] = useUpdateUsernameMutation();

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
   } = useForm<UpdateUsernameFields>({
      resolver: zodResolver(updateUsernameSchema),
      mode: 'onBlur',
      defaultValues: {
         email: data?.email,
      },
   });

   const submitHandler: SubmitHandler<UpdateUsernameFields> = async (data) => {
      try {
         const { username } = data;
         const { message } = await updateUsername({
            username,
         }).unwrap();
         toast.success(message);
         reset();
      } catch (err) {
         if (isFetchBaseQueryError(err)) {
            const errMsg = (err as { data: { message: string } }).data.message;
            toast.error(errMsg);
         }
      }
   };

   useEffect(() => {
      if (isSuccess) {
         reset({ email: data.email });
      }
   }, [data, isSuccess, reset]);

   return (
      <form
         className="flex w-full flex-col gap-10 rounded-xl  bg-white/80 p-8 drop-shadow-xl dark:bg-dark-600"
         onSubmit={handleSubmit(submitHandler)}
      >
         <ProfileInput
            name="username"
            type="text"
            label="Username"
            id="username"
            placeholder="Enter Username"
            register={{ ...register('username') }}
            error={errors.username}
         />
         <ProfileInput
            name="Email"
            type="email"
            label="Email"
            id="email"
            placeholder="Enter Email"
            register={{ ...register('email') }}
            disabled
            error={errors.email}
         />
         {error && (
            <p className="mt-2 text-left font-semibold text-red-500 dark:text-red-400">
               {'status' in error
                  ? (error as { data: { message: string } }).data.message
                  : error.message}
            </p>
         )}
         <SubmitButton text="update user" disabled={isSubmitting} />
      </form>
   );
};
export default UpdateUserInfo;

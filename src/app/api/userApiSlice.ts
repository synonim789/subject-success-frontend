import { User } from '../../types/UserModel';
import { api } from './apiSlice';

const userApiSlice = api.injectEndpoints({
   endpoints: (build) => ({
      signUp: build.mutation<
         { message: string },
         { email: string; username: string; password: string }
      >({
         query: ({ email, username, password }) => ({
            url: '/user/sign-up',
            method: 'POST',
            body: { email, username, password },
         }),
      }),
      forgotPassword: build.mutation<{ message: string }, { email: string }>({
         query: ({ email }) => ({
            url: '/user/forgot-password',
            method: 'POST',
            body: { email },
         }),
      }),
      resetPassword: build.mutation<
         { message: string },
         { password: string; confirmPassword: string; otp: number }
      >({
         query: ({ password, confirmPassword, otp }) => ({
            url: '/user/reset-password',
            method: 'PUT',
            body: { password, confirmPassword, otp },
         }),
      }),
      getUser: build.query<User, void>({
         query: () => '/user',
         providesTags: ['User'],
      }),
      setNewPassword: build.mutation<
         { message: string },
         { password: string; confirmPassword: string }
      >({
         query: ({ password, confirmPassword }) => ({
            url: '/user/set-new-password',
            method: 'PUT',
            body: { password, confirmPassword },
         }),
      }),
      updateUsername: build.mutation<{ message: string }, { username: string }>(
         {
            query: ({ username }) => ({
               url: '/user/update-username',
               method: 'PUT',
               body: { username },
            }),
            invalidatesTags: ['User'],
         },
      ),
      updateProfilePicture: build.mutation<{ message: string }, FormData>({
         query: (body) => ({
            url: '/user/update-profile-image',
            method: 'PUT',
            body: body,
         }),
         invalidatesTags: ['User'],
      }),
   }),
});

export const {
   useSignUpMutation,
   useForgotPasswordMutation,
   useResetPasswordMutation,
   useGetUserQuery,
   useSetNewPasswordMutation,
   useUpdateUsernameMutation,
   useUpdateProfilePictureMutation,
} = userApiSlice;

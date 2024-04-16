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
         query: () => '/user/user',
         providesTags: ['User'],
      }),
   }),
});

export const {
   useSignUpMutation,
   useForgotPasswordMutation,
   useResetPasswordMutation,
   useGetUserQuery,
} = userApiSlice;

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
   }),
});

export const { useSignUpMutation, useForgotPasswordMutation } = userApiSlice;

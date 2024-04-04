import { setUser } from '../slices/authSlice';
import { api } from './apiSlice';

export const authApiSlice = api.injectEndpoints({
   endpoints: (build) => ({
      login: build.mutation<string, { email: string; password: string }>({
         query: ({ email, password }) => ({
            url: '/auth/login',
            method: 'POST',
            body: { email, password },
         }),
      }),
      refresh: build.mutation<string, void>({
         query: () => ({
            url: '/auth/refresh',
            method: 'GET',
         }),
         async onQueryStarted(args, { dispatch, queryFulfilled }) {
            try {
               const { data } = await queryFulfilled;
               dispatch(setUser({ accessToken: data }));
            } catch (error) {
               console.log(error);
            }
         },
      }),
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
   }),
});

export const { useLoginMutation, useRefreshMutation, useSignUpMutation } =
   authApiSlice;

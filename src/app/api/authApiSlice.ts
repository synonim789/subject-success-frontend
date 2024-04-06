import { setUser } from '../slices/authSlice';
import { api } from './apiSlice';

const authApiSlice = api.injectEndpoints({
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
         async onQueryStarted(_args, { dispatch, queryFulfilled }) {
            try {
               const { data } = await queryFulfilled;
               dispatch(setUser({ accessToken: data }));
            } catch (error) {
               console.log(error);
            }
         },
      }),
   }),
});

export const { useLoginMutation, useRefreshMutation } = authApiSlice;

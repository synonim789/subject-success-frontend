import { logout, setIsAuthenticated } from '../slices/authSlice';
import { api } from './apiSlice';

const authApiSlice = api.injectEndpoints({
   endpoints: (build) => ({
      login: build.mutation<
         { isAuthenticated: boolean },
         { email: string; password: string }
      >({
         query: ({ email, password }) => ({
            url: '/auth/login',
            method: 'POST',
            body: { email, password },
         }),
      }),
      refresh: build.mutation<{ isAuthenticated: boolean }, void>({
         query: () => ({
            url: '/auth/refresh',
            method: 'GET',
         }),
         async onQueryStarted(_args, { dispatch, queryFulfilled }) {
            try {
               const { data } = await queryFulfilled;
               dispatch(setIsAuthenticated(data.isAuthenticated));
            } catch (error) {
               console.log(error);
            }
         },
         invalidatesTags: ['User'],
      }),
      sendLogout: build.mutation<{ message: string }, void>({
         query: () => ({
            url: '/auth/logout',
            method: 'POST',
         }),
         async onQueryStarted(_args, { dispatch, queryFulfilled }) {
            try {
               await queryFulfilled;
               dispatch(logout());
            } catch (error) {
               console.log(error);
            }
         },
      }),
   }),
});

export const { useLoginMutation, useRefreshMutation, useSendLogoutMutation } =
   authApiSlice;

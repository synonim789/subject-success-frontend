import {
   BaseQueryFn,
   FetchArgs,
   FetchBaseQueryError,
   createApi,
   fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import env from '../../utils/cleanEnv';
import { logout, setIsAuthenticated } from '../slices/authSlice';

const baseQuery = fetchBaseQuery({
   baseUrl: new URL(env.VITE_SERVER_ENDPOINT).href,
   credentials: 'include',
});

const baseQueryWithReauth: BaseQueryFn<
   string | FetchArgs,
   unknown,
   FetchBaseQueryError
> = async (args, api, extraOptions) => {
   let result = await baseQuery(args, api, extraOptions);
   if (result.error && result.error.status === 403) {
      const refreshResult = await baseQuery(
         `${env.VITE_BACKEND_SERVER_URL}/auth/refresh`,
         api,
         extraOptions,
      );
      if (refreshResult.data) {
         api.dispatch(setIsAuthenticated(refreshResult.data.isAuthenticated));
         result = await baseQuery(args, api, extraOptions);
      } else {
         api.dispatch(logout());
      }
   }
   return result;
};

export const api = createApi({
   reducerPath: 'api',
   baseQuery: baseQueryWithReauth,
   endpoints: () => ({}),
});

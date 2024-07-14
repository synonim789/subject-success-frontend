import {
   BaseQueryFn,
   FetchArgs,
   FetchBaseQueryError,
   createApi,
   fetchBaseQuery,
   retry,
} from '@reduxjs/toolkit/query/react';
import env from '../../utils/cleanEnv';
import { setIsAuthenticated } from '../slices/authSlice';

type RefreshResponse = {
   isAuthenticated: boolean;
};

const baseQuery = retry(
   fetchBaseQuery({
      baseUrl: new URL(env.VITE_SERVER_ENDPOINT).href,
      credentials: 'include',
   }),
   {
      maxRetries: 6,
   },
);

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
      const refreshData = refreshResult.data as RefreshResponse;
      if (refreshData) {
         api.dispatch(setIsAuthenticated(refreshData.isAuthenticated));
         result = await baseQuery(args, api, extraOptions);
      }
   }
   return result;
};

export const api = createApi({
   reducerPath: 'api',
   baseQuery: baseQueryWithReauth,
   endpoints: () => ({}),
   tagTypes: ['User', 'Subject', 'Dates', 'Task', 'Completed'],
});

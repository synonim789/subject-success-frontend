import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import env from '../../utils/cleanEnv'
import { logout, setUser } from '../slices/authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: env.VITE_BACKEND_SERVER_URL,
  credentials: 'include',
})

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 403) {
    const refreshResult = await baseQuery(
      `${env.VITE_BACKEND_SERVER_URL}/auth/refresh`,
      api,
      extraOptions
    )
    if (refreshResult.data && typeof refreshResult.data === 'string') {
      api.dispatch(setUser({ accessToken: refreshResult.data }))
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
    }
  }
  return result
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
})

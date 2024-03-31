import { api } from './apiSlice'

export const authApiSlice = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<string, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: '/auth/login',
        method: 'POST',
        body: { email, password },
      }),
    }),
  }),
})

export const { useLoginMutation } = authApiSlice

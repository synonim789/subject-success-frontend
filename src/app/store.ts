import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { api } from './api/apiSlice'
import authSlice from './api/authSlice'

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authSlice,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>

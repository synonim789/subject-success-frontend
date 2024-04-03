import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { api } from './api/apiSlice'
import authSlice from './slices/authSlice'

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authSlice,
})
export type RootState = ReturnType<typeof rootReducer>

export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    preloadedState,
  })

const store = setupStore()

export type AppStore = ReturnType<typeof setupStore>

setupListeners(store.dispatch)

export default store

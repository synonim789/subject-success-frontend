import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from './api/apiSlice';
import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';

const rootReducer = combineReducers({
   [api.reducerPath]: api.reducer,
   auth: authSlice,
   user: userSlice,
});
export type RootState = ReturnType<typeof rootReducer>;

export const setupStore = (preloadedState?: Partial<RootState>) =>
   configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
         getDefaultMiddleware().concat(api.middleware),
      preloadedState,
   });

export type AppStore = ReturnType<typeof setupStore>;

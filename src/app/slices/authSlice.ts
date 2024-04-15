import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type InitialState = {
   isAuthenticated: boolean;
};

const initialState: InitialState = {
   isAuthenticated: false,
};

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
         state.isAuthenticated = action.payload;
      },
      logout: (state) => {
         state.isAuthenticated = false;
      },
   },
});

export const { setIsAuthenticated, logout } = authSlice.actions;
export default authSlice.reducer;

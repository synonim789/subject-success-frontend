import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type InitialState = {
   token: string | null;
};

const initialState: InitialState = {
   token: null,
};

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setUser: (state, action: PayloadAction<{ accessToken: string }>) => {
         const { accessToken } = action.payload;
         state.token = accessToken;
      },
      logout: (state) => {
         state.token = null;
      },
   },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type InitialState = {
   otp: null | number;
};

const initialState: InitialState = {
   otp: null,
};

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setOtp: (state, action: PayloadAction<{ otp: number }>) => {
         state.otp = action.payload.otp;
      },
   },
});

export const { setOtp } = userSlice.actions;
export default userSlice.reducer;

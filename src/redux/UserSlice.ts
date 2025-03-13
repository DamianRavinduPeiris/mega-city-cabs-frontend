import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserType from "../types/UserType";

const initialState: UserType = {} as UserType;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to log in and set user data
    loginUser: (state, action: PayloadAction<UserType>) => {
      console.log("State : ", state);
      return action.payload; // Store user data
    },
    // Action to log out
    logoutUser: () => {
      return initialState; // Reset user state
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;

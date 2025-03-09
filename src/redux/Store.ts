import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import rideBookingReducer from "./RideBookingSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    rideBooking: rideBookingReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import RideBookingType from "../types/RideBookingType";

const rideBookingInitialState: RideBookingType = {} as RideBookingType;

const rideBookingSlice = createSlice({
  name: "rideBooking",
  initialState: rideBookingInitialState,
  reducers: {
    saveRideBookingData: (state, action: PayloadAction<RideBookingType>) => {
      return action.payload;
    },
    deleteRideBookingData: () => {
      return rideBookingInitialState;
    },
  },
});

export const { saveRideBookingData, deleteRideBookingData } =
  rideBookingSlice.actions;

export default rideBookingSlice.reducer;

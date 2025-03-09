import { useEffect, useState } from "react";
import VehicleType from "../../types/VehicleType";
import { fetchVehicles, showAlert } from "../../util/CommonUtils";
import TravelDistanceCard from "./TravelDistanceCard";
import RideBookingType from "../../types/RideBookingType";
import store from "../../redux/Store";
import { saveRideBookingData } from "../../redux/RideBookingSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import DateTimePicker from "./DateTimePicker";
const baseURL = import.meta.env.VITE_BASE_URL;

interface VehicleListProps {
  originCity: string;
  destinationCity: string;
  distance: string;
  duration: string;
  driverId: string
}

const VehicleList = ({ originCity, destinationCity, distance, duration, driverId }: VehicleListProps) => {
  const [vehicles, setVehicles] = useState<VehicleType[]>([]);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | undefined>(new Date())
  const user = useSelector((state: RootState) => state.user);
  const bookingDetails = useSelector((state: RootState) => state.rideBooking);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVehicles(baseURL, setVehicles);
  }, []);

  function saveRideBookingDataToRedux(vehicle: VehicleType, totalPrice: number) {
    const rideBookingData: RideBookingType = {
      orderId: uuidv4(),
      userId: user.userId,
      userName: user.name,
      driverId: driverId,
      vehicleId: vehicle.vehicleId,
      vehicleName: vehicle.vehicleName,
      vehicleNumberPlate: vehicle.vehicleNumberPlate,
      pickUpCity: originCity,
      destinationCity: destinationCity,
      duration: duration,
      date: selectedDateTime?.toISOString() || '',
      price: totalPrice,
      distance: distance,
    }

    store.dispatch(saveRideBookingData(rideBookingData));
    setTimeout(() => {
      console.log('rideBookingData', bookingDetails)
      showAlert('Navigating you to the booking confirmation page..', '✅', 'success');
      navigate('/confirm-trip');
    }, 2000);
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Select a Date and Time.</h2>
      <DateTimePicker value={selectedDateTime} onChange={setSelectedDateTime}/>
      <h2 className="text-2xl font-semibold m-2">Distance Estimation.</h2>

      <TravelDistanceCard
        originCity={originCity}
        destinationCity={destinationCity}
        distance={distance}
        duration={duration}
      />

      <div className="space-y-4 mt-6">
        <h2 className="text-2xl font-semibold mb-4">Available Vehicles.</h2>
        {vehicles.map((vehicle) => {
          const pricePerKm = Math.floor(Math.random() * 25) + 175;
          const totalPrice = pricePerKm * parseFloat(distance);

          return (
            <div
              key={vehicle.vehicleId}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-300"
            >
              <div className="flex items-center">
                <div className="bg-gray-100 p-3 rounded-full mr-4">
                  <img
                    src={`data:image/jpeg;base64,${vehicle.vehicleImage}`}
                    alt="Vehicle"
                    className="w-20 h-20 object-cover rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{vehicle.vehicleName}</h3>
                  <p className="text-sm text-gray-500">
                    Number Plate: {vehicle.vehicleNumberPlate}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">LKR Per KM : {pricePerKm}</p>
                <p className="font-semibold">Total in LKR : {totalPrice.toFixed(2)}</p>
                <button className="mt-2 bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition duration-300" onClick={() => saveRideBookingDataToRedux(vehicle, totalPrice)}>
                  Book Now
                </button>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default VehicleList;
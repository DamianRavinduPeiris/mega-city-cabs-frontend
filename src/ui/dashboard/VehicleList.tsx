import { useEffect, useState } from "react";

import VehicleType from "../../types/VehicleType";
import { fetchVehicles } from "../../util/CommonUtils";
import TravelDistanceCard from "./TravelDistanceCard";
const baseURL = import.meta.env.VITE_BASE_URL;

const VehicleList = () => {
  const [vehicles, setVehicles] = useState<VehicleType[]>([]);

  useEffect(() => {
    fetchVehicles(baseURL, setVehicles);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Distance Estimation.</h2>
      <TravelDistanceCard
        originCity="San Francisco"
        destinationCity="Chicago"
        distance="2,100 miles"
        duration="4h 30m"
      />

      <div className="space-y-4 mt-6">
      <h2 className="text-2xl font-semibold mb-4">Available Vehicles.</h2>
        {vehicles.map((vehicle) => (
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
              <p className="font-semibold">LKR Per KM : {Math.floor(Math.random() * 25) + 175}</p>
              <button className="mt-2 bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition duration-300">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleList;

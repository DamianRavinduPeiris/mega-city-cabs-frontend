import { FC, useEffect, useState } from "react";
import RideBookingType from "../../types/RideBookingType"; 
import ResponseType from "../../types/ResponseType";
import axios from "axios";
import { Toaster } from "react-hot-toast";

const Bookings: FC = () => {
  const [bookings, setBookings] = useState<RideBookingType[]>([]);
  const baseURL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    console.log('baseURL', baseURL);
    axios.get<ResponseType>(`${baseURL}/api/v1/bookings`)
      .then((res) => {
        console.log('data', res.data.data);
        setBookings(res.data.data as RideBookingType[]); 
      })
      .catch((er) => {
        console.log('error', er);
      });
  }, [baseURL]);

  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mt-4 text-center">View Bookings</h2>
      <Toaster />
      <div className="mb-6">
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Order ID</th>
                <th className="py-3 px-6 text-left">User Name</th>
                <th className="py-3 px-6 text-left">Driver ID</th>
                <th className="py-3 px-6 text-left">Vehicle</th>
                <th className="py-3 px-6 text-left">Pick-up City</th>
                <th className="py-3 px-6 text-left">Destination City</th>
                <th className="py-3 px-6 text-left">Duration</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Price</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {bookings.map((booking) => (
                <tr key={booking.orderId} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-left">{booking.orderId}</td>
                  <td className="py-3 px-6 text-left">{booking.userName}</td>
                  <td className="py-3 px-6 text-left">{booking.driverId}</td>
                  <td className="py-3 px-6 text-left">{booking.vehicleName} ({booking.vehicleNumberPlate})</td>
                  <td className="py-3 px-6 text-left">{booking.pickUpCity}</td>
                  <td className="py-3 px-6 text-left">{booking.destinationCity}</td>
                  <td className="py-3 px-6 text-left">{booking.duration}</td>
                  <td className="py-3 px-6 text-left">{booking.date}</td>
                  <td className="py-3 px-6 text-left">{booking.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bookings;

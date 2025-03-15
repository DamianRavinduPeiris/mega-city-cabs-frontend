"use client"

import { useEffect, useState, useCallback } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { v4 as uuidv4 } from "uuid"

import { fetchVehicles } from "../../util/CommonUtils"
import { saveRideBookingData } from "../../redux/RideBookingSlice"
import store from "../../redux/Store"
import type { RootState } from "../../redux/Store"
import TravelDistanceCard from "./TravelDistanceCard"
import DateTimePicker from "./DateTimePicker"
import type VehicleType from "../../types/VehicleType"
import type RideBookingType from "../../types/RideBookingType"

const baseURL = import.meta.env.VITE_BASE_URL

interface VehicleListProps {
  originCity: string
  destinationCity: string
  distance: string
  duration: string
  driverId: string
}

const VehicleList = ({ originCity, destinationCity, distance, duration, driverId }: VehicleListProps) => {
  const [vehicles, setVehicles] = useState<VehicleType[]>([])
  const [selectedDateTime, setSelectedDateTime] = useState<Date | undefined>(new Date())
  const [isBooking, setIsBooking] = useState<string | null>(null)

  const user = useSelector((state: RootState) => state.user)
  useSelector((state: RootState) => state.rideBooking)
  const navigate = useNavigate()

  useEffect(() => {
    fetchVehicles(baseURL, setVehicles)
  }, [])

  const handleBooking = useCallback(
    (vehicle: VehicleType, totalPrice: number) => {
      setIsBooking(vehicle.vehicleId)

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
        date: selectedDateTime?.toISOString() || "",
        price: totalPrice,
        distance: distance,
      }

      store.dispatch(saveRideBookingData(rideBookingData))

      const alert = new Promise((successTrip) => {
        setTimeout(() => {
          successTrip("Trip Details are confirmed!")

        }, 2000)
      })

      toast.promise(alert, {
        loading: "Processing your booking...",
        success: "Trip Details are confirmed!",
        error: "An error occurred while confirming trip details!",
      }).then(() => {
        navigate("/confirm-trip")
      })
    },
    [driverId, duration, distance, navigate, originCity, destinationCity, selectedDateTime, user],
  )

  const calculatePrice = useCallback((distance: string) => {
    const pricePerKm = Math.floor(Math.random() * 25) + 175
    const totalPrice = pricePerKm * Number.parseFloat(distance)
    return { pricePerKm, totalPrice }
  }, [])

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6 space-y-8">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Select Date and Time</h2>
          <DateTimePicker value={selectedDateTime} onChange={setSelectedDateTime} />
        </div>



        <div className="space-y-4">
          <div className="flex items-center justify-between">

            <TravelDistanceCard
              originCity={originCity}
              destinationCity={destinationCity}
              distance={distance}
              duration={duration}
            />
          </div>
          <h2 className="text-xl font-semibold">Available Vehicles</h2>
          {vehicles.length === 0 ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {vehicles.map((vehicle) => {
                const { pricePerKm, totalPrice } = calculatePrice(distance)
                const isCurrentlyBooking = isBooking === vehicle.vehicleId

                return (
                  <div
                    key={vehicle.vehicleId}
                    className="flex flex-col sm:flex-row items-center justify-between p-5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all gap-4"
                  >
                    <div className="flex items-center w-full sm:w-auto">
                      <div className="bg-gray-100 p-3 rounded-lg mr-5 flex-shrink-0">
                        <img
                          src={`data:image/jpeg;base64,${vehicle.vehicleImage}`}
                          alt={vehicle.vehicleName}
                          className="w-28 h-28 object-cover rounded-lg"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl">{vehicle.vehicleName}</h3>
                        <p className="text-gray-500 mt-1">Number Plate: {vehicle.vehicleNumberPlate}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end sm:min-w-[180px]">
                      <div className="text-right mb-3">
                        <p className="text-sm text-gray-500">LKR {pricePerKm}/km</p>
                        <p className="font-bold text-xl">LKR {totalPrice.toFixed(2)}</p>
                      </div>
                      <button
                        className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${isCurrentlyBooking
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-black text-white hover:bg-gray-800"
                          }`}
                        onClick={() => handleBooking(vehicle, totalPrice)}
                        disabled={isCurrentlyBooking}
                      >
                        {isCurrentlyBooking ? "Processing..." : "Book Now"}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VehicleList


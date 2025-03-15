import { useEffect, useState, useCallback } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import axios, { type AxiosError } from "axios"

import VehicleList from "./VehicleList"
import Sidebar from "./Sidebar"
import MapComponent from "./MapComponent"
import { showAlert } from "../../util/CommonUtils"
import type { RootState } from "../../redux/Store"
import type DriverType from "../../types/DriverType"
import type ResponseType from "../../types/ResponseType"

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSearched, setIsSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [drivers, setDrivers] = useState<DriverType[]>([])
  const [pickup, setPickup] = useState<[number, number] | null>(null)
  const [destination, setDestination] = useState<[number, number] | null>(null)
  const [pickupCity, setPickupCity] = useState<string>("")
  const [destinationCity, setDestinationCity] = useState<string>("")
  const [duration, setDuration] = useState<string>("")
  const [distance, setDistance] = useState<string>("")

  const user = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()

  const OPEN_STREET_MAP_URL = import.meta.env.VITE_OPENSTREET_MAP_URL
  const baseURL = import.meta.env.VITE_BASE_URL

  useEffect(() => {
    if (!user.name) {
      navigate("/")
    }
  }, [user.name, navigate])

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const res = await axios.get<{ data: DriverType[] }>(`${baseURL}/api/v1/driver`)
        setDrivers(res.data.data)
      } catch (err) {
        const error = err as AxiosError<ResponseType>
        showAlert("An error occurred while fetching drivers!", "⛔", "error")
        console.error("Error fetching drivers:", error.message, error.response?.data)
      }
    }

    fetchDrivers()
  }, [baseURL])

  const getDriverId = useCallback((): string => {
    if (drivers && drivers.length > 0) {
      const randomIndex = Math.floor(Math.random() * drivers.length)
      return drivers[randomIndex].driverId
    }
    return ""
  }, [drivers])

  const fetchCoordinates = async (city: string): Promise<[number, number]> => {
    try {
      const res = await axios.get(OPEN_STREET_MAP_URL, {
        params: {
          q: city,
          format: "json",
          limit: 1,
        },
      })

      if (res.data && res.data.length > 0) {
        const returnedCity = res.data[0]

        if (returnedCity.lat !== "0" && returnedCity.lon !== "0") {
          return [Number.parseFloat(returnedCity.lat), Number.parseFloat(returnedCity.lon)]
        } else {
          showAlert("Invalid city name!", "⛔", "error")
          return [0, 0]
        }
      } else {
        showAlert("Invalid city name!", "⛔", "error")
        return [0, 0]
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error)
      return [0, 0]
    }
  }

  const fetchDistanceInfo = async (pickupCity: string, destinationCity: string) => {
    try {
      const response = await axios.get(
        `${baseURL}/api/v1/distance?origins=${pickupCity}&destinations=${destinationCity}`,
      )
      setDuration(response.data.data.rows[0].elements[0].duration.text)
      setDistance(response.data.data.rows[0].elements[0].distance.text)
      setIsLoading(false)
      setIsSearched(true)
    } catch (error) {
      showAlert("An error occurred while fetching distance info!", "⛔", "error")
      console.error("Error fetching distance info:", error)
      setIsLoading(false)
      setIsSearched(false)
    }
  }

  const handleSearch = async () => {
    const cityRegex = /^[A-Za-z]{3,}$/

    if (pickupCity === "" || destinationCity === "") {
      showAlert("Please enter both pickup and destination locations!", "⛔", "error")
      return
    }

    if (!cityRegex.test(pickupCity)) {
      showAlert("Pickup city must be at least 3 letters and contain no numbers or symbols.", "⛔", "error")
      return
    }

    if (!cityRegex.test(destinationCity)) {
      showAlert("Destination city must be at least 3 letters and contain no numbers or symbols.", "⛔", "error")
      return
    }

    setIsLoading(true)
    setIsSearched(true)

    try {
      const [pickupCoords, destinationCoords] = await Promise.all([
        fetchCoordinates(pickupCity),
        fetchCoordinates(destinationCity),
      ])

      setPickup(pickupCoords)
      setDestination(destinationCoords)

      await fetchDistanceInfo(pickupCity, destinationCity)
    } catch (error) {
      console.error("Search error:", error)
      setIsLoading(false)
      setIsSearched(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <h1 className="text-xl font-bold text-black">MegaCity Cabs</h1>
          </div>

          <div className="flex items-center">
            {user.picture && (
              <img
                src={user.picture || "/placeholder.svg"}
                alt="User profile"
                className="w-10 h-10 rounded-full border-2 border-gray-200"
              />
            )}
          </div>
          <Toaster />
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">{user.name ? `Welcome, ${user.name}` : "Welcome!"}</h2>

                <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-500"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="1"></circle>
                    </svg>
                    <input
                      type="text"
                      placeholder="Where to pick you up?"
                      className="bg-transparent w-full focus:outline-none m-5"
                      value={pickupCity}
                      onChange={(e) => setPickupCity(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-500"
                    >
                      <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                    </svg>
                    <input
                      type="text"
                      placeholder="Enter your destination."
                      className="bg-transparent w-full focus:outline-none m-5"
                      value={destinationCity}
                      onChange={(e) => setDestinationCity(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full mt-5"
                  onClick={handleSearch}
                  disabled={isLoading}
                >
                  {isLoading ? "Searching..." : "Search"}
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Map</h2>
                {isLoading ? (
                  <div className="h-[300px] w-full bg-gray-100 rounded-lg animate-pulse"></div>
                ) : isSearched && pickup && destination ? (
                  <MapComponent pickup={pickup} destination={destination} />
                ) : (
                  <div className="h-[300px] w-full bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Search for a route to see the map.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              {isLoading ? (
                <div className="space-y-4">
                  <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
                  <div className="space-y-3">
                    <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ) : isSearched && pickupCity && destinationCity ? (
                <VehicleList
                  originCity={pickupCity}
                  destinationCity={destinationCity}
                  distance={distance}
                  duration={duration}
                  driverId={getDriverId()}
                />
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Search for a route to see available vehicles</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard


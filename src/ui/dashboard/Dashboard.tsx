import { useEffect, useState } from "react";
import VehicleList from "./VehicleList";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { useNavigate } from "react-router-dom";
import { showAlert } from "../../util/CommonUtils";
import { Toaster } from "react-hot-toast";
import MapComponent from "./MapComponent";
import axios, { AxiosError } from "axios";
import DriverType from "../../types/DriverType";
import ResponseType from "../../types/ResponseType";


const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearched, setSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [drivers, setDrivers] = useState<DriverType[]>();
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [pickup, setPickup] = useState<[number, number] | null>(null);
  const [destination, setDestination] = useState<[number, number] | null>(null);
  const [pickupCity, setPickupCity] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [destinationCity, setDestinationCity] = useState<string>("");
  const OPEN_STREET_MAP_URL = import.meta.env.VITE_OPENSTREET_MAP_URL;
  const baseURL = import.meta.env.VITE_BASE_URL;
  useEffect(() => {
    if (user.name === undefined) {
      navigate("/");
    }
  });
  const fetchCoordinates = async (city: string): Promise<[number, number]> => {
    try {
      const res = await axios.get(
        OPEN_STREET_MAP_URL,
        {
          params: {
            q: city,
            format: "json",
            limit: 1,
          },
        }
      );

      if (res.data && res.data.length > 0) {
        const returnedCity = res.data[0];

        if (returnedCity.lat !== "0" && returnedCity.lon !== "0") {
          console.log("Valid city:", city);
          setIsLoading(false);
          return [parseFloat(returnedCity.lat), parseFloat(returnedCity.lon)];
        } else {
          console.log("Invalid city name! Invalid coordinates.");
          showAlert("Invalid city name!", "⛔", "error");
          setIsLoading(false);
          return [0, 0];
        }
      } else {
        console.log("Invalid city name! No results returned.");
        showAlert("Invalid city name!", "⛔", "error");
        setIsLoading(false);
        return [0, 0];
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      setIsLoading(false);
      return [0, 0];
    }
  };

  async function fetchDistanceInfo(pickupCity: string, destinationCity: string) {
    try {

      const response = await axios.get(baseURL + `/api/v1/distance?origins=${pickupCity}&destinations=${destinationCity}`);
      setDuration(response.data.data.rows[0].elements[0].duration.text);
      setDistance(response.data.data.rows[0].elements[0].distance.text);
      setIsLoading(false);
      setSearched(false);
    }
    catch (error) {
      showAlert("An error occurred while fetching distance info!", "⛔", "error");
      console.error("Error fetching distance info:", error);
    }
  }
  useEffect(() => {
    axios.get<{ data: DriverType[] }>(`${baseURL}/api/v1/driver`)
      .then((res) => {
        setDrivers(res.data.data as DriverType[]);
        console.log(drivers)
      }).catch((er) => {
        const error = er as AxiosError<ResponseType>
        showAlert("An error occurred while fetching drivers!", "⛔", "error");
        console.log('error', error.message, error.response?.data);
      });
  }, []);


  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="mr-4 text-gray-500 hover:text-black"
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1JS-q6_f0TJXR7w1UjOo4QgJFCullQItNDQ&s?height=24&width=24"
                alt="Menu"
                className="w-6 h-6"
              />
            </button>
            <h1 className="text-2xl font-bold text-black">MegaCity Cabs</h1>
            <Toaster />
          </div>
          <div className="flex items-center space-x-4">
            <img
              src={user.picture}
              alt="User profile"
              className="w-10 h-10 rounded-full border-2 border-black"
            />
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4">
                Welcome {user.name} !
              </h2>

              <div className="flex flex-col items-center bg-gray-100 p-3 rounded-lg mb-4">
                <div className="flex items-center w-full mb-2">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSx1eKFK9J1rqMerlDRpHvB_5zAnB1w0TQzA&s?height=20&width=20"
                    alt="Location"
                    className="w-5 h-5 mr-2"
                  />
                  <input
                    type="text"
                    placeholder="Where to pick you up?"
                    className="bg-transparent w-full focus:outline-none m-5"
                    value={pickupCity}
                    onChange={(e) => setPickupCity(e.target.value)}
                  />
                </div>
                <div className="flex items-center w-full">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRB6XdL90OmxIQQfkh8_iw_UG5QfyX4lIPfA&s?height=20&width=20"
                    alt="Destination"
                    className="w-5 h-5 mr-2"
                  />
                  <input
                    type="text"
                    placeholder="Enter your destination."
                    className="bg-transparent w-full focus:outline-none m-5"
                    value={destinationCity}
                    onChange={(e) => setDestinationCity(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-500">
                <button className="bg-black text-white px-4 py-2 rounded-lg" onClick={() => {
                  const cityRegex = /^[A-Za-z]{3,}$/;

                  if (pickupCity === "" || destinationCity === "") {
                    showAlert("Please enter both pickup and destination locations!", "⛔", "error");
                    return;
                  }

                  if (!cityRegex.test(pickupCity)) {
                    showAlert("Pickup city must be at least 3 letters and contain no numbers or symbols.", "⛔", "error");
                    return;
                  }

                  if (!cityRegex.test(destinationCity)) {
                    showAlert("Destination city must be at least 3 letters and contain no numbers or symbols.", "⛔", "error");
                    return;
                  }

                  setIsLoading(true);
                  setSearched(true);

                  Promise.all([fetchCoordinates(pickupCity), fetchCoordinates(destinationCity)])
                    .then(([pickupCoords, destinationCoords]) => {
                      setPickup(pickupCoords);
                      setDestination(destinationCoords);

                      return fetchDistanceInfo(pickupCity, destinationCity);
                    })
                    .then(() => {
                      setIsLoading(false);
                      setSearched(true);
                    })
                    .catch(() => {
                      setIsLoading(false);
                      setSearched(false);
                    });
                }}
                >
                  Search
                </button>

              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {isLoading ? (
                  <>
                    <h1 className="text-2xl font-semibold mb-4">Loading Distance Estimations and Vehicles...</h1>
                    <div className="flex justify-center items-center h-full">
                      <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status"
                        style={{ borderColor: "black white black white" }}></div>
                    </div>
                  </>
                ) : isSearched && pickupCity && destinationCity ? (
                  <VehicleList originCity={pickupCity} destinationCity={destinationCity} distance={distance} duration={duration} />
                ) : null}
              </div>

              <div className="lg:col-span-1">
                {isLoading ? (
                  <>
                    <h1 className="text-2xl font-semibold mb-4">Loading Map...</h1>
                    <div className="flex justify-center items-center h-full">
                      <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status"
                        style={{ borderColor: "black white black white" }}></div>
                    </div>
                  </>
                ) : isSearched && pickup && destination && pickupCity && destinationCity ? (
                  <>
                    <h1 className="text-2xl font-semibold mb-4">Map</h1>
                    <MapComponent pickup={pickup} destination={destination} />
                  </>
                ) : null}
              </div>

            </div>


          </div>
        </main>
      </div >
    </div >
  );
};

export default Dashboard;

import { useEffect, useState } from "react";
import VehicleList from "./dashboard/VehicleList";
import Map from "./dashboard/Map";
import Sidebar from "./dashboard/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [destination, setDestination] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.name === undefined) {
      navigate("/");
    }
  });

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
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-100 rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <img
                src="/placeholder.svg?height=18&width=18"
                alt="Search"
                className="absolute right-3 top-2.5 w-5 h-5"
              />
            </div>
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
                Welcome {user.name}
              </h2>
              <div className="flex items-center bg-gray-100 p-3 rounded-lg mb-4">
                <img
                  src="/placeholder.svg?height=20&width=20"
                  alt="Location"
                  className="w-5 h-5 mr-2"
                />
                <input
                  type="text"
                  placeholder="Enter your destination"
                  className="bg-transparent w-full focus:outline-none"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
                <button className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition duration-300">
                  <img
                    src="/placeholder.svg?height=20&width=20"
                    alt="Search"
                    className="w-5 h-5"
                  />
                </button>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <img
                  src="/placeholder.svg?height=16&width=16"
                  alt="Clock"
                  className="w-4 h-4 mr-2"
                />
                <span>Estimated arrival time: 15 minutes</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <VehicleList />
              </div>
              <div className="lg:col-span-1">
                <Map />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

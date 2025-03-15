import { useState } from "react"
import DriverManagement from "./DriverManagement"
import Sidebar from "./SideBar"
import UserManagement from "./UserManagement"
import VehicleManagement from "./VehicleManagement"
import Bookings from "./Bookings"



export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users")

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white">
          <div className="container mx-auto px-6 py-8">
            {activeTab === "users" && <UserManagement />}
            {activeTab === "drivers" && <DriverManagement />}
            {activeTab === "vehicles" && <VehicleManagement />}
            {activeTab === "bookings" && <Bookings />}
          </div>
        </main>
      </div>
    </div>
  )
}


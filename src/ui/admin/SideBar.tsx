import type { FC } from "react"
import { UserIcon, TruckIcon, UsersIcon ,WalletIcon} from "@heroicons/react/24/outline"

interface SidebarProps {
    activeTab: string
    setActiveTab: (tab: string) => void
}

const Sidebar: FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { name: "Users", icon: UserIcon, id: "users" },
        { name: "Drivers", icon: UsersIcon, id: "drivers" },
        { name: "Vehicles", icon: TruckIcon, id: "vehicles" },
        { name: "Bookings", icon: WalletIcon, id: "bookings" },
    ]

    return (
        <div className="bg-black text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
            <h1 className="font-bold text-4xl">Welcome</h1>
            <nav>
                {tabs.map((tab) => (
                    <a
                        key={tab.id}
                        href="#"
                        className={`block py-2.5 px-4 rounded transition duration-200 ${activeTab === tab.id ? "bg-white text-black" : "text-gray-400 hover:bg-gray-900 hover:text-white"
                            }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <tab.icon className="inline-block w-6 h-6 mr-2 -mt-1" />
                        {tab.name}
                    </a>
                ))}
            </nav>
        </div>
    )
}

export default Sidebar


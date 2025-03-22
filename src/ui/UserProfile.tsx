import type React from "react"

import { useState } from "react"
import { User, Mail, Camera, Save } from "lucide-react"
import { useSelector } from "react-redux"
import { RootState } from "../redux/Store"
import { useNavigate } from "react-router-dom"
import { showAlert, updateUser } from "../util/CommonUtils"
import UserType from "../types/UserType"
import { loginUser } from "../redux/UserSlice"
import store from "../redux/Store"
import toast, { Toaster } from "react-hot-toast"

export default function UserProfile() {
    const user = useSelector((state: RootState) => state.user)
    const [profileData, setProfileData] = useState<UserType>({
        userId: user.userId,
        name: user.name,
        email: user.email,
        picture: user.picture,
    })

    const [isEditing, setIsEditing] = useState(false)
    const navigate = useNavigate()
    const baseURL = import.meta.env.VITE_BASE_URL


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setProfileData({
            ...profileData,
            [name]: value,
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Profile data:', profileData)
        if (!profileData.name || profileData.name.trim() === "") {
            showAlert("Full Name is required!","⛔", "error");
            return;
        }
    
        if (!profileData.email || profileData.email.trim() === "") {
            showAlert("Email Address is required!","⛔", "error");
            return;
        }
    
        if (!profileData.picture || profileData.picture.trim() === "") {
            showAlert("Profile Picture URL is required!", "⛔","error");
            return;
        }
        console.log("Profile data submitted:", profileData)
        updateUser(profileData, baseURL)
        setIsEditing(false)
        store.dispatch(loginUser(profileData));
        console.log("Profile updated:", profileData)
    }

    return (
        <div className="h-screen w-full bg-white text-black flex flex-col">
            <div className="w-full h-full flex flex-col bg-white">
                <div className="bg-black text-white p-6 w-full">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-2xl font-bold tracking-tight">Megacity Cabs</h1>
                        <Toaster />
                        <p className="text-gray-300 mt-1">User Profile</p>
                    </div>
                </div>

                <div className="flex-1 p-6 max-w-7xl w-full mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                        <div className="flex flex-col items-center md:col-span-1">
                            <div className="relative group">
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-md mb-4">
                                    <img
                                        src={profileData.picture || "/placeholder.svg"}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="md:col-span-2">
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User size={18} className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={profileData.name}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black ${!isEditing ? "bg-gray-50" : "bg-white"}`}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail size={18} className="text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={profileData.email}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black ${!isEditing ? "bg-gray-50" : "bg-white"}`}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="profilePic" className="block text-sm font-medium text-gray-700 mb-1">
                                        Profile Picture URL
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Camera size={18} className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="picture"
                                            name="picture"
                                            value={profileData.picture}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black ${!isEditing ? "bg-gray-50" : "bg-white"}`}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3 pt-6">
                                    {isEditing ? (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => setIsEditing(false)}
                                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
                                             
                                            >
                                                <Save size={16} />
                                                Save Changes
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => setIsEditing(true)}
                                                className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
                                            >
                                                Edit Profile
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => navigate("/dashboard")}
                                                className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
                                            >
                                                Back to Dashboard
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


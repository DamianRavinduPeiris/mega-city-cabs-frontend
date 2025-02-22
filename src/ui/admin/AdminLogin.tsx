import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import authenticateAdmin from "../../util/AdminAuthUtil"
import { Toaster } from "react-hot-toast"
import { showAlert } from "../../util/CommonUtils"

export default function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const baseURL = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Login attempted with:", { username, password })
        authenticateAdmin(username, password, baseURL)
            .then((res) => {
                if (res) navigate("/admin/dashboard")

            }).catch(() => {
                console.log("Login failed!")
            })

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white-500 to-black-100">
            <Toaster />
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md transform transition-all hover:scale-105">
                <div className="text-center mb-8">

                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Megacity Cabs</h2>
                    <p className="text-gray-600">Administrator Login</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="username"
                            className="absolute left-3 top-2 text-gray-600 transition-all peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-purple-600"
                        >
                            Username
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="password"
                            className="absolute left-3 top-2 text-gray-600 transition-all peer-placeholder-shown:top-2 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-purple-600"
                        >
                            Password
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-6 text-center" onClick={() => showAlert("Contact your IT administrator!", "🚧", "error")}>
                    <a href="#" className="text-sm text-purple-600 hover:underline">
                        Forgot password?
                    </a>
                </div>
            </div>
        </div>
    )
}


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authenticateAdmin from "../../util/AdminAuthUtil";
import { Toaster } from "react-hot-toast";
import { showAlert } from "../../util/CommonUtils";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const baseURL = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        authenticateAdmin(username, password, baseURL)
            .then((res) => {
                if (res) navigate("/admin/dashboard");
            })
            .catch(() => {
                console.log("Login failed!");
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-100">
            <Toaster />
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transition-all hover:scale-105">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Megacity Cabs</h2>
                    <p className="text-gray-600">Administrator Login</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            required
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <a
                        href="#"
                        onClick={() => showAlert("Contact your IT administrator!", "🚧", "error")}
                        className="text-sm text-purple-600 hover:underline"
                    >
                        Forgot password?
                    </a>
                </div>
            </div>
        </div>
    );
}

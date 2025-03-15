import type React from "react"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../../redux/Store"
import axios, { type AxiosError } from "axios"
import type DriverType from "../../types/DriverType"
import type ResponseType from "../../types/ResponseType"
import { showAlert } from "../../util/CommonUtils"
import { useNavigate } from "react-router-dom"
import { Calendar, Clock, CreditCard, MapPin, Navigation, Phone, Mail, Car, CheckCircle, User } from "lucide-react"
import toast from "react-hot-toast"

export default function ConfirmTrip() {
    const navigate = useNavigate()
    const [cardNumber, setCardNumber] = useState("")
    const [expiry, setExpiry] = useState("")
    const [cvv, setCvv] = useState("")
    const [isPaymentComplete, setIsPaymentComplete] = useState(false)
    const [driver, setDriver] = useState<DriverType | null>(null)
    const rideDetails = useSelector((state: RootState) => state.rideBooking)
    const userDetails = useSelector((state: RootState) => state.user)
    const baseURL = import.meta.env.VITE_BASE_URL
    const bookingDetails = useSelector((state: RootState) => state.rideBooking)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await axios.post<ResponseType>(
                `${baseURL}/api/v1/bookings?userEmail=${userDetails.email}`,
                rideDetails,
            )
            if (res.data.status === 201) {
                showAlert("Booking Confirmed!", "🎉", "success")
            }
            const alert = new Promise((successTrip) => {
                setTimeout(() => {
                    successTrip("Trip Details are confirmed!");
                }, 2000);
            });

            toast.promise(alert, {
                loading: "Navigating you to the dashboard...",
                success: "Thank you for booking with us!",
                error: "An error occurred while finalizing trip details!",
            }).then(() => {
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1000);
            });
        } catch (e) {
            const er = e as AxiosError<ResponseType>
            if (er.response?.data?.status === 500) {
                showAlert("Something went wrong!", "❌", "error")
            }
        }

        setIsPaymentComplete(true)
    }

    const formatCardNumber = (input: string) => {
        const numbers = input.replace(/\D/g, "")
        const groups = numbers.match(/(\d{1,4})/g)
        return groups ? groups.join(" ").substr(0, 19) : ""
    }

    const formatExpiry = (input: string) => {
        const numbers = input.replace(/\D/g, "")
        if (numbers.length >= 2) {
            return `${numbers.substr(0, 2)}/${numbers.substr(2, 2)}`
        }
        return numbers
    }

    useEffect(() => {
        axios
            .get<ResponseType>(`${baseURL}/api/v1/driver?driverId=${bookingDetails.driverId}`)
            .then((response) => {
                if (response.data.status === 200) {
                    const driver = response.data.data as DriverType
                    setDriver(driver)
                }
            })
            .catch((error) => {
                const er = error as AxiosError<ResponseType>
                if (er.status === 404) {
                    showAlert("Driver not Available.", "❌", "error")
                }
            })
    }, [baseURL, bookingDetails.driverId])

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-black shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-white text-center tracking-tight">Megacity Payments</h1>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-black to-gray-800 text-white p-6">
                        <div className="flex flex-col items-center">
                            <span className="text-xs uppercase tracking-wider font-medium text-gray-300 mb-1">Your Ride Price</span>
                            <div className="flex items-baseline">
                                <span className="text-4xl font-extrabold">{bookingDetails.price}</span>
                                <span className="ml-1 text-lg">LKR</span>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">Fixed price • No surge</div>
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="flex items-start space-x-4">
                            <div className="flex flex-col items-center">
                                <div className="w-3 h-3 rounded-full bg-black"></div>
                                <div className="w-0.5 h-14 bg-gray-300 my-1"></div>
                                <div className="w-3 h-3 rounded-full border-2 border-black"></div>
                            </div>

                            <div className="space-y-4 flex-1">
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm font-medium">{bookingDetails.pickUpCity}</p>
                                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                        <MapPin className="h-3 w-3" /> Pickup location
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm font-medium">{bookingDetails.destinationCity}</p>
                                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                        <Navigation className="h-3 w-3" /> Destination
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 bg-gray-50 p-4 rounded-xl">
                            <div className="flex flex-col items-center">
                                <div className="flex items-center gap-1 text-gray-600">
                                    <Navigation className="h-4 w-4" />
                                    <span className="text-xs font-medium">Distance</span>
                                </div>
                                <span className="text-sm font-semibold mt-1">{bookingDetails.distance}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="flex items-center gap-1 text-gray-600">
                                    <Clock className="h-4 w-4" />
                                    <span className="text-xs font-medium">Duration</span>
                                </div>
                                <span className="text-sm font-semibold mt-1">{bookingDetails.duration}</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="flex items-center gap-1 text-gray-600">
                                    <Calendar className="h-4 w-4" />
                                    <span className="text-xs font-medium">Date</span>
                                </div>
                                <span className="text-sm font-semibold mt-1">{new Date(bookingDetails.date).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-5">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Driver Details
                            </h2>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-gray-500" />
                                        <div>
                                            <p className="text-xs text-gray-500">Driver Name</p>
                                            <p className="text-sm font-medium">{driver?.driverName}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-gray-500" />
                                        <div>
                                            <p className="text-xs text-gray-500">Phone</p>
                                            <p className="text-sm font-medium">{driver?.driverPhone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-gray-500" />
                                        <div>
                                            <p className="text-xs text-gray-500">Email</p>
                                            <p className="text-sm font-medium">{driver?.driverEmail}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Car className="h-4 w-4 text-gray-500" />
                                        <p className="text-sm font-medium">Vehicle Information</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-700">
                                            <span className="text-xs text-gray-500 block">Vehicle</span>
                                            {bookingDetails.vehicleName}
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            <span className="text-xs text-gray-500 block">Number Plate</span>
                                            {bookingDetails.vehicleNumberPlate}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {!isPaymentComplete ? (
                            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <CreditCard className="h-5 w-5" />
                                    Payment Details
                                </h3>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
                                            Card Number
                                        </label>
                                        <input
                                            type="text"
                                            id="card-number"
                                            value={cardNumber}
                                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                            placeholder="1234 5678 9012 3456"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-black transition-colors"
                                            maxLength={19}
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                                                Expiry Date
                                            </label>
                                            <input
                                                type="text"
                                                id="expiry"
                                                value={expiry}
                                                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                                                placeholder="MM/YY"
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-black transition-colors"
                                                maxLength={5}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                                                CVV
                                            </label>
                                            <input
                                                type="text"
                                                id="cvv"
                                                value={cvv}
                                                onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").substr(0, 3))}
                                                placeholder="123"
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-black transition-colors"
                                                maxLength={3}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-3 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2 mt-2"
                                    >
                                        <CreditCard className="h-4 w-4" />
                                        Pay and Confirm Ride
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="bg-green-50 border border-green-100 rounded-xl p-5 text-center">
                                <div className="flex items-center justify-center mb-2">
                                    <CheckCircle className="h-8 w-8 text-green-500" />
                                </div>
                                <h3 className="text-lg font-semibold text-green-700">Payment Successful</h3>
                                <p className="text-sm text-green-600 mt-1">Your ride is confirmed</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}


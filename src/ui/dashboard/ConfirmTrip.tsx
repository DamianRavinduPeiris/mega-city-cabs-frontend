"use client"

import type React from "react"
import { useState } from "react"
import Header from "../Header"

interface PriceCardProps {
  price: number
  currency: string
  pickup: string
  destination: string
  distance: string
  duration: string
  driver: string
  vehicle: string
  licensePlate: string
}

export default function ConfirmTrip({
  price,
  currency,
  pickup,
  destination,
  distance,
  duration,
  driver,
  vehicle,
  licensePlate,
}: PriceCardProps) {
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")
  const [isPaymentComplete, setIsPaymentComplete] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically process the payment
    // For this example, we'll just set a flag
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

  return (
    <>
    <Header />
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md border border-black rounded-xl overflow-hidden shadow-sm">

        <div className="bg-black text-white p-6 flex flex-col items-center">
          <div className="text-xs uppercase tracking-widest font-medium mb-1">Your Ride Price</div>
          <div className="flex items-baseline">
            <span className="text-4xl font-bold">{price}</span>
            <span className="ml-1 text-lg">{currency}</span>
          </div>
          <div className="text-xs text-gray-400 mt-1">Fixed price • No surge</div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-black"></div>
              <div className="w-0.5 h-10 bg-gray-300 my-1"></div>
              <div className="w-3 h-3 rounded-full border-2 border-black"></div>
            </div>

            <div className="space-y-3 flex-1">
              <div>
                <p className="text-sm font-medium">{pickup}</p>
                <p className="text-xs text-gray-500">Pickup location</p>
              </div>
              <div>
                <p className="text-sm font-medium">{destination}</p>
                <p className="text-xs text-gray-500">Destination</p>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-gray-200 my-2"></div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">📍</span>
              <span>{distance}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">⏱️</span>
              <span>{duration}</span>
            </div>
          </div>

          <div className="h-px w-full bg-gray-200 my-2"></div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-sm">👤</span>
            </div>
            <div>
              <p className="text-sm font-medium">{driver}</p>
              <p className="text-xs text-gray-500">
                {vehicle} ({licensePlate})
              </p>
            </div>
          </div>

          <div className="h-px w-full bg-gray-200 my-2"></div>

          {!isPaymentComplete ? (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="card-number" className="block text-xs font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  id="card-number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  maxLength={19}
                  required
                />
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label htmlFor="expiry" className="block text-xs font-medium text-gray-700 mb-1">
                    Expiry
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    maxLength={5}
                    required
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="cvv" className="block text-xs font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").substr(0, 3))}
                    placeholder="123"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    maxLength={3}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-black hover:bg-gray-800 text-white rounded-md transition-colors"
              >
                Pay and Confirm Ride
              </button>
            </form>
          ) : (
            <div className="text-center py-2">
              <p className="text-sm font-medium text-green-600">Payment Successful</p>
              <p className="text-xs text-gray-500">Your ride is confirmed</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}


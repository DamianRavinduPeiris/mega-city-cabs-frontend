const vehicles = [
    { id: 1, name: "Tuk Tuk", icon: "/placeholder.svg?height=24&width=24", price: "$5", eta: "5 mins" },
    { id: 2, name: "Zip Car", icon: "/placeholder.svg?height=24&width=24", price: "$10", eta: "3 mins" },
    { id: 3, name: "Motorcycle", icon: "/placeholder.svg?height=24&width=24", price: "$7", eta: "2 mins" },
  ]
  
  const VehicleList = () => {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Available Vehicles</h2>
        <div className="space-y-4">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition duration-300"
            >
              <div className="flex items-center">
                <div className="bg-gray-100 p-3 rounded-full mr-4">
                  <img src={vehicle.icon || "/placeholder.svg"} alt={vehicle.name} className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">{vehicle.name}</h3>
                  <p className="text-sm text-gray-500">ETA: {vehicle.eta}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{vehicle.price}</p>
                <button className="mt-2 bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition duration-300">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  export default VehicleList
  
  
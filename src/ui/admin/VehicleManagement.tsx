import { type FC, useState, type ChangeEvent } from "react"

interface Vehicle {
  id: number
  make: string
  model: string
  year: string
  licensePlate: string
  image: string
}

const VehicleManagement: FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: 1, make: "Toyota", model: "Camry", year: "2022", licensePlate: "ABC123", image: "/placeholder.svg" },
    { id: 2, make: "Honda", model: "Civic", year: "2021", licensePlate: "XYZ789", image: "/placeholder.svg" },
  ])

  const [newVehicle, setNewVehicle] = useState<Omit<Vehicle, "id" | "image">>({
    make: "",
    model: "",
    year: "",
    licensePlate: "",
  })
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const addVehicle = () => {
    const imageUrl = selectedImage ? URL.createObjectURL(selectedImage) : "/placeholder.svg"
    setVehicles([...vehicles, { ...newVehicle, id: vehicles.length + 1, image: imageUrl }])
    setNewVehicle({ make: "", model: "", year: "", licensePlate: "" })
    setSelectedImage(null)
  }

  const deleteVehicle = (id: number) => {
    setVehicles(vehicles.filter((vehicle) => vehicle.id !== id))
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0])
    }
  }

  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mt-4 text-center">Vehicle Management</h2>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Add New Vehicle</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Make"
            className="p-2 border rounded"
            value={newVehicle.make}
            onChange={(e) => setNewVehicle({ ...newVehicle, make: e.target.value })}
          />
          <input
            type="text"
            placeholder="Model"
            className="p-2 border rounded"
            value={newVehicle.model}
            onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
          />
          <input
            type="text"
            placeholder="Year"
            className="p-2 border rounded"
            value={newVehicle.year}
            onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
          />
          <input
            type="text"
            placeholder="License Plate"
            className="p-2 border rounded"
            value={newVehicle.licensePlate}
            onChange={(e) => setNewVehicle({ ...newVehicle, licensePlate: e.target.value })}
          />
        </div>
        <div className="flex items-center space-x-4">
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="vehicle-image" />
          <label
            htmlFor="vehicle-image"
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded cursor-pointer hover:bg-gray-300 transition duration-200"
          >
            {selectedImage ? "Change Image" : "Upload Image"}
          </label>
          {selectedImage && <span className="text-sm text-gray-600">{selectedImage.name}</span>}
          <button
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-200"
            onClick={addVehicle}
          >
            Add Vehicle
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Vehicle List</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col">
              <img
                src={vehicle.image || "/placeholder.svg"}
                alt={`${vehicle.make} ${vehicle.model}`}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-lg font-semibold">
                {vehicle.make} {vehicle.model}
              </h4>
              <p className="text-gray-600">Year: {vehicle.year}</p>
              <p className="text-gray-600">License Plate: {vehicle.licensePlate}</p>
              <button
                className="mt-4 text-gray-500 hover:text-black self-start"
                onClick={() => deleteVehicle(vehicle.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VehicleManagement


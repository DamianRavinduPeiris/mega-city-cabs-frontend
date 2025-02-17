import { type FC, useState } from "react"

interface Driver {
  id: number
  name: string
  licenseNumber: string
  phoneNumber: string
  status: "Active" | "Inactive"
}

const DriverManagement: FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([
    { id: 1, name: "Mike Johnson", licenseNumber: "DL123456", phoneNumber: "555-1234", status: "Active" },
    { id: 2, name: "Sarah Williams", licenseNumber: "DL789012", phoneNumber: "555-5678", status: "Inactive" },
  ])

  const [newDriver, setNewDriver] = useState<Omit<Driver, "id">>({
    name: "",
    licenseNumber: "",
    phoneNumber: "",
    status: "Active",
  })

  const addDriver = () => {
    setDrivers([...drivers, { ...newDriver, id: drivers.length + 1 }])
    setNewDriver({ name: "", licenseNumber: "", phoneNumber: "", status: "Active" })
  }

  const deleteDriver = (id: number) => {
    setDrivers(drivers.filter((driver) => driver.id !== id))
  }

  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mt-4 text-center">Driver Management</h2>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Add New Driver</h3>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Name"
            className="flex-1 p-2 border rounded"
            value={newDriver.name}
            onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="License Number"
            className="flex-1 p-2 border rounded"
            value={newDriver.licenseNumber}
            onChange={(e) => setNewDriver({ ...newDriver, licenseNumber: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="flex-1 p-2 border rounded"
            value={newDriver.phoneNumber}
            onChange={(e) => setNewDriver({ ...newDriver, phoneNumber: e.target.value })}
          />
          <select
            className="flex-1 p-2 border rounded"
            value={newDriver.status}
            onChange={(e) => setNewDriver({ ...newDriver, status: e.target.value as "Active" | "Inactive" })}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-200"
            onClick={addDriver}
          >
            Add Driver
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Driver List</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">License Number</th>
                <th className="py-3 px-6 text-left">Phone Number</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {drivers.map((driver) => (
                <tr key={driver.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{driver.name}</td>
                  <td className="py-3 px-6 text-left">{driver.licenseNumber}</td>
                  <td className="py-3 px-6 text-left">{driver.phoneNumber}</td>
                  <td className="py-3 px-6 text-left">
                    <span
                      className={`py-1 px-3 rounded-full text-xs font-medium ${
                        driver.status === "Active" ? "bg-gray-200 text-gray-800" : "bg-gray-300 text-gray-800"
                      }`}
                    >
                      {driver.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button className="text-gray-500 hover:text-black" onClick={() => deleteDriver(driver.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DriverManagement


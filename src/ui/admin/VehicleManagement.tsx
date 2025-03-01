import { FC, useEffect, useState } from "react";
import VehicleType from "../../types/VehicleType";
import { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { addVehicle, updateVehicle, deleteVehicle, fetchVehicles, showAlert } from "../../util/CommonUtils";

const VehicleManagement: FC = () => {
  const vehicleIdRegex = /^[A-Za-z0-9-]+$/;
  const vehicleNameRegex = /^[A-Za-z\s]+$/;
  const vehicleMakeYearRegex = /^\d{4}$/;
  const vehicleNumberPlateRegex = /^[A-Za-z0-9-]+$/;
  const [vehicles, setVehicles] = useState<VehicleType[]>([]);
  const [vehicle, setVehicle] = useState<VehicleType>({
    vehicleId: '',
    vehicleName: '',
    vehicleMakeYear: '',
    vehicleNumberPlate: '',
    vehicleImage: '',
  });
  const [currentVehicle, setCurrentVehicle] = useState<VehicleType>({
    vehicleId: '',
    vehicleName: '',
    vehicleMakeYear: '',
    vehicleNumberPlate: '',
    vehicleImage: '',
  });

  const [isOpen, setIsOpen] = useState(false);
  const baseURL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchVehicles(baseURL, setVehicles);

  }, [baseURL]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVehicle({ ...vehicle, vehicleImage: file });
    }
  };

  const handleAddVehicle = async () => {
    if (vehicleNameRegex.test(vehicle.vehicleName) && vehicleMakeYearRegex.test(vehicle.vehicleMakeYear) && vehicleNumberPlateRegex.test(vehicle.vehicleNumberPlate)) {
      if (vehicle.vehicleName && vehicle.vehicleMakeYear && vehicle.vehicleNumberPlate && vehicle.vehicleImage) {
        const formData = new FormData();
        formData.append('vehicleId', uuidv4());
        formData.append('vehicleName', vehicle.vehicleName);
        formData.append('vehicleMakeYear', vehicle.vehicleMakeYear);
        formData.append('vehicleNumberPlate', vehicle.vehicleNumberPlate);
        formData.append('vehicleImage', vehicle.vehicleImage);

        await addVehicle(formData, baseURL);
        setVehicle({
          vehicleId: '',
          vehicleName: '',
          vehicleMakeYear: '',
          vehicleNumberPlate: '',
          vehicleImage: '',
        });
        fetchVehicles(baseURL, setVehicles);
      } else {
        showAlert("Invalid input! Please check the fields.", "❌", "error");
      }
    } else {
      showAlert("Invalid input! Please check the fields.", "❌", "error");
    }
  };

  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mt-4 text-center">Manage Vehicles</h2>
      <Toaster />
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Add New Vehicle</h3>
        <div className="flex space-x-4">
          <input type="text" placeholder="Vehicle Name" className="flex-1 p-2 border rounded" value={vehicle.vehicleName} onChange={(e) => setVehicle({ ...vehicle, vehicleName: e.target.value })} />
          <input type="text" placeholder="Vehicle Make Year" className="flex-1 p-2 border rounded" value={vehicle.vehicleMakeYear} onChange={(e) => setVehicle({ ...vehicle, vehicleMakeYear: e.target.value })} />
          <input type="text" placeholder="Vehicle Number Plate" className="flex-1 p-2 border rounded" value={vehicle.vehicleNumberPlate} onChange={(e) => setVehicle({ ...vehicle, vehicleNumberPlate: e.target.value })} />
          <input type="file" className="flex-1 p-2 border rounded" onChange={handleImageChange} />
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-200" onClick={handleAddVehicle}>Add Vehicle</button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Vehicle List</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Vehicle ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Make Year</th>
                <th className="py-3 px-6 text-left">Number Plate</th>
                <th className="py-3 px-6 text-left">Image</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {vehicles?.map((vehicle) => (
                <tr key={vehicle.vehicleId} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-left">{vehicle.vehicleId}</td>
                  <td className="py-3 px-6 text-left">{vehicle.vehicleName}</td>
                  <td className="py-3 px-6 text-left">{vehicle.vehicleMakeYear}</td>
                  <td className="py-3 px-6 text-left">{vehicle.vehicleNumberPlate}</td>
                  <td className="py-3 px-6 text-left">
                    {vehicle.vehicleImage && (
                      <img
                        src={`data:image/jpeg;base64,${vehicle.vehicleImage}`}
                        alt="Vehicle"
                        className="w-20 h-20 object-cover"
                      />

                    )}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => {
                      setIsOpen(true);
                      setCurrentVehicle(vehicle);
                    }}>Update</button>
                    {isOpen && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-all scale-100 animate-fadeIn">
                          <h2 className="text-xl font-semibold">Update Vehicle</h2>
                          <div className="mt-4 space-y-2">
                            <input type="text" value={currentVehicle?.vehicleId} placeholder="VehicleId" className="p-2 border rounded" onChange={(e) => setCurrentVehicle({ ...currentVehicle, vehicleId: e.target.value })} />
                            <input type="text" value={currentVehicle?.vehicleName} placeholder="Name" className="p-2 border rounded" onChange={(e) => setCurrentVehicle({ ...currentVehicle, vehicleName: e.target.value })} />
                            <input type="text" value={currentVehicle?.vehicleMakeYear} placeholder="Make Year" className="p-2 border rounded" onChange={(e) => setCurrentVehicle({ ...currentVehicle, vehicleMakeYear: e.target.value })} />
                            <input type="text" value={currentVehicle?.vehicleNumberPlate} placeholder="Number Plate" className="p-2 border rounded" onChange={(e) => setCurrentVehicle({ ...currentVehicle, vehicleNumberPlate: e.target.value })} />
                          </div>
                          <button className="m-2 mt-4 bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => {
                            if (vehicleIdRegex.test(currentVehicle.vehicleId) && vehicleNameRegex.test(currentVehicle.vehicleName) && vehicleMakeYearRegex.test(currentVehicle.vehicleMakeYear) && vehicleNumberPlateRegex.test(currentVehicle.vehicleNumberPlate)) {
                              if (currentVehicle.vehicleName && currentVehicle.vehicleMakeYear && currentVehicle.vehicleNumberPlate && currentVehicle.vehicleImage) {
                                const formData = new FormData();
                                formData.append('vehicleId', currentVehicle.vehicleId);
                                formData.append('vehicleName', currentVehicle.vehicleName);
                                formData.append('vehicleMakeYear', currentVehicle.vehicleMakeYear);
                                formData.append('vehicleNumberPlate', currentVehicle.vehicleNumberPlate);

                                updateVehicle(formData, baseURL);
                                setVehicles(vehicles?.map((v) => v.vehicleId === currentVehicle.vehicleId ? currentVehicle : v));
                                setIsOpen(false);
                              } else {
                                showAlert("Invalid input! Please check the fields.", "❌", "error");
                              }
                            } else {
                              showAlert("Invalid input! Please check the fields.", "❌", "error");
                            }

                          }}>Update</button>
                          <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => setIsOpen(false)}>Close</button>
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button className="text-red-500 hover:text-black" onClick={() => {
                      deleteVehicle(vehicle.vehicleId, baseURL);
                      setVehicles(vehicles?.filter((v) => v.vehicleId !== vehicle.vehicleId));
                    }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VehicleManagement;

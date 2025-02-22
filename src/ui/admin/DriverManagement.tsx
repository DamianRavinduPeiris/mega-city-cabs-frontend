import { type FC, useEffect, useState } from "react";
import DriverType from "../../types/DriverType";
import ResponseType from "../../types/ResponseType";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { addDriver, updateDriver, deleteDriver, showAlert } from "../../util/CommonUtils";

const DriverManagement: FC = () => {
  const [drivers, setDrivers] = useState<DriverType[]>();
  const [driver, setDriver] = useState<DriverType>({ driverId: '', driverName: '', driverPhone: '', driverEmail: '' });
  const [currentDriver, setCurrentDriver] = useState<DriverType>({ driverId: '', driverName: '', driverPhone: '', driverEmail: '' });
  const nameRegex = /^[a-zA-Z\s]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const [isOpen, setIsOpen] = useState(false);
  const baseURL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    axios.get<ResponseType>(`${baseURL}/api/v1/driver`)
      .then((res) => {
        console.log(res.data.data);
        setDrivers(res.data.data as DriverType[]);
      }).catch((er) => {
        console.log('error', er);
      });
  }, []);

  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mt-4 text-center">Manage Drivers</h2>
      <Toaster />
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Add New Driver</h3>
        <div className="flex space-x-4">
          <input type="text" placeholder="Name" className="flex-1 p-2 border rounded" value={driver.driverName} onChange={(e) => setDriver({ ...driver, driverName: e.target.value })} />
          <input type="text" placeholder="Phone" className="flex-1 p-2 border rounded" value={driver.driverPhone} onChange={(e) => setDriver({ ...driver, driverPhone: e.target.value })} />
          <input type="email" placeholder="Email" className="flex-1 p-2 border rounded" value={driver.driverEmail} onChange={(e) => setDriver({ ...driver, driverEmail: e.target.value })} />
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-200" onClick={async () => {
            if (nameRegex.test(driver.driverName) && phoneRegex.test(driver.driverPhone) && emailRegex.test(driver.driverEmail)) {
              addDriver(driver, baseURL);
              setDrivers(prevDrivers => prevDrivers ? [...prevDrivers, driver] : [driver]);
              setDriver({ driverId: '', driverName: '', driverPhone: '', driverEmail: '' });
            } else {
              showAlert("Invalid input! Please check the fields.", "❌", "error");
            }

          }}>Add Driver</button>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">Driver List</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Driver ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Phone</th>
                <th className="py-3 px-6 text-left">Email</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {drivers?.map((driver) => (
                <tr key={driver.driverId} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-left">{driver.driverId}</td>
                  <td className="py-3 px-6 text-left">{driver.driverName}</td>
                  <td className="py-3 px-6 text-left">{driver.driverPhone}</td>
                  <td className="py-3 px-6 text-left">{driver.driverEmail}</td>
                  <td className="py-3 px-6 text-center">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => {
                      setIsOpen(true);
                      setCurrentDriver(driver);
                    }}>Update</button>
                    {isOpen && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-all scale-100 animate-fadeIn">
                          <h2 className="text-xl font-semibold">Update Driver</h2>
                          <div className="mt-4 space-y-2">
                            <input type="text" value={currentDriver?.driverName} placeholder="Name" className="p-2 border rounded" onChange={(e) => setCurrentDriver({ ...currentDriver, driverName: e.target.value })} />
                            <input type="text" value={currentDriver?.driverPhone} placeholder="Phone" className="p-2 border rounded" onChange={(e) => setCurrentDriver({ ...currentDriver, driverPhone: e.target.value })} />
                            <input type="email" value={currentDriver?.driverEmail} placeholder="Email" className="p-2 border rounded" onChange={(e) => setCurrentDriver({ ...currentDriver, driverEmail: e.target.value })} />
                          </div>
                          <button className="m-2 mt-4 bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => {
                            if (nameRegex.test(currentDriver.driverName) && phoneRegex.test(currentDriver.driverPhone) && emailRegex.test(currentDriver.driverEmail)) {
                              updateDriver(currentDriver, baseURL);
                              setDrivers(drivers?.map((d) => d.driverId === currentDriver.driverId ? currentDriver : d));
                              setIsOpen(false);
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
                      deleteDriver(driver.driverId, baseURL);
                      setDrivers(drivers?.filter((d) => d.driverId !== driver.driverId));
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

export default DriverManagement;

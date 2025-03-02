import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import UserType from "../types/UserType";
import ResponseType from "../types/ResponseType";
import DriverType from "../types/DriverType";
import VehicleType from "../types/VehicleType";

export function showAlert(
  msg: string,
  icon: string,
  type: "success" | "error"
) {
  toast[type](msg, {
    icon,
    style: { fontWeight: "bold" },
  });
}

function handleError(error: AxiosError<ResponseType>, defaultMessage: string) {
  if (error.response) {
    const { status, message, data } = error.response.data;
    const errorMsg =
      status === 409 || status === 404 ? message : defaultMessage;
    showAlert(errorMsg, "❌", "error");
    console.error(`Error: ${status} - ${message}`, data);
  } else {
    showAlert("An unknown error occurred!", "❌", "error");
    console.error("An unknown error occurred!", error);
  }
}

export async function addUser(user: UserType, baseUrl: string) {
  try {
    user.userId = uuidv4();
    const res = await axios.post<ResponseType>(`${baseUrl}/api/v1/user`, user);
    if (res.data.status === 201) {
      showAlert("User added successfully!", "🎉", "success");
    }
    console.log(res);
  } catch (e) {
    handleError(e as AxiosError<ResponseType>, "Failed to add User!");
  }
}

export async function updateUser(user: UserType, baseUrl: string) {
  console.log(user);

  try {
    const res = await axios.put<ResponseType>(`${baseUrl}/api/v1/user`, user);
    if (res.data.status === 201) {
      showAlert("User updated successfully!", "🎉", "success");
    }
    console.log(res);
  } catch (e) {
    handleError(e as AxiosError<ResponseType>, "Failed to update User!");
  }
}

export async function deleteUser(userId: string, baseUrl: string) {
  if (!userId) {
    showAlert("User ID is required for deletion.", "❌", "error");
    return;
  }

  try {
    const res = await axios.delete<ResponseType>(
      `${baseUrl}/api/v1/user?userId=${userId}`
    );
    if (res.data.status === 204) {
      showAlert("User deleted successfully!", "🎉", "success");
    }
    console.log(res);
  } catch (e) {
    handleError(e as AxiosError<ResponseType>, "Failed to delete user");
  }
}

export async function addDriver(driver: DriverType, baseUrl: string) {
  try {
    driver.driverId = uuidv4();
    const res = await axios.post<ResponseType>(
      `${baseUrl}/api/v1/driver`,
      driver
    );
    if (res.data.status === 201) {
      showAlert("Driver added successfully!", "🎉", "success");
    }
    console.log(res);
  } catch (e) {
    handleError(e as AxiosError<ResponseType>, "Failed to add Driver!");
  }
}

export async function updateDriver(driver: DriverType, baseUrl: string) {
  try {
    const res = await axios.put<ResponseType>(
      `${baseUrl}/api/v1/driver`,
      driver
    );
    if (res.data.status === 201) {
      showAlert("Driver updated successfully!", "🎉", "success");
    }
    console.log(res);
  } catch (e) {
    handleError(e as AxiosError<ResponseType>, "Failed to update Driver!");
  }
}

export async function deleteDriver(driverId: string, baseUrl: string) {
  if (!driverId) {
    showAlert("Driver ID is required for deletion.", "❌", "error");
    return;
  }

  try {
    const res = await axios.delete<ResponseType>(
      `${baseUrl}/api/v1/driver?driverId=${driverId}`
    );
    if (res.data.status === 204) {
      showAlert("Driver deleted successfully!", "🎉", "success");
    }
    console.log(res);
  } catch (e) {
    handleError(e as AxiosError<ResponseType>, "Failed to delete driver");
  }
}

export async function getDriver(driverId: string, baseUrl: string) {
  if (!driverId) {
    showAlert("Driver ID is required.", "❌", "error");
    return;
  }

  try {
    const res = await axios.get<ResponseType>(
      `${baseUrl}/api/v1/driver?driverId=${driverId}`
    );
    if (res.data.status === 200) {
      showAlert("Driver details fetched successfully!", "🎉", "success");
      return res.data.data;
    }
    console.log(res);
  } catch (e) {
    handleError(
      e as AxiosError<ResponseType>,
      "Failed to fetch Driver details!"
    );
  }
}
export async function addVehicle(formData: FormData, baseUrl: string) {
  try {
    const res = await axios.post<ResponseType>(
      `${baseUrl}/api/v1/vehicle`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (res.data.status === 201) {
      showAlert("Vehicle added successfully!", "🎉", "success");
    }
    console.log(res);
  } catch (e) {
    handleError(e as AxiosError<ResponseType>, "Failed to add Vehicle!");
  }
}

export async function updateVehicle(formData: FormData, baseUrl: string) {
  try {
    const res = await axios.put<ResponseType>(
      `${baseUrl}/api/v1/vehicle`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (res.data.status === 201) {
      showAlert("Vehicle updated successfully!", "🎉", "success");
    }
    console.log(res);
  } catch (e) {
    handleError(e as AxiosError<ResponseType>, "Failed to update Vehicle!");
  }
}

// Delete vehicle by ID
export async function deleteVehicle(vehicleId: string, baseUrl: string) {
  if (!vehicleId) {
    showAlert("Vehicle ID is required for deletion.", "❌", "error");
    return;
  }

  try {
    const res = await axios.delete<ResponseType>(
      `${baseUrl}/api/v1/vehicle?vehicleId=${vehicleId}`
    );
    if (res.data.status === 204) {
      showAlert("Vehicle deleted successfully!", "🎉", "success");
    }
    console.log(res);
  } catch (e) {
    handleError(e as AxiosError<ResponseType>, "Failed to delete vehicle");
  }
}

// Fetch vehicle details by ID
export async function getVehicle(vehicleId: string, baseUrl: string) {
  if (!vehicleId) {
    showAlert("Vehicle ID is required.", "❌", "error");
    return;
  }

  try {
    const res = await axios.get<ResponseType>(
      `${baseUrl}/api/v1/vehicle?vehicleId=${vehicleId}`
    );
    if (res.data.status === 200) {
      showAlert("Vehicle details fetched successfully!", "🎉", "success");
      return res.data.data;
    }
    console.log(res);
  } catch (e) {
    handleError(
      e as AxiosError<ResponseType>,
      "Failed to fetch Vehicle details!"
    );
  }
}

export async function fetchVehicles(
  baseUrl: string,
  setVehicles: React.Dispatch<React.SetStateAction<VehicleType[]>>
) {
  axios
    .get<ResponseType>(`${baseUrl}/api/v1/vehicle`)
    .then((res) => {
      console.log(res.data.data);
      setVehicles(res.data.data as VehicleType[]);
    })
    .catch((er) => {
      handleError(
        er as AxiosError<ResponseType>,
        "Failed to fetch Vehicle details!"
      );
      console.log("error", er);
    });
}

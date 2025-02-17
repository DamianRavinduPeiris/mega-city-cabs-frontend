import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import UserType from "../types/UserType";
import ResponseType from "../types/ResponseType";

function validateUser(user: UserType): boolean {
  const nameRegex = /^[a-zA-Z\s]+$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=.]*)?$/;

  if (!user.name || !nameRegex.test(user.name)) {
    showAlert("Invalid name! Name should only contain letters and spaces.", "❌", "error");
    return false;
  }
  if (!user.email || !emailRegex.test(user.email)) {
    showAlert("Invalid email format!", "❌", "error");
    return false;
  }
  if (user.picture && !urlRegex.test(user.picture)) {
    showAlert("Invalid URL format for picture!", "❌", "error");
    return false;
  }

  return true;
}

export function showAlert(msg: string, icon: string, type: "success" | "error") {
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
  if (!validateUser(user)) return;

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
  console.log(user)
  if (!validateUser(user)) return;

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

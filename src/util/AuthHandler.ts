import axios, { AxiosError } from "axios";
import ResponseType from "../types/ResponseType";
import UserType from "../types/UserType";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

const baseURL = import.meta.env.VITE_BASE_URL;

export async function searchUser(token: UserType) {
  try {
    const res = await axios.get<ResponseType>(
      `${baseURL}/api/v1/user?userId=${token?.email}`
    );
    if (res.status === 200) {
      toast.success("Welcome back!", {
        icon: "🫡",
        style: { fontWeight: "bold" },
      });
    }
  } catch (e) {
    const error = e as AxiosError<ResponseType>;
    if (error.response) {
      const { status, message, data } = error.response.data;
      console.log(`An error occurred: ${status} - ${message}`, data);
      if (status === 404) {
        signUp(token);
      }
    } else {
      console.log("An unknown error occurred!", e);
    }
  }
}

async function signUp(token: UserType) {
  const user = {
    userId: uuidv4(),
    name: token.name,
    email: token.email,
    profilePicture: token.picture,
  };

  try {
    const res = await axios.post<ResponseType>(`${baseURL}/api/v1/user`, user);
    if (res.status === 200) {
      toast.success("Signed up Successfully!", {
        icon: "🎉",
        style: { fontWeight: "bold" },
      });
    }
  } catch (e) {
    const error = e as AxiosError<ResponseType>;
    if (error.response) {
      const { status, message, data } = error.response.data;
      console.log(`An error occurred: ${status} - ${message}`, data);
    } else {
      console.log("An unknown error occurred!", e);
    }
  }
}

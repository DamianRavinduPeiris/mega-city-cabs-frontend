import axios, { AxiosError } from "axios";
import ResponseType from "../types/ResponseType";
import { showAlert } from "./CommonUtils";

export default async function authenticateAdmin(
  username: string,
  password: string,
  baseURL: string
): Promise<boolean> {
  try {
    const res = await axios.get<ResponseType>(
      `${baseURL}/api/v1/admin?username=${username}&password=${password}`
    );
    if (res.data.status === 200) {
      showAlert("Welcome back!", "🎉", "success");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return true;
    }
    console.log(res);
  } catch (e) {
    const eror = e as AxiosError<ResponseType>;
    if (eror.response?.data.status === 404) {
      showAlert("Invalid Credentials!", "❌", "error");
    }
  }
  return false;
}

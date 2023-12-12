import Axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const token = Cookies.get("token");
console.log(token, "asd");

let axios = Axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  headers: {
    Authorization: token && `Bearer ${token}`,
  },
});

export default axios;

export const axiosErrorToast = (error: any, fallback?: string) => {
  const fallbackMessage = fallback ?? "Something went wrong.";
  const errorMessage =
    typeof error?.response?.data?.message !== "string"
      ? error?.response?.data?.message?.join("\n") ?? fallbackMessage
      : error?.response?.data?.message;

  return toast.error(errorMessage);
};

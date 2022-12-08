import axios from "axios";
import { removeToken } from "./helpers";

export const baseURL = "https://elaport.com/api/v1";

const instance = axios.create({
  baseURL: baseURL,
  timeout: 10 * 60 * 1000,
});

instance.interceptors.request.use(async (options) => {
  const accessToken = sessionStorage.getItem("accessToken");
  if (accessToken) {
    options.headers.authorization = "Bearer " + accessToken;
  }
  options.headers.accept = "application/json";
  return options;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      removeToken();
      window.location.reload();
    }
  }
);

export default instance;

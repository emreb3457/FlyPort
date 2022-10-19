import axios from "axios";

export const baseURL = "https://flyport.herokuapp.com/api/v1";

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
export default instance;

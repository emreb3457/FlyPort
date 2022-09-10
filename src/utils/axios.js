import axios from "axios";

export const baseURL = 'http://api2.farukdiri.com'

const instance = axios.create({
    baseURL: baseURL,
    timeout: 10 * 60 * 1000
});

instance.interceptors.request.use(async options => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
        options.headers.authorization = 'Bearer ' + accessToken;
    }
    return options;
});
export default instance;
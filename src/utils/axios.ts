import axios from "axios";
import Cookies from "js-cookie";
import { getToken } from "./getToken";

const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

Axios.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (res) => res,
  async (error) => {
    const token = await getToken();
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry && token) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
          {
            refreshToken: token,
          }
        );
        const { accessToken } = res.data;
        Cookies.set("accessToken", accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return Axios(originalRequest);
      } catch (err) {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default Axios;

import axios from "axios";
import { refreshToken } from "@/services/auth.service";
import { AUTH } from "@/constants/auth.constant";
import { cookie } from "./universal-cookie";

const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

Axios.interceptors.request.use(
  async (config) => {
    const token = await cookie.get(AUTH.ACCESS_TOKEN); // ✅ dùng cookie helper
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

Axios.interceptors.response.use(
  (res) => res,
  async (error) => {
    const token = await cookie.get(AUTH.ACCESS_TOKEN);
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry && token) {
      originalRequest._retry = true;
      try {
        const refToken = (await cookie.get(AUTH.REFRESH_TOKEN)) || "";
        const res = await refreshToken(refToken);
        const { accessToken } = res?.data;
        await cookie.set(AUTH.ACCESS_TOKEN, accessToken); // ✅ set lại token
        return Axios(originalRequest); // retry
      } catch (err) {
        await cookie.remove(AUTH.ACCESS_TOKEN); // ✅ xoá token
        await cookie.remove(AUTH.REFRESH_TOKEN);
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default Axios;

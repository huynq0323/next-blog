import axios from "axios";
import { cookie } from "../universal-cookie";
import { AUTH } from "@/constants/auth.constant";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;
let accessTokenMemory: string | null = null;

const axiosClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  async (config) => {
    const token = accessTokenMemory || (await cookie.get(AUTH.ACCESS_TOKEN));
    console.log("axiosClient request token", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    const refreshToken = (await cookie.get(AUTH.REFRESH_TOKEN)) || "";
    console.log("client refreshToken", refreshToken);
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        refreshPromise = fetch(`/api/auth/refresh`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        })
          .then((res) => {
            if (!res.ok) {
              redirect("/login");
            } else {
              return res.json();
            }
          })
          .then((data) => {
            accessTokenMemory = data.accessToken; // cập nhật vào memory
            cookie.set(AUTH.ACCESS_TOKEN, data.accessToken);
            return data;
          })
          .finally(() => {
            isRefreshing = false;
          });
      }

      const data = await refreshPromise;
      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
      return axiosClient(originalRequest);
    }

    return Promise.reject(err);
  }
);

export default axiosClient;

import axios from "axios";
import { cookie } from "../universal-cookie";
import { AUTH } from "@/constants/auth.constant";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const SERVER_URL = process.env.NEXT_SERVER_URL;

const axiosServer = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;

axiosServer.interceptors.response.use(
  (res) => res,
  async (err) => {
    const refreshToken = (await cookie.get(AUTH.REFRESH_TOKEN)) || "";
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        refreshPromise = fetch(`${SERVER_URL}/api/auth/refresh`, {
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
          .finally(() => {
            isRefreshing = false;
          });
      }

      const data = await refreshPromise;
      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
      return axiosServer(originalRequest);
    }

    return Promise.reject(err);
  }
);

export default axiosServer;

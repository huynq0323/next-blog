import axios from "axios";
import Cookies from "js-cookie";

const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiMTM3MjI2NS1hMTFiLTQyNjYtOWY5Ni1mMTFkNzhkMzdlYTEiLCJpYXQiOjE3NTQwMzgyNzQsImV4cCI6MTc1NDA0MTg3NH0.cwqiVC9r8BfY2PrUtiKU41cLuLejBxsREx7u-8QOwNY`;

Axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
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
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      Cookies.get("refreshToken")
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
          {
            refreshToken: Cookies.get("refreshToken"),
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

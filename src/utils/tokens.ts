import { AUTH } from "@/constants/auth.constant";
const Cookies = (await import("js-cookie")).default;
const { cookies } = await import("next/headers");

export const getToken = async (): Promise<string | undefined> => {
  if (typeof window !== "undefined") {
    return Cookies.get(AUTH.ACCESS_TOKEN);
  } else {
    return (await cookies()).get(AUTH.ACCESS_TOKEN)?.value;
  }
};

export const getRefreshToken = async (): Promise<string | undefined> => {
  if (typeof window !== "undefined") {
    return Cookies.get(AUTH.REFRESH_TOKEN);
  } else {
    return (await cookies()).get(AUTH.REFRESH_TOKEN)?.value;
  }
};

export const removeToken = async () => {
  if (typeof window !== "undefined") {
    Cookies.remove(AUTH.ACCESS_TOKEN);
  } else {
    (await cookies()).delete(AUTH.ACCESS_TOKEN);
  }
};

export const removeRefreshToken = async () => {
  if (typeof window !== "undefined") {
    Cookies.remove(AUTH.REFRESH_TOKEN);
  } else {
    (await cookies()).delete(AUTH.REFRESH_TOKEN);
  }
};

export const setToken = async (
  value: string,
  options: { maxAge?: number } = {}
) => {
  if (typeof window !== "undefined") {
    console.log("window");
    Cookies.set(AUTH.ACCESS_TOKEN, value, {
      path: "/",
      ...options,
    });
  } else {
    console.log("server");
    (await cookies()).set(AUTH.ACCESS_TOKEN, value);
  }
};

export const setRefreshToken = async (
  value: string,
  options: { maxAge?: number } = {}
) => {
  if (typeof window !== "undefined") {
    Cookies.set(AUTH.REFRESH_TOKEN, value, {
      path: "/",
      ...options,
    });
  } else {
    (await cookies()).set(AUTH.REFRESH_TOKEN, value, {
      path: "/",
      ...options,
    });
  }
};

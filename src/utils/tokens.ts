import { AUTH } from "@/constants/auth.constant";
import { jwtDecode } from "jwt-decode";
const Cookies = (await import("js-cookie")).default;
const { cookies } = await import("next/headers");

interface JWTPayload {
  exp: number;
  iat: number;
  [key: string]: any;
}

export const getToken = async (): Promise<string | undefined> => {
  if (typeof window !== "undefined") {
    return Cookies.get(AUTH.ACCESS_TOKEN);
  } else {
    return (await cookies()).get(AUTH.ACCESS_TOKEN)?.value;
  }
};

export function isTokenExpired(token: string): boolean {
  try {
    const decoded: JWTPayload = jwtDecode(token);
    if (!decoded.exp) return true;

    // exp trong JWT là đơn vị giây, Date.now() là ms
    return Date.now() >= decoded.exp * 1000;
  } catch (e) {
    return true; // token không decode được => coi như hết hạn
  }
}

export const getToken = async (): Promise<string | undefined> => {
  if (typeof window !== "undefined") {
    // Chỉ import js-cookie ở client
    const Cookies = (await import("js-cookie")).default;
    return Cookies.get("accessToken");
  } else {
    // Chỉ import next/headers ở server
    const { cookies } = await import("next/headers");
    return (await cookies()).get("accessToken")?.value;
  }
};

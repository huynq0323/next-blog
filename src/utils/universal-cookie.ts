
let jsCookie: any = null;
let nextCookies: any = null;

const isClient = typeof window !== "undefined";

const init = async () => {
  if (isClient && !jsCookie) {
    jsCookie = (await import("js-cookie")).default;
  } else if (!isClient && !nextCookies) {
    const { cookies } = await import("next/headers");
    nextCookies = await cookies(); // ✅ cần await ở đây
  }
};

type CookieOptions = {
  maxAge?: number;
  path?: string;
};

export const cookie = {
  get: async (key: string): Promise<string | undefined> => {
    await init();
    return isClient
      ? jsCookie?.get(key)
      : nextCookies?.get(key)?.value;
  },

  set: async (key: string, value: string, options: CookieOptions = {}): Promise<void> => {
    await init();
    if (isClient) {
      jsCookie?.set(key, value, { path: "/", ...options });
    } else {
      nextCookies?.set(key, value, { path: "/", ...options });
    }
  },

  remove: async (key: string): Promise<void> => {
    await init();
    if (isClient) {
      jsCookie?.remove(key);
    } else {
      nextCookies?.delete(key);
    }
  },
};

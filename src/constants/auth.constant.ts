export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  MODERATOR = "MODERATOR",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export const AUTH = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
};

export const DECODED_JWT = {
  EMAIL: "email",
  EXP: "exp",
  IAT: "iat",
  ROLE: "role",
  SUB: "sub",
};

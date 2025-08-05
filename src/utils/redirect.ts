import { Role } from "@/constants/auth.constant";
import { ROUTES } from "@/constants/routes.constant";

export const checkRoleRedirect = (role: string) => {
  switch (role) {
    case Role.ADMIN: {
      return ROUTES.ADMIN;
    }
    case Role.USER: {
      return ROUTES.BLOGS;
    }
    default: {
      return ROUTES.BLOGS;
    }
  }
};

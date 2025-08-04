import { ILogin } from "@/types/auth";
import Axios from "@/utils/axios";

const URL = "/auth";

export function login(data: ILogin) {
  return Axios.post(`${URL}/login`, data);
}

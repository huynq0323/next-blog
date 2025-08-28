import { ILogin } from "@/types/auth";
import Axios from "@/utils/axios";
import axios from "axios";

const URL = "/auth";

export function login(data: ILogin) {
  return Axios.post(`${URL}/login`, data);
}

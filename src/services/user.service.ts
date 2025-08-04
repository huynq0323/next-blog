import { IParamsGetUser } from "@/types/user";
import Axios from "@/utils/axios";
import { cleanParams, cleanParamsMaxSize } from "@/utils/utils";

const URL = "/user";

export const getUser = async (
  params: IParamsGetUser = {}
): Promise<IResponseGetDataDto<any>> => {
  const res = await Axios.get(URL, cleanParams(params));
  return res.data;
};

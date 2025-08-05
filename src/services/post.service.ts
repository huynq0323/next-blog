import { IParamsGetUser } from "@/types/user";
import Axios from "@/utils/axios";
import { cleanParams } from "@/utils/utils";

const URL = "/post";

export const getPost = async (
  params: IParamsGetUser = {}
): Promise<IResponseGetDataDto<any>> => {
  const res = await Axios.get(URL, cleanParams(params));
  return res.data;
};

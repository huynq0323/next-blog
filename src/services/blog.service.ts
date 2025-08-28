import axiosClient from "@/utils/axios/axiosClient";
import axiosServer from "@/utils/axios/axiosServer";

const URL = "/post";

export async function getBlogsServer() {
  const res = await axiosServer.get(URL);
  return res.data?.data || [];
}

export async function getBlogDetailSlug(slug: string) {
  const res = await axiosServer.get(`${URL}/slug/${slug}`);
  return res.data;
}

export async function createBlog(data: IBlog) {
  const res = await axiosClient.post(URL, data);
  return res.data;
}

export async function updateBlog(id: number, data: Partial<IBlog>) {
  const res = await axiosClient.put(`${URL}/${id}`, data);
  return res.data;
}

export async function deleteBlog(id: number) {
  const res = await axiosClient.delete(`${URL}/${id}`);
  return res.data;
}

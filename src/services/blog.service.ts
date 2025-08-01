import axios from "@/utils/axios";

const URL = "/post";

export async function getBlogs() {
  const res = await axios.get(URL);
  return res.data?.data || [];
}

export async function getBlogDetailSlug(slug: string) {
  const res = await axios.get(`${URL}/slug/${slug}`);
  return res.data;
}

export async function createBlog(data: IBlog) {
  const res = await axios.post(URL, data);
  return res.data;
}

export async function updateBlog(id: number, data: Partial<IBlog>) {
  const res = await axios.put(`${URL}/${id}`, data);
  return res.data;
}

export async function deleteBlog(id: number) {
  const res = await axios.delete(`${URL}/${id}`);
  return res.data;
}

import axios from "@/utils/axios";

const URL = "/comment";

export async function getCommentsByIdPost(postId: string) {
  const res = await axios.get(`${URL}/post/${postId}`);
  return res.data?.data || [];
}

// export async function getBlogDetailSlug(slug: string) {
//   const res = await axios.get(`${URL}/slug/${slug}`);
//   return res.data;
// }

export async function createComment(data: any) {
  const res = await axios.post(URL, data);
  return res.data;
}

export async function updateComment(id: string, data: Partial<any>) {
  const res = await axios.patch(`${URL}/${id}`, data);
  return res.data;
}

export async function deleteComment(id: string) {
  const res = await axios.delete(`${URL}/${id}`);
  return res.data;
}

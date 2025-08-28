import axiosClient from "@/utils/axios/axiosClient";


const URL = "/comment";

export async function getCommentsByIdPost(postId: string) {
  const res = await axiosClient.get(`${URL}/post/${postId}`);
  return res.data?.data || [];
}

export async function createComment(data: any) {
  const res = await axiosClient.post(URL, data);
  return res.data;
}

export async function updateComment(id: string, data: Partial<any>) {
  const res = await axiosClient.patch(`${URL}/${id}`, data);
  return res.data;
}

export async function deleteComment(id: string) {
  const res = await axiosClient.delete(`${URL}/${id}`);
  return res.data;
}

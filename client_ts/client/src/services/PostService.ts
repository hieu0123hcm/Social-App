import { User } from "../model/user.model";
import http from "../utils/http-common";
import Cookies from "js-cookie";
const getAll = (query: { page: number; pageSize: number }) => {
  const response = http.get(
    `/posts?page=${query.page}&pageSize=${query.pageSize}`,
    {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    }
  );
  return response;
};

const create = (data: {
  user: User | null;
  postCaption: string;
  image: File[];
}) => {
  const formData = new FormData();
  if (data.user !== null) {
    formData.append("userId", data.user._id);
  }
  if (data.postCaption !== "") {
    formData.append("caption", data.postCaption);
  }
  if (data.image.length) {
    data.image.map((item: File) => {
      formData.append("picture", item);
      formData.append("picturePath", item.name);
      return null;
    });
  }

  const response = http.post("/posts", formData, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

const remove = (postId: string, userId: string) => {
  const response = http.delete(`/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
    data: { userId },
  });
  return response;
};

const PostService = {
  getAll,
  create,
  remove,
};

export default PostService;

// api.ts

import { User } from "../../model/user.model";

interface Props {
  user: User | null;
  token: string | null;
  comment: string;
  postId: string;
}

export async function sendComment({ user, token, comment, postId }: Props) {
  //TODO: separate the components into different files  & use Axios
  const formData = new FormData();
  if (user !== null) {
    formData.append("userId", user._id);
    formData.append("content", comment);
    const response = await fetch(
      `http://localhost:5000/posts/${postId}/comment`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          content: comment,
        }),
      }
    );

    return await response.json();
  }
}

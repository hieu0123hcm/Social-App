import axios, { AxiosResponse } from "axios";
import { Post } from "../../model/post.model";
import { APIResponse } from "../../model/response.model";
import { User } from "../../model/user.model";

interface Props {
  user: User | null;
  token: string | null;
  postCaption: string;
  image: File[];
}

export async function uploadPost({ user, token, postCaption, image }: Props) {
  const formData = new FormData();
  if (user !== null) {
    formData.append("userId", user._id);
  }

  if (postCaption !== "") {
    formData.append("caption", postCaption);
  }

  if (image.length) {
    image.map((item: File) => {
      formData.append("picture", item);
      formData.append("picturePath", item.name);
      return null;
    });
  }
  //TODO: separate the components into different files  & use Axios
  const response: AxiosResponse<APIResponse<Post[]>> = await axios.post(
    `http://localhost:5000/posts`,
    formData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return await response;
}

// import axios, { AxiosResponse } from "axios";
// import { APIResponse } from "../../model/response.model";
// import { UserResponse } from "../../model/user.model";

// interface IProps {
//   url: string;
//   formData: FormData;
//   token?: string | undefined;
// }

// export async function post({ url, formData, token }: IProps) {
//   //TODO: separate the components into different files  & use Axios
//   const headers = token
//     ? {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       }
//     : {};
//   const response: AxiosResponse<APIResponse<UserResponse>> = await axios.post(
//     url,
//     formData,
//     { headers }
//   );
//   return response;
// }

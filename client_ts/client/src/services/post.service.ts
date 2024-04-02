import { User } from "../model/user.model";
import http from "../utils/http-common";

/**
 * Gets all posts.
 *
 * @param query - Query parameters:
 *   - page - The page number to retrieve.
 *   - pageSize - The number of posts per page.
 *   - token - The auth token.
 * @returns A promise that resolves with the HTTP response.
 */
const getAll = (query: {
  page: number;
  pageSize: number;
  token: string | null;
}) => {
  const response = http.get(
    `/posts?page=${query.page}&pageSize=${query.pageSize}`,
    {
      headers: { Authorization: `Bearer ${query.token}` },
    }
  );
  return response;
};

/**
 * Creates a new post.
 *
 * @param data - The post data.
 * @param data.user - The user creating the post.
 * @param data.postCaption - The caption for the post.
 * @param data.image - The images for the post.
 * @param data.token - The auth token.
 * @returns The API response.
 */
const create = (data: {
  user: User | null;
  postCaption: string;
  image: File[];
  token: string | null;
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
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

/**
 * Deletes a post.
 *
 * @param reqData - Request data containing the post ID, user ID, and auth token.
 * @returns Response from the delete request.
 */
const remove = (reqData: {
  postId: string;
  userId: string;
  token: string | null;
}) => {
  const response = http.delete(`/posts/${reqData.postId}`, {
    headers: {
      Authorization: `Bearer ${reqData.token}`,
    },
    data: { userId: reqData.userId },
  });
  return response;
};

/**
 * Likes a post.
 *
 * @param reqData - Request data containing the post ID, user ID, and auth token.
 * @returns Response from the like request.
 */
const like = (reqData: {
  postId: string;
  userId: string;
  token: string | null;
}) => {
  const response = http.patch(
    `/posts/${reqData.postId}/like`,
    { userId: reqData.userId },
    {
      headers: {
        Authorization: `Bearer ${reqData.token}`,
      },
    }
  );
  return response;
};

/**
 * Sends a comment on a post.
 *
 * @param reqData - Request data containing the user info, comment text, post ID, and auth token.
 * @returns Response from the API call to send the comment.
 */
const sendComment = (reqData: {
  user: User;
  comment: string;
  postId: string;
  token: string | null;
}) => {
  const formData = new FormData();
  formData.append("userId", reqData.user._id);
  formData.append("content", reqData.comment);
  const response = http.patch(`/posts/${reqData.postId}/comment`, formData, {
    headers: {
      Authorization: `Bearer ${reqData.token}`,
      "Content-Type": "application/json",
    },
  });

  return response;
};

const getComment = (reqData: { postId: string; token: string | null }) => {
  const response = http.get(`/posts/${reqData.postId}/comment`, {
    headers: {
      Authorization: `Bearer ${reqData.token}`,
    },
  });

  return response;
};

const PostService = {
  getAll,
  create,
  remove,
  like,
  sendComment,
  getComment,
};

export default PostService;

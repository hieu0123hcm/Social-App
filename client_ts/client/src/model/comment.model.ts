import { User } from "./user.model";

export interface Comment {
  _id: string;
  owner: Pick<User, "_id" | "username" | "picturePath">;
  postId: string;
  createdAt: Date;
  content: string;
}

export interface CommentReponse {
  comments: Comment[];
  postId: string;
}

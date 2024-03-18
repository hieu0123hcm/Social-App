import { User } from "./user.model";

export interface Comment {
  _id: string;
  postId: string;
  owner: User;
  createdAt: Date;
  comment: string;
}

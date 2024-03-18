import { Comment } from "./comment.model";

export interface Post {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  caption: string;
  location: string;
  picturePath: string[];
  userPicturePath: string;
  likes: { [userId: string]: boolean };
  comments: Comment[];
  createdAt: Date;
}

export interface PostResponse {
  posts: Post[];
  totalPosts: number;
}

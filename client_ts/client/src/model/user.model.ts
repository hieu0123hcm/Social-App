export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  bio: string;
  email: string;
  picturePath: string;
  location: string;
  occupation: string;
  followers: string[];
  following: string[];
  gender: "Male" | "Female";
}

export interface UserResponse {
  user: User | null;
  token: string | null;
}

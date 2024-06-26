import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    caption: String,
    picturePath: {
      type: Array,
    },
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: [
      {
        default: [],
        type: new mongoose.Schema(
          {
            owner: {
              _id: String,
              username: String,
              picturePath: String,
            },
            content: String,
          },
          { timestamps: true }
        ),
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;

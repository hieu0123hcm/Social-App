import Post from "../models/Post.js";
import User from "../models/User.js";

/**CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

/** READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostComments = async (req, res) => {
  try {
    function custom_sort(a, b) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    const { postId } = req.params;
    const post = await Post.findById(postId);
    const formattedComment = await Promise.all(
      post.comments.map(async (comment) => {
        try {
          const { firstName, lastName, _id, picturePath } = await User.findById(
            comment.userIdOfComment
          );
          return {
            owner: {
              _id,
              firstName,
              lastName,
              picturePath,
            },
            comment: comment.commentContent,
            createdAt: comment.createdAt,
          };
        } catch (error) {
          return { ...item, error };
        }
      })
    );

    res.status(200).json(formattedComment.sort(custom_sort));
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/** UPDATE */
export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(postId);
    const isLiked = post.likes.get(userId);
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        likes: post.likes,
      },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const commentAPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, content } = req.body;
    console.log("request" + req.body.userId);
    const newComment = {
      userIdOfComment: userId,
      commentContent: content,
    };

    const post = await Post.findById(postId);
    post.comments.push(newComment);

    post.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(postId);
    if (post.userId === userId) {
      Post.findByIdAndRemove(postId).then(
        res.status(200).json({ message: "Delete successfully" })
      );
    } else {
      res
        .status(400)
        .json({ message: "You do not have permission for this action" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

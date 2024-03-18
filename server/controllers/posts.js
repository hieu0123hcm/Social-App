import Post from "../models/Post.js";
import User from "../models/User.js";
import { dataDeleter } from "../utils/dataDeleter.js";

/**CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, caption, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      caption,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: newPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error_code: error.code,
      data: {},
    });
  }
};

/** READ */
export const getFeedPosts = async (req, res) => {
  const page = +req.query.page || 1;
  const pageSize = +req.query.pageSize || 1;
  console.log(page, pageSize);
  if (
    typeof page !== NaN &&
    typeof pageSize !== NaN &&
    page >= 1 &&
    pageSize >= 0
  ) {
    try {
      const skip = (page - 1) * pageSize;
      const limit = pageSize;
      const total = await Post.countDocuments();
      const post = await Post.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      return res.status(200).json({
        success: true,
        message: "Data found",
        data: { posts: post, totalPosts: total },
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
        error_code: error.code,
        data: {},
      });
    }
  }

  // try {
  //   const post = await Post.find().sort({ createdAt: -1 });
  //   console.log(post);
  //   res.status(200).json({
  //     success: true,
  //     message: "Data found",
  //     data: { posts: post, totalPosts: total },
  //   });
  // } catch (error) {
  //   res.status(404).json({
  //     success: false,
  //     message: error.message,
  //     error_code: error.code,
  //     data: {},
  //   });
  // }
};

export const getUserPosts = async (req, res) => {
  const { userId } = req.params;

  const page = +req.query.page || 1;
  const pageSize = +req.query.pageSize || 10;
  console.log(page, pageSize);
  if (
    typeof page !== NaN &&
    typeof pageSize !== NaN &&
    page >= 1 &&
    pageSize >= 0
  ) {
    const skip = (page - 1) * pageSize;
    const limit = pageSize;
    const total = await Post.countDocuments({ userId });
    const post = await Post.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      message: "Data found",
      data: { posts: post, totalPosts: total },
    });
  }

  try {
    const post = await Post.find({ userId });
    if (post.length === 0) {
      return res.status(404).json([]);
    }
    res.status(200).json({
      success: true,
      message: "Data found",
      data: { posts: post, totalPosts: total },
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
      error_code: error.code,
      data: {},
    });
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
          console.log({
            owner: {
              _id,
              firstName,
              lastName,
              picturePath,
            },
            comment: comment.commentContent,
            createdAt: comment.createdAt,
          });

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
    res.status(200).json({
      success: true,
      message: "Data found",
      data: formattedComment.sort(custom_sort),
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
      error_code: error.code,
      data: {},
    });
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

    res.status(200).json({
      success: true,
      message: "Updated successfully",
      data: updatedPost.likes,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
      error_code: error.code,
      data: {},
    });
  }
};

export const commentAPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, content } = req.body;
    const newComment = {
      userIdOfComment: userId,
      commentContent: content,
    };

    const post = await Post.findById(postId);
    post.comments.push(newComment);

    post.save();

    res.json({
      success: true,
      message: "Comment created successfully",
      data: post.comments,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      error_code: error.code,
      data: {},
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(postId);
    const fileNames = post.picturePath;

    if (post.userId === userId) {
      dataDeleter(fileNames);
      Post.findByIdAndRemove(postId).then(
        res.json({ success: true, message: "Delete successfully", data: post })
      );
    } else {
      res.status(400).json({
        success: false,
        message: "You do not have permission for this action",
        data: {},
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      error_code: error.code,
      data: {},
    });
  }
};

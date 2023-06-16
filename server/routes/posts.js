import express from "express";
import {
  commentAPost,
  deletePost,
  getFeedPosts,
  getPostComments,
  getUserPosts,
  likePost,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/:postId/comment", verifyToken, getPostComments);

/** UPDATE */
router.patch("/:postId/like", verifyToken, likePost);
router.patch("/:postId/comment", verifyToken, commentAPost);
router.delete("/:postId", verifyToken, deletePost);

export default router;

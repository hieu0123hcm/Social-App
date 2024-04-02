import express from "express";
import {
  commentAPost,
  deletePost,
  getPosts,
  getPostComments,
  getUserPosts,
  likePost,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getPosts);
router.get("/:userId/", verifyToken, getUserPosts);
router.get("/:postId/comment", verifyToken, getPostComments);

/** UPDATE */
router.patch("/:postId/like", verifyToken, likePost);
router.patch("/:postId/comment", verifyToken, commentAPost);
router.delete("/:postId", verifyToken, deletePost);

export default router;

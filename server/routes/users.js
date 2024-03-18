import express from "express";
import {
  getUser,
  // getUserFriends,
  // addRemoveFriend,
  followUser,
  getUserFollowing,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/following", verifyToken, getUserFollowing);
router.get("/:id/followers", verifyToken, getUserFollowing);
// router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:id/:followId", verifyToken, followUser);

export default router;

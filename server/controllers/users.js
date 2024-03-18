import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    console.log(user);
    res.status(200).json({ success: true, message: "Data found", data: user });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      error_code: error.code,
      data: {},
    });
  }
};

export const getUserFollowing = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    const following = await Promise.all(
      user.following.map((id) => User.findById(id))
    );
    const formattedFollowing = following.map(
      ({ _id, username, picturePath }) => {
        return { _id, username, picturePath };
      }
    );
    res.status(200).json({
      success: true,
      message: "Data found",
      data: { formattedFollowing },
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

export const getUserFollowers = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    const followers = await Promise.all(
      user.followers.map((id) => User.findById(id))
    );
    const formattedFollowers = followers.map(
      ({ _id, username, picturePath }) => {
        return { _id, username, picturePath };
      }
    );
    res.status(200).json({
      success: true,
      message: "Data found",
      data: { formattedFollowers },
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

/* UPDATE */
export const followUser = async (req, res) => {
  try {
    const { id, followId } = req.params;
    const user = await User.findById(id);
    const followUser = await User.findById(followId);

    if (user.following.includes(followId)) {
      user.following = user.following.filter(
        (id) => id.toString() !== followId
      );
      followUser.followers = followUser.followers.filter((id) => id !== id);
    } else {
      user.following.push(followUser._id);
      followUser.followers.push(user._id);
    }
    await user.save();
    await followUser.save();

    res.status(200).json({
      success: true,
      message: "Updated successfully",
      data: { followUser },
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

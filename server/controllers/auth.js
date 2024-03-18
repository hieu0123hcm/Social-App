import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
      gender,
    } = req.body;
    const existed = await User.findOne({ email: email });

    if (existed)
      return res.status(403).json({
        success: false,
        message: "User already exists",
        error_code: 403,
        data: {},
      });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      username,
      gender,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    const savedUser = await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_KEY);

    res.status(201).json({
      success: true,
      message: "User logged in successfully",
      data: { token, user: savedUser },
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

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
        error_code: 1301,
        data: {},
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);

    if (!isMatch)
      return res.json({
        success: false,
        message: "Invalid credentials. ",
        error_code: 1308,
        data: {},
      });

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);

    delete user.password;
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: { token, user },
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

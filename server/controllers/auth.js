import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Registers a new user.
 *
 * @param {Object} req - Express request object
 * @param {string} req.body.firstName - User's first name
 * @param {string} req.body.lastName - User's last name
 * @param {string} req.body.username - User's username
 * @param {string} req.body.email - User's email
 * @param {string} req.body.password - User's password
 * @param {string} req.body.picturePath - Path to user's profile picture
 * @param {Array} req.body.friends - User's friends
 * @param {string} req.body.location - User's location
 * @param {string} req.body.occupation - User's occupation
 * @param {string} req.body.gender - User's gender
 *
 * @param {Object} res - Express response object
 * @returns {Promise}
 */
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

    if (existed) {
      throw new Error("User already exists");
    }

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
    throw new Error({ message: error.message });
  }
};

/**
 * Logs a user in.
 *
 * @param {Object} req - Express request object
 * @param {string} req.body.username - The username entered by the user
 * @param {string} req.body.password - The password entered by the user
 *
 * @param {Object} res - Express response object
 *
 * Finds the user with the entered username.
 * Checks if the entered password matches the user's password.
 * If valid, returns a JWT token and the user object without the password.
 * If invalid credentials, returns an error.
 */
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    //Check if user exists
    const user = await User.findOne({ username: username });
    if (!user) throw new Error("User not found");

    //Check if password is match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

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

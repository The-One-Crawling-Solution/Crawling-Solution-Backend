import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import { sendError, sendSuccess } from "../utils/responseUtil.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, "Email and password are required", 400);
    }

    const user = await User.findOne({ email });

    if (!user) {
      return sendError(res, "Invalid email or password", 401);
    }

    if (user.password !== password) {
      return sendError(res, "Invalid email or password", 401);
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "5h" }
    );

    sendSuccess(res, { token }, "Login successful", 200);
  } catch (error) {
    sendError(res, error.message, 500);
  }
};

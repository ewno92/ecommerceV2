import connectDB from "../../../utils/connectDB";
// import Users from "../../../models/userModel";
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
// const express = require("express");
// import bcrypt from "bcrypt";
import {
  createAccessToken,
  createRefreshToken,
} from "../../../utils/generateToken";
import Cookies from "js-cookie";

import User from "../../../models/userModel";
const expressJwt = require("express-jwt");

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await login(req, res);
      break;
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        err: "User with that email does not exist. Please Signup.",
      });
    }
    //authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        err: "Incorrect password",
      });
    }
    // const token = jwt.sign({ _id: user._id }, "aswenklqwentkwekl", {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const access_token = createAccessToken({ id: user._id });
    const refresh_token = createRefreshToken({ id: user._id });

    // res.cookie("token", token, { expiresIn: "1d" });
    const { _id, username, name, email, role } = user;
    return res.json({
      msg: "Login Success!",
      // access_token,
      // refresh_token,
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        root: user.root,
      },
    });
  });
};

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await Users.findOne({ email });
//     if (!user)
//       return res.status(400).json({ err: "This user does not exist." });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ err: "Incorrect password." });

//     const access_token = createAccessToken({ id: user._id });
//     const refresh_token = createRefreshToken({ id: user._id });

//     res.json({
//       msg: "Login Success!",
//       refresh_token,
//       access_token,
//       user: {
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         avatar: user.avatar,
//         root: user.root,
//       },
//     });
//   } catch (err) {
//     return res.status(500).json({ err: err.message });
//   }
// };

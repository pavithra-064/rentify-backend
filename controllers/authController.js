const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = "rentify";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not Found. Please Register" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res
        .status(401)
        .json({ message: "Wrong Password. Enter Password Correctly" });
    }
    const token = jwt.sign({ userId: user.userId }, secretKey, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      token,
      status: "success",
      message: "User logged in",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

module.exports = login;

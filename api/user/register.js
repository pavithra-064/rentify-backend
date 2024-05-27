const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/userSchema");

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password, role } =
      req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already exists. Please log in." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.log(error);
    res.send(500).send(error).json({ message: "An error occured" });
  }
});

module.exports = router;

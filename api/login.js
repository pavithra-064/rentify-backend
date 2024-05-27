const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User not Found. Please Register" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      res
        .status(401)
        .json({ message: "Wrong Password. Enter Password Correctly" });
    }

    res.status(200).send(user).json({
      status: "success",
      message: "User logged in",
    });
  } catch (error) {
    res.send(500).json({ message: "An error occured" });
  }
});
module.exports = router;

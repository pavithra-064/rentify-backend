const jwt = require("jsonwebtoken");
const secretKey = "rentify";

const authenticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Access Denied");
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const verified = jwt.verify(token, secretKey);
    req.user = verified;

    req.userId = verified.userId;
    req.email = verified.email;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = authenticateToken;

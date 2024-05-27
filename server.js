const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const registerRouter = require("./api/user/register");
const loginRouter = require("./controllers/authController");
const authenticateToken = require("./middleware/auth");
const addpropertyRouter = require("./api/property/addproperty");
const getmypropertyRouter = require("./api/property/getpropertybyuser");
const getallpropertyRouter = require("./api/property/getallproperty");
const updatePropertyRouter = require("./api/property/editproperty");
const deletePropertyRouter = require("./api/property/deleteproperty");
const viewpropertyRouter = require("./api/property/viewproperty");
const likeRouter = require("./api/property/like");
const interestedRouter = require("./api/property/requestdetails");

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://paviee23:123password@rentify.cjwbfcw.mongodb.net/?retryWrites=true&w=majority&appName=Rentify";
mongoose
  .connect(uri, {})
  .then(() => {
    app.listen(port, "0.0.0.0", function () {
      console.log("connected to DB");
      console.log(`Listening at ${port}`);
    });
  })
  .catch((err) => console.log("Error: ", err));

app.get("/", (req, res) => {
  res.send("Server is up and running");
});
app.post("/api/login", loginRouter);
app.use("/api/register", registerRouter);

app.use("/api/addproperty", authenticateToken, addpropertyRouter);
app.use("/api/getallproperty", getallpropertyRouter);
app.use("/api/getmyproperty", authenticateToken, getmypropertyRouter);
app.use("/api/updateproperty", authenticateToken, updatePropertyRouter);
app.use("/api/deleteproperty", authenticateToken, deletePropertyRouter);
app.use("/api/viewproperty", authenticateToken, viewpropertyRouter);
app.use("/api/like", authenticateToken, likeRouter);
app.use("/api/interested", authenticateToken, interestedRouter);

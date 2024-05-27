const express = require("express");
const router = express.Router();
const Property = require("../../models/propertySchema");

router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const properties = await Property.find({ sellerId: userId });
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).send("Error fetching properties");
  }
});

module.exports = router;

const express = require("express");
const Property = require("../../models/propertySchema");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching properties from the database.");
  }
});

module.exports = router;

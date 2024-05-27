const express = require("express");
const router = express.Router();
const Property = require("../../models/propertySchema");

router.put("/:propertyId", async (req, res) => {
  try {
    const propertyId = req.params.propertyId;

    const updatedProperty = req.body;
    const property = await Property.findOneAndUpdate(
      { id: propertyId },
      updatedProperty,
      { new: true }
    );

    if (!property) {
      return res.status(404).send("Property not found");
    }

    res.status(200).json(property);
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).send("Error updating property");
  }
});

module.exports = router;

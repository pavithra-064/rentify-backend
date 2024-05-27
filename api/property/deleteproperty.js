
const express = require("express");
const router = express.Router();
const Property = require("../../models/propertySchema");

router.delete("/:propertyId", async (req, res) => {
  try {
    const propertyId = req.params.propertyId;

    const property = await Property.findOneAndDelete({ id: propertyId });
    if (!property) {
      return res.status(404).send("Property not found");
    }

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).send("Error updating property");
  }
});

module.exports = router;

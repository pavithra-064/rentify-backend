const express = require("express");
const router = express.Router();
const Property = require("../../models/propertySchema");
const User = require("../../models/userSchema");

router.get("/:propertyId", async (req, res) => {
  try {
    const propertyid = req.params.propertyId;

    const propertyDetails = await Property.find({ id: propertyid });

    if (!propertyDetails) {
      return res.status(404).json({ message: "Property not found" });
    }

    const sellerDetails = await User.find({
      userId: propertyDetails[0].sellerId,
    });

    if (!sellerDetails) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const combinedDetails = {
      property: propertyDetails,
      seller: sellerDetails,
    };

    res.json(combinedDetails);
  } catch (error) {
    console.error("Error fetching property details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

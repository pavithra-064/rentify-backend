const express = require("express");
const router = express.Router();
const Property = require("../../models/propertySchema");

router.post("/:propertyId", async (req, res) => {
  try {
    const userId = req.user.userId; 
    // console.log(userId);
    const propertyId = req.params.propertyId;

    
    const property = await Property.findOne({ id: propertyId });

    if (!property) {
      return res.status(404).send("Property not found");
    }

  
    if (property.sellerId === userId) {
      return res.status(400).send("You cannot like your own property");
    }

    property.likedBy = property.likedBy || [];

  
    if (property.likedBy.includes(userId)) {
      return res.status(400).send("Already liked");
    }

    const updatedProperty = await Property.findOneAndUpdate(
      { id: propertyId },
      { $inc: { likes: 1 }, $push: { likedBy: userId } },
      { new: true }
    );

    res.status(200).json({ likes: updatedProperty.likes });
  } catch (error) {
    console.error("Error updating likes:", error);
    res.status(500).send("Error updating likes");
  }
});

module.exports = router;

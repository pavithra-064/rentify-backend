const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");
const propertySchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
      default: uuidv4,
    },
    sellerId: {
      type: String,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: "https://picsum.photos/200",
    },
    nearbyFacilities: [String],
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: {
      type: [String],
      default: [],
    },
    cost: {
      type: Number,
      required: true,
    },
    sqft: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const Property = mongoose.model("Property", propertySchema);
module.exports = Property;

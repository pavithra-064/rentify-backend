const express = require("express");
const Property = require("../../models/propertySchema");
const router = express.Router();

const addproperty = async (req, res) => {
  try {
    const {
      sellerId,
      title,
      description,
      place,
      area,
      bedrooms,
      bathrooms,
      nearbyFacilities,
      cost,
      sqft,
    } = req.body;

    const newProperty = new Property({
      sellerId,
      title,
      description,
      place,
      area,
      bedrooms,
      bathrooms,
      nearbyFacilities,
      cost,
      sqft,
    });

    await newProperty.save();

    res.status(201).send("Property added successfully.");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = addproperty;

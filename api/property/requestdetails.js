const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Property = require("../../models/propertySchema");
const User = require("../../models/userSchema");

router.post("/:propertyId", async (req, res) => {
  try {
    const propertyId = req.params.propertyId;

    // console.log("req", req.userId);
    const property = await Property.findOne({ id: propertyId });

    if (!property) {
      return res.status(404).send("Property not found");
    }
    const buyer = await User.find({ userId: req.userId });
    const buyerEmail = buyer[0].email;
    const sellerId = property.sellerId;
    const seller = await User.find({ userId: sellerId });
    if (!seller) {
      return res.status(404).send("Seller not found");
    }

    const sellerEmail = seller[0].email;
    // console.log(seller);
    const buyerEmailContent = `Thank you for showing interest in the property \n ${property.title}. Seller's details: Name: ${seller[0].firstName}\n Email:${seller[0].email}\n Phone: ${seller[0].phoneNumber}`;
    const sellerEmailContent = `A buyer has shown interest in your property. Buyer's details: Name:${buyer[0].firstName}\n Email: ${buyerEmail}\n Phone: ${buyer[0].phoneNumber}`;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "pavithrasubu21@gmail.com",
        pass: "afotbasqmuylmxqi",
      },
    });

    await transporter.sendMail({
      from: "pavithrasubu21@gmail.com",
      to: buyerEmail,
      subject: "Interest in Property",
      text: buyerEmailContent,
    });

    await transporter.sendMail({
      from: "pavithrasubu21@gmail.com",
      to: sellerEmail,
      subject: "Interest in Your Property",
      text: sellerEmailContent,
    });

    res.status(200).send("Emails sent successfully");
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).send("Error sending emails");
  }
});

module.exports = router;

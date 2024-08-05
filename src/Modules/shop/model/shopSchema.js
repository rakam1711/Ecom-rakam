const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const shopSchema = new mongoose.Schema({
  shopId: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  description: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  contactInfo: {
    phone: { type: String },
    email: { type: String },
    website: { type: String },
  },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, required: true },
      comment: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "categorySchema" }],
  logo: { type: String },
  rating: { type: Number, default: 0 },
  numberOfRatings: { type: Number, default: 0 },
  timestamp: true,
});

const Shop = mongoose.model("shop", shopSchema);

module.exports = Shop;

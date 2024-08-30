const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const shopSchema = new mongoose.Schema(
  {
    shopId: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendorModel",
      required: true,
    },
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: { type: String, default: "india" },
    phone: { type: String, required: true },
    email: { type: String },
    website: { type: String },
    categories: { type: mongoose.Schema.Types.ObjectId, ref: "categorySchema" },

    subCategories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "subCategorySchema" },
    ],
    gallerySchema: [
      { type: mongoose.Schema.Types.ObjectId, ref: "gallerySchema" },
    ],

    logo: { type: String },
    rating: { type: Number, default: 0 },
    numberOfRatings: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Shop = mongoose.model("shop", shopSchema);

module.exports = Shop;

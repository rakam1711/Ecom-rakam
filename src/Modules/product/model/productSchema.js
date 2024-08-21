const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "vendorModel" },
  name: { type: String, required: true },
  description: { type: String, maxlength: 1000 },
  brand: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  images: [
    {
      url: { type: String },
    },
  ],
  rating: { type: Number, default: 0 },
  numRatings: { type: Number, default: 0 },
  status: { type: Boolean, default: true },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

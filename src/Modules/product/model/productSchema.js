const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, maxlength: 1000 },
  brand: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  images: [{ type: String }],
  rating: { type: Number, default: 0 },
  numRatings: { type: Number, default: 0 },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

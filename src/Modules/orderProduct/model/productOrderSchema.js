const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    Address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },

    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
      },
    ],
  },
  {
    timestamps: true,
    strict: false,
    collection: "orders",
  }
);

const orders = mongoose.model("Orders", OrderSchema);

module.exports = orders;

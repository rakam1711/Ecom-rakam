const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        shopId: { type: mongoose.Schema.Types.ObjectId, ref: "shop" },
        varient: { type: mongoose.Schema.Types.ObjectId, ref: "Varientt" },
        subVarient: { type: mongoose.Schema.Types.ObjectId, ref: "subVarient" },
        unit: { type: Number },
        price: { type: Number },
        amount: { type: Number },
      },
    ],
    totalAmount: { type: Number },
    modifiedOn: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

const cart = mongoose.model("Cart", cartSchema);

module.exports = cart;

const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema(
  {
    
    isActive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    strict: false,
    collection: "orders",
  }
);

const orders = mongoose.model("Orders", OrderSchema);

module.exports = orders;


const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    image: { type: String, default: " " },
    number: {
      type: Number,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[0-9]{10}$/.test(v);
        },
        message: "{VALUE} is not a valid mobile number!",
      },
    },
    numberAlternate: { type: Number, unique: true },
    ownerName: { type: String, require: true },
    shopName: { type: String, require: true },
    category: [],
    subCategory: [],
    email: {
      type: String,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: "{VALUE} is not a valid email",
      },
    },
    password: { type: String, require: true, select: false },
    gstORpan: { type: String },
    bankName: { type: String, default: " " },
    accountHolderName: { type: String, default: " " },
    accountNumber: { type: String, default: " " },
    ifscCode: { type: String, default: " " },
    branchName: { type: String, default: " " },
    MSME: { type: String, default: " " },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "service",
    },
    isActive: { type: Boolean, default: false },
    categoryType: [],
    paymentMode: [],
  },
  {
    timestamps: true,
    collection: "vendor",
  }
);
const vendorModel = mongoose.model("vender", vendorSchema);
module.exports = vendorModel;

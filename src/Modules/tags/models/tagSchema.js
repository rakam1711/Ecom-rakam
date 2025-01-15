const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      default: " ",
    },
    tagName: { type: String, unique: true },
    description: { type: String },
    status: { type: Boolean, default: false },
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: "shop" },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categorySchema",
    },
  },
  { timestamps: true }
);

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;

const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
  {
    tagName: { type: String, unique: true },
    description: { type: String },
  },
  { timestamps: true }
);

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;

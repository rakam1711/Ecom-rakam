const mongoose = require("mongoose");

const categoryModel = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const categorySchema = mongoose.model("Category", categoryModel);

module.exports = categorySchema;

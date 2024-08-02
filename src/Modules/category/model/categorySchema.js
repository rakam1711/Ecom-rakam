const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
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

const serviceSchema = mongoose.model("Category", categorySchema);

module.exports = serviceSchema;

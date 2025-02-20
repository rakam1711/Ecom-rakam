const mongoose = require("mongoose");

const subCategoryModel = new mongoose.Schema(
  {
    image: {
      type: String,
      default: " ",
    },
    name: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categorySchema",
    },
    tagId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
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
  { timestamps: true, strict: false }
);

const subCategorySchema = mongoose.model("subCategory", subCategoryModel);

module.exports = subCategorySchema;

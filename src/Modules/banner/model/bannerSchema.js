const mongoose = require("mongoose");

const bannerModel = new mongoose.Schema(
  {
    image: [],
    home: {
      type: String,
    },

    status: {
      type: Boolean,
      default: true,
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

const bannerSchema = mongoose.model("Banner", bannerModel);

module.exports = bannerSchema;

const mongoose = require("mongoose");

const bannerModel = new mongoose.Schema(
  {
    image: [],
    home: {
      type: String,
    },
    url: { type: String },

    status: {
      type: Boolean,
      default: true,
    },

    ServiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
  },
  { timestamps: true, strict: false }
);

const bannerSchema = mongoose.model("Banner", bannerModel);

module.exports = bannerSchema;

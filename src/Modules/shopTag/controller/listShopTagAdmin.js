const shopTag = require("../models/shopTagSchema.js");

const listshopTagAdmin = async (req, res, next) => {
  try {
    const shop = await shopTag.find().populate("category",{name:1});
    return res.status(200).json({
      message: "successfully listed shopTags",
      status: true,
      data: shop,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "/shopTag/listshopTag.js",
    });
  }
};

module.exports = listshopTagAdmin;

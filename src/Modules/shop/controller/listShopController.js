const { default: mongoose } = require("mongoose");
const Shop = require("../model/shopSchema.js");

const listShop = async (req, res, next) => {
  try {
    let limit = req.body.limit || 10;
    let page = req.body.page || 1;

    const shop = await Shop.find()
      .skip((page - 1) * limit)
      .limit(limit);
    return res.status(200).json({
      message: "data listed successfully",
      status: true,
      data: shop,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      status: false,
      location: "src/Modules/shop/controller/listShopController",
    });
  }
};

module.exports = listShop;

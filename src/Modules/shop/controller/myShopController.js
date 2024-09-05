const Shop = require("../model/shopSchema.js");
const myShop = async (req, res, next) => {
  try {
    let limit = req.body.limit || 10;
    let page = req.body.page || 1;
    let shop = "";
    if (req.role == "VENDOR") {
      shop = await Shop.find({ owner: req.vendorId, isActive: true })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("categories", { name: 1 })
        .populate("subCategories", { name: 1 });
    }
    return res.status(200).json({
      message: "data listed successfully",
      status: true,
      isShop: shop.length > 0 ? true : false,
      data: shop ? shop : [],
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      status: false,
      location: "src/Modules/shop/controller/myShopController",
    });
  }
};

module.exports = myShop;

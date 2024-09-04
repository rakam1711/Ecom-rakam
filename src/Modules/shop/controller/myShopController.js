const Shop = require("../model/shopSchema.js");
const subCategory = require("../../subCategory/model/subcategorySchema.js");

const myShop = async (req, res, next) => {
  try {
    let limit = req.body.limit || 10;
    let page = req.body.page || 1;
    let shop = "";
    if (req.role == "VENDOR") {
      shop = await Shop.find({ owner: req.vendorId, isActive: true })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("categories", { name: 1 });
    }
    // const ans = shop[0].subCategories[0];
    // console.log(ans, "+++++++++");
    // const papu = ans.forEach((k) => console.log(k));
    // console.log(papu);
    console.log({
      isShop: shop.length > 0 ? true : false,
      data: shop ? shop : [],
    });
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

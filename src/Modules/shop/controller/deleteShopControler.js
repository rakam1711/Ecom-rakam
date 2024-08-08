const Shop = require("../model/shopSchema.js");

const deleteShop = async (req, res, next) => {
  try {
    const shop = await Shop.findOneAndDelete(req.vendorId, { isActive: false });

    return res.status(200).json({
      status: true,
      message: "shop deleted successfully",
      data: shop,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/Shop/controller/deleteShopController.js",
    });
  }
};

module.exports = deleteShop;

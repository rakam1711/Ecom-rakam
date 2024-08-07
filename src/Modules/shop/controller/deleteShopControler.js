const Shop = require("../model/shopSchema.js");

const deleteShop = async (req, res, next) => {
  try {
    const id = req.body;
    const shop = await Shop.findByIdAndDelete(id);
    return res.status(200).json({
      status: true,
      message: "shop deleted successfully",
      data: shop,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/product/controller/deleteProductController.js",
    });
  }
};

module.exports = deleteProduct;

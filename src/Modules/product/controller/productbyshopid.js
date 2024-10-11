const Product = require("../model/productSchema.js");

const listProductsByShop = async (req, res, next) => {
  try {
    let limit = req.body.limit || 10;
    let page = req.body.page || 1;
    let shopId = req.body.shopId;

    if (!shopId) {
      return res.status(400).json({
        status: false,
        message: "shopId is required",
      });
    }

    const products = await Product.find({ shop: shopId })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({
      status: true,
      message: "Products listed successfully for the given shop",
      data: products,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/product/controller/listProductsByShop.js",
    });
  }
};

module.exports = listProductsByShop;

const Product = require("../model/productSchema.js");

const listProduct = async (req, res, next) => {
  try {
    const product = await Product.find();
    return res.status(200).json({
      status: true,
      message: "product listed successfully",
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/product/controller/listProductController.js",
    });
  }
};

module.exports = listProduct;

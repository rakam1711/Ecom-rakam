const Product = require("../model/productSchema.js");

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete({ _id: req?.params?.id });
    return res.status(200).json({
      status: true,
      message: "product deleted successfully",
      data: product,
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

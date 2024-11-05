const Product = require("../model/productSchema.js");

const listProductByVendorId = async (req, res, next) => {
  try {
    let limit = req.body.limit || 10;
    let page = req.body.page || 1;
    const { vendorId } = req.body;

    if (!vendorId) {
      return res.status(400).json({
        status: false,
        message: "Vendor ID is required",
      });
    }

    const products = await Product.find({ vendor: vendorId })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({
      status: true,
      message: "Products listed successfully",
      data: products,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/product/controller/listProductController.js",
    });
  }
};

module.exports = listProductByVendorId;

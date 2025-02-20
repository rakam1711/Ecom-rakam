const Product = require("../model/productSchema.js");

const listProductByServiceAndPopularity = async (req, res, next) => {
  try {
    let limit = req.body.limit || 10;
    let page = req.body.page || 1;
    const product = await Product.find({
      isActive: true,
      service: req.body.service,
      isPopular: true,
    })
      .skip((page - 1) * limit)
      .limit(limit);
    return res.status(200).json({
      status: true,
      message: "popular product listed successfully",
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location:
        "src/Modules/product/controller/listProductByServiceAndPopularity.js",
    });
  }
};

module.exports = listProductByServiceAndPopularity;

const Product = require("../../product/model/productSchema.js");

const myCategory = async (req, res) => {
  try {
    let limit = req.body.limit || 10;
    let page = req.body.page || 1;

    const products = await Product.find({ vendor: req.vendorId })
      .skip((page - 1) * limit)
      .limit(limit);

    const categories = [
      ...new Set(products.map((product) => product.category.toString())),
    ];

    if (!categories.length) {
      return res.status(200).json({ status: true, message: "No data found" });
    }

    return res.status(200).json({
      status: true,
      message: "Successfully listing myCategory",
      data: categories,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/category/controller/myCategory",
    });
  }
};

module.exports = myCategory;

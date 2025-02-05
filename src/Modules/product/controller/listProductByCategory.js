const mongoose = require("mongoose");
const Product = require("../model/productSchema.js");

const listProductByCategory = async (req, res, next) => {
  try {
    let limit = parseInt(req.body.limit) || 10;
    let page = parseInt(req.body.page) || 1;

    const categoryId = req.body.categoryId
      ? new mongoose.Types.ObjectId(req.body.categoryId)
      : null;
    const tagId = req.body.tagId
      ? new mongoose.Types.ObjectId(req.body.tagId)
      : null;

    const matchCondition = {
      category: categoryId,
      isActive: true,
    };

    if (tagId) {
      matchCondition.tag = { $in: [tagId] };
    }
    const products = await Product.aggregate([
      {
        $match: matchCondition,
      },
      {
        $skip: (page - 1) * limit,
      },
      {
        $limit: limit,
      },
    ]);
    return res.status(200).json({
      status: true,
      message: "Products by category listed successfully",
      data: products,
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/product/controller/listProductByCategory.js",
    });
  }
};
module.exports = listProductByCategory;

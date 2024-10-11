const Product = require("../model/productSchema.js");
const mongoose = require("mongoose");

const listProductsByShopId = async (req, res, next) => {
  try {
    let limit = parseInt(req.body.limit) || 10;
    let page = parseInt(req.body.page) || 1;
    const skip = (page - 1) * limit;

    let shopId = req.body.shopId;
    if (!shopId) {
      return res.status(400).json({
        status: false,
        message: "shopId is required",
      });
    }

    const matchCondition = {
      shop:new mongoose.Types.ObjectId(shopId),
      isActive: true,
    };

    const pipeline = [
      { $match: matchCondition },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "subcategories",
          localField: "subCategory",
          foreignField: "_id",
          as: "subCategoryDetails",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          vendor: 1,
          description: 1,
          isActive: 1,
          brand: 1,
          category: 1,
          subCategory: {
            $map: {
              input: "$subCategoryDetails",
              as: "subCategory",
              in: {
                _id: "$$subCategory._id",
                name: "$$subCategory.name",
              },
            },
          },
          price: 1,
          stock: 1,
          rating: 1,
          numRatings: 1,
          colorCode: 1,
        },
      },
    ];

    // Execute the aggregation
    const products = await Product.aggregate(pipeline);

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

module.exports = listProductsByShopId;

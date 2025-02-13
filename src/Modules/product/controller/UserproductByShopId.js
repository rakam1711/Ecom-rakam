const Product = require("../model/productSchema.js");
const mongoose = require("mongoose");

const parseJSONFields = (data) => {
  Object.keys(data).forEach((key) => {
    if (
      typeof data[key] === "string" &&
      data[key].startsWith("[") &&
      data[key].endsWith("]")
    ) {
      try {
        data[key] = JSON.parse(data[key]);
      } catch (error) {
        console.error(`Error parsing ${key}:`, error.message);
      }
    }
  });
  return data;
};

const UserproductByShopId = async (req, res, next) => {
  try {
    let limit = Math.max(parseInt(req.body.limit) || 10, 1);
    let page = Math.max(parseInt(req.body.page) || 1, 1);
    const skip = (page - 1) * limit;

    let { shopId, subCategoryId, tagId, subCategoryVarientId } = req.body;

    const matchCondition = { isActive: true };

    if (shopId) matchCondition.shop = new mongoose.Types.ObjectId(shopId);
    if (subCategoryId)
      matchCondition.subCategory = new mongoose.Types.ObjectId(subCategoryId);
    if (tagId) matchCondition.tag = new mongoose.Types.ObjectId(tagId);
    if (subCategoryVarientId)
      matchCondition.subCategoryVarient = new mongoose.Types.ObjectId(
        subCategoryVarientId
      );

    const pipeline = [
      { $match: matchCondition },
      {
        $lookup: {
          from: "shops",
          localField: "shop",
          foreignField: "_id",
          as: "shopDetails",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "vendor",
          foreignField: "_id",
          as: "vendorDetails",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      {
        $lookup: {
          from: "tags",
          localField: "tag",
          foreignField: "_id",
          as: "tagDetails",
        },
      },
      {
        $set: {
          shop: { $arrayElemAt: ["$shopDetails", 0] },
          vendor: { $arrayElemAt: ["$vendorDetails", 0] },
          category: { $arrayElemAt: ["$categoryDetails", 0] },
          tag: "$tagDetails",
        },
      },
      {
        $unset: [
          "shopDetails",
          "vendorDetails",
          "categoryDetails",
          "tagDetails",
        ],
      },
      { $skip: skip },
      { $limit: limit },
    ];

    let products = await Product.aggregate(pipeline);

    products = products.map(parseJSONFields);

    return res.status(200).json({
      status: true,
      message: "Products listed successfully",
      data: products,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/product/controller/UserproductByShopId.js",
    });
  }
};

module.exports = UserproductByShopId;

const mongoose = require("mongoose");
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

    const products = await Product.aggregate([
      {
        $match: { vendor: new mongoose.Types.ObjectId(vendorId) },
      },
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
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: {
          path: "$category",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$shopDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          name: 1,
          description: 1,
          price: 1,
          stock: 1,
          images: 1,
          brand: 1,
          isActive: 1,
          specialLabel: 1,
          category: { name: "$category.name" },
          shop: "$shopDetails.name",
        },
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
      message: "Products listed successfully",
      data: products,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location:
        "src/Modules/product/controller/listProductControllerByVendorId.js",
    });
  }
};

module.exports = listProductByVendorId;

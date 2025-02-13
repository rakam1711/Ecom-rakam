const mongoose = require("mongoose");
const Product = require("../model/productSchema.js");

const productByProductId = async (req, res, next) => {
  try {
    const productId = new mongoose.Types.ObjectId(req.body.id);
    const pipeline = [
      {
        $match: { _id: productId },
      },

      {
        $lookup: {
          from: "vendormodels",
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
          from: "subcategories",
          localField: "subCategory",
          foreignField: "_id",
          as: "subCategoryDetails",
        },
      },

      {
        $lookup: {
          from: "subvarients",
          localField: "subVarient",
          foreignField: "_id",
          as: "subVarientDetails",
        },
      },

      {
        $lookup: {
          from: "shoptags",
          localField: "shopTag",
          foreignField: "_id",
          as: "shopTagDetails",
        },
      },

      {
        $project: {
          productData: "$$ROOT",

          vendorDetails: { $arrayElemAt: ["$vendorDetails", 0] },
          categoryDetails: { $arrayElemAt: ["$categoryDetails", 0] },
          subCategories: {
            $map: {
              input: "$subCategoryDetails",
              as: "subCategory",
              in: {
                _id: "$$subCategory._id",
                name: "$$subCategory.name",
              },
            },
          },
          subVarientDetails: { $arrayElemAt: ["$subVarientDetails", 0] },
          shopTagDetails: { $arrayElemAt: ["$shopTagDetails", 0] },
        },
      },

      {
        $replaceRoot: {
          newRoot: { $mergeObjects: ["$productData", "$$ROOT"] },
        },
      },

      {
        $project: {
          productData: 0,
        },
      },
    ];

    let product = await Product.aggregate(pipeline);

    if (!product || product.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    product = JSON.parse(JSON.stringify(product[0]));

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = productByProductId;

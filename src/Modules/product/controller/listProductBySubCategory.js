const mongoose = require("mongoose");
const Product = require("../model/productSchema.js");

const listProductBySubCategory = async (req, res, next) => {
  try {
    let limit = parseInt(req.body.limit) || 10; 
    let page = parseInt(req.body.page) || 1;   

    const subcategoryId = new mongoose.Types.ObjectId(req.body.SubcategoryId);
    const vendorId = new mongoose.Types.ObjectId(req.vendorId);


    const products = await Product.aggregate([
      {
        $match: {
          vendor: vendorId, 
          subCategory: { $in: [subcategoryId] }, 
          isActive: true, 
        },
      },
      {
        $skip: (page - 1) * limit, // Skip items for pagination
      },
      {
        $limit: limit, // Limit the number of items per page
      },
    ]);

    return res.status(200).json({
      status: true,
      message: "Products by subcategory listed successfully",
      data: products,
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/product/controller/listProductBySubCategory.js",
    });
  }
};

module.exports = listProductBySubCategory;

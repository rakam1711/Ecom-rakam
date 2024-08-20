const Product = require("../model/productSchema.js");

const updateProduct = async (req, res, next) => {
  try {
    const data = {
      shop: req.body.shopId,
      vendor: req.vendorId,
      name: req.body.name,
      description: req.body.description,
      brand: req.body.brand,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
      rating: req.body.rating,
      numRatings: req.body.numRatings,
    };
    for (let key in data) {
      if (data[key] == undefined || data[key] == "") {
        delete data[key];
      }
    }
    const id = req.body.id;
    await Product.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    return res.status(200).json({
      status: true,
      message: "product updated successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
      location: "src/Modules/Product/controller/updateProduct",
    });
  }
};

module.exports = updateProduct;

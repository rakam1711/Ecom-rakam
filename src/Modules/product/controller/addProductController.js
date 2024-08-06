const Product = require("../model/productSchema.js");

const addProduct = async (req, res, next) => {
  try {
    const mustData = {
      name: req.body.name,
      description: req.body.description,
      brand: req.body.brand,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
      rating: req.body.rating,
      numRatings: req.body.numRatings,
    };
    for (let key in mustData) {
      if (mustData[key] == undefined || mustData[key] == "") {
        throw new Error(`invalid field ${key}`);
      }
    }
    const productName = await Product.findOne({ name: mustData.name });
    if (productName) throw new Error("Product Name already present");

    const product = Product({
      name: mustData.name,
      description: mustData.description,
      brand: mustData.brand,
      category: mustData.category,
      price: mustData.price,
      stock: mustData.stock,
      rating: mustData.rating,
      numRatings: mustData.numRatings,
    });

    await product.save();
    return res.status(201).json({
      status: true,
      message: "Product created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
      location: "src/Modules/product/controller/addProductController.js",
    });
  }
};

module.exports = addProduct;

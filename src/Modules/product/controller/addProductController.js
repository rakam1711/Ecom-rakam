const Product = require("../model/productSchema.js");
const upload = require("../../../Middleware/multer/multipleImageUpload.js");
const BASE_URL = process.env.BASE_URL;

const addProduct = async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send({
        statusText: "BAD REQUEST",
        status: 400,
        message: err.message || "Error uploading file",
        data: {},
      });
    }
    try {
      const mustData = {
        shop: req.body.shopId,
        name: req.body.name,
        description: req.body.description,
        brand: req.body.brand,
        category: req.body.categoryId,
        price: req.body.price,
        stock: req.body.stock,
        rating: req.body.rating,
        numRatings: req.body.numRatings,
        // image: req.file ? req.file.path : undefined,
      };
      for (let key in mustData) {
        if (mustData[key] == undefined || mustData[key] == "") {
          throw new Error(`invalid field ${key}`);
        }
      }
      const productName = await Product.findOne({ name: mustData.name });
      if (productName) throw new Error("Product Name already present");

      const product = Product({
        shop: mustData.shop,
        vendor: req.vendorId,
        name: mustData.name,
        description: mustData.description,
        brand: mustData.brand,
        category: mustData.category,
        price: mustData.price,
        stock: mustData.stock,
        rating: mustData.rating,
        numRatings: mustData.numRatings,
        // image: BASE_URL + mustData.image,
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
  });
};

module.exports = addProduct;

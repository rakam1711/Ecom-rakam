const Product = require("../model/productSchema.js");
const upload = require("../../../Middleware/multer/multipleImageUpload.js");
const BASE_URL = process.env.BASE_URL;

const updateProduct = async (req, res, next) => {
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
      const id = req.body.id;
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({
          status: false,
          message: "Product not found",
        });
      }

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
      };

      for (let key in mustData) {
        if (mustData[key] !== undefined && mustData[key] !== "") {
          product[key] = mustData[key];
        }
      }

      if (!req.body.imageIndex && req.files && req.files.length > 0) {
        const newImages = req.files.map((file) => BASE_URL + file.path);
        product.images = [...product.images, ...newImages];
      } else if (
        req.body.imageIndex !== undefined &&
        req.files &&
        req.files.length > 0
      ) {
        const imageIndex = parseInt(req.body.imageIndex, 10);

        if (imageIndex >= 0 && imageIndex < product.images.length) {
          product.images[imageIndex] = BASE_URL + req.files[0].path;
        } else {
          return res.status(400).json({
            status: false,
            message: "Invalid image index.",
          });
        }
      }

      await product.save();
      return res.status(200).json({
        status: true,
        message: "Product updated successfully",
        data: product,
      });
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: err.message,
        location: "src/Modules/product/controller/updateProductController.js",
      });
    }
  });
};

module.exports = updateProduct;

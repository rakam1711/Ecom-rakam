const Product = require("../model/productSchema.js");
const upload = require("../../../Middleware/multer/multipleImageUpload.js");
const BASE_URL = process.env.BASE_URL;
const shop = require("../../shop/model/shopSchema.js");

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
      const shop1 = await shop.findOne({ owner: req.vendorId });
      if (!shop1) {
        return res.status(404).json({
          status: false,
          message: "Shop not found for the vendor.",
        });
      }

      const mustData = {
        shop: shop1._id,
        vendor: req.vendorId,
        images: req.files?.map((file) => BASE_URL + file.path) || [],
      };

      Object.keys(req.body).forEach((key) => {
        try {
          mustData[key] = JSON.parse(req.body[key]);
        } catch (error) {
          mustData[key] = req.body[key];
        }
      });

      const product = new Product(mustData);
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
        stack: err.stack,
      });
    }
  });
};

module.exports = addProduct;

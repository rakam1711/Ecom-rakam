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

      let subCategory, productShippingDetails, tag;
      try {
        subCategory = JSON.parse(req.body.subCategoryId || "[]");
        productShippingDetails = JSON.parse(
          req.body.productShipingDetails || "[]"
        );
        tag = JSON.parse(req.body.tagId || "[]");
        // varient = JSON.parse(req.body.varientId || "[]");
      } catch (error) {
        return res.status(400).json({
          status: false,
          message: `Invalid JSON format: ${error.message}`,
        });
      }

      const mustData = {
        shop: shop1._id,
        vendor: req.vendorId,
        name: req.body.name,
        description: req.body.description,
        brand: req.body.brand,
        category: req.body.categoryId,
        subCategory,
        price: req.body.price,
        stock: req.body.stock,
        images: req.files?.map((file) => BASE_URL + file.path) || [],
        productShippingDetails,
        tag,
        minOrderQnt: req.body.minOrderQnt,
        maxOrderQnt: req.body.maxOrderQnt || req.body.minOrderQnt,
        specialLabel: req.body.specialLabel,
        availableForSubscription: req.body.availableForSubscription,
        frequency: req.body.frequency,
        // varient,
        deliveryTimeline: req.body.deliveryTimeline,
        deliveryInstruction: req.body.deliveryInstruction,
        isProduct: req.body.isProduct,
        colorCode: req.body.colorCode,
      };
      if (req.body.subCategoryVarientId) {
        mustData.subCategoryVarient = req.body.subCategoryVarientId;
      }
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

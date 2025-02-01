const Product = require("../model/productSchema.js");
const upload = require("../../../Middleware/multer/multipleImageUpload.js");
const BASE_URL = process.env.BASE_URL;
const Shop = require("../../shop/model/shopSchema.js");

const safeParseArray = (data) => {
  if (Array.isArray(data)) return data;
  if (typeof data === "string") {
    try {
      const parsedData = JSON.parse(data);
      return Array.isArray(parsedData) ? parsedData : [];
    } catch (error) {
      console.error("JSON parse error:", error);
      return [];
    }
  }
  return [];
};

const updateProduct = async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        statusText: "BAD REQUEST",
        status: 400,
        message: err.message || "Error uploading file",
        data: {},
      });
    }

    try {
      const productId = req.body.productId;
      if (!productId) {
        return res.status(400).json({
          status: false,
          message: "Product ID is required",
        });
      }

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({
          status: false,
          message: "Product not found",
        });
      }

      const shop1 =
        req.vendorId || req.adminId
          ? await Shop.findOne({ owner: req.vendorId || req.adminId })
          : null;

      const updates = {};

      if (shop1) updates.shop = shop1._id;
      if (req.vendorId) updates.vendor = req.vendorId;
      if (req.body.name) updates.name = req.body.name;
      if (req.body.description) updates.description = req.body.description;
      if (req.body.brand) updates.brand = req.body.brand;
      if (req.body.categoryId) updates.category = req.body.categoryId;
      if (req.body.subCategoryId)
        updates.subCategory = safeParseArray(req.body.subCategoryId);
      if (req.body.price) updates.price = req.body.price;
      if (req.body.stock) updates.stock = req.body.stock;
      if (req.body.productShipingDetails)
        updates.productShipingDetails = safeParseArray(
          req.body.productShipingDetails
        );
      if (req.body.tagId) updates.tag = safeParseArray(req.body.tagId);
      if (req.body.minOrderQnt) updates.minOrderQnt = req.body.minOrderQnt;
      if (req.body.maxOrderQnt) updates.maxOrderQnt = req.body.maxOrderQnt;
      if (req.body.specialLabel) updates.specialLabel = req.body.specialLabel;
      if (req.body.availableForSubscription !== undefined)
        updates.availableForSubscription = req.body.availableForSubscription;
      if (req.body.frequency) updates.frequency = req.body.frequency;
      if (req.body.varientId)
        updates.varient = safeParseArray(req.body.varientId);
      if (req.body.deliveryTimeline)
        updates.deliveryTimeline = req.body.deliveryTimeline;
      if (req.body.deliveryInstruction)
        updates.deliveryInstruction = req.body.deliveryInstruction;
      if (req.body.isProduct !== undefined)
        updates.isProduct = req.body.isProduct;
      if (req.body.colorCode) updates.colorCode = req.body.colorCode;
      if (req.body.rating) updates.rating = req.body.rating;
      if (req.body.numRatings) updates.numRatings = req.body.numRatings;
      if (req.body.isActive !== undefined) updates.isActive = req.body.isActive;

      // Update images
      if (req.files && req.files.length > 0) {
        if (req.body.imageIndex !== undefined) {
          const imageIndex = parseInt(req.body.imageIndex, 10);
          if (imageIndex >= 0 && imageIndex < product.images.length) {
            product.images[imageIndex] = BASE_URL + req.files[0].path;
          } else {
            return res.status(400).json({
              status: false,
              message: "Invalid image index.",
            });
          }
        } else {
          const newImages = req.files.map((file) => BASE_URL + file.path);
          product.images = [...product.images, ...newImages];
        }
      }

      // Apply updates
      Object.keys(updates).forEach((key) => {
        product[key] = updates[key];
      });

      await product.save();

      return res.status(200).json({
        status: true,
        message: "Product updated successfully",
      });
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: err.message,
        location: "src/Modules/product/controller/updateProductController.js",
        stack: err.stack,
      });
    }
  });
};

module.exports = updateProduct;

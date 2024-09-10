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
      // const shopId = await shop.findOne({owner:})
      const mustData = {
        shop: req.body.shopId,
        vendor: req.vendorId,
        name: req.body.name,
        description: req.body.description,
        brand: req.body.brand,
        category: req.body.categoryId,
        price: req.body.price,
        stock: req.body.stock,
        productShipingDetails: req.body.productShipingDetails,
        tag: req.body.tagId,
        minOrderQnt: req.body.minOrderQnt,
        maxOrderQnt: req.body.minOrderQnt,
        specialLabel: req.body.specialLabel,
        availableForSubscription: req.body.availableForSubscription,
        frequency: req.body.frequency,
        varient: req.body.varientId,
        deliveryTimeline: req.body.deliveryTimeline,
        deliveryInstruction: req.body.deliveryInstruction,
        isProduct: req.body.isProduct,
      };
      if (req.files) {
        mustData.images = req.files.map((file) => BASE_URL + file.path);
      }

      // for (let key in mustData) {
      //   if (mustData[key] == undefined || mustData[key] == "") {
      //     throw new Error(`invalid field ${key}`);
      //   }
      // }

      // const productName = await Product.findOne({ name: mustData.name });
      // if (productName) throw new Error("Product Name already present");

      const product = Product({
        shop: mustData.shop,
        vendor: mustData.vendor,
        name: mustData.name,
        description: mustData.description,
        brand: mustData.brand,
        category: mustData.category,
        price: mustData.price,
        stock: mustData.stock,
        images: mustData.images,
        productShipingDetails: mustData.productShipingDetails,
        tag: mustData.tag,
        minOrderQnt: mustData.minOrderQnt,
        maxOrderQnt: mustData.minOrderQnt,
        specialLabel: mustData.specialLabel,
        availableForSubscription: mustData.availableForSubscription,
        frequency: mustData.frequency,
        varient: mustData.varient,
        deliveryTimeline: mustData.deliveryTimeline,
        deliveryInstruction: mustData.deliveryInstruction,
        isProduct: mustData.isProduct,
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

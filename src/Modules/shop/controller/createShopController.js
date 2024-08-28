const Shop = require("../model/shopSchema.js");
const upload = require("../../../Middleware/multer/singleImageUpload.js");
const BASE_URL = process.env.BASE_URL;

const createShop = async (req, res, next) => {
  upload(req, res, async () => {
    try {
      const shop1 = await Shop.findOne({ owner: req.vendorId });
      if (shop1) throw new Error("shop already present for this vendor");
      const mustData = {
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        contactInfo: req.body.contactInfo,
        categories: req.body.categories,
        subCategories: req.body.subCategories,
      };
      for (let key in mustData) {
        if (mustData[key] == undefined || mustData[key] == "") {
          throw new Error(`invalid field ${key}`);
        }
      }

      if (req.file) {
        mustData.image = BASE_URL + req.file.path;
      }

      const shop = Shop({
        name: mustData.name,
        description: mustData.description,
        address: mustData.address,
        contactInfo: mustData.contactInfo,
        owner: req.vendorId,
        subCategories: mustData.subCategories,
        categories: mustData.categories,
        logo: mustData.image,
      });

      await shop.save();
      return res.status(201).json({
        status: true,
        message: "shop created successfully",
      });
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: err.message,
        location: "src/Modules/shop/controller/createShopController",
      });
    }
  });
};

module.exports = createShop;

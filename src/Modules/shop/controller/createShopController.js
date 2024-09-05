const Shop = require("../model/shopSchema.js");
const upload = require("../../../Middleware/multer/singleImageUpload.js");
const BASE_URL = process.env.BASE_URL;

const createShop = async (req, res, next) => {
  upload(req, res, async () => {
    try {
     const data1 = JSON.parse(req.body.subCategories);

      const shop1 = await Shop.findOne({ owner: req.vendorId });
      if (shop1) throw new Error("shop already present for this vendor");
      const mustData = {
        name: req.body.name,
        description: req.body.description,
        categories: req.body.categories,
        subCategories: data1,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        postalCode: req.body.postalCode,
        phone: req.body.phone,
        email: req.body.email,
      };
      for (let key in mustData) {
        if (mustData[key] == undefined || mustData[key] == "") {
          throw new Error(`invalid field ${key}`);
        }
      }
      mustData.website = req.body.website
      if (req.file) {
        mustData.image = BASE_URL + req.file.path;
      }

      const shop = Shop({
        name: mustData.name,
        description: mustData.description,
        service: req.vendorr.service,
        street: mustData.street,
        city: mustData.city,
        state: mustData.state,
        postalCode: mustData.postalCode,
        phone: mustData.phone,
        email: mustData.email,
        website: mustData.website,
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

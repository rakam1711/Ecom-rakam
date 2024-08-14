const Shop = require("../model/shopSchema.js");

const createShop = async (req, res, next) => {
  try {
    const mustData = {
      name: req.body.name,
      description: req.body.description,
      address: req.body.address,
      contactInfo: req.body.contactInfo,
      categories: req.body.categories,
    };
    for (let key in mustData) {
      if (mustData[key] == undefined || mustData[key] == "") {
        throw new Error(`invalid field ${key}`);
      }
    }
    // const shopName = await Shop.findOne({ name: mustData.name });
    // if (shopName) throw new Error("Shop Name already present");

    const shop = Shop({
      name: mustData.name,
      description: mustData.description,
      address: mustData.address,
      contactInfo: mustData.contactInfo,
      owner: req.vendorId,
      subCategories: mustData.categories,
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
};

module.exports = createShop;
